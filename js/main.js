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




function renderTask() {
    list.innerHTML = '';
    
    for (const task of tasks) {
        let css = '';
        if (task.completed === true) {
            css = 'tachado';
        }
        list.innerHTML += `<li class="${css}">${task.name}</li>`
    }
    
};

renderTask();

