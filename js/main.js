'use strict';
// const tasks = [
//     { name: "Recoger setas en el campo", completed: true, id: 1 },
//     { name: "Comprar pilas", completed: true, id: 2 },
//     { name: "Poner una lavadora de blancos", completed: true, id: 3 },
//     {
//       name: "Aprender cómo se realizan las peticiones al servidor en JavaScript",
//       completed: false,
//       id: 4,
//     },
// ];

const GITHUB_USER = "<tu_usuario_de_github_aqui>";
const SERVER_URL = `https://dev.adalab.es/api/todo/`;

let tasks = [];

fetch(SERVER_URL)
.then(response => response.json())
.then(data => {
  tasks = data.results;
  for (const oneTask of tasks)
    renderTask(tasks);
});


const list = document.querySelector('.js-list');
const userSearch = document.querySelector('.js-text-task-filter');
const btnSearch = document.querySelector('.js-btn-filter');
const msg = document.querySelector('.js-msg');

function handleClickSearch(ev){
  ev.preventDefault();
  const valueSearch = userSearch.value;
  const filterSearch = tasks.filter((task)=>task.name.includes(valueSearch));
  renderTask(filterSearch);
};

btnSearch.addEventListener('click', handleClickSearch);

function renderMessageTasks () {
  const completedTasks = tasks.find(task => task.completed === 'true');
  console.log(`Tenemos ${completedTasks.length} tareas completadas`)

  const uncompletedTasks = tasks.find(task => task.completed === 'false');

  msg.innerHTML = `Tienes ${tasks.length} tareas, ${completedTasks} tareas completadas y ${uncompletedTasks} tareas pendientes de realizar.`

}



function renderTask(arrTasks) {
    list.innerHTML = '';
  
    

    for (const task of arrTasks) {
        let css = '';
        let check = '';
        if (task.completed) {
            css = 'tachado';
            check = 'checked';
            
        }
        list.innerHTML += `<li class="${css}"><input type="checkbox" ${check} id="${task.id}">${task.name}</li>`;
       
        
    }
    renderMessageTasks();
    
};

renderTask(tasks);

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
  renderTask(tasks);
};

list.addEventListener("click", handleClickList);

