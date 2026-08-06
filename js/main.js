
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
