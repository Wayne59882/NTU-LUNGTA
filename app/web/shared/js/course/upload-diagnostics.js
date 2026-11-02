/* R14: private upload receipts and source-page diagnostics for teachers/admin. */
(function(){
  'use strict';
  const esc=s=>String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const when=value=>value?new Date(Number(value)*1000).toLocaleString('zh-TW'):'未記錄';
  const mb=value=>(Number(value||0)/1048576).toFixed(1)+' MB';
  async function load(path){const response=await fetch(path,{cache:'no-store'}),data=await response.json();if(!response.ok)throw Error(data.error||'Could not load upload diagnostics');return data;}
  async function panel(admin){
    const modal=document.createElement('div');modal.className='vq-modal';modal.setAttribute('role','dialog');modal.setAttribute('aria-modal','true');modal.innerHTML='<div><button type="button" class="vq-close">關閉 Close</button><h3>教材接收與處理紀錄</h3><p>Loading…</p></div>';document.body.appendChild(modal);modal.querySelector('button').onclick=()=>modal.remove();
    const body=modal.firstElementChild;
    try{
      let reports=[];
      if(admin)reports=(await load('/api/reference/course-admin-uploads')).uploads||[];
      else{
        const sid=localStorage.getItem('VQ_V241_PENDING_COURSE_STAGE');
        if(sid)reports=[await load('/api/reference/course-upload-diagnostics?stage_id='+encodeURIComponent(sid))];
      }
      body.querySelector('p').remove();
      const search=document.createElement('input');search.type='search';search.placeholder='搜尋上傳者、檔名或課程';search.setAttribute('aria-label',search.placeholder);search.style.cssText='width:100%;padding:10px;margin:10px 0';body.appendChild(search);
      search.oninput=()=>{const query=search.value.trim().toLocaleLowerCase();for(const section of body.querySelectorAll('section'))section.hidden=!!query&&!section.textContent.toLocaleLowerCase().includes(query);};
      if(!reports.length)body.insertAdjacentHTML('beforeend','<p>目前沒有待處理的上傳紀錄。已建立的課程可在課程狀態查看來源問題。</p>');
      for(const report of reports){
        const section=document.createElement('section');section.innerHTML='<h4>'+esc(report.course_name||report.stage_id)+'</h4><p>上傳編號：'+esc(report.stage_id)+'</p>';
        if(admin){const owner=report.owner;section.insertAdjacentHTML('beforeend','<p>上傳者：'+(owner?esc(owner.name||'未填姓名')+' · '+esc(owner.email)+' · ID '+esc(owner.id):'舊資料，尚無可核對的帳號紀錄')+'</p>');}
        const ocr=report.local_ocr||{};
        section.insertAdjacentHTML('beforeend','<p>本機 OCR：'+(ocr.available?'可用 · '+esc(ocr.languages):'尚未就緒 · '+esc(ocr.error||'請檢查伺服器設定'))+'</p>');
        const vision=report.local_vision||{};
        section.insertAdjacentHTML('beforeend','<p>本機圖片與公式辨識：'+(vision.available?'可用 · '+esc(vision.model):'尚未就緒 · '+esc(vision.error||'請檢查本機模型'))+'</p>');
        for(const file of report.received_files||[]){
          const url='/api/reference/course-upload-source?stage_id='+encodeURIComponent(report.stage_id)+'&file='+encodeURIComponent(file.file_name);
          section.insertAdjacentHTML('beforeend','<p><a href="'+esc(url)+'">'+esc(file.display_name)+'</a> · '+mb(file.size_bytes)+' · 接收時間 '+esc(when(file.received_at))+' · '+esc(file.inspection_status)+(file.error?' · '+esc(file.error):'')+'</p>');
        }
        for(const transfer of report.transfers||[]){if(transfer.complete)continue;section.insertAdjacentHTML('beforeend','<p>尚未完成：'+esc(transfer.name)+' · '+mb(transfer.received_bytes)+' / '+mb(transfer.size_bytes)+' · 最後傳輸 '+esc(when(transfer.updated_at))+'</p>');}
        const details=document.createElement('pre');details.style.cssText='white-space:pre-wrap;overflow-wrap:anywhere;font-size:12px';details.textContent=JSON.stringify({jobs:report.jobs||report.build_job,source_quality:report.source_quality},null,2);section.appendChild(details);body.appendChild(section);
        if(admin){const inspect=document.createElement('button');inspect.type='button';inspect.textContent='查看問題頁碼與完整處理紀錄';inspect.onclick=async()=>{inspect.disabled=true;try{const full=await load('/api/reference/course-upload-diagnostics?stage_id='+encodeURIComponent(report.stage_id));details.textContent=JSON.stringify({jobs:full.jobs||full.build_job,source_quality:full.source_quality},null,2);}catch(error){details.textContent=String(error.message||error);}finally{inspect.disabled=false;}};section.appendChild(inspect);}
      }
    }catch(error){const message=document.createElement('p');message.textContent=String(error.message||error);body.appendChild(message);}
  }
  async function init(){
    const account=window.VQ_AUTH_USER||(await load('/api/auth/me').catch(()=>({}))).user;
    if(!account||account.role!=='teacher')return;
    const host=document.querySelector('.vq-userbar')||document.getElementById('v241CourseBuilder');if(!host)return;
    const button=document.createElement('button');button.type='button';button.textContent=account.is_admin?'所有教材上傳紀錄':'本次教材上傳紀錄';button.onclick=()=>panel(!!account.is_admin);host.appendChild(button);
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>setTimeout(init,600),{once:true});else setTimeout(init,600);
})();
