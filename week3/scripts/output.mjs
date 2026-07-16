export function setTitle(course) {
    const courseName = document.querySelector("#courseName");
    const courseCode = document.querySelector("#courseCode");

    courseName.textContent = `${course.name}`;
    courseCode.textContent = `${course.code}`;
}

export function renderSections(sections) {
    const sectionsContainer = document.querySelector("#sections");

    sectionsContainer.innerHTML = "";

    sections.forEach((section) => {
        const card = document.createElement("article");

        card.className = "section-card";

        card.innerHTML = `
            <h3>Section ${section.sectionNum}</h3>
            <p><strong>Room:</strong> ${section.roomNum}</p>
            <p><strong>Schedule:</strong> ${section.days}</p>
            <p><strong>Instructor:</strong> ${section.instructor}</p>
            <p><strong>Enrollment:</strong> ${section.enrolled}</p>
        `;

        sectionsContainer.appendChild(card);
    });
}

export function showStatus(result) {
    const statusMessage = document.querySelector("#statusMessage");

    statusMessage.textContent = `${result.message}`;

    statusMessage.classList.toggle(
        "status-success",
        result.success
    );

    statusMessage.classList.toggle(
        "status-error",
        !result.success
    );
}