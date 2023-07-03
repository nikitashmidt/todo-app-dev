const overlay = document.querySelector(".overlay"),
  headerButton = document.querySelector(".header__button"),
  modal = document.querySelector(".modal"),
  form = document.querySelector(".form"),
  formInput = document.querySelector(".form__input"),
  formButton = document.querySelector(".form__button"),
  formInputNumbers = document.querySelectorAll(".form__input-number"),
  formInputNumber = document.querySelector(".form__input-number");
  closeBtn = document.querySelector('.modal__header-close'),
  modalButton = document.querySelector('.modal__button'),
  modalInput = document.querySelector('.modal__input');
  modalInputNumber = document.querySelector(".modal__input-number"),
  modalForm = document.querySelector('.modal__form'),
  modalDone = document.querySelector('.modal__done');

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

headerButton.onclick = () => {
  overlay.classList.add("overlay--active");
  modal.classList.add("modal--active");

  modalButton.classList.add("modal__button--disabled");
};

headerButton.onclick = () => openModal();

formButton.onclick = () => openModal();

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
        modalInputNumber.value = "";
        modalInput.value = "";
      }, 1000)
    
    } else {
      modalButton.classList.add("modal__button--disabled");
    }
})
