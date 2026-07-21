/* ==================================================
   XPLOR WEBSITE INTERACTIONS
================================================== */

document.addEventListener("DOMContentLoaded", () => {

    const siteHeader = document.getElementById("siteHeader");
    const menuButton = document.getElementById("menuButton");
    const mobileMenu = document.getElementById("mobileMenu");

    const phoneScene = document.getElementById("phoneScene");

    const phoneLeft = document.querySelector(".phone-left");
    const phoneCentre = document.querySelector(".phone-centre");
    const phoneRight = document.querySelector(".phone-right");


    /* ==================================================
       NAVIGATION BACKGROUND
    =================================================== */

    function updateHeader() {
        if (window.scrollY > 30) {
            siteHeader.classList.add("scrolled");
        } else {
            siteHeader.classList.remove("scrolled");
        }
    }

    updateHeader();

    window.addEventListener("scroll", updateHeader, {
        passive: true
    });


    /* ==================================================
       MOBILE MENU
    =================================================== */

    menuButton.addEventListener("click", () => {

        const menuIsOpen = mobileMenu.classList.toggle("active");

        menuButton.classList.toggle("active", menuIsOpen);
        document.body.classList.toggle("menu-open", menuIsOpen);

        menuButton.setAttribute(
            "aria-expanded",
            menuIsOpen.toString()
        );

    });


    mobileMenu.querySelectorAll("a").forEach((link) => {

        link.addEventListener("click", () => {

            mobileMenu.classList.remove("active");
            menuButton.classList.remove("active");
            document.body.classList.remove("menu-open");

            menuButton.setAttribute("aria-expanded", "false");

        });

    });


    /* ==================================================
       HERO OPENING ANIMATION
    =================================================== */

    const openingAnimation = gsap.timeline({
        defaults: {
            ease: "power4.out"
        }
    });


    openingAnimation
        .from(".site-header", {
            y: -35,
            opacity: 0,
            duration: 1
        })

        .from(".eyebrow", {
            y: 25,
            opacity: 0,
            duration: 0.8
        }, "-=0.4")

        .from(".hero h1 span", {
            y: 65,
            opacity: 0,
            duration: 1.1,
            stagger: 0.12
        }, "-=0.55")

        .from(".hero-description", {
            y: 30,
            opacity: 0,
            duration: 0.8
        }, "-=0.55")

        .from(".hero-actions", {
            y: 25,
            opacity: 0,
            duration: 0.8
        }, "-=0.5")

        .from(".hero-stats > div", {
            y: 20,
            opacity: 0,
            duration: 0.7,
            stagger: 0.1
        }, "-=0.45")

        .from(".phone-centre", {
            y: 130,
            opacity: 0,
            scale: 0.72,
            duration: 1.35
        }, "-=1.2")

        .from(".phone-left", {
            x: 110,
            opacity: 0,
            duration: 1.1
        }, "-=0.8")

        .from(".phone-right", {
            x: -110,
            opacity: 0,
            duration: 1.1
        }, "-=1.05")

        .from(".scroll-indicator", {
            opacity: 0,
            duration: 0.8
        }, "-=0.35");


    /* ==================================================
       PHONE MOUSE MOVEMENT
    =================================================== */

    const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;


    if (
        phoneScene &&
        !prefersReducedMotion &&
        window.innerWidth > 900
    ) {

        phoneScene.addEventListener("mousemove", (event) => {

            const bounds = phoneScene.getBoundingClientRect();

            const horizontal =
                (event.clientX - bounds.left) / bounds.width - 0.5;

            const vertical =
                (event.clientY - bounds.top) / bounds.height - 0.5;


            gsap.to(phoneLeft, {
                x: horizontal * 18,
                y: vertical * 13,
                duration: 1,
                ease: "power3.out"
            });


            gsap.to(phoneCentre, {
                x: horizontal * 28,
                y: vertical * 18,
                duration: 1,
                ease: "power3.out"
            });


            gsap.to(phoneRight, {
                x: horizontal * 15,
                y: vertical * 11,
                duration: 1,
                ease: "power3.out"
            });

        });


        phoneScene.addEventListener("mouseleave", () => {

            gsap.to(
                [phoneLeft, phoneCentre, phoneRight],
                {
                    x: 0,
                    y: 0,
                    duration: 1.2,
                    ease: "power3.out"
                }
            );

        });

    }


    /* ==================================================
       SCROLL MOVEMENT

       As the visitor scrolls, the three phones separate.
    =================================================== */

    let ticking = false;


    function updateHeroScroll() {

        const scrollAmount = window.scrollY;
        const heroHeight = window.innerHeight;

        const progress = Math.min(
            Math.max(scrollAmount / heroHeight, 0),
            1
        );


        if (
            window.innerWidth > 900 &&
            !prefersReducedMotion
        ) {

            gsap.set(phoneLeft, {
                marginLeft: -55 * progress,
                rotationZ: -8 - 5 * progress
            });


            gsap.set(phoneCentre, {
                marginTop: -40 * progress,
                scale: 1 + 0.05 * progress
            });


            gsap.set(phoneRight, {
                marginLeft: 55 * progress,
                rotationZ: 8 + 5 * progress
            });


            gsap.set(".hero-copy", {
                y: -55 * progress,
                opacity: 1 - progress * 0.45
            });


            gsap.set(".hero-background", {
                y: 90 * progress,
                scale: 1.06 + progress * 0.04
            });


            gsap.set(".fog-one", {
                x: 140 * progress
            });


            gsap.set(".fog-two", {
                x: -110 * progress
            });

        }


        ticking = false;
    }


    window.addEventListener(
        "scroll",
        () => {

            if (!ticking) {

                window.requestAnimationFrame(updateHeroScroll);

                ticking = true;
            }

        },
        {
            passive: true
        }
    );


    /* ==================================================
       BUTTON MAGNET EFFECT
    =================================================== */

    const magneticButton = document.querySelector(
        ".primary-button"
    );


    if (
        magneticButton &&
        !prefersReducedMotion &&
        window.innerWidth > 900
    ) {

        magneticButton.addEventListener(
            "mousemove",
            (event) => {

                const bounds =
                    magneticButton.getBoundingClientRect();

                const x =
                    event.clientX -
                    bounds.left -
                    bounds.width / 2;

                const y =
                    event.clientY -
                    bounds.top -
                    bounds.height / 2;


                gsap.to(magneticButton, {
                    x: x * 0.16,
                    y: y * 0.2,
                    duration: 0.45,
                    ease: "power3.out"
                });

            }
        );


        magneticButton.addEventListener(
            "mouseleave",
            () => {

                gsap.to(magneticButton, {
                    x: 0,
                    y: 0,
                    duration: 0.7,
                    ease: "elastic.out(1, 0.35)"
                });

            }
        );

    }

});
