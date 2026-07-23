document.addEventListener("DOMContentLoaded", function () {

    const header = document.getElementById("siteHeader");
    const menuButton = document.getElementById("menuButton");
    const mobileMenu = document.getElementById("mobileMenu");
    const phoneStage = document.getElementById("phoneStage");

    const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    const desktopView = window.matchMedia(
        "(min-width: 761px)"
    ).matches;


    /* ==================================================
       HEADER
    ================================================== */

    function updateHeader() {

        if (!header) {
            return;
        }

        header.classList.toggle(
            "scrolled",
            window.scrollY > 25
        );

    }

    updateHeader();

    window.addEventListener(
        "scroll",
        updateHeader,
        {
            passive: true
        }
    );


    /* ==================================================
       MOBILE MENU
    ================================================== */

    if (menuButton && mobileMenu) {

        menuButton.addEventListener("click", function () {

            const isOpen =
                mobileMenu.classList.toggle("active");

            menuButton.classList.toggle(
                "active",
                isOpen
            );

            document.body.classList.toggle(
                "menu-open",
                isOpen
            );

            menuButton.setAttribute(
                "aria-expanded",
                String(isOpen)
            );

        });


        mobileMenu
            .querySelectorAll("a")
            .forEach(function (link) {

                link.addEventListener("click", function () {

                    mobileMenu.classList.remove("active");

                    menuButton.classList.remove("active");

                    document.body.classList.remove("menu-open");

                    menuButton.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                });

            });

    }


    /* ==================================================
       PHONE MOVEMENT
    ================================================== */

    if (
        phoneStage &&
        desktopView &&
        !reducedMotion
    ) {

        const leftPhone =
            document.querySelector(".phone-left");

        const centrePhone =
            document.querySelector(".phone-centre");

        const rightPhone =
            document.querySelector(".phone-right");


        phoneStage.addEventListener(
            "mousemove",
            function (event) {

                const bounds =
                    phoneStage.getBoundingClientRect();

                const x =
                    (event.clientX - bounds.left) /
                    bounds.width -
                    0.5;

                const y =
                    (event.clientY - bounds.top) /
                    bounds.height -
                    0.5;


                if (leftPhone) {

                    leftPhone.style.marginLeft =
                        `${x * 14}px`;

                    leftPhone.style.marginTop =
                        `${y * 10}px`;

                }


                if (centrePhone) {

                    centrePhone.style.marginLeft =
                        `${x * 22}px`;

                    centrePhone.style.marginTop =
                        `${y * 15}px`;

                }


                if (rightPhone) {

                    rightPhone.style.marginLeft =
                        `${x * 14}px`;

                    rightPhone.style.marginTop =
                        `${y * 10}px`;

                }

            }
        );


        phoneStage.addEventListener(
            "mouseleave",
            function () {

                [
                    leftPhone,
                    centrePhone,
                    rightPhone
                ].forEach(function (phone) {

                    if (!phone) {
                        return;
                    }

                    phone.style.marginLeft = "0";
                    phone.style.marginTop = "0";

                });

            }
        );

    }


    /* ==================================================
       MAGNETIC BUTTONS
    ================================================== */

    if (
        desktopView &&
        !reducedMotion
    ) {

        document
            .querySelectorAll(".magnetic-button")
            .forEach(function (button) {

                button.addEventListener(
                    "mousemove",
                    function (event) {

                        const bounds =
                            button.getBoundingClientRect();

                        const x =
                            event.clientX -
                            bounds.left -
                            bounds.width / 2;

                        const y =
                            event.clientY -
                            bounds.top -
                            bounds.height / 2;


                        button.style.transform =
                            `translate(${x * 0.08}px, ${y * 0.12}px)`;

                    }
                );


                button.addEventListener(
                    "mouseleave",
                    function () {

                        button.style.transform = "";

                    }
                );

            });

    }

});
