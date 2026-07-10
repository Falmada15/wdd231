const courses = [
    {
        subject: "CSE",
        number: 110,
        title: "Introduction to Programming",
        credits: 2,
        certificate: "Web and Computer Programming",
        description: "This course introduces students to programming and the fundamental building blocks used to solve problems.",
        technology: ["Python"],
        completed: true
    },
    {
        subject: "WDD",
        number: 130,
        title: "Web Fundamentals",
        credits: 2,
        certificate: "Web and Computer Programming",
        description: "This course introduces students to web design, development, HTML, and CSS.",
        technology: ["HTML", "CSS"],
        completed: true
    },
    {
        subject: "CSE",
        number: 111,
        title: "Programming with Functions",
        credits: 2,
        certificate: "Web and Computer Programming",
        description: "Students learn to write, call, debug, and test functions that solve problems in many disciplines.",
        technology: ["Python"],
        completed: true
    },
    {
        subject: "CSE",
        number: 210,
        title: "Programming with Classes",
        credits: 2,
        certificate: "Web and Computer Programming",
        description: "This course introduces classes, objects, encapsulation, inheritance, and polymorphism.",
        technology: ["C#"],
        completed: true
    },
    {
        subject: "WDD",
        number: 131,
        title: "Dynamic Web Fundamentals",
        credits: 2,
        certificate: "Web and Computer Programming",
        description: "Students create dynamic websites using JavaScript, responsive design, events, and DOM interaction.",
        technology: ["HTML", "CSS", "JavaScript"],
        completed: true
    },
    {
        subject: "WDD",
        number: 231,
        title: "Frontend Web Development I",
        credits: 2,
        certificate: "Web and Computer Programming",
        description: "Students focus on user experience, accessibility, compliance, performance optimization, and basic API usage.",
        technology: ["HTML", "CSS", "JavaScript"],
        completed: false
    }
];

const courseList = document.querySelector("#course-list");
const totalCredits = document.querySelector("#total-credits");
const filterButtons = document.querySelectorAll(".filter-button");

function displayCourses(courseSelection) {
    courseList.innerHTML = "";

    courseSelection.forEach((course) => {
        const card = document.createElement("article");

        card.className = `course-card${course.completed ? " completed" : ""}`;

        card.innerHTML = `
            <h3>${course.subject} ${course.number}</h3>
            <p><strong>${course.title}</strong></p>
            <p>${course.credits} credits</p>
        `;

        courseList.appendChild(card);
    });

    const creditTotal = courseSelection.reduce(
        (total, course) => total + course.credits,
        0
    );

    totalCredits.textContent =
        `The total credits for the courses listed above is ${creditTotal}.`;
}

function setActiveFilter(selectedButton) {
    filterButtons.forEach((button) => {
        button.classList.remove("active-filter");
    });

    selectedButton.classList.add("active-filter");
}

function filterCourses(subject, selectedButton) {
    const filteredCourses =
        subject === "ALL"
            ? courses
            : courses.filter((course) => course.subject === subject);

    setActiveFilter(selectedButton);
    displayCourses(filteredCourses);
}

document.querySelector("#all-courses").addEventListener("click", (event) => {
    filterCourses("ALL", event.currentTarget);
});

document.querySelector("#cse-courses").addEventListener("click", (event) => {
    filterCourses("CSE", event.currentTarget);
});

document.querySelector("#wdd-courses").addEventListener("click", (event) => {
    filterCourses("WDD", event.currentTarget);
});

displayCourses(courses);