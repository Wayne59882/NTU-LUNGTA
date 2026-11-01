(function(){
  'use strict';

  /* v194 animation coordinator
     - Leaves viseme/mouth drawing entirely to 26_realistic_avatar_photo_mouth_sync.js.
     - Adds only avatar motion states: idle, speaking, and role-change transition.
     - No setInterval animation loop: CSS transforms keep this mobile-friendly. */

  function avatar(){ return document.getElementById('avatar'); }

  function pulseRoleTransition(){
    const el = avatar();
    if(!el) return;
    el.classList.remove('vq-avatar-role-transition');
    // force style flush so repeated role changes replay the transition
    void el.offsetWidth;
    el.classList.add('vq-avatar-role-transition');
    window.setTimeout(function(){
      const cur = avatar();
      if(cur) cur.classList.remove('vq-avatar-role-transition');
    }, 360);
  }

  function bindRoleObserver(){
    const el = avatar();
    if(!el || el.__VQ_V194_ROLE_OBSERVER__) return;
    el.__VQ_V194_ROLE_OBSERVER__ = true;
    let previous = el.getAttribute('data-avatar-role') || '';
    const obs = new MutationObserver(function(records){
      for(const r of records){
        if(r.type !== 'attributes' || r.attributeName !== 'data-avatar-role') continue;
        const now = el.getAttribute('data-avatar-role') || '';
        if(now && now !== previous){
          previous = now;
          pulseRoleTransition();
        }
      }
    });
    obs.observe(el, {attributes:true, attributeFilter:['data-avatar-role']});
  }

  function bindRoleSelect(){
    const sel = document.getElementById('avatarRoleSelect');
    if(!sel || sel.__VQ_V194_BOUND__) return;
    sel.__VQ_V194_BOUND__ = true;
    sel.addEventListener('change', function(){
      window.setTimeout(pulseRoleTransition, 10);
    }, true);
  }

  function init(){
    bindRoleObserver();
    bindRoleSelect();
    // avatarRoleSelect is inserted by script 26 after DOM parsing; retry briefly.
    [120, 350, 800, 1500].forEach(function(ms){
      window.setTimeout(function(){ bindRoleObserver(); bindRoleSelect(); }, ms);
    });
  }

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
