const navButton = document.querySelector("#nav-button");
const navMenu = document.querySelector("#nav-menu");
const currentYear = document.querySelector("#currentyear");
const lastModified = document.querySelector("#lastModified");

function toggleNavigation() {
    const isOpen = navButton.classList.toggle("show");

    navMenu.classList.toggle("show");
    navButton.setAttribute("aria-expanded", `${isOpen}`);
    navButton.setAttribute(
        "aria-label",
        `${isOpen ? "Close" : "Open"} navigation menu`
    );
}

navButton.addEventListener("click", toggleNavigation);

currentYear.textContent = `${new Date().getFullYear()}`;
lastModified.textContent = `Last Modified: ${document.lastModified}`;