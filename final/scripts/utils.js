export function setupPage() {
    setupNavigation();
    updateFooter();
}

function setupNavigation() {
    const menuButton = document.querySelector("#menu-button");
    const navigation = document.querySelector("#main-navigation");

    if (!menuButton || !navigation) {
        return;
    }

    menuButton.addEventListener("click", () => {
        const isOpen = navigation.classList.toggle("open");

        menuButton.setAttribute("aria-expanded", isOpen);

        menuButton.setAttribute(
            "aria-label",
            isOpen
                ? "Close navigation menu"
                : "Open navigation menu"
        );

        menuButton.textContent = isOpen ? "✕" : "☰";
    });
}

function updateFooter() {
    const currentYear = document.querySelector("#current-year");
    const lastModified = document.querySelector("#last-modified");

    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }

    if (lastModified) {
        lastModified.textContent =
            `Last Modification: ${document.lastModified}`;
    }
}