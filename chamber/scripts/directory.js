const membersUrl = "data/members.json";

const memberContainer = document.querySelector("#members");
const gridButton = document.querySelector("#grid-view");
const listButton = document.querySelector("#list-view");
const menuButton = document.querySelector("#menu-button");
const navigation = document.querySelector("#main-navigation");
const currentYear = document.querySelector("#current-year");
const lastModified = document.querySelector("#last-modified");

function getMembershipName(level) {
    if (level === 3) {
        return "Gold Member";
    }

    if (level === 2) {
        return "Silver Member";
    }

    return "Member";
}

function createMemberCard(member) {
    const card = document.createElement("article");
    const membershipName = getMembershipName(member.membership);

    card.className = `member-card membership-${member.membership}`;

    card.innerHTML = `
        <div class="member-heading">
            <h2>${member.name}</h2>
            <p>${member.tagline}</p>
            <span>${membershipName}</span>
        </div>

        <div class="member-information">
            <img src="images/${member.image}"
                alt="${member.name} business logo"
                width="180"
                height="140"
                loading="lazy">

            <div class="member-details">
                <p>
                    <strong>Address:</strong>
                    ${member.address}
                </p>

                <p>
                    <strong>Phone:</strong>
                    <a href="tel:${member.phone.replaceAll(" ", "")}">
                        ${member.phone}
                    </a>
                </p>

                <p>
                    <strong>Email:</strong>
                    <a href="mailto:${member.email}">
                        ${member.email}
                    </a>
                </p>

                <p>
                    <strong>Website:</strong>
                    <a href="${member.website}"
                        target="_blank"
                        rel="noopener noreferrer">
                        Visit website
                    </a>
                </p>
            </div>
        </div>
    `;

    return card;
}

function displayMembers(members) {
    memberContainer.innerHTML = "";

    members.forEach((member) => {
        memberContainer.appendChild(createMemberCard(member));
    });
}

async function getMembers() {
    try {
        const response = await fetch(membersUrl);

        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }

        const data = await response.json();

        displayMembers(data.members);
    } catch (error) {
        memberContainer.innerHTML = `
            <p class="error-message">
                The business directory could not be loaded.
                Please try again later.
            </p>
        `;

        console.error(`Directory data error: ${error}`);
    }
}

function setDirectoryView(view) {
    const showGrid = view === "grid";

    memberContainer.classList.toggle("grid-view", showGrid);
    memberContainer.classList.toggle("list-view", !showGrid);

    gridButton.classList.toggle("active-view", showGrid);
    listButton.classList.toggle("active-view", !showGrid);

    gridButton.setAttribute("aria-pressed", `${showGrid}`);
    listButton.setAttribute("aria-pressed", `${!showGrid}`);
}

function toggleNavigation() {
    const menuIsOpen = menuButton.classList.toggle("show");

    navigation.classList.toggle("show");

    menuButton.setAttribute("aria-expanded", `${menuIsOpen}`);
    menuButton.setAttribute(
        "aria-label",
        `${menuIsOpen ? "Close" : "Open"} navigation menu`
    );
}

gridButton.addEventListener("click", () => {
    setDirectoryView("grid");
});

listButton.addEventListener("click", () => {
    setDirectoryView("list");
});

menuButton.addEventListener("click", toggleNavigation);

currentYear.textContent = `${new Date().getFullYear()}`;
lastModified.textContent =
    `Last Modified: ${document.lastModified}`;

getMembers();