document.addEventListener("DOMContentLoaded", function () {
    const header = document.getElementById("siteHeader");
    const menuButton = document.getElementById("menuButton");
    const mobileMenu = document.getElementById("mobileMenu");
    const phoneStage = document.getElementById("phoneStage");

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const desktopView = window.matchMedia("(min-width: 761px)").matches;

    function updateHeader() {
        if (!header) return;
        header.classList.toggle("scrolled", window.scrollY > 25);
    }

    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });

    if (menuButton && mobileMenu) {
        menuButton.addEventListener("click", function () {
            const isOpen = mobileMenu.classList.toggle("active");
            menuButton.classList.toggle("active", isOpen);
            document.body.classList.toggle("menu-open", isOpen);
            menuButton.setAttribute("aria-expanded", String(isOpen));
        });

        mobileMenu.querySelectorAll("a").forEach(function (link) {
            link.addEventListener("click", function () {
                mobileMenu.classList.remove("active");
                menuButton.classList.remove("active");
                document.body.classList.remove("menu-open");
                menuButton.setAttribute("aria-expanded", "false");
            });
        });
    }

    if (reducedMotion) {
        document.querySelectorAll("[data-reveal]").forEach(function (element) {
            element.classList.add("is-visible");
        });
        return;
    }

    const revealSelectors = [
        ".section-copy",
        ".features-header",
        ".story-heading",
        ".story-lead",
        ".story-body",
        ".story-values > div",
        ".progress-section-copy",
        ".community-copy",
        ".download-inner",
        ".discover-card",
        ".feature-card",
        ".progress-dashboard",
        ".community-board",
        ".dashboard-bottom > div",
        ".community-person",
        ".community-activity > div"
    ];

    revealSelectors.forEach(function (selector) {
        document.querySelectorAll(selector).forEach(function (element, index) {
            element.setAttribute("data-reveal", "");
            element.style.setProperty("--reveal-delay", `${Math.min(index * 70, 350)}ms`);
        });
    });

    const revealObserver = new IntersectionObserver(
        function (entries, observer) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) return;
                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
            });
        },
        { threshold: 0.14, rootMargin: "0px 0px -8% 0px" }
    );

    document.querySelectorAll("[data-reveal]").forEach(function (element) {
        revealObserver.observe(element);
    });

    document.querySelectorAll(".dashboard-bar i, .profile-bar i").forEach(function (bar) {
        const finalWidth = bar.style.width || "0%";
        bar.dataset.finalWidth = finalWidth;
        bar.style.width = "0%";
    });

    const barObserver = new IntersectionObserver(
        function (entries, observer) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) return;
                const bar = entry.target;
                window.requestAnimationFrame(function () {
                    bar.style.width = bar.dataset.finalWidth;
                });
                observer.unobserve(bar);
            });
        },
        { threshold: 0.45 }
    );

    document.querySelectorAll(".dashboard-bar i, .profile-bar i").forEach(function (bar) {
        barObserver.observe(bar);
    });

    const numberElements = document.querySelectorAll(".dashboard-top strong, .dashboard-bottom strong");

    const countObserver = new IntersectionObserver(
        function (entries, observer) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) return;
                animateCount(entry.target);
                observer.unobserve(entry.target);
            });
        },
        { threshold: 0.5 }
    );

    numberElements.forEach(function (element) {
        countObserver.observe(element);
    });

    function animateCount(element) {
        const original = element.textContent.trim();
        const numericMatch = original.match(/[\d.]+/);
        if (!numericMatch) return;

        const target = Number(numericMatch[0]);
        const hasDecimal = original.includes(".");
        const suffix = original.replace(numericMatch[0], "");
        const duration = 1100;
        const startTime = performance.now();

        function update(currentTime) {
            const progress = Math.min((currentTime - startTime) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = target * eased;

            element.textContent =
                (hasDecimal ? current.toFixed(1) : Math.round(current)) +
                suffix;

            if (progress < 1) {
                window.requestAnimationFrame(update);
            } else {
                element.textContent = original;
            }
        }

        window.requestAnimationFrame(update);
    }

    if (phoneStage && desktopView) {
        const leftPhone = document.querySelector(".phone-left");
        const centrePhone = document.querySelector(".phone-centre");
        const rightPhone = document.querySelector(".phone-right");

        phoneStage.addEventListener("mousemove", function (event) {
            const bounds = phoneStage.getBoundingClientRect();
            const x = (event.clientX - bounds.left) / bounds.width - 0.5;
            const y = (event.clientY - bounds.top) / bounds.height - 0.5;

            movePhone(leftPhone, x * 14, y * 10);
            movePhone(centrePhone, x * 24, y * 16);
            movePhone(rightPhone, x * 14, y * 10);
        });

        phoneStage.addEventListener("mouseleave", function () {
            [leftPhone, centrePhone, rightPhone].forEach(function (phone) {
                if (!phone) return;
                phone.style.marginLeft = "0";
                phone.style.marginTop = "0";
            });
        });
    }

    function movePhone(phone, x, y) {
        if (!phone) return;
        phone.style.marginLeft = `${x}px`;
        phone.style.marginTop = `${y}px`;
    }

    if (desktopView) {
        document.querySelectorAll(".discover-card, .feature-card, .progress-dashboard, .community-board").forEach(function (card) {
            card.addEventListener("mousemove", function (event) {
                const bounds = card.getBoundingClientRect();
                const x = (event.clientX - bounds.left) / bounds.width - 0.5;
                const y = (event.clientY - bounds.top) / bounds.height - 0.5;

                card.style.transform =
                    `perspective(900px) rotateX(${-y * 3}deg) rotateY(${x * 4}deg) translateY(-4px)`;
            });

            card.addEventListener("mouseleave", function () {
                card.style.transform = "";
            });
        });
    }

    const heroGrid = document.querySelector(".hero-grid");
    const mountainBack = document.querySelector(".hero-mountain-back");
    const mountainFront = document.querySelector(".hero-mountain-front");
    const heroLightGold = document.querySelector(".hero-light-gold");
    const heroLightGreen = document.querySelector(".hero-light-green");
    const progressWord = document.querySelector(".progress-background-word");

    let scrollTicking = false;

    function updateParallax() {
        const scrollY = window.scrollY;
        const viewportHeight = window.innerHeight;
        const heroProgress = Math.min(Math.max(scrollY / viewportHeight, 0), 1.25);

        if (heroGrid) heroGrid.style.transform = `translateY(${heroProgress * 45}px)`;
        if (mountainBack) mountainBack.style.transform = `translateY(${heroProgress * 32}px)`;
        if (mountainFront) mountainFront.style.transform = `scale(1.12) translateY(${heroProgress * 20}px)`;
        if (heroLightGold) heroLightGold.style.transform = `translate3d(${heroProgress * -25}px, ${heroProgress * 34}px, 0)`;
        if (heroLightGreen) heroLightGreen.style.transform = `translate3d(${heroProgress * 22}px, ${heroProgress * -18}px, 0)`;

        if (progressWord) {
            const rect = progressWord.parentElement.getBoundingClientRect();
            const progress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
            progressWord.style.transform =
                `translate(-50%, -50%) translateX(${(progress - 0.5) * 80}px)`;
        }

        scrollTicking = false;
    }

    window.addEventListener(
        "scroll",
        function () {
            if (scrollTicking) return;
            scrollTicking = true;
            window.requestAnimationFrame(updateParallax);
        },
        { passive: true }
    );

    updateParallax();

    if (desktopView) {
        document.querySelectorAll(".magnetic-button").forEach(function (button) {
            button.addEventListener("mousemove", function (event) {
                const bounds = button.getBoundingClientRect();
                const x = event.clientX - bounds.left - bounds.width / 2;
                const y = event.clientY - bounds.top - bounds.height / 2;
                button.style.transform = `translate(${x * 0.08}px, ${y * 0.12}px)`;
            });

            button.addEventListener("mouseleave", function () {
                button.style.transform = "";
            });
        });
    }
});


/* =========================================================
   XPLOR ENDGAME V4 — PAGE REVEALS
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const revealItems = document.querySelectorAll(".v4-reveal");

    if (!revealItems.length) {
        return;
    }

    if (
        window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
        typeof IntersectionObserver === "undefined"
    ) {
        revealItems.forEach(function (item) {
            item.classList.add("v4-visible");
        });

        return;
    }

    const revealObserver = new IntersectionObserver(
        function (entries, observer) {

            entries.forEach(function (entry) {

                if (!entry.isIntersecting) {
                    return;
                }

                entry.target.classList.add("v4-visible");
                observer.unobserve(entry.target);

            });

        },
        {
            threshold: 0.12,
            rootMargin: "0px 0px -7% 0px"
        }
    );

    revealItems.forEach(function (item, index) {

        item.style.transitionDelay =
            Math.min(index % 4, 3) * 70 + "ms";

        revealObserver.observe(item);

    });

});
