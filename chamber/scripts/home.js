const menuButton = document.querySelector("#menu-button");
const navigation = document.querySelector("#main-navigation");

const currentTemperature =
    document.querySelector("#current-temperature");

const weatherDescription =
    document.querySelector("#weather-description");

const weatherIcon =
    document.querySelector("#weather-icon");

const forecastContainer =
    document.querySelector("#forecast");

const weatherError =
    document.querySelector("#weather-error");

const spotlightContainer =
    document.querySelector("#spotlights");

const currentYear =
    document.querySelector("#current-year");

const lastModified =
    document.querySelector("#last-modified");

const apiKey = "386ae19363010ff6feadd13542eba2f8";

const latitude = -31.63;
const longitude = -60.70;

const currentWeatherUrl =
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;

const forecastUrl =
    `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;

const membersUrl = "data/members.json";

function toggleNavigation() {
    const menuIsOpen =
        menuButton.classList.toggle("show");

    navigation.classList.toggle("show");

    menuButton.setAttribute(
        "aria-expanded",
        `${menuIsOpen}`
    );

    menuButton.setAttribute(
        "aria-label",
        `${menuIsOpen ? "Close" : "Open"} navigation menu`
    );
}

function formatDescription(description) {
    return description.replace(
        /\b\w/g,
        (letter) => letter.toUpperCase()
    );
}

function displayCurrentWeather(data) {
    currentTemperature.innerHTML =
        `${Math.round(data.main.temp)}&deg;C`;

    const description =
        formatDescription(data.weather[0].description);

    const iconSource =
        `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

    weatherDescription.textContent = description;

    weatherIcon.setAttribute("src", iconSource);
    weatherIcon.setAttribute("alt", description);
}

function selectDailyForecasts(forecastList) {
    const dailyForecasts = [];
    const usedDates = new Set();

    forecastList.forEach((forecast) => {
        const forecastDate =
            new Date(forecast.dt * 1000);

        const dateKey =
            forecastDate.toISOString().split("T")[0];

        const hour =
            forecastDate.getHours();

        const todayKey =
            new Date().toISOString().split("T")[0];

        if (
            dateKey !== todayKey &&
            !usedDates.has(dateKey) &&
            hour >= 11 &&
            hour <= 15 &&
            dailyForecasts.length < 3
        ) {
            dailyForecasts.push(forecast);
            usedDates.add(dateKey);
        }
    });

    return dailyForecasts;
}

function displayForecast(forecastList) {
    forecastContainer.innerHTML = "";

    const dailyForecasts =
        selectDailyForecasts(forecastList);

    dailyForecasts.forEach((forecast) => {
        const forecastCard =
            document.createElement("article");

        const forecastDate =
            new Date(forecast.dt * 1000);

        const dayName =
            new Intl.DateTimeFormat(
                "en-US",
                { weekday: "short" }
            ).format(forecastDate);

        const temperature =
            Math.round(forecast.main.temp);

        forecastCard.className = "forecast-card";

        forecastCard.innerHTML = `
            <h4>${dayName}</h4>
            <p>${temperature}&deg;C</p>
        `;

        forecastContainer.appendChild(forecastCard);
    });
}

async function fetchWeather() {
    try {
        const currentResponse =
            await fetch(currentWeatherUrl);

        const forecastResponse =
            await fetch(forecastUrl);

        if (!currentResponse.ok) {
            throw new Error(
                await currentResponse.text()
            );
        }

        if (!forecastResponse.ok) {
            throw new Error(
                await forecastResponse.text()
            );
        }

        const currentData =
            await currentResponse.json();

        const forecastData =
            await forecastResponse.json();

        displayCurrentWeather(currentData);
        displayForecast(forecastData.list);
    } catch (error) {
        currentTemperature.textContent =
            "Unavailable";

        weatherDescription.textContent =
            "Weather data could not be loaded.";

        forecastContainer.innerHTML = "";

        weatherError.textContent =
            "Please try again later.";

        console.error(
            `Weather API error: ${error}`
        );
    }
}

function getMembershipName(level) {
    if (level === 3) {
        return "Gold Member";
    }

    return "Silver Member";
}

function shuffleMembers(members) {
    return [...members].sort(
        () => Math.random() - 0.5
    );
}

function displaySpotlights(members) {
    spotlightContainer.innerHTML = "";

    const eligibleMembers =
        members.filter(
            (member) =>
                member.membership === 2 ||
                member.membership === 3
        );

    const selectedMembers =
        shuffleMembers(eligibleMembers).slice(0, 3);

    selectedMembers.forEach((member) => {
        const card =
            document.createElement("article");

        const membershipName =
            getMembershipName(member.membership);

        card.className = "spotlight-card";

        card.innerHTML = `
            <div class="spotlight-heading">
                <img src="images/${member.image}"
                    alt="${member.name} business logo"
                    width="180"
                    height="140"
                    loading="lazy">

                <span class="membership-label membership-${member.membership}">
                    ${membershipName}
                </span>
            </div>

            <div class="spotlight-content">
                <h3>${member.name}</h3>

                <p>${member.tagline}</p>

                <p>
                    <strong>Phone:</strong>
                    <a href="tel:${member.phone.replaceAll(" ", "")}">
                        ${member.phone}
                    </a>
                </p>

                <p>
                    <strong>Address:</strong>
                    ${member.address}
                </p>

                <p>
                    <a href="${member.website}"
                        target="_blank"
                        rel="noopener noreferrer">
                        Visit website
                    </a>
                </p>
            </div>
        `;

        spotlightContainer.appendChild(card);
    });
}

async function fetchSpotlights() {
    try {
        const response = await fetch(membersUrl);

        if (!response.ok) {
            throw new Error(
                await response.text()
            );
        }

        const data = await response.json();

        displaySpotlights(data.members);
    } catch (error) {
        spotlightContainer.innerHTML = `
            <p class="error-message">
                Member spotlights could not be loaded.
            </p>
        `;

        console.error(
            `Spotlight data error: ${error}`
        );
    }
}

menuButton.addEventListener(
    "click",
    toggleNavigation
);

currentYear.textContent =
    `${new Date().getFullYear()}`;

lastModified.textContent =
    `Last Modified: ${document.lastModified}`;

fetchWeather();
fetchSpotlights();