document.addEventListener("DOMContentLoaded", function () {

    const header = document.getElementById("siteHeader");
    const menuButton = document.getElementById("menuButton");
    const mobileMenu = document.getElementById("mobileMenu");


    function updateHeader() {

        if (!header) {
            return;
        }

        if (window.scrollY > 20) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }

    }


    updateHeader();


    window.addEventListener(
        "scroll",
        updateHeader,
        {
            passive: true
        }
    );


    if (menuButton && mobileMenu) {

        menuButton.addEventListener("click", function () {

            const menuOpen =
                mobileMenu.classList.toggle("active");

            menuButton.classList.toggle(
                "active",
                menuOpen
            );

            document.body.classList.toggle(
                "menu-open",
                menuOpen
            );

            menuButton.setAttribute(
                "aria-expanded",
                String(menuOpen)
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

});
