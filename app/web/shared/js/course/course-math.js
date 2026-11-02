/* R12: local, bounded MathML rendering. Never render the entire document. */
(function(){
  'use strict';
  const pattern=/\$\$[\s\S]+?\$\$|(?<![\\$])\$(?!\$)[^$]+?(?<!\\)\$(?!\$)|\\\[[\s\S]+?\\\]|\\\([\s\S]+?\\\)/g;
  const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  function currency(token,text,end){return token[0]==='$'&&token[1]!=='$'&&/^\$\s*\d/.test(token)&&(/\d/.test(text[end]||'x')||/\b(?:USD|dollars?|per|each|price|units?|million|billion)\b/i.test(token));}
  function protect(text){const saved=[];return {text:String(text||'').replace(pattern,m=>{saved.push(m);return 'MATHKEEPZZZ'+saved.length+'ZZZ';}),saved};}
  function restore(text,saved){return String(text).replace(/MATHKEEPZZZ(\d+)ZZZ/g,(m,n)=>saved[Number(n)-1]||m);}
  function html(text){
    text=String(text||'');let out='',pos=0,count=0;
    for(const match of text.matchAll(pattern)){
      out+=esc(text.slice(pos,match.index));pos=match.index+match[0].length;
      const token=match[0],block=token.startsWith('$$')||token.startsWith('\\['),cut=token[0]==='$'?(block?2:1):2;
      const tex=token.slice(cut,-cut);
      if(currency(token,text,pos)){out+=esc(token);continue;}
      if(!window.temml||tex.length>3500||++count>100){out+=esc(token);continue;}
      try{
        const math=window.temml.renderToString(tex,{displayMode:block,throwOnError:true,trust:false,maxExpand:300,annotate:false});
        out+='<span class="course-math'+(block?' course-math-block':'')+'" aria-label="'+esc(tex)+'">'+math+'</span>';
      }catch(_){out+='<span class="course-math-error" title="Formula could not be typeset">'+esc(token)+'</span>';}
    }
    return out+esc(text.slice(pos));
  }
  function render(el,text){if(el)el.innerHTML=html(text);}
  function typeset(root){
    if(!root)return;
    const walk=document.createTreeWalker(root,NodeFilter.SHOW_TEXT,{acceptNode(node){
      return node.parentElement&&node.parentElement.closest('math,.course-math,.course-math-error,script,style,textarea,select,[contenteditable="true"]')?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT;
    }}),nodes=[];
    while(walk.nextNode())nodes.push(walk.currentNode);
    for(const node of nodes){pattern.lastIndex=0;if(!pattern.test(node.nodeValue))continue;const span=document.createElement('span');span.className='course-math-text';span.innerHTML=html(node.nodeValue);node.replaceWith(span);}
  }
  function ranges(text){return Array.from(String(text||'').matchAll(pattern),m=>[m.index,m.index+m[0].length]);}
  window.CourseMath={html,render,typeset,protect,restore,ranges};
})();
