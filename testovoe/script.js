const slider = document.querySelector('.slider');
const slides = slider.querySelectorAll('.slide');
const pagination = document.querySelector('.pagination');
const btnNext = document.querySelector('.buttons-next');
const btnPrev = document.querySelector('.buttons-prev');

let pixels = 0;
let slideIndex = 0;
let activeIndex = 0;
// поставить в функцию

// Создаем кнопки пагинации
for (let i = 0; i < slides.length; i++) {
    const button = document.createElement('button');
    button.addEventListener('click', function() {
        // Переключаем на соответствующий слайд
        // showSlide(i);
        // Устанавливаем активную кнопку
        setActiveButton(i);

        function animate() {
            const res = i * 820;

            if (res > pixels) {
                console.log('res > pixels');
                // идем увеличивать
                pixels += 20;
            } else {
                // уменьшать
                pixels -= 20;
                console.log('res < pixels');
            }

            slider.style.right = `${pixels}px`;

            if (pixels === i * 820) {
                clearInterval(interval)
            }
          }
    
          const interval = setInterval(animate, 10);

        // pixels = i * 820;

        // slider.style.right = `${i * 820}px`;

        slideIndex = i;

        console.log(`${(i) * 820}px`);

    });
    pagination.appendChild(button);
}

setActiveButton(activeIndex);


// Устанавливаем начальный индекс слайда и активную кнопку

// Функция для переключения слайдов
// function showSlide(index) {
//   // Скрываем все слайды
//   const slideWidth = document.querySelector('.slide').offsetWidth;
    
//     slider.style.right = `${slideWidth + 20}px`
//   // Показываем текущий слайд
// //   slides[index].classList.remove('noactive');
//   // Устанавливаем индекс слайда
//   slideIndex = index;
// }

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
        console.log(slideIndex);
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
    console.log(pixels);
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

