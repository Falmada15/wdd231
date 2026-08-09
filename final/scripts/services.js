import { setupPage } from "./utils.js";

const servicesGrid = document.querySelector("#services-grid");
const serviceCount = document.querySelector("#service-count");
const errorMessage = document.querySelector("#services-error");
const filterButtons = document.querySelectorAll(".filter-button");

const modal = document.querySelector("#service-modal");
const modalContent = document.querySelector("#modal-content");
const closeModalButton = document.querySelector("#close-modal");

let services = [];

// Load JSON data
async function loadServices() {
    try {
        const response = await fetch("data/services.json");

        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }

        services = await response.json();

        const savedFilter =
            localStorage.getItem("ldeServiceFilter") || "all";

        applyFilter(savedFilter);
    } catch (error) {
        servicesGrid.innerHTML = "";

        errorMessage.hidden = false;
        errorMessage.textContent =
            "We could not load the services. Please try again later.";
    }
}

// Display service cards
function displayServices(serviceList) {
    servicesGrid.innerHTML = "";

    serviceCount.textContent =
        `${serviceList.length} services available`;

    serviceList.forEach((service) => {
        const card = document.createElement("article");
        card.classList.add("service-card");

        card.innerHTML = `
            <span class="service-category">
                ${formatCategory(service.category)}
            </span>

            <h2>${service.name}</h2>

            <p class="service-description">
                ${service.description}
            </p>

            <p class="service-availability">
                <strong>Availability:</strong>
                ${service.availability}
            </p>

            <button
                class="service-details-button"
                type="button"
                data-id="${service.id}">
                View Details
            </button>
        `;

        servicesGrid.appendChild(card);
    });

    addModalListeners();
}

// Format category names
function formatCategory(category) {
    const categoryNames = {
        repair: "Repair",
        software: "Software",
        accessory: "Accessory"
    };

    return categoryNames[category] || category;
}

// Filter services
function applyFilter(filter) {
    let filteredServices = services;

    if (filter !== "all") {
        filteredServices = services.filter(
            (service) => service.category === filter
        );
    }

    localStorage.setItem("ldeServiceFilter", filter);

    filterButtons.forEach((button) => {
        const isActive = button.dataset.filter === filter;

        button.classList.toggle("active-filter", isActive);
        button.setAttribute("aria-pressed", isActive);
    });

    displayServices(filteredServices);
}

// Filter button events
filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
        applyFilter(button.dataset.filter);
    });
});

// Add modal events to generated buttons
function addModalListeners() {
    const detailButtons =
        document.querySelectorAll(".service-details-button");

    detailButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const serviceId = Number(button.dataset.id);

            const selectedService = services.find(
                (service) => service.id === serviceId
            );

            if (selectedService) {
                openServiceModal(selectedService);
            }
        });
    });
}

// Open modal
function openServiceModal(service) {
    modalContent.innerHTML = `
        <span class="modal-category">
            ${formatCategory(service.category)}
        </span>

        <h2>${service.name}</h2>

        <p>${service.description}</p>

        <div class="modal-details">
            <h3>Service Details</h3>
            <p>${service.details}</p>
        </div>

        <p class="modal-availability">
            <strong>Availability:</strong>
            ${service.availability}
        </p>
    `;

    modal.showModal();
}

// Close modal
closeModalButton.addEventListener("click", () => {
    modal.close();
});

// Close when clicking outside modal content
modal.addEventListener("click", (event) => {
    if (event.target === modal) {
        modal.close();
    }
});

setupPage();

loadServices();