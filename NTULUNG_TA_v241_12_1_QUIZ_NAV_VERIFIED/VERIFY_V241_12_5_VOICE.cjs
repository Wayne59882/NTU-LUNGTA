// Tests text sent to native speech. This does not claim device audio was heard.
const fs=require('fs'),vm=require('vm'),assert=require('assert');
for(const site of ['reference','kb']){
  const spoken=[];
  class Synth{
    speak(u){spoken.push(u.text);}
    cancel(){} pause(){} resume(){}
    getVoices(){return [{name:'Zhiwei',lang:'zh-TW'},{name:'David',lang:'en-US'}];}
  }
  class Utterance{constructor(text){this.text=text;this.lang='zh-TW';}}
  const window={speechSynthesis:new Synth(),SpeechSynthesis:Synth};
  const sandbox={window,SpeechSynthesisUtterance:Utterance,document:{readyState:'loading',getElementById(){return null;},querySelector(){return null;},addEventListener(){}},localStorage:{getItem(){return null;},setItem(){}},performance:{now:()=>1},setTimeout(){return 0;},clearTimeout(){},console:{log(){}}};
  vm.runInNewContext(fs.readFileSync(`web/${site}/js/45_v204_final_voice_controller.js`,'utf8'),sandbox);
  for(const letter of ['A','B','C','D','E'])for(const marker of [`正確答案：${letter}. 答案內容`,`正确答案:${letter} 答案內容`,`正確答案${letter}`,`正確答案為選項 ${letter}`,`正確答案：${letter.replace(/[A-E]/,c=>String.fromCharCode(c.charCodeAt(0)+0xFEE0))}．答案內容`]){
    const text=window.VQ_medicalPronunciation(marker,'zh-TW');
    assert(text.startsWith(`正確答案是選項 ${letter}。`),text);
    assert(!/(?:正確答案|正确答案)\s*[:：]\s*[A-E]/.test(text));
  }
  assert.equal(window.VQ_medicalPronunciation('Correct answer: B. explanation','en-US'),'The correct answer is option B. explanation');
  const source=new Utterance('正確答案：B. 完整解釋。😊 Δ ± ≈ ↑ ↓');
  window.speechSynthesis.speak(source);
  assert.equal(source.text,'正確答案：B. 完整解釋。😊 Δ ± ≈ ↑ ↓');
  assert(spoken[0].startsWith('正確答案是選項 B。'),spoken[0]);assert(!spoken.join('').includes('😊'));
  assert.equal(window.VQ_medicalPronunciation('Δ ± ≈ ↑ ↓','zh-TW'),'Δ ± ≈ ↑ ↓');
  const english=new Utterance('Correct answer: B. explanation');english.lang='en-US';
  window.speechSynthesis.speak(english);assert(spoken.at(-1).startsWith('The correct answer is option B.'));
}
console.log('[OK] Reference/KB answer letters A-E, fullwidth options, Chinese/English, emoji cleanup and native utterance text; display text stays unchanged.');
