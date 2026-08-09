
document.addEventListener("DOMContentLoaded", () => {
  const header = document.getElementById("siteHeader");
  const menuButton = document.getElementById("menuButton");
  const mobileMenu = document.getElementById("mobileMenu");
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const fine = matchMedia("(pointer: fine)").matches;

  const setHeader = () => header?.classList.toggle("scrolled", scrollY > 25);
  setHeader();
  addEventListener("scroll", setHeader, { passive: true });

  if (menuButton && mobileMenu) {
    menuButton.addEventListener("click", () => {
      const open = mobileMenu.classList.toggle("active");
      document.body.classList.toggle("menu-open", open);
      menuButton.setAttribute("aria-expanded", String(open));
    });
    mobileMenu.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
      mobileMenu.classList.remove("active");
      document.body.classList.remove("menu-open");
      menuButton.setAttribute("aria-expanded", "false");
    }));
  }

  const reveals = [...document.querySelectorAll(".reveal")];
  if (!reduced && "IntersectionObserver" in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => entry.target.classList.toggle("visible", entry.isIntersecting));
    }, { threshold: .12, rootMargin: "0px 0px -5% 0px" });
    reveals.forEach(el => observer.observe(el));
  } else {
    reveals.forEach(el => el.classList.add("visible"));
  }

  const phoneStage = document.getElementById("phoneStage");
  const phones = [...document.querySelectorAll(".phone")];

  if (!reduced && fine && phoneStage && phones.length) {
    let raf;
    phoneStage.addEventListener("mousemove", e => {
      const r = phoneStage.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - .5;
      const y = (e.clientY - r.top) / r.height - .5;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        phones.forEach((p, i) => {
          const d = Number(p.dataset.depth || 1);
          const base = i === 0
            ? "rotateY(12deg) rotateZ(-8deg) scale(.9)"
            : i === 1
              ? "translateX(-50%) rotateY(-2deg) scale(1.02)"
              : "rotateY(-12deg) rotateZ(8deg) scale(.9)";
          p.style.transform = `${base} translate3d(${x*18*d}px,${y*14*d}px,${15*d}px)`;
        });
      });
    });
    phoneStage.addEventListener("mouseleave", () => {
      phones[0].style.transform = "rotateY(12deg) rotateZ(-8deg) scale(.9)";
      phones[1].style.transform = "translateX(-50%) rotateY(-2deg) scale(1.02)";
      phones[2].style.transform = "rotateY(-12deg) rotateZ(8deg) scale(.9)";
    });
  }

  if (!reduced) {
    let ticking = false;
    addEventListener("scroll", () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = scrollY;
        phones.forEach((p,i) => p.style.marginTop = `${Math.max(-18,Math.min(18,y*.018*(i===1?-1:1)))}px`);
        ticking = false;
      });
    }, { passive:true });
  }

  if (!reduced && fine) {
    document.querySelectorAll(".magnetic").forEach(btn => {
      btn.addEventListener("mousemove", e => {
        const r = btn.getBoundingClientRect();
        btn.style.transform = `translate(${(e.clientX-r.left-r.width/2)*.07}px,${(e.clientY-r.top-r.height/2)*.09}px)`;
      });
      btn.addEventListener("mouseleave", () => btn.style.transform = "");
    });
  }
});


/* Build 02: lightweight page atmosphere */
document.addEventListener("DOMContentLoaded", () => {
  if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const contours = [...document.querySelectorAll(".page-contour")];
  const grids = [...document.querySelectorAll(".page-grid, .hero-grid, .ios-grid")];
  let ticking = false;

  const moveAtmosphere = () => {
    const y = scrollY;
    contours.forEach((el, index) => {
      el.style.transform = `translate3d(0,${Math.min(40,y*.018*(index+1))}px,0)`;
    });
    grids.forEach((el, index) => {
      el.style.marginTop = `${Math.min(30,y*.012*(index%2 ? -1 : 1))}px`;
    });
    ticking = false;
  };

  addEventListener("scroll", () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(moveAtmosphere);
  }, {passive:true});
});

document.addEventListener("DOMContentLoaded",()=>{
 const hs=[...document.querySelectorAll(".map-hotspot")], p=document.getElementById("mapPreview");
 if(hs.length&&p){
  const t=p.querySelector(".map-preview-type"),h=p.querySelector("h3"),r=p.querySelector("p"),m=p.querySelector("small");
  const set=b=>{hs.forEach(x=>x.classList.toggle("active",x===b));t.textContent=b.dataset.type;h.textContent=b.dataset.title;r.textContent=b.dataset.region;m.textContent=b.dataset.meta;p.animate([{opacity:.45,transform:"translateY(8px)"},{opacity:1,transform:"none"}],{duration:240,easing:"cubic-bezier(.16,1,.3,1)"})};
  hs.forEach(b=>["mouseenter","focus","click"].forEach(e=>b.addEventListener(e,()=>set(b))));
 }
});


/* Build 12 — Features discovery switcher */
document.addEventListener("DOMContentLoaded",()=>{
 const shell=document.querySelector(".b12-discovery-shell");
 if(!shell) return;
 const stage=shell.querySelector(".b12-discovery-stage"), img=document.getElementById("b12SceneImage"), eye=document.getElementById("b12SceneEyebrow"), title=document.getElementById("b12SceneTitle"), text=document.getElementById("b12SceneText"), count=document.getElementById("b12SceneCount");
 const scenes={
  summits:{img:"images/ridge-01.png",eye:"SUMMITS",title:"See the peaks worth ticking off.",text:"From famous mountain tops to proper summit markers that are easy to miss, keep the UK in one visual list.",count:"108"},
  caves:{img:"images/cave-01.png",eye:"CAVES",title:"Go beyond the obvious trail.",text:"Keep cave entrances and underground adventures alongside everything else you explore — not buried in screenshots and Notes.",count:"42"},
  waterfalls:{img:"images/waterfall-02.png",eye:"WATERFALLS",title:"Find the places hidden between the peaks.",text:"Waterfalls become part of the same adventure record, ready to discover, save and tick off with the rest of the UK.",count:"64"},
  scrambles:{img:"images/scramble-02.png",eye:"SCRAMBLES",title:"Turn a ridge into the next mission.",text:"Save scrambling ideas, build a proper list and compare which ridges the crew has already completed.",count:"31"},
  camping:{img:"images/camp-01.png",eye:"WILD CAMPS",title:"Remember where the weekend actually happened.",text:"Keep wild-camp memories and adventure planning connected to your wider XPLOR progress.",count:"27"}
 };
 shell.querySelectorAll(".b12-discovery-tabs button").forEach(btn=>btn.addEventListener("click",()=>{
  const s=scenes[btn.dataset.scene]; if(!s) return;
  shell.querySelectorAll(".b12-discovery-tabs button").forEach(b=>b.classList.toggle("active",b===btn));
  stage.classList.add("scene-changing");
  setTimeout(()=>{img.src=s.img;eye.textContent=s.eye;title.textContent=s.title;text.textContent=s.text;count.textContent=s.count;stage.dataset.current=btn.dataset.scene;stage.classList.remove("scene-changing")},150);
 }));
});
