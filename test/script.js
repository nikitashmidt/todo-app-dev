const titles = document.querySelectorAll(".title");
const hamburger = document.querySelector('.hamburger');
const menuList = document.querySelector('.menu-list');

titles.forEach((title) => {
    title.addEventListener("click", boxHandler); 
});

hamburger.addEventListener('click', () => {
  console.log('true');
  menuList.classList.toggle('menu-list-active');
  hamburger.classList.toggle('hamburger-active');
})

function boxHandler(e) {

  let currentBox = e.target.closest(".block"); 

  let currentContent = e.target.nextElementSibling; 

  currentBox.classList.toggle("active"); 

  if (currentBox.classList.contains("active")) {
    currentContent.style.maxHeight = currentContent.scrollHeight + "px"; 
  } else {
    currentContent.style.maxHeight = 0; 
  }
}


