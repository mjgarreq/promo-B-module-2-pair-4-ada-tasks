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

const GITHUB_USER = "mjgarreq"; //Poner nuestro usuario de GITHUB sin <>
const SERVER_URL = `https://dev.adalab.es/api/todo/${GITHUB_USER}`;//añadir ${GITHUB_USER} acontinuación de la URL

let tasks = [];

// fetch(SERVER_URL)
// .then(response => response.json())
// .then(data => {
//   tasks = data.results;
//   for (const oneTask of tasks)
//     renderTask(tasks);
// });

//LOCAL STORAGE
const tasksLocalStorage = JSON.parse(localStorage.getItem("tasks"));
if (tasksLocalStorage !== null){
  // si (existe el listado de tareas en Local Storage)
  // pinta la lista de tareas almacenadas en tasksLocalStorage
  tasks = tasksLocalStorage;
} else {
  //sino existe el listado de tareas en el local storage
  // pide los datos al servidor
  fetch(SERVER_URL)
    .then((response) => response.json())
    .then((data) => {
      //guarda el listado obtenido en el Local Storage
      // pinta la lista de tareas
      tasks = data.results;
      localStorage.setItem('tasks', JSON.stringify(tasks));
    })
    .catch((error) => {
      console.error(error);
    });
}


//CONSTANTES
const list = document.querySelector('.js-list');
const userSearch = document.querySelector('.js-text-task-filter');
const btnSearch = document.querySelector('.js-btn-filter');
const msg = document.querySelector('.js-msg');
const addTask = document.querySelector('.js-text-task-add');
const btnAddTask = document.querySelector('.js-btn-add');

const handleNewTask = (event) => {
  event.preventDefault();

  // 1. Recoge el nombre de la tarea
  const addTaskValue = addTask.value;

  // 2. Crea un objeto para la nueva tarea
  const newTask = {
    name: addTaskValue, // sustituye este string vacío por el nombre de la tarea nueva - misma estructura que la anterior
    completed: false,
  };

  // 3. Añade la nueva tarea al array de tareas
  
  
  
  //AÑADIR NUEVA INFORMACIÓN AL SERVIDOR
  fetch(SERVER_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newTask),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        //Completa y/o modifica el código:
        //Agrega la nueva tarea al listado
        tasks.push(newTask);
        console.log(tasks);
        //Guarda el listado actualizado en el local storage
        localStorage.setItem('tasks', JSON.stringify(tasks));
        //Visualiza nuevamente el listado de tareas
        renderTask(tasks);
        //Limpia los valores de cada input
        newTask.name = '';
        newTask.completed = false;
      } else {
        //muestra un mensaje de error.
          console.error('ERROR');
      }
    });

  // 4. Vuelve a pintar las tareas
  // renderTask(tasks);
};

btnAddTask.addEventListener('click', handleNewTask);

function handleClickSearch(ev){
  ev.preventDefault();
  const valueSearch = userSearch.value;
  const filterSearch = tasks.filter((task)=>task.name.includes(valueSearch));
  renderTask(filterSearch);
};

btnSearch.addEventListener('click', handleClickSearch);

function renderMessageTasks () {
  const completedTasks = tasks.filter(task => task.completed === true);
  // console.log(`Tenemos ${completedTasks.length} tareas completadas`);
  console.log(completedTasks);

  const uncompletedTasks = tasks.filter(task => task.completed === false);

  msg.innerHTML = `Tienes ${tasks.length} tareas, ${completedTasks.length} tareas completadas y ${uncompletedTasks.length} tareas pendientes de realizar.`

}



function renderTask(arrTasks) {
    list.innerHTML = '';
  
    

    for (const task of arrTasks) {
        
       
        // list.innerHTML += `<li class="${css}"><input type="checkbox" ${check} id="${task.id}">${task.name}</li>`;

        const li = document.createElement('li');
        list.appendChild(li);
        

        const input = document.createElement('input');
        li.appendChild(input);

        input.setAttribute('type', 'checkbox');
        input.setAttribute('id', task.id);
        

        const contentLi = document.createTextNode(task.name);
        li.appendChild(contentLi);

        if (task.completed) {
          input.setAttribute('checked', true);
          li.setAttribute('class', 'tachado');
        }

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
  console.log(taskId)
  // Pinta de nuevo las tareas en el html
  renderTask(tasks);
};

list.addEventListener("click", handleClickList);

/*
Modificar la función del evento escucha parecido al ejercicio que hemos hecho hoy. Creemos que habría que hacer el for sobre los inputs y revisar si está checked
*/



