// Stores people that contacted me
let contacts = [];
let modal;

const getModalInputs = () => document.querySelectorAll("#modal-form")[0];

const closeModal = () => {
    if (!modal) return;

    // Clean inputs
    for (let n of getModalInputs())
        n.value = "";

    modal.classList.add("hidden");
}

const submitModal = () => {
    // Read and store inputs
    let contact = {}
    for (let n of getModalInputs())
        contact[n.id] = n.value;
    contacts.push(contact);

    console.log(contacts);

    // TODO: validation on submit
    closeModal();
}

const showModal = () => modal.classList.remove("hidden");

(function() {
    // Locate and define global modal
    modal = document.querySelector("#contact-modal") || (function() { throw "No modal" })();
    console.log(modal);
    console.log(contacts);

    // Add listeners
    document.querySelector("#modal-submit").addEventListener("click", submitModal);
    document.querySelector("#modal-cancel").addEventListener("click", closeModal);
    document.querySelector("#contact-me").addEventListener("click", showModal);
})();