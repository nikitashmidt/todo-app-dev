const titles = document.querySelectorAll(".title");

console.log(titles)

titles.forEach((title) => {
    title.addEventListener("click", boxHandler); 
});

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


