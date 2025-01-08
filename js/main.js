'use strict';
const tasks = [
    { name: "Recoger setas en el campo", completed: true, id: 1 },
    { name: "Comprar pilas", completed: true, id: 2 },
    { name: "Poner una lavadora de blancos", completed: true, id: 3 },
    {
      name: "Aprender cómo se realizan las peticiones al servidor en JavaScript",
      completed: false,
      id: 4,
    },
  ];

const list = document.querySelector('.js-list');
const userSearch = document.querySelector('.js-text-task-filter');
const btnSearch = document.querySelector('.js-btn-filter');

function handleClickSearch(ev){
  ev.preventDefault();
  const valueSearch = userSearch.value;
  const filterSearch = tasks.filter((task)=>tasks.name.includes(valueSearch));
  console.log(valueSearch);
};

btnSearch.addEventListener('click', handleClickSearch);

function renderTask() {
    list.innerHTML = '';
    
    for (const task of tasks) {
        let css = '';
        let check = '';
        //let id = '';
        if (task.completed === true) {
            css = 'tachado';
            check = 'checked';
            //id = task.id;
        }
        list.innerHTML += `<li class="${css}"><input type="checkbox" ${check} id="${task.id}">${task.name}</li>`;
    }
    
};

renderTask();

const handleClickList = (event) => {
  const taskId = parseInt(event.target.id); // Obtengo el id del checkbox clickado por la usuaria
  if (!taskId) return; // Si no ha pulsado en el checkbox, no queremos hacer nada y salimos de la función
  // console.log(taskId);

  // Busca la tarea que tenga el id `taskId` en el array `tasks`
  const indexTask = tasks.findIndex((task)=>taskId === task.id);
 //console.log(indexTask);
  // Una vez que has obtenido la tarea, actualiza la propiedad `completed`

    if(tasks[indexTask].completed){
      tasks[indexTask].completed = false;
    }else{
      tasks[indexTask].completed = true;
    }
  console.log(tasks);
  // Pinta de nuevo las tareas en el html
  renderTask();
};

list.addEventListener("click", handleClickList);

