const labels = Array.from(document.querySelectorAll(".label")); // считываем все элементы аккордеона в массив

labels.forEach((label) => {
    label.addEventListener("click", boxHandler); // при нажатии на бокс вызываем ф-ию boxHanlder
});

function boxHandler(e) {

  let currentBox = e.target.closest(".box"); // определяем текущий бокс
  let currentContent = e.target.nextElementSibling; // находим скрытый контент
  currentBox.classList.toggle("active"); // присваиваем ему активный класс
  if (currentBox.classList.contains("active")) {
    currentContent.style.maxHeight = currentContent.scrollHeight + "px"; // открываем контент
  } else {
    // в противном случае
    currentContent.style.maxHeight = 0; // скрываем контент
  }
}

