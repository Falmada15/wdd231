import { places } from "../data/places.mjs";

// Select HTML elements
const discoverCards = document.querySelector("#discover-cards");
const visitorMessage = document.querySelector("#visitor-message");
const currentYear = document.querySelector("#current-year");
const lastModified = document.querySelector("#last-modified");

// Display the places of interest
function displayPlaces(placesList) {
    discoverCards.innerHTML = "";

    placesList.forEach((place) => {
        const card = document.createElement("article");
        card.classList.add("discover-card");

        const title = document.createElement("h2");
        title.textContent = place.name;

        const figure = document.createElement("figure");

        const image = document.createElement("img");
        image.src = place.image;
        image.alt = place.name;
        image.width = 300;
        image.height = 200;
        image.loading = "lazy";

        figure.appendChild(image);

        const address = document.createElement("address");
        address.textContent = place.address;

        const description = document.createElement("p");
        description.textContent = place.description;

        const button = document.createElement("button");
        button.type = "button";
        button.textContent = "Learn More";
        button.setAttribute(
            "aria-label",
            `Learn more about ${place.name}`
        );

        card.appendChild(title);
        card.appendChild(figure);
        card.appendChild(address);
        card.appendChild(description);
        card.appendChild(button);

        discoverCards.appendChild(card);
    });
}

displayPlaces(places);

// Visitor message using localStorage
const lastVisit = localStorage.getItem("lastVisit");
const currentVisit = Date.now();

if (!lastVisit) {
    visitorMessage.textContent =
        "Welcome! Let us know if you have any questions.";
} else {
    const difference = currentVisit - Number(lastVisit);
    const millisecondsPerDay = 1000 * 60 * 60 * 24;
    const daysDifference = Math.floor(
        difference / millisecondsPerDay
    );

    if (daysDifference < 1) {
        visitorMessage.textContent =
            "Back so soon! Awesome!";
    } else if (daysDifference === 1) {
        visitorMessage.textContent =
            "You last visited 1 day ago.";
    } else {
        visitorMessage.textContent =
            `You last visited ${daysDifference} days ago.`;
    }
}

localStorage.setItem("lastVisit", currentVisit);

// Footer
if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
}

if (lastModified) {
    lastModified.textContent =
        `Last Modification: ${document.lastModified}`;
}