(function(){
  'use strict';
  /* "Show / Hide" button inside password and API-key fields, so people can check
     what they typed or pasted. Fields marked data-show-toggle-auto get it on load;
     fields created later call window.VQ_addShowToggle(input). */
  const ICON_ON='<svg class="on" viewBox="0 0 24 24" aria-hidden="true"><path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></svg>';
  const ICON_OFF='<svg class="off" viewBox="0 0 24 24" aria-hidden="true"><path d="M3 3l18 18"/><path d="M10.6 5.1A10.7 10.7 0 0 1 12 5c6.4 0 10 7 10 7a17.6 17.6 0 0 1-3.2 4.1M6.6 6.6C3.9 8.3 2 12 2 12s3.6 7 10 7a9.9 9.9 0 0 0 5.4-1.6"/><path d="M9.9 9.9a3 3 0 0 0 4.2 4.2"/></svg>';
  function css(){
    if(document.getElementById('vqShowToggleCss'))return;
    const style=document.createElement('style');style.id='vqShowToggleCss';
    style.textContent='.vq-show-wrap{position:relative;display:block;min-width:0}.vq-show-wrap>input{width:100%;box-sizing:border-box;padding-right:78px!important}'+
      '.vq-show-btn{position:absolute;right:5px;top:50%;transform:translateY(-50%);display:flex;align-items:center;gap:4px;width:auto!important;min-height:0!important;margin:0!important;'+
      'padding:6px 8px!important;border:0!important;border-radius:8px;background:transparent!important;box-shadow:none!important;color:#1f6fb2!important;font:inherit;font-size:12.5px!important;font-weight:800!important;cursor:pointer}'+
      '.vq-show-btn:hover,.vq-show-btn:focus-visible{background:#eaf3fc!important;outline:none}'+
      '.vq-show-btn svg{width:17px;height:17px;fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round;stroke-linejoin:round}'+
      '.vq-show-btn .off,.vq-show-btn[aria-pressed=true] .on{display:none}.vq-show-btn[aria-pressed=true] .off{display:block}';
    document.head.appendChild(style);
  }
  function add(input){
    if(!input||!input.parentNode||input.getAttribute('data-show-ready')==='1')return null;
    input.setAttribute('data-show-ready','1');css();
    const wrap=document.createElement('span');wrap.className='vq-show-wrap';
    input.parentNode.insertBefore(wrap,input);wrap.appendChild(input);
    const button=document.createElement('button');button.type='button';button.className='vq-show-btn';
    if(input.id)button.setAttribute('aria-controls',input.id);
    function set(visible){
      input.type=visible?'text':'password';button.setAttribute('aria-pressed',String(visible));
      button.setAttribute('aria-label',visible?'隱藏 Hide':'顯示 Show');button.querySelector('span').textContent=visible?'隱藏':'顯示';
    }
    button.innerHTML=ICON_ON+ICON_OFF+'<span></span>';set(false);
    button.addEventListener('click',function(){set(input.type==='password');input.focus();});
    wrap.appendChild(button);
    return button;
  }
  window.VQ_addShowToggle=add;
  function init(){document.querySelectorAll('input[data-show-toggle-auto]').forEach(add);}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
