export function setSectionSelection(sections) {
    const sectionSelection = document.querySelector("#sectionNumber");

    sectionSelection.innerHTML = "";

    sections.forEach((section) => {
        const option = document.createElement("option");

        option.value = `${section.sectionNum}`;
        option.textContent =
            `Section ${section.sectionNum} — ${section.days}`;

        sectionSelection.appendChild(option);
    });
}