const overlay = document.querySelector(".overlay"),
  headerButton = document.querySelector(".header__button"),
  modal = document.querySelector(".modal"),
  form = document.querySelector(".form"),
  formInput = document.querySelector(".form__input"),
  formInputNumbers = document.querySelectorAll(".form__input-number"),
  formInputNumber = document.querySelector(".form__input-number"),
  closeBtn = document.querySelector(".modal__header-close"),
  closeBtnDone = document.querySelector(".modal__done-close"),
  modalButton = document.querySelector(".modal__button"),
  modalInput = document.querySelector(".modal__input"),
  modalInputNumber = document.querySelector(".modal__input-number"),
  modalForm = document.querySelector(".modal__form"),
  modalDone = document.querySelector(".modal__done"),
  tooltip = document.querySelector(".tooltip");

function closeModal() {
  overlay.classList.remove("overlay--active");
  modal.classList.remove("modal--active");

  if (modalDone.classList.contains("modal__done--active")) {
    modalDone.classList.remove("modal__done--active");
  }
}

function openModal() {
  overlay.classList.add("overlay--active");
  modal.classList.add("modal--active");
}

document
  .querySelector(".modal__input")
  .addEventListener("mouseover", function () {
    if (this.classList.contains("modal__input--error")) {
      document.querySelector(".tooltip").classList.add("tooltip--active");
    }
  });

document
  .querySelector(".modal__input")
  .addEventListener("mouseout", function () {
    if (this.classList.contains("modal__input--error")) {
      document.querySelector(".tooltip").classList.remove("tooltip--active");
    }
  });

headerButton.onclick = () => openModal();

overlay.onclick = () => closeModal();

closeBtn.onclick = () => closeModal();

closeBtnDone.onclick = () => closeModal();

formInputNumbers.forEach((item) => {
  IMask(item, {
    mask: "+{7} (000) 000-00-00",
  });
});

modalInput.addEventListener("input", (e) => {
  if (e.target.value.length >= 2) {
    modalInput.classList.remove("modal__input--error");
    modalInput.classList.add("modal__input--active");

    if (tooltip.classList.contains("tooltip--active")) {
      tooltip.classList.remove("tooltip--active");
    }
  } else {
    modalInput.classList.add("modal__input--error");
    modalInput.classList.remove("modal__input--active");
    tooltip.classList.add("tooltip--active");
  }
});

modalInputNumber.addEventListener("input", (e) => {
  if (modalInputNumber.value.length === 18) {
    modalInputNumber.classList.remove("modal__input--error");
    modalInputNumber.classList.add("modal__input--active");
  } else {
    modalInputNumber.classList.add("modal__input--error");
    modalInputNumber.classList.remove("modal__input--active");
  }
});

modalInputNumber.addEventListener("focus", () => {
  if (tooltip.classList.contains("tooltip--active")) {
    tooltip.classList.remove("tooltip--active");
  }
});

modalForm.addEventListener("submit", (e) => {
  e.preventDefault();

  if (modalInput.value.length < 2) {
    modalInput.classList.add("modal__input--error");
    modalInput.classList.remove("modal__input--active");
    tooltip.classList.add("tooltip--active");
  } else {
    tooltip.classList.remove("tooltip--active");
    modalInput.classList.add("modal__input--active");
    modalInput.classList.remove("modal__input--error");
  }

  if (modalInputNumber.value.length !== 18) {
    modalInputNumber.classList.add("modal__input--error");
    modalInputNumber.classList.remove("modal__input--active");
  }

  if (modalInputNumber.value.length === 18 && modalInput.value.length >= 2) {
    modalDone.classList.add("modal__done--active");
    modal.classList.remove("modal--active");

    modalInputNumber.value = "";
    modalInput.value = "";
  }
});

formInput.addEventListener("input", (e) => {
  if (formInput.value.length === 0) {
    formInput.classList.add("form__input--error");
  } else {
    formInput.classList.remove("form__input--error");
  }
});

formInput.addEventListener("change", (e) => {
  if (formInput.value.length === 0) {
    formInput.classList.add("form__input--error");
  } else {
    formInput.classList.remove("form__input--error");
  }
});

formInputNumber.addEventListener("change", (e) => {
  if (formInputNumber.value.length < 18) {
    formInputNumber.classList.add("form__input--error");
  } else {
    formInputNumber.classList.remove("form__input--error");
  }
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (formInput.value.length <= 0) {
    formInput.classList.add("form__input--error");
  }

  if (formInputNumber.value.length < 18) {
    formInputNumber.classList.add("form__input--error");
  }

  if (formInputNumber.value.length === 18 && formInput.value.length >= 2) {
    modalDone.classList.add("modal__done--active");
    overlay.classList.add("overlay--active");

    formInputNumber.value = "";
    formInput.value = "";
  }
});
