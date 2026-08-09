import { setupPage } from "./utils.js";

const params = new URLSearchParams(window.location.search);

const firstName = params.get("firstName") || "Customer";
const lastName = params.get("lastName") || "";
const email = params.get("email") || "Not provided";
const phone = params.get("phone") || "Not provided";
const brand = params.get("brand") || "Not provided";
const model = params.get("model") || "";
const service = params.get("service") || "Not provided";
const problem = params.get("problem") || "Not provided";

const customerName = document.querySelector("#customer-name");
const submittedEmail = document.querySelector("#submitted-email");
const submittedPhone = document.querySelector("#submitted-phone");
const submittedDevice = document.querySelector("#submitted-device");
const submittedService = document.querySelector("#submitted-service");
const submittedProblem = document.querySelector("#submitted-problem");

customerName.textContent = `${firstName} ${lastName}`.trim();
submittedEmail.textContent = email;
submittedPhone.textContent = phone;
submittedDevice.textContent = `${brand} ${model}`.trim();
submittedService.textContent = service;
submittedProblem.textContent = problem;

setupPage();