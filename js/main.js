document.addEventListener("DOMContentLoaded", () => {
  const header = document.getElementById("siteHeader");
  const menuButton = document.getElementById("menuButton");
  const mobileMenu = document.getElementById("mobileMenu");
  const phoneStage = document.getElementById("phoneStage");
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const desktop = matchMedia("(min-width: 761px)").matches;

  const updateHeader = () => header?.classList.toggle("scrolled", scrollY > 25);
  updateHeader();
  addEventListener("scroll", updateHeader, { passive: true });

  if (menuButton && mobileMenu) {
    menuButton.addEventListener("click", () => {
      const open = mobileMenu.classList.toggle("active");
      menuButton.classList.toggle("active", open);
      document.body.classList.toggle("menu-open", open);
      menuButton.setAttribute("aria-expanded", String(open));
    });

    mobileMenu.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        mobileMenu.classList.remove("active");
        menuButton.classList.remove("active");
        document.body.classList.remove("menu-open");
        menuButton.setAttribute("aria-expanded", "false");
      });
    });
  }

  if (!reduceMotion) {
    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      });
    }, { threshold: 0.14, rootMargin: "0px 0px -8% 0px" });

    document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));

    const progressObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;

        entry.target.querySelectorAll("[data-width]").forEach(bar => {
          requestAnimationFrame(() => {
            bar.style.width = bar.dataset.width;
          });
        });

        entry.target.querySelectorAll(".count").forEach(counter => animateCounter(counter));
        progressObserver.unobserve(entry.target);
      });
    }, { threshold: 0.35 });

    document.querySelectorAll(".dashboard").forEach(el => progressObserver.observe(el));
  } else {
    document.querySelectorAll(".reveal").forEach(el => el.classList.add("visible"));
    document.querySelectorAll("[data-width]").forEach(bar => bar.style.width = bar.dataset.width);
  }

  function animateCounter(el) {
    const target = Number(el.dataset.value || 0);
    const decimals = Number(el.dataset.decimal || 0);
    const suffix = el.dataset.suffix || "";
    const start = performance.now();
    const duration = 1100;

    const frame = now => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = (target * eased).toFixed(decimals) + suffix;
      if (progress < 1) requestAnimationFrame(frame);
    };

    requestAnimationFrame(frame);
  }

  if (desktop && phoneStage && !reduceMotion) {
    const phones = [
      [document.querySelector(".phone-left"), 14, 10],
      [document.querySelector(".phone-centre"), 24, 16],
      [document.querySelector(".phone-right"), 14, 10]
    ];

    phoneStage.addEventListener("mousemove", event => {
      const rect = phoneStage.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;

      phones.forEach(([phone, mx, my]) => {
        if (!phone) return;
        phone.style.marginLeft = `${x * mx}px`;
        phone.style.marginTop = `${y * my}px`;
      });
    });

    phoneStage.addEventListener("mouseleave", () => {
      phones.forEach(([phone]) => {
        if (!phone) return;
        phone.style.marginLeft = "0";
        phone.style.marginTop = "0";
      });
    });
  }

  if (desktop && !reduceMotion) {
    document.querySelectorAll(".tilt").forEach(card => {
      card.addEventListener("mousemove", event => {
        const rect = card.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;
        card.style.transform = `perspective(900px) rotateX(${-y * 3}deg) rotateY(${x * 4}deg) translateY(-4px)`;
      });

      card.addEventListener("mouseleave", () => {
        card.style.transform = "";
      });
    });

    document.querySelectorAll(".magnetic").forEach(button => {
      button.addEventListener("mousemove", event => {
        const rect = button.getBoundingClientRect();
        const x = event.clientX - rect.left - rect.width / 2;
        const y = event.clientY - rect.top - rect.height / 2;
        button.style.transform = `translate(${x * 0.08}px, ${y * 0.12}px)`;
      });

      button.addEventListener("mouseleave", () => {
        button.style.transform = "";
      });
    });
  }

  if (!reduceMotion) {
    const contours = document.querySelector(".hero-contours");
    const mountainBack = document.querySelector(".mountain-back");
    const mountainFront = document.querySelector(".mountain-front");
    const bigWord = document.querySelector(".big-word");
    let ticking = false;

    const parallax = () => {
      const p = Math.min(scrollY / innerHeight, 1.2);

      if (contours) contours.style.transform = `scale(1.25) translateY(${p * 35}px)`;
      if (mountainBack) mountainBack.style.transform = `translateY(${p * 30}px)`;
      if (mountainFront) mountainFront.style.transform = `scale(1.12) translateY(${p * 18}px)`;

      if (bigWord) {
        const rect = bigWord.parentElement.getBoundingClientRect();
        const local = (innerHeight - rect.top) / (innerHeight + rect.height);
        bigWord.style.transform = `translate(-50%, -50%) translateX(${(local - 0.5) * 80}px)`;
      }

      ticking = false;
    };

    addEventListener("scroll", () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(parallax);
    }, { passive: true });

    parallax();
  }
});
