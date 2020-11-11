var formButton = document.querySelector(".write-to-us");
var formModal = document.querySelector(.modal-form");
var form = formModal.querySelector("form");
var email = formModal.querySelector(".input-email");
var feedbackButton = formModal.querySelector(".feedback-button");
var close = formModal.querySelector(".modal-close");


formButton.onclick = function() {
  formModal.classList.add("modal-show");
  formModal.classList.remove("modal-error");
};

close.addEventListener("click", function (evt) {
  evt.preventDefault();
  formModal.classList.remove("modal-show");
  formModal.classList.remove("modal-error");
});

form.addEventListener("submit", function (evt) {
  if (!email.value) {
    evt.preventDefault();
    formModal.classList.remove("modal-error");
    formModal.offsetWidth = formModal.offsetWidth;
    formModal.classList.add("modal-error");
  }
});


window.addEventListener("keydown", function (evt) {
  if (evt.keyCode === 27) {
    evt.preventDefault();
    if (formModal.classList.contains("modal-show")) {
      formModal.classList.remove("modal-show");
      formModal.classList.remove("modal-error");
    }
  }
});

var mapButton = document.querySelector(".map");
var mapModal= document.querySelector(".modal-map");
var close = mapModal.querySelector(".modal-close");


mapButton.onclick = function() {
  mapModal.classList.add("modal-show");
  mapModal.classList.remove("modal-error");
};

close.addEventListener("click", function (evt) {
  evt.preventDefault();
  mapModal.classList.remove("modal-show");
});

window.addEventListener("keydown", function (evt) {
  if (evt.keyCode === 27) {
    evt.preventDefault();
    if (mapModal.classList.contains("modal-show")) {
        mapModal.classList.remove("modal-show");
    }
  }
});

