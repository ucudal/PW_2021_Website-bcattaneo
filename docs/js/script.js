"use strict";
var apiBaseUrl = "https://PW2021-APINode-bcattaneo-4.bcattaneo.repl.co"; // CHANGEME
var endpointExperiencia = "/experiencia-laboral";
var endpointFormulario = "/enviar-formulario";
var modal;
var errorAlert;
var errorAlertMessage;
var okAlert;
var okAlertMessage;
var handleErrors = function (response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
};
var postContact = function (contact) {
    fetch("".concat(apiBaseUrl).concat(endpointFormulario), {
        method: "POST",
        mode: "cors",
        headers: new Headers({ "content-type": "application/json" }),
        body: JSON.stringify(contact),
    })
        .then(handleErrors)
        .then(function (response) { return response.text().then(showOk); })
        .catch(function (error) {
        showError("Error al enviar formulario");
        console.error("Error:", error);
    });
};
var parseDate = function (dateString) {
    return new Date(Date.parse(dateString));
};
var getExperienceYear = function (date) {
    var dateFullYear = date.getFullYear();
    return dateFullYear == new Date().getFullYear() ? "Present" : dateFullYear;
};
var getWorkExperience = function () {
    fetch("".concat(apiBaseUrl).concat(endpointExperiencia), {
        method: "GET",
        mode: "cors",
        headers: new Headers({ "content-type": "application/json" }),
    })
        .then(handleErrors)
        .then(function (response) { return response.json(); })
        .then(function (data) {
        console.log(data["experiencia-laboral"]);
        var workExperience = data["experiencia-laboral"];
        var experienceItems = "";
        var first = true;
        for (var _b = 0, workExperience_1 = workExperience; _b < workExperience_1.length; _b++) {
            var experience = workExperience_1[_b];
            experienceItems += "<div class=\"".concat(first ? "" : "mt-4", " text-gray-600 w-full mt-2 overflow-hidden\">\n                <p class=\"text-black font-bold\">").concat(experience.puesto, "</p>\n                <p>").concat(experience.empresa, "</p>\n                <p class=\"italic\">").concat(parseDate(experience.fechaInicio).getFullYear(), "-").concat(getExperienceYear(parseDate(experience.fechaFin)), "</p>\n                <p class=\"mt-2\">").concat(experience.descripcion, "</p>\n                </div>");
            first = false;
        }
        var experienceItemsElem = document.getElementById("experience-items");
        if (experienceItemsElem !== null)
            experienceItemsElem.innerHTML = experienceItems;
    })
        .catch(function (error) {
        showError("Error al obtener experiencias");
        console.error("Error:", error);
    });
};
var getModalInputs = function () {
    return document.querySelectorAll("#modal-form");
};
var closeModal = function () {
    if (!modal)
        return;
    // Clean inputs
    var nodeModalInputs = getModalInputs();
    var modalInputs = nodeModalInputs[0];
    for (var _i = 0, _a = modalInputs; _i < _a.length; _i++) {
        var n = _a[_i];
        n.value = "";
    }
    modal.classList.add("hidden");
};
var submitModal = function () {
    // Read and store inputs
    var contact = {};
    var nodeModalInputs = getModalInputs();
    var modalInputs = nodeModalInputs[0];
    for (var _i = 0, _a = modalInputs; _i < _a.length; _i++) {
        var n = _a[_i];
        contact[n.id] = n.value;
    }
    console.log(contact);
    postContact(contact);
    closeModal();
};
var showModal = function () {
    modal.classList.remove("hidden");
};
var showError = function (text) {
    errorAlertMessage.innerHTML = text;
    errorAlert.classList.remove("hidden");
};
var showOk = function (text) {
    okAlertMessage.innerHTML = text;
    okAlert.classList.remove("hidden");
};
var closeError = function () {
    errorAlert.classList.add("hidden");
};
var closeOk = function () {
    okAlert.classList.add("hidden");
};
(function () {
    modal =
        document.querySelector("#contact-modal") ||
            (function () {
                throw "No modal";
            })();
    errorAlert =
        document.querySelector("#error-alert") ||
            (function () {
                throw "No error alert";
            })();
    errorAlertMessage =
        document.querySelector("#error-alert-message") ||
            (function () {
                throw "No error alert message";
            })();
    okAlert =
        document.querySelector("#ok-alert") ||
            (function () {
                throw "No error alert";
            })();
    okAlertMessage =
        document.querySelector("#ok-alert-message") ||
            (function () {
                throw "No error alert message";
            })();
    var modalSubmit = document.querySelector("#modal-submit");
    if (modalSubmit != null)
        modalSubmit.addEventListener("click", submitModal);
    var modalCancel = document.querySelector("#modal-cancel");
    if (modalCancel != null)
        modalCancel.addEventListener("click", closeModal);
    var contactMe = document.querySelector("#contact-me");
    if (contactMe != null)
        contactMe.addEventListener("click", showModal);
    var errorAlertClose = document.querySelector("#error-alert-close");
    if (errorAlertClose != null)
        errorAlertClose.addEventListener("click", closeError);
    var okAlertClose = document.querySelector("#ok-alert-close");
    if (okAlertClose != null)
        okAlertClose.addEventListener("click", closeOk);
    getWorkExperience();
})();
