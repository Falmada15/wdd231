const navButton = document.querySelector("#nav-button");
const navBar = document.querySelector("#nav-bar");
const currentYear = document.querySelector("#currentyear");
const lastModified = document.querySelector("#lastModified");

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

currentYear.textContent = `${new Date().getFullYear()}`;
lastModified.textContent = `Last Modified: ${document.lastModified}`;