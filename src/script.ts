const apiBaseUrl = "http://localhost:3000"; // CHANGEME
const endpointExperiencia = "/experiencia-laboral";
const endpointFormulario = "/enviar-formulario";

let modal: HTMLElement;
let errorAlert: HTMLElement;
let errorAlertMessage: HTMLElement;
let okAlert: HTMLElement;
let okAlertMessage: HTMLElement;

var handleErrors = function (response: any) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
};

var postContact = function (contact: any) {
  fetch(`${apiBaseUrl}${endpointFormulario}`, {
    method: "POST",
    mode: "cors",
    credentials: "include",
    headers: new Headers({ "content-type": "application/json" }),
    body: JSON.stringify(contact),
  })
    .then(handleErrors)
    .then((response) => response.text().then(showOk))
    .catch((error) => {
      showError("Error al enviar formulario");
      console.error("Error:", error);
    });
};
var parseDate = function (dateString: string) {
  return new Date(Date.parse(dateString));
};

var getExperienceYear = function (date: Date) {
  const dateFullYear = date.getFullYear();
  return dateFullYear == new Date().getFullYear() ? "Present" : dateFullYear;
};

var getWorkExperience = function () {
  fetch(`${apiBaseUrl}${endpointExperiencia}`, {
    method: "GET",
    mode: "cors",
    headers: new Headers({ "content-type": "application/json" }),
  })
    .then(handleErrors)
    .then((response) => response.json())
    .then((data) => {
      console.log(data["experiencia-laboral"]);
      const workExperience = data["experiencia-laboral"];
      let experienceItems = "";
      let first = true;
      for (const experience of workExperience) {
        experienceItems += `<div class="${
          first ? "" : "mt-4"
        } text-gray-600 w-full mt-2 overflow-hidden">
                <p class="text-black font-bold">${experience.puesto}</p>
                <p>${experience.empresa}</p>
                <p class="italic">${parseDate(
                  experience.fechaInicio
                ).getFullYear()}-${getExperienceYear(
          parseDate(experience.fechaFin)
        )}</p>
                <p class="mt-2">${experience.descripcion}</p>
                </div>`;
        first = false;
      }
      const experienceItemsElem = document.getElementById("experience-items");
      if (experienceItemsElem !== null)
        experienceItemsElem.innerHTML = experienceItems;
    })
    .catch((error) => {
      showError("Error al obtener experiencias");
      console.error("Error:", error);
    });
};
var getModalInputs = function (): NodeListOf<HTMLInputElement> {
  return document.querySelectorAll("#modal-form");
};
var closeModal = function () {
  if (!modal) return;
  // Clean inputs
  var nodeModalInputs: NodeListOf<any> = getModalInputs();
  var modalInputs: any[] = nodeModalInputs[0];
  for (var _i = 0, _a = modalInputs; _i < _a.length; _i++) {
    var n = _a[_i];
    n.value = "";
  }
  modal.classList.add("hidden");
};
var submitModal = function () {
  // Read and store inputs
  var contact: any = {};
  var nodeModalInputs: NodeListOf<any> = getModalInputs();
  var modalInputs: any[] = nodeModalInputs[0];
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
var showError = function (text: string) {
  errorAlertMessage.innerHTML = text;
  errorAlert.classList.remove("hidden");
};
var showOk = function (text: string) {
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

  const modalSubmit = document.querySelector("#modal-submit");
  if (modalSubmit != null) modalSubmit.addEventListener("click", submitModal);

  const modalCancel = document.querySelector("#modal-cancel");
  if (modalCancel != null) modalCancel.addEventListener("click", closeModal);

  const contactMe = document.querySelector("#contact-me");
  if (contactMe != null) contactMe.addEventListener("click", showModal);

  const errorAlertClose = document.querySelector("#error-alert-close");
  if (errorAlertClose != null)
    errorAlertClose.addEventListener("click", closeError);

  const okAlertClose = document.querySelector("#ok-alert-close");
  if (okAlertClose != null) okAlertClose.addEventListener("click", closeOk);

  getWorkExperience();
})();
