document.addEventListener("DOMContentLoaded", () => {

    // Footer
    const currentYear = document.querySelector("#current-year");
    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }

    const lastModified = document.querySelector("#last-modified");
    if (lastModified) {
        lastModified.textContent = `Last Modification: ${document.lastModified}`;
    }

    // Read URL parameters
    const params = new URLSearchParams(window.location.search);

    const applicationSummary = document.querySelector("#application-summary");

    const fields = [
        ["First Name", params.get("firstName")],
        ["Last Name", params.get("lastName")],
        ["Organizational Title", params.get("organizationalTitle")],
        ["Email", params.get("email")],
        ["Mobile Phone", params.get("mobilePhone")],
        ["Organization Name", params.get("organizationName")],
        ["Membership Level", params.get("membershipLevel")],
        ["Organization Description", params.get("description")],
        ["Application Date", params.get("timestamp")]
    ];

    fields.forEach(field => {

        const value = field[1];

        if (value) {

            const paragraph = document.createElement("p");

            paragraph.innerHTML = `<strong>${field[0]}:</strong> ${decodeURIComponent(value)}`;

            applicationSummary.appendChild(paragraph);

        }

    });

});