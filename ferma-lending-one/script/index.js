const overlay = document.querySelector(".overlay"),
  headerButton = document.querySelector(".header__button"),
  modal = document.querySelector(".modal"),
  form = document.querySelector('.form'),
  formInput = document.querySelector('.form__input'),
  formInputNumbers = document.querySelectorAll(".form__input-number"),
  formInputNumber = document.querySelector('.form__input-number')
  closeBtn = document.querySelector('.modal__header-close'),
  modalButton = document.querySelector('.modal__button'),
  modalInput = document.querySelector('.modal__input');
  modalInputNumber = document.querySelector(".modal__input-number"),
  modalForm = document.querySelector('.modal__form'),
  modalDone = document.querySelector('.modal__done'),
  tooltip = document.querySelector('.tooltip')

function closeModal() {
  overlay.classList.remove("overlay--active");
  modal.classList.remove("modal--active");
}

function openModal() {
  overlay.classList.add("overlay--active");
  modal.classList.add("modal--active");
  modalButton.classList.add("modal__button--disabled");

  if (modalInput.value.length <= 0) {
    modalInput.classList.add("modal__input--error");
  }
}

document
  .querySelector(".modal__input").onblur = function() {
   if (this.classList.contains("modal__input--error")) {
     document.querySelector('.tooltip').classList.add("tooltip--active");
   }
};

document
  .querySelector(".modal__input")
  .addEventListener("focus", function () {
    if (this.classList.contains("modal__input--error")) {
      document.querySelector(".tooltip").classList.remove("tooltip--active");
    }
  });

headerButton.onclick = () => openModal();

overlay.onclick = () => closeModal();

closeBtn.onclick = () => closeModal();

formInputNumbers.forEach(item=>{
    IMask(item, {
      mask: "+{7} (000) 000-00-00",
    });
})

modalInputNumber.addEventListener('input', (e) => {
    if (e.target.value.length === 18 && modalInput.value.length > 0) {
      modalButton.classList.remove("modal__button--disabled");
    } else {
      modalButton.classList.add("modal__button--disabled");
    }
})

modalInput.addEventListener('input', (e) => {
    if (e.target.value.length > 0) {
      modalInput.classList.remove("modal__input--error");
    } else {
      modalInput.classList.add("modal__input--error");
    }
    if (e.target.value.length > 0 && modalInputNumber.value.length === 18) {
      modalButton.classList.remove("modal__button--disabled");
    } else {
      modalButton.classList.add("modal__button--disabled");
    }
})

modalForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (modalInputNumber.value.length === 18 && modalInput.value.length > 0) {
      modalButton.classList.remove("modal__button--disabled");
      modalDone.classList.add('modal__done--active');
      modal.classList.remove("modal--active");

      setTimeout(() => {
        overlay.classList.remove("overlay--active");
        modalDone.classList.remove("modal__done--active");
      }, 1000)

      modalInputNumber.value = '';
      modalInput.value = '';
    } else {
      modalButton.classList.add("modal__button--disabled");
    }
})

formInput.addEventListener('input', (e) => {
  if (formInput.value.length <= 0) {
    formInput.classList.add("form__input--error");
  } else {
    formInput.classList.remove("form__input--error");
  }
})

formInput.addEventListener("change", (e) => {
  if (formInput.value.length <= 0) {
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

  if (formInputNumber.value.length === 18 && formInput.value.length > 0) {
    modalDone.classList.add("modal__done--active");
    console.log("true");

    formInputNumber.value = '';
    formInput.value = "";

    setTimeout(() => {
      modalDone.classList.remove("modal__done--active");
    }, 1000);
  } 
});
