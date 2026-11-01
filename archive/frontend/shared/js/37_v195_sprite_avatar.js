(function(){
  'use strict';
  const AS='assets/';
  const FRAMES={
    zhiwei:Array.from({length:6},(_,i)=>AS+'avatar_male_gesture_'+i+'.png'),
    yating:Array.from({length:6},(_,i)=>AS+'avatar_female_gesture_'+i+'.png')
  };
  let role=(localStorage.getItem('VQ_REAL_AVATAR_ROLE')==='yating')?'yating':'zhiwei';
  let stage=null,img=null,mouth=null,timer=null,idleTimer=null,animating=false;

  function avatar(){return document.getElementById('avatar');}
  function preload(){Object.values(FRAMES).flat().forEach(src=>{const x=new Image();x.src=src;});}
  function clearTimer(){if(timer){clearTimeout(timer);timer=null;}}
  function ensureStage(){
    const a=avatar(); if(!a) return null;
    stage=a.querySelector('.vq-sprite-avatar-stage');
    if(!stage){
      stage=document.createElement('div'); stage.className='vq-sprite-avatar-stage'; stage.setAttribute('aria-label','Animated virtual human teaching assistant');
      img=document.createElement('img'); img.className='vq-sprite-avatar-img'; img.alt='Animated virtual human teaching assistant';
      mouth=document.createElement('span'); mouth.className='vq-sprite-mouth'; mouth.setAttribute('aria-hidden','true');
      stage.appendChild(img); stage.appendChild(mouth); a.appendChild(stage);
    } else { img=stage.querySelector('.vq-sprite-avatar-img'); mouth=stage.querySelector('.vq-sprite-mouth'); }
    if(img && !img.src) img.src=FRAMES[role][0];
    return stage;
  }
  function frame(n){ensureStage(); if(img) img.src=FRAMES[role][Math.max(0,Math.min(5,n))];}
  function neutral(){clearTimer(); animating=false; frame(0); if(stage) stage.classList.remove('vq-wave'); scheduleIdle();}
  function playSequence(seq,ms,done){
    ensureStage(); clearTimer(); animating=true; let i=0;
    function step(){
      frame(seq[i]); i++;
      if(i<seq.length){timer=setTimeout(step,ms);} else {animating=false; if(done)done();}
    }
    step();
  }
  function wave(){
    if(document.body.classList.contains('speaking')) return;
    ensureStage(); stage.classList.add('vq-wave');
    playSequence([0,1,2,3,4,3,2,1,0],115,function(){ if(stage)stage.classList.remove('vq-wave'); neutral(); });
  }
  function scheduleIdle(){
    if(idleTimer) clearTimeout(idleTimer);
    idleTimer=setTimeout(function(){
      if(!document.body.classList.contains('speaking')&&!animating){
        playSequence([0,1,0],260,neutral);
      } else scheduleIdle();
    },5200);
  }
  function setRole(next,gesture){
    next=(next==='yating')?'yating':'zhiwei';
    if(next===role && stage) return;
    role=next;
    ensureStage();
    if(stage){stage.classList.remove('vq-role-change');void stage.offsetWidth;stage.classList.add('vq-role-change');setTimeout(()=>stage&&stage.classList.remove('vq-role-change'),360);}
    frame(0);
    if(gesture) setTimeout(wave,140);
  }
  function bindRoleSelect(){
    const s=document.getElementById('avatarRoleSelect');
    if(!s||s.__VQ195)return;
    s.__VQ195=true;
    s.addEventListener('change',()=>setRole(s.value,true),true);
  }
  function observeAvatar(){
    const a=avatar(); if(!a||a.__VQ195OBS)return;
    a.__VQ195OBS=true;
    new MutationObserver(function(rs){
      let reinject=false;
      rs.forEach(r=>{if(r.type==='childList')reinject=true;if(r.type==='attributes'&&r.attributeName==='data-avatar-role') setRole(a.getAttribute('data-avatar-role'),true);});
      if(reinject) setTimeout(function(){ensureStage();frame(0);},0);
    }).observe(a,{childList:true,attributes:true,attributeFilter:['data-avatar-role']});
  }
  function observeSpeaking(){
    let prev=document.body.classList.contains('speaking');
    new MutationObserver(function(){
      const now=document.body.classList.contains('speaking'); if(now===prev)return; prev=now;
      if(now){ clearTimer(); animating=false; frame(0); }
      else { frame(0); scheduleIdle(); }
    }).observe(document.body,{attributes:true,attributeFilter:['class']});
  }
  function init(){
    preload(); ensureStage(); bindRoleSelect(); observeAvatar(); observeSpeaking();
    [120,350,800,1500].forEach(ms=>setTimeout(function(){ensureStage();bindRoleSelect();observeAvatar();},ms));
    setTimeout(wave,700);
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
