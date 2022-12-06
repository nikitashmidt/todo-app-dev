document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("form"),
    formGroupRemains =  document.querySelector('.form-group-remains span'),
    taskInput = document.getElementById("taskInput"),
    tasksList = document.getElementById("tasksList"),
    btns = document.querySelector(".btns"),
    emptyList = document.getElementById("emptyList"),
    emptyListTitle = document.querySelector(".empty-list__title"),
    openModalBtn = document.querySelector(".btn-open"),
    modal = document.querySelector(".modal-task"),
    overlay = document.querySelector(".overlay"),
    container = document.querySelector(".container"),
    modalDelete = document.querySelector(".modal-delete"),
    modalDeleteSpan = document.querySelector(".modal-delete__span"),
    modalDeleteBtn = document.querySelector('[data-action="remove"]'),
    modalCancelBtn = document.querySelectorAll('[data-action="cancel"]'),
    removeDoneTasksBtn = document.querySelector("#removeDoneTasks"),
    modalDone = document.querySelector(".modal-done"),
    modalDoneSpan = modalDone.querySelector(".modal-done__span"),
    modalComments = document.querySelector(".modal-comments"),
    modalCommentsAdd = document.querySelector(".modal-comments__add"),
    modalCommentsItems = document.querySelector(".modal-comments__items"),
    modalCommentsInput = document.querySelector(".modal-comments__input"),
    modalCommentsTitle = document.querySelector(".modal-comments__title"),
    modalCommentsBack = document.querySelector('.modal-comments__back'),
    modalTrash = document.querySelector(".modal-trash"),
    emptyTrashBtn = document.querySelector(".completed-tasks__empty"),
    completedTasksBlock = document.querySelector(".completed-tasks__block"),
    completedTasksArrow = document.querySelector(".completed-tasks__arrow"),
    completedTasksLists = document.querySelector(".completed-tasks__lists"),
    completedTasksCount = document.querySelector(".completed-tasks__count"),
    headerTime = document.querySelector(".header__time"),
    headerNumberTasks = document.querySelector(".header__number-tasks span"),
    headerDotsHamburger = document.querySelector('.header__settings-hamburger'),
    headerDotsContent = document.querySelector('.header__settings-content'),
    headerDotsItem = document.querySelectorAll('.header__settings-item'),
    headerDotsOverlay = document.querySelector('.header__settings-overlay'),
    headerDotsGrid = document.querySelector('.header__settings-grid'),
    headerDotsMenu = document.querySelector('.header__settings-menu'),
    headerDotsFilter = document.querySelector('.header__settings-filter'),
    loader = document.querySelector(".loader"),
    checkbox = document.getElementById("checkbox"),
    clearBtn = document.querySelector('[data-action="clear"]');

  let tasks = [],
    completedTasks = [],
    gridNumber = [],
    filterText = [];
  if (localStorage.getItem("tasks"))
    tasks = JSON.parse(localStorage.getItem("tasks"));
  if (localStorage.getItem("completedTasks"))
    completedTasks = JSON.parse(localStorage.getItem("completedTasks"));
  if (localStorage.getItem("gridNumber"))
    gridNumber = JSON.parse(localStorage.getItem("gridNumber"));
  if (localStorage.getItem("filterText"))
  filterText = JSON.parse(localStorage.getItem("filterText"));

  
  tasks.forEach((task) => renderTask(task));
  completedTasks.forEach((task) => renderCompletedTask(task));
  updateEmpty();
  searchNumber();
  tasksList.addEventListener("click", deleteTask);
  tasksList.addEventListener("click", doneTask);
  tasksList.addEventListener("click", openModalComments);
  openModalBtn.addEventListener("click", openModal);
  modalCancelBtn.forEach((item) => item.addEventListener("click", closeModal));
  removeDoneTasksBtn.addEventListener("click", removeDoneTasks);
  completedTasksBlock.addEventListener("click", completedTasksUp);
  emptyTrashBtn.addEventListener("click", emptyTrash);
  completedTasksLists.addEventListener("click", returnTasks);
  modalComments.addEventListener('click', editDoneComments);
  headerDotsHamburger.addEventListener('click', gridSelection);


   
  container.addEventListener('click', (e) => {
    if (e.target.dataset.item !== 'dots' ) return;
      const eTarget = e.target.parentNode;
      eTarget.children[1].classList.add('task-item__buttons-active');
      eTarget.children[2].classList.add('task-item__overlay-active');
      btns.style.pointerEvents = 'none';
    disableScroll()
    function onChangeColor(e) {
      eTarget.parentNode.style.backgroundColor = e.target.value;
      eTarget.parentNode.style.borderColor = e.target.value;
      const id = +eTarget.parentNode.id;
      tasks.forEach((item) => {
        if (item.id === id) {
          item.colorBg = e.target.value
          console.log(item.colorBg)
        }
        })
      updateLocalStorage()
    }
    eTarget.querySelector('input[type="color"]').onchange = onChangeColor;
      eTarget.children[2].onclick = () => removeClasses();
      eTarget.children[1].children[0].onclick = () => removeClasses();
      eTarget.children[1].children[1].onclick = () => removeClasses();
      function removeClasses() {
        eTarget.children[1].classList.remove('task-item__buttons-active');
        eTarget.children[2].classList.remove('task-item__overlay-active');
        btns.style.pointerEvents = '';
        enableScroll()
      }
    }
  )

  window.document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && overlay.classList.contains("overlay-active"))
      closeModal();
  });
  window.onload = function () {
    window.setTimeout(() => {
      // loader.classList.remove('loader-active');
      // container.style.opacity = '1';
      setTimeout(() => {
        document.querySelector('.body').classList.remove('body-hidden');
        loader.style.display = 'none';
      }, 1200)
    }, 1500)
  }
  let now = new Date();
  headerTime.innerHTML = ` ${now.toLocaleDateString()}`;
  function addTask(e) {
    e.preventDefault();
    const newTask = {
      id: Date.now(),
      text: taskInput.value,
      done: false,
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString(),
      comments: [],
      commentsPresence: '',
      colorBg: '',
      colorText: '',
    };
    function pushTasks() {
      tasks = [...tasks, newTask];
      renderTask(newTask);
      taskInput.value = "";
      updateEmpty();
      updateLocalStorage();
      formGroupRemains.innerHTML = 0;
    }
    if (checkbox.checked) {
      pushTasks();
      taskInput.focus();
    } else {
      pushTasks();
      closeModal();
    }
  }
  function deleteTask(e) {
    if (e.target.dataset.action !== "delete") return;
    disableScroll();
    let parentNode = e.target.closest(".list-group-item");
    let id = +parentNode.id;
    const spanText = parentNode.children[0].textContent;
    modalDeleteSpan.innerHTML = `${spanText}`;
    overlay.classList.add("overlay-active");
    modalDelete.classList.add("modal-delete-active");
    modalDeleteBtn.onclick = () => {
      tasks = tasks.filter((task) => task.id !== id);
        parentNode.classList.add("list-group-item-delete");
        setTimeout(() => {
          parentNode.remove();
          updateEmpty();
        }, 500);
        closeModal();
      updateLocalStorage();
    }
    overlay.addEventListener("click", closeModal);
    transition("-50%");
  }
  function doneTask(e) {
    if (e.target.dataset.action === "done") {
      const parentNode = e.target.closest(".list-group-item");
      const id = +parentNode.id;
      const task = tasks.find((task) => task.id === id);
      task.done = !task.done;
      parentNode.children[0].classList.toggle("task-title--done");
      if (parentNode.children[0].classList.contains("task-title--done")) {
        modalDone.classList.add("modal-done-active");
        modalDoneSpan.textContent = parentNode.children[0].textContent;
        document.querySelectorAll(".task-item__buttons").forEach((item) => {
          item.style.pointerEvents = "none";
        });
        removeDoneTasksBtn.style.pointerEvents = "none";
        setTimeout(() => {
          modalDone.classList.remove("modal-done-active");
          document.querySelectorAll(".task-item__buttons").forEach((item) => {
            item.style.pointerEvents = "";
          });
          removeDoneTasksBtn.style.pointerEvents = "";
        }, 2000);
      }
    }
    updateLocalStorage();
  }
  function findItem() {
    headerDotsItem.forEach(item => {
      if (item.dataset.grid === gridNumber[0].number) {
        item.classList.add('active-text')
      }
    })
  }
  function searchNumber() {
    if (gridNumber.length !== 0) {
      switch (gridNumber[0].number) {
        case '1':
          tasksList.classList.add('list-group', 'list-group-flush');
          findItem()
          break;
        case '2':
          tasksList.classList.add('grid-template', 'grid-template-2', 'list-group', 'list-group-flush')
          findItem()
          break;
        case '3':
          tasksList.classList.add('grid-template', 'grid-template-3', 'list-group', 'list-group-flush')
          findItem()
          break;
        case '4':
          tasksList.classList.add('grid-template', 'grid-template-4', 'list-group', 'list-group-flush')
          findItem()
          break;
      }
    } else {
      tasksList.classList.add('list-group', 'list-group-flush');
      headerDotsItem.forEach(item => {
        if (item.dataset.grid === '1') {
          item.classList.add('active-text')
        }
      })
    }
  }
  function updateNumber(e, arr) {
    if (arr === gridNumber) { 
      const newNumber = {
        number: e.target.dataset.grid
      }
      gridNumber = [newNumber]
    }
    if (arr === filterText) { 
      const text = {
        text: e.target.dataset.filter
      }
      filterText = [text]
    }
    updateLocalStorage();
  }
  function toggleActiveText(e, headerDotsUl) {
    document.querySelectorAll(`.${headerDotsUl} li`).forEach(item => {
      item.classList = 'header__settings-item';
    })
    e.target.classList.add('header__settings-item', 'active-text');
  }
  function gridSelection(e) {
    headerDotsContent.classList.toggle('header__settings-content-active');
    headerDotsOverlay.classList.add('header__settings-overlay-active');
    disableScroll()
    function removeClass() {
      headerDotsGrid.classList.remove('header__settings-grid-active');
      headerDotsMenu.style.display = 'block';
      headerDotsFilter.classList.remove('header__settings-filter-active');
    }
    headerDotsOverlay.onclick = function (e) {
      headerDotsContent.classList.remove('header__settings-content-active');
      headerDotsOverlay.classList.remove('header__settings-overlay-active');
      enableScroll()
      setTimeout(() => { removeClass() }, 300)
    }
    headerDotsContent.onclick = function (e) {
      if (e.target.dataset.menu === 'choice') {
        headerDotsGrid.classList.add('header__settings-grid-active');
        headerDotsMenu.style.display = 'none';
      }
      if (e.target.dataset.menu === 'filter') {
        headerDotsFilter.classList.add('header__settings-filter-active');
        headerDotsMenu.style.display = 'none';
      }
      switch (e.target.dataset.grid) {
        case '1': tasksList.classList = '';
          tasksList.classList.add('list-group', 'list-group-flush')
          toggleActiveText(e, 'header__settings-grid');
          updateNumber(e, gridNumber)
          break;
        case '2': tasksList.classList = '';
          tasksList.classList.add('list-group', 'list-group-flush', 'grid-template', 'grid-template-2')
          toggleActiveText(e, 'header__settings-grid');
          updateNumber(e, gridNumber)
          break;
        case '3':
          tasksList.classList = '';
          tasksList.classList.add('list-group', 'list-group-flush', 'grid-template', 'grid-template-3')
          toggleActiveText(e, 'header__settings-grid');
          updateNumber(e, gridNumber)
          break;
        case '4':
          tasksList.classList = '';
          tasksList.classList.add('list-group', 'list-group-flush', 'grid-template', 'grid-template-4')
          toggleActiveText(e, 'header__settings-grid');
          updateNumber(e, gridNumber)
          break;
        case 'back':
          headerDotsGrid.classList.remove('header__settings-grid-active');
          headerDotsFilter.classList.remove('header__settings-filter-active');
          headerDotsMenu.style.display = 'block';
      }
    }
  }
  headerDotsFilter.onclick = function (e) {
    switch (e.target.dataset.filter) {
      case 'alphabet':
        tasks.sort((a, b) => a.text.localeCompare(b.text));
        toggleActiveText(e, 'header__settings-filter');
        updateNumber(e, filterText)
        updateFilter()
        break;
      case 'date':
        tasks.sort((a, b) => a.date.localeCompare(b.date));
        toggleActiveText(e, 'header__settings-filter');
        updateNumber(e, filterText)
        updateFilter()
        break;
      case 'lenght':
        tasks.sort((a, b) => b.text.length - a.text.length);
        toggleActiveText(e, 'header__settings-filter');
        updateNumber(e, filterText)
        updateFilter()
        break;
      case 'rotate':
        tasks = [...tasks].reverse();
        updateFilter()
        break;
    }
  }
  function updateFilter() {
    document.querySelectorAll('#tasksList li').forEach(item => {
      item.remove()
    })
    tasks.forEach((task) => renderTask(task));
    updateEmpty()
    updateLocalStorage()
  }
  
  function updateEmpty() {
    if (tasks.length === 0) {
      emptyListTitle.textContent = "Список задач пуст";
      emptyList.classList.remove("none");
    } else if (tasks.length === 1) {
      emptyListTitle.textContent = "Добавьте еще задач в свой список";
      emptyList.classList.remove("none");
    } else if (tasks.length > 1) {
      emptyList.classList.add("none");
    } else {
      emptyList.classList.remove("none");
    }
    completedTasksCount.textContent = completedTasks.length;
    headerNumberTasks.innerHTML = `${tasks.length}`;
    if (completedTasks.length >= 1) {
      completedTasksBlock.classList.add("completed-tasks__block-active");
    } else if (completedTasks.length === 0) {
      completedTasksBlock.classList.remove("completed-tasks__block-active");
      completedTasksLists.classList.remove("completed-tasks__lists-active");
    }
  }
  function characterСounter(e) {
    formGroupRemains.innerHTML = e.target.value.length;
  }
  function openModal() {
    checkbox.checked = false;
    modal.classList.add("modal-task-active");
    overlay.classList.add("overlay-active");
    setTimeout(() => {
      taskInput.focus();
    }, 600);
    checkbox.onclick = () => {
      taskInput.focus()
    }
    taskInput.addEventListener('input', characterСounter)
    form.addEventListener("submit", addTask);
    overlay.addEventListener("click", closeModal);
    disableScroll();
    transition("-50%");
  }
  function closeModal() {
    overlay.classList.remove("overlay-active");
    if (modalDelete.classList.contains("modal-delete-active"))
      modalDelete.classList.remove("modal-delete-active");
    if (modal.classList.contains("modal-task-active")) {
      modal.classList.remove("modal-task-active");
      taskInput.removeEventListener('input', characterСounter);
      form.removeEventListener("submit", addTask);
    }
    if (modalTrash.classList.contains("modal-trash-active"))
      modalTrash.classList.remove("modal-trash-active");
    if (modalComments.classList.contains("modal-comments-active")) {
      modalComments.classList.remove("modal-comments-active");
      let url = '/';
      window.history.pushState({}, '', url)
    }
    overlay.removeEventListener("click", closeModal);
    enableScroll();
    transition("10px");
  }
  function removeDoneTasks(e) {
    let newCompletedTasks = tasks.filter((task) => task.done);
    tasks = tasks.filter((task) => !task.done);
    for (let i = 0; i < newCompletedTasks.length; i++) {
      completedTasks.push(newCompletedTasks[i]);
    }
    document.querySelectorAll(".task-title").forEach((item) => {
      if (item.classList.contains("task-title--done")) {
        const tasksHTML = `<li id="${item.parentNode.id}" class="completed-tasks-list  list-group-item d-flex justify-content-between task-item">
          <span class="task-title" data-action='task-title'>${item.parentNode.children[0].textContent}</span>
          <div class="task-item__buttons">
              <button type="button" data-action="done" class="btn-action return-task">
                  <a> Вернуть задачу </a>
                  <img src="./img/return.png" width="20px" height="20px" alt="return-icon" >
              </button> </div>  </li>`;
        item.parentNode.remove();
        completedTasksLists.insertAdjacentHTML("afterbegin", tasksHTML);
        updateLocalStorage();
        updateEmpty();
      }
    });
  }
  function updateLocalStorage() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    localStorage.setItem("completedTasks", JSON.stringify(completedTasks));
    localStorage.setItem("gridNumber", JSON.stringify(gridNumber));
    localStorage.setItem("filterText", JSON.stringify(filterText));
  }
  function renderTask(task) {
    const cssClass = task.done ? "task-title task-title--done" : "task-title";
    const commentsPresence = task.commentsPresence ? 'comments-presence' : '';
    const colorBg = task.colorBg ? task.colorBg : '';
    const taskHTML = `<li id="${task.id}" style="background-color: ${task.colorBg}" class="list-group-item d-flex ${commentsPresence} justify-content-between task-item">
        <span class="${cssClass}" data-action='task-title'> ${task.text}  </span>
        <div class="task-item__control">
          <div class='task-item__dots' data-item="dots" >
          <svg width="20px" height="20px" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="10" cy="15" r="2" fill=""/>
            <circle cx="10" cy="10" r="2" fill=""/>
            <circle cx="10" cy="5" r="2" fill=""/>
          </svg>
      </div>
        <ul class='task-item__buttons list-reset'> 
          <li class="task-item__button"  data-action="done" >
          <a > Выполнить задачу </a>
          <img src='../img/done.svg' alt='done icon' >
          </li>
          <li class="task-item__button" data-action="delete" >
          <a id="btn-delete"> Удалить задачу </a>
          <img src='../img/cross.svg' alt='cross icon' >
          </li>
          <li class="task-item__button" data-action="color" >
              <a id="btn-delete"> Изменить фон задачи </a>
              <img src='../img/colorchange.svg' alt='colorchange icon' >
              <input type="color" data-action="colorChange"  class="task-item__colorchange" />
          </li>
        </ul>
        <div class="task-item__overlay" data-item="overlay">  </div>
        </div>
        </li>`;
    tasksList.insertAdjacentHTML("beforeend", taskHTML);
  }
  function renderCompletedTask(task) {
    const tasksHTML = `<li id="${task.id}" class="completed-tasks-list list-group-item d-flex justify-content-between task-item">
          <span class="task-title" data-action='task-title'> ${task.text} </span>
          <div class="task-item__buttons">
          <button type="button" data-action="done" class="return-task">
          <a> Вернуть задачу </a>
             <img src="../img/return.png" width="20px" height="20px" alt="return-icon" >
          </button>
          </div>
          </li>`;
    completedTasksLists.insertAdjacentHTML("afterbegin", tasksHTML);
  }
  function disableScroll() {
    let paddingOffset = window.innerWidth - document.body.offsetWidth + "px";
    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = paddingOffset;
  }
  function enableScroll() {
    document.body.style.paddingRight = 0;
    document.body.style.overflow = "";
  }
  function transition(value) {
    btns.style.bottom = `${value}`;
  }
  function completedTasksUp() {
    completedTasksArrow.classList.toggle("rotate");
    completedTasksLists.classList.toggle("completed-tasks__lists-active");
  }
  function returnTasks(e) {
    if (e.target.dataset.action !== "done") return;
    const parentNode = e.target.parentNode.parentNode;
    let id = +parentNode.id;
    let newCompletedTasks = completedTasks.filter((task) => task.id === id);
    const task = newCompletedTasks.find((task) => task.id === id);
    task.done = !task.done;
    for (let i = 0; newCompletedTasks.length > i; i++) { tasks.push(newCompletedTasks[i]) }
    completedTasks = completedTasks.filter((task) => task.id !== id);
    const taskHTML = `<li id="${parentNode.id}" style="background-color: ${task.colorBg}" class="list-group-item d-flex ${task.commentsPresence ? 'comments-presence' : ''} justify-content-between task-item">
    <span class="task-title" data-action='task-title'>${parentNode.children[0].textContent}</span>
    <div class="task-item__control">
    <div class='task-item__dots' data-item="dots" >
      <svg width="20px" height="20px" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="10" cy="15" r="2" fill=""/>
        <circle cx="10" cy="10" r="2" fill=""/>
        <circle cx="10" cy="5" r="2" fill=""/>
        </svg>
        </div>
        <ul class='task-item__buttons list-reset'> 
          <li class="task-item__button"  data-action="done" >
          <a > Выполнить задачу </a>
          <img src='../img/done.svg' alt='done icon' >
          </li>
          <li class="task-item__button" data-action="delete" >
          <a id="btn-delete"> Удалить задачу </a>
          <img src='../img/cross.svg' alt='cross icon' >
          </li>
          <li class="task-item__button" data-action="color" >
              <a id="btn-delete"> Изменить цвет фона </a>
              <img src='../img/colorchange.svg' alt='colorchange icon' >
              <input type="color" data-action="colorChange"  class="task-item__colorchange" />
          </li>
        </ul>
    <div class="task-item__overlay" data-item="overlay">  </div>
    </li>`;
    tasksList.insertAdjacentHTML("beforeend", taskHTML);
    parentNode.remove();
    updateLocalStorage();
    updateEmpty();
  }
  function emptyTrash(e) {
    modalTrash.classList.add("modal-trash-active");
    overlay.classList.add("overlay-active");
    transition("-50%");
    disableScroll();
    clearBtn.addEventListener("click",() => {
      completedTasks = [];
      document.querySelectorAll(".completed-tasks-list").forEach((item) => item.remove());
      updateLocalStorage();
      updateEmpty();
      closeModal();
    },{ once: true }
    );
    overlay.addEventListener("click", closeModal);
  }
  function openModalComments(e) {
    if (e.target.dataset.action !== "task-title") return;
    overlay.classList.add("overlay-active");
    document.querySelector(".modal-comments").classList.add("modal-comments-active");
    document.querySelectorAll(".modal-comments__item").forEach((item) => item.remove());
    let id = +e.target.parentNode.id;
    let eventTarget = e.target;
    const newTasks = tasks.find((item) => item.id === id);
    document.querySelector(".modal-comments__title").value = `${e.target.textContent.trim()}`;
    document.querySelector(".modal-comments__date").textContent = ` ${newTasks.date} `;
    document.querySelector(".modal-comments__time").textContent = `${newTasks.time} `;
    let url = '#modal-comments';
    window.history.pushState({}, '', url);
    window.addEventListener('popstate', function(e){
      closeModal()
    }, false);
    modalCommentsBack.onclick = () => closeModal();
    setTimeout(() => {
      renderComments(id);
      doneComments(id);
    }, 300);
    overlay.addEventListener("click", closeModal);
    submitForm(id, eventTarget);
    disableScroll();
    transition("-50%");
    trackingAddInput();
    trackingEditTitle(id, eventTarget);
    editComments(id);
  }
  function submitForm(id, eventTarget) {
    modalCommentsAdd.onclick = function (e) {
      e.preventDefault();
      if (modalCommentsInput.value.length === 0) {
        modalCommentsInput.focus();
        return;
      }
      modalCommentsInput.style.outline = "";
      let findIndexTasks = tasks.findIndex((item) => item.id === id);
      tasks.forEach((item) => {
        if (item.id === id) {
          let newComments = {
            id: Date.now(),
            text: modalCommentsInput.value,
            done: false,
          };
          tasks[findIndexTasks].comments.push(newComments);
          item.commentsPresence = true;
          renderComments(id);
        }
      });
      eventTarget.parentNode.classList.add('comments-presence');
      modalCommentsAdd.style.background = "#fff";
      modalCommentsInput.focus();
      modalCommentsInput.value = '';
      updateLocalStorage();
    }
  }
  function trackingAddInput() {
    modalCommentsInput.addEventListener("input", (e) => {
      if (e.target.value.length >= 1) {
        modalCommentsAdd.style.background = "green";
      } else if (e.target.value.length === 0) {
        modalCommentsAdd.style.background = "#fff";
      }
    });
  }
  function trackingEditTitle(id, eventTarget) {
    modalCommentsTitle.onchange = function (e) {
      tasks.map((item) => {
        if (item.id === id) {
          if (e.target.value.length === 0) { 
            item.text = item.text;
            eventTarget.textContent = item.text;
          } else {
            item.text = `${e.target.value}`;
            eventTarget.textContent = `${e.target.value}`;
          }
        }
      });
      updateLocalStorage();
    };
  }
  function renderComments(id) {
    document.querySelectorAll(".modal-comments__item").forEach((item) => item.remove());
    tasks.forEach((item) => {
      if (item.id === id) {
        if (item.comments.length === 0) {
          return;
        } else {
          item.comments.forEach((item) => {
            const cssClass = item.done ? "modal-comments__comment  comments-done" : 'modal-comments__comment';
            const ccsClassSvg = item.done ? 'modal-comments__svg modal-comments__svg-active' : 'modal-comments__svg';
            const modalEditClass = item.done ? 'modal-comments__edit pe' : 'modal-comments__edit';
            let newItem = `
            <li id="${item.id}" class="modal-comments__item">
              <div class="${ccsClassSvg}" data-action="modal-comments-svg" data-action="modal-comments-svg">
                <svg width="11" height="8" viewBox="0 0 11 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.29999 1.20001L3.79999 6.70001L1.29999 4.20001" stroke="red" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
              <input maxlength="60" value="${item.text}" class="${cssClass}" disabled="true"></input>
              <div class="modal-comments__btns">
                <button data-action="modal-comments-edit" class="${modalEditClass}">
                  <svg  viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16.4745 5.40801L18.5917 7.52524M17.8358 3.54289L12.1086 9.27005C11.8131 9.56562 11.6116 9.94206 11.5296 10.3519L11 13L13.6481 12.4704C14.0579 12.3884 14.4344 12.1869 14.7299 11.8914L20.4571 6.16423C21.181 5.44037 21.181 4.26676 20.4571 3.5429C19.7332 2.81904 18.5596 2.81903 17.8358 3.54289Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M19 15V18C19 19.1046 18.1046 20 17 20H6C4.89543 20 4 19.1046 4 18V7C4 5.89543 4.89543 5 6 5H9" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </button>
                <button data-action="modal-comments-redact" class="modal-comments__redact none" >
                  <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                  <path fill="none" fill-rule="evenodd" d="M4,4 L9,4 C9.55228,4 10,3.55228 10,3 C10,2.44772 9.55228,2 9,2 L4,2 C2.89543,2 2,2.89543 2,4 L2,12 C2,13.1046 2.89543,14 4,14 L12,14 C13.1046,14 14,13.1046 14,12 L14,10 C14,9.44771 13.5523,9 13,9 C12.4477,9 12,9.44771 12,10 L12,12 L4,12 L4,4 Z M15.2071,2.29289 C14.8166,1.90237 14.1834,1.90237 13.7929,2.29289 L8.5,7.58579 L7.70711,6.79289 C7.31658,6.40237 6.68342,6.40237 6.29289,6.79289 C5.90237,7.18342 5.90237,7.81658 6.29289,8.20711 L7.79289,9.70711 C7.98043,9.89464 8.23478,10 8.5,10 C8.76522,10 9.01957,9.89464 9.20711,9.70711 L15.2071,3.70711 C15.5976,3.31658 15.5976,2.68342 15.2071,2.29289 Z"/>
                  </svg>
                </button>
                <button data-action='modal-comments-delete' class='modal-comments__delete' >
                <svg viewBox="0 0 36 36" version="1.1"  preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                <title>remove-comment</title>
                <path class="clr-i-outline clr-i-outline-path-1" d="M19.61,18l4.86-4.86a1,1,0,0,0-1.41-1.41L18.2,16.54l-4.89-4.89a1,1,0,0,0-1.41,1.41L16.78,18,12,22.72a1,1,0,1,0,1.41,1.41l4.77-4.77,4.74,4.74a1,1,0,0,0,1.41-1.41Z"></path><path class="clr-i-outline clr-i-outline-path-2" d="M18,34A16,16,0,1,1,34,18,16,16,0,0,1,18,34ZM18,4A14,14,0,1,0,32,18,14,14,0,0,0,18,4Z"></path>
                <rect x="0" y="0" width="36" height="36" fill-opacity="0"/>
                </svg>
                </button>
              </div>
            </li>
            `;
            modalCommentsItems.insertAdjacentHTML("beforeend", newItem);
          });
        }
      }
    });
    updateLocalStorage();
  }
  function doneComments(id) {
    modalComments.onclick = function (e) {
      if (e.target.dataset.action !== 'modal-comments-svg') return;
      e.target.classList.toggle('modal-comments__svg-active');
      e.target.parentNode.children[1].classList.toggle('comments-done');
      const parentNode = e.target.parentNode;
      const idComment = +e.target.parentNode.id;
      tasks.forEach(item => {
        if (item.id === id) {
          item.comments.forEach(item => {
            if (item.id === idComment) item.done = !item.done;
          })
        }
      })
      parentNode.children[2].children[0].classList.toggle('pe');
      updateLocalStorage();
    }
  }
  function editComments(id) {
    modalComments.addEventListener('click', (e) => {
      if (e.target.dataset.action !== 'modal-comments-edit') return;
      document.querySelectorAll('.modal-comments__comment').forEach(item => item.disabled = true);
      document.querySelectorAll('.modal-comments__edit').forEach(item => item.classList.remove('none'));
      document.querySelectorAll('.modal-comments__redact').forEach(item => item.classList.add('none'));
      const parentNode = e.target.parentNode.parentNode.children[1];
      const parentNodeChildren = e.target.parentNode.children[1];
      const eTarget = e.target;
      eTarget.classList.add('none');
      parentNodeChildren.classList.remove('none');
      parentNode.disabled = false;
      parentNode.focus();
      parentNode.setSelectionRange(parentNode.value.length, parentNode.value.length);
      parentNode.onchange = function (e) {
        let value = e.target.value;
        let id = +eTarget.parentNode.parentNode.id;
        tasks.forEach((item) => {
          item.comments.forEach(item => {
            if (item.id === id) {
              if (value.length === 0) { 
                item.text = item.text;
                e.target.value = item.text;
              } else {
                item.text = value;
              }
            }
          })
        });
        updateLocalStorage()
      }
    })
  }
  function editDoneComments(e) {
    if (e.target.dataset.action !== 'modal-comments-redact') return;
    e.target.classList.add('none');
    e.target.parentNode.children[0].classList.remove('none');
    e.target.parentNode.parentNode.children[1].disabled = true;
  }
  function deleteComments(eventTarget) {
    modalComments.onclick = function (e) {
      if (e.target.dataset.action !== 'modal-comments-delete') return;
      let id = +e.target.parentNode.parentNode.id;
      // let findIndex = tasks[0].comments.findIndex(item => item.id === id);
      updateLocalStorage()
    }
  }
});