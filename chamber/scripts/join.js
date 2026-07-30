document.addEventListener("DOMContentLoaded", () => {

    // Timestamp
    const timestamp = document.querySelector("#timestamp");

    if (timestamp) {
        timestamp.value = new Date().toISOString();
    }

    // Footer
    const year = document.querySelector("#current-year");
    if (year) {
        year.textContent = new Date().getFullYear();
    }

    const modified = document.querySelector("#last-modified");
    if (modified) {
        modified.textContent = `Last Modification: ${document.lastModified}`;
    }

    // Membership dialogs
    const buttons = document.querySelectorAll(".membership-details");

    buttons.forEach(button => {

        const dialog = document.querySelector(`#${button.dataset.modal}`);

        if (!dialog) return;

        button.addEventListener("click", () => {
            dialog.showModal();
        });

        const closeButton = dialog.querySelector(".close-modal");

        closeButton.addEventListener("click", () => {
            dialog.close();
        });

        dialog.addEventListener("click", (event) => {

            const rect = dialog.getBoundingClientRect();

            const inside =
                event.clientX >= rect.left &&
                event.clientX <= rect.right &&
                event.clientY >= rect.top &&
                event.clientY <= rect.bottom;

            if (!inside) {
                dialog.close();
            }

        });

    });

});