const navButton = document.querySelector("#nav-button");
const navBar = document.querySelector("#nav-bar");

function toggleNavigation() {
    const isOpen = navButton.classList.toggle("show");

    navBar.classList.toggle("show");

    navButton.setAttribute("aria-expanded", `${isOpen}`);
    navButton.setAttribute(
        "aria-label",
        `${isOpen ? "Close" : "Open"} navigation menu`
    );
}

navButton.addEventListener("click", toggleNavigation);