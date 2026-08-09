
document.addEventListener("DOMContentLoaded", function () {
  const el = document.getElementById("xplorLiveMap");
  if (!el || typeof L === "undefined") return;

  const map = L.map(el, {
    zoomControl: true,
    scrollWheelZoom: true,
    minZoom: 5,
    maxZoom: 14
  }).setView([54.55, -3.45], 6);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);

  const places = [
    {name:"Ben Nevis", region:"Scottish Highlands", meta:"1,345 m · Summit", type:"summit", icon:"▲", lat:56.7969, lng:-5.0036},
    {name:"Ben A'an", region:"Loch Lomond & Trossachs", meta:"454 m · Summit", type:"summit", icon:"▲", lat:56.2292, lng:-4.4075},
    {name:"Goat Fell", region:"Isle of Arran", meta:"874 m · Summit", type:"summit", icon:"▲", lat:55.6254, lng:-5.1916},
    {name:"Grey Mare's Tail", region:"Dumfries & Galloway", meta:"Waterfall · Nature reserve", type:"waterfall", icon:"●", lat:55.4182, lng:-3.2872},
    {name:"Helvellyn", region:"Lake District", meta:"950 m · Summit", type:"summit", icon:"▲", lat:54.5269, lng:-3.0176},
    {name:"Scafell Pike", region:"Lake District", meta:"978 m · Summit", type:"summit", icon:"▲", lat:54.4543, lng:-3.2116},
    {name:"Thor's Cave", region:"Peak District", meta:"Natural cavern", type:"cave", icon:"◉", lat:53.1241, lng:-1.8560},
    {name:"Yr Wyddfa (Snowdon)", region:"North Wales", meta:"1,085 m · Summit", type:"summit", icon:"▲", lat:53.0685, lng:-4.0763},
    {name:"Tryfan", region:"North Wales", meta:"917 m · Grade 1 scramble", type:"scramble", icon:"↗", lat:53.1140, lng:-3.9975},
    {name:"Pen y Fan", region:"Bannau Brycheiniog", meta:"886 m · Summit", type:"summit", icon:"▲", lat:51.8833, lng:-3.4368},
    {name:"Sgwd yr Eira", region:"Waterfall Country", meta:"Waterfall · South Wales", type:"waterfall", icon:"●", lat:51.7780, lng:-3.5570},
    {name:"Cheddar Gorge", region:"Somerset", meta:"Gorge & caves", type:"cave", icon:"◉", lat:51.2823, lng:-2.7656},
    {name:"Mam Tor", region:"Peak District", meta:"517 m · Summit", type:"summit", icon:"▲", lat:53.3492, lng:-1.8090}
  ];

  const markers = [];
  const card = document.getElementById("xplorLocationCard");
  const title = document.getElementById("mapCardTitle");
  const region = document.getElementById("mapCardRegion");
  const meta = document.getElementById("mapCardMeta");
  const type = document.getElementById("mapCardType");
  const zoomBtn = document.getElementById("mapZoomButton");
  let selected = places[7];

  function iconFor(p) {
    return L.divIcon({
      className: "",
      html: `<div class="xplor-pin ${p.type}">${p.icon}</div>`,
      iconSize: [44,44],
      iconAnchor: [21,21]
    });
  }

  function selectPlace(p, marker) {
    selected = p;
    type.textContent = p.type.toUpperCase();
    title.textContent = p.name;
    region.textContent = p.region;
    meta.textContent = p.meta;
    card.classList.remove("hidden");
    if (marker) map.panTo(marker.getLatLng(), {animate:true, duration:.55});
  }

  places.forEach(p => {
    const marker = L.marker([p.lat,p.lng], {icon:iconFor(p)}).addTo(map);
    marker.xplorType = p.type;
    marker.on("click", () => selectPlace(p, marker));
    markers.push(marker);
  });

  selectPlace(places[7]);

  document.querySelectorAll(".map-filter").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".map-filter").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const filter = btn.dataset.filter;
      markers.forEach(m => {
        const show = filter === "all" || m.xplorType === filter;
        if (show && !map.hasLayer(m)) m.addTo(map);
        if (!show && map.hasLayer(m)) map.removeLayer(m);
      });
    });
  });

  zoomBtn?.addEventListener("click", () => map.flyTo([selected.lat,selected.lng], 11, {duration:1.1}));
  document.getElementById("mapCardClose")?.addEventListener("click", () => card.classList.add("hidden"));

  setTimeout(() => map.invalidateSize(), 300);
});
