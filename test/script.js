const titles = document.querySelectorAll(".title");
const hamburger = document.querySelector('.hamburger');
const menuList = document.querySelector('.menu-list');
const blocks = document.querySelectorAll('.block').length;
const overlay = document.querySelector('.overlay');
const menuSvg = document.querySelector('.menu-list-svg');
const count = document.querySelector('.count');

if (count) {
 count.innerHTML = `Всего вопросов ${blocks} / 21`;
}

titles.forEach((title) => {
    title.addEventListener("click", boxHandler); 
});

function toggleClasses(e) {
  menuList.classList.toggle('menu-list-active');
  overlay.classList.toggle('overlay-active');
}

hamburger.addEventListener('click',toggleClasses)
overlay.addEventListener('click',toggleClasses)
menuSvg.addEventListener('click',toggleClasses)

function boxHandler(e) {

  let currentBox = e.target.closest(".block"); 

  const currentValue = e.target.textContent;

  let currentContent = e.target.nextElementSibling; 

  currentBox.classList.toggle("active"); 

  if (currentBox.classList.contains('active')) {
    count.innerHTML = currentValue;
  } else {
    count.innerHTML = `Всего вопросов ${blocks} / 21`;
  }

  if (currentBox.classList.contains("active")) {
    currentContent.style.maxHeight = currentContent.scrollHeight + "px"; 
  } else {
    currentContent.style.maxHeight = 0; 
  }
}

