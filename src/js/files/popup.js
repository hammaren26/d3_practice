const modalTriggerButtons = document.querySelectorAll("[data-modal-target]");
const modals = document.querySelectorAll(".modal");
const modalCloseButtons = document.querySelectorAll(".modal-close");
const HTMLTag = document.querySelector('html');

modalTriggerButtons.forEach(elem => {
   elem.addEventListener("click", event => {
      event.preventDefault()
      toggleModal(event.currentTarget.getAttribute("data-modal-target"))
   });
});


// !! доработать скрипт, чтоб он открывал только текущий попап а не все сразу

modalCloseButtons.forEach(elem => {
   elem.addEventListener("click", event => toggleModal(event.currentTarget.closest(".modal").id));
});
modals.forEach(elem => {
   elem.addEventListener("click", event => {
      if (event.currentTarget === event.target) {
         toggleModal(event.currentTarget.id);
      }
   });
});

// Close Modal with "Esc"...
document.addEventListener("keydown", event => {
   if (event.keyCode === 27 && document.querySelector(".modal.modal-show")) {
      toggleModal(document.querySelector(".modal.modal-show").id);
   }
});

function toggleModal(modalId) {
   const modal = document.getElementById(modalId);
   if (modal.classList.contains("modal-show")) {
      modal.classList.add("modal-hide");
      setTimeout(() => {
         document.body.classList.remove('modal-show');
         HTMLTag.classList.remove('lock');
         modal.classList.remove("modal-show", "modal-hide");
      }, 200);
   }
   else {
      HTMLTag.classList.add('lock');
      setTimeout(function () {
         modal.style.display = "flex";
         modal.classList.add("modal-show");
         document.body.classList.add('modal-show');

      }, 200)
   }
}