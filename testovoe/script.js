const slider = document.querySelector('.slider');
const slides = slider.querySelectorAll('.slide');
const pagination = document.querySelector('.pagination');
const btnNext = document.querySelector('.buttons-next');
const btnPrev = document.querySelector('.buttons-prev');

let pixels = 0;
// поставить в функцию

// Создаем кнопки пагинации
for (let i = 0; i < slides.length; i++) {
    const button = document.createElement('button');
    button.addEventListener('click', function() {
        // Переключаем на соответствующий слайд
        showSlide(i);
        // Устанавливаем активную кнопку
        setActiveButton(i);

        console.log(i);
    });
    pagination.appendChild(button);
}

// Устанавливаем начальный индекс слайда и активную кнопку
let slideIndex = 0;
let activeIndex = 0;
setActiveButton(activeIndex);

// Функция для переключения слайдов
function showSlide(index) {
  // Скрываем все слайды
  const slideWidth = document.querySelector('.slide').offsetWidth;
    
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.transform = 'transltateX(0px)'
    }
    
    slider.style.transform = `translateX(-${slideWidth + 20}px)`
  // Показываем текущий слайд
//   slides[index].classList.remove('noactive');
  // Устанавливаем индекс слайда
  slideIndex = index;
}

// Функция для установки активной кнопки
function setActiveButton(index) {
  // Убираем активный класс у всех кнопок
  const buttons = pagination.querySelectorAll('button');
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].classList.remove('active');
  }
  // Устанавливаем активный класс для текущей кнопки
  buttons[index].classList.add('active');
  // Устанавливаем индекс активной кнопки
  activeIndex = index;
}


btnNext.addEventListener('click', () => {

    slideIndex++;

    if (slideIndex >= slides.length) {
        return slideIndex--;
    }

    pixels += 820;

    slider.style.right = `${pixels}px`;

     setActiveButton(slideIndex);

})

btnPrev.addEventListener('click', () => {
    slideIndex--;
    
    if (slideIndex < 0) {
        return slideIndex++;
    }
    
    pixels -= 820;

    slider.style.right = `${pixels}px`;
    
    setActiveButton(slideIndex);
})
    
// Если достигнут конец слайдов, переходим на первый слайд
//   if (slideIndex < 0) {
//         slideIndex = slides.length - 1 ;
//     }
  // Переключаем на следующий слайд и устанавливаем активную кнопку
//   showSlide(slideIndex);

