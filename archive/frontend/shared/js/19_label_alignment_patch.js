(function(){
  'use strict';
  const $ = id => document.getElementById(id);
  const lesionDefs = {
    rightApex:{text:'RUL lesion', boxX:490, boxY:105, boxW:108, boxH:24, lineX1:490, lineY1:117, lineX2:455, lineY2:142, textX:544, textY:117},
    rightBase:{text:'RLL lesion', boxX:480, boxY:414, boxW:108, boxH:24, lineX1:480, lineY1:426, lineX2:455, lineY2:414, textX:534, textY:426},
    leftApex:{text:'LUL lesion', boxX:58, boxY:105, boxW:108, boxH:24, lineX1:166, lineY1:117, lineX2:226, lineY2:142, textX:112, textY:117},
    leftBase:{text:'LLL lesion', boxX:62, boxY:414, boxW:108, boxH:24, lineX1:170, lineY1:426, lineX2:236, lineY2:401, textX:116, textY:426}
  };
  function redrawLabels(){
    const svg = document.querySelector('.vq-lung-svg');
    if(!svg) return;
    const ns='http://www.w3.org/2000/svg';
    let g = $('vqLesionLabels');
    if(g) g.remove();
    g=document.createElementNS(ns,'g');
    g.setAttribute('id','vqLesionLabels');
    g.setAttribute('class','vq-lesion-callout');
    Object.entries(lesionDefs).forEach(([key,d])=>{
      const wrap=document.createElementNS(ns,'g');
      wrap.setAttribute('id','lesion_'+key);
      wrap.style.display='none';
      const rect=document.createElementNS(ns,'rect');
      rect.setAttribute('x', d.boxX); rect.setAttribute('y', d.boxY);
      rect.setAttribute('width', d.boxW); rect.setAttribute('height', d.boxH);
      const line=document.createElementNS(ns,'line');
      line.setAttribute('x1', d.lineX1); line.setAttribute('y1', d.lineY1);
      line.setAttribute('x2', d.lineX2); line.setAttribute('y2', d.lineY2);
      const text=document.createElementNS(ns,'text');
      text.setAttribute('x', d.textX); text.setAttribute('y', d.textY);
      text.setAttribute('text-anchor','middle');
      text.textContent=d.text;
      wrap.appendChild(rect); wrap.appendChild(line); wrap.appendChild(text);
      g.appendChild(wrap);
    });
    svg.appendChild(g);
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', redrawLabels); else redrawLabels();
  setTimeout(redrawLabels, 300);
  setTimeout(redrawLabels, 900);
})();
