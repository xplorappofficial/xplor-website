
document.addEventListener("DOMContentLoaded",()=>{
 if(typeof L==="undefined") return;
 const points=[
  [56.7969,-5.0036,"▲"],[54.5269,-3.0176,"▲"],[53.1241,-1.8560,"◉"],
  [53.0685,-4.0763,"▲"],[53.1140,-3.9975,"↗"],[51.8833,-3.4368,"▲"],[51.7780,-3.5570,"●"]
 ];
 function markerIcon(sym){return L.divIcon({className:"",html:`<div class="xplor-pin">${sym}</div>`,iconSize:[36,36],iconAnchor:[18,18]})}
 function init(id,center,zoom){
   const el=document.getElementById(id); if(!el||el.dataset.ready)return;
   el.dataset.ready="1";
   const m=L.map(el,{zoomControl:false,attributionControl:true,scrollWheelZoom:false,dragging:true,minZoom:5,maxZoom:10}).setView(center,zoom);
   L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{maxZoom:18,attribution:"&copy; OpenStreetMap"}).addTo(m);
   points.forEach(p=>L.marker([p[0],p[1]],{icon:markerIcon(p[2]),interactive:false}).addTo(m));
   setTimeout(()=>m.invalidateSize(),150);
 }
 const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){const id=e.target.id;init(id,id==="homeMapMain"?[54.3,-3.2]:[54.7,-3.1],id==="homeMapMain"?5.6:5.2);io.unobserve(e.target)}}),{rootMargin:"220px"});
 ["homeMapMain","homeMapTeaser"].forEach(id=>{const el=document.getElementById(id);if(el)io.observe(el)});
});
