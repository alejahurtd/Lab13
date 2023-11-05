const taskListToDo = document.getElementById("task-list-to-do");
const taskListDoing = document.getElementById("task-list-doing");
const taskListDone = document.getElementById("task-list-done");

// cargar las tareas desde el LocalStorage
function loadTasks() {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    return savedTasks;
}

let tasks = loadTasks();

//  guardar las tareas en el LocalStorage
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// renderizar la tarjeta
function createTaskCard(task, index) {
    const taskCard = document.createElement("div");
    taskCard.classList.add("task-card");
    taskCard.innerHTML = `
    <button class="close-task" data-index="${index}">X</button>
    <div class="task__car--title">${task.title}</div>
    <div class="task__car--controls">
        <button class="move-down" data-index="${index}"> ↓</button>
        <button class="move-up" data-index="${index}">↑</button>
    </div>
</div> 
       
    `;
    return taskCard;
}

//renderizar las tarjetas de tareas
function renderTasks() {
    taskListToDo.innerHTML = "";
    taskListDoing.innerHTML = "";
    taskListDone.innerHTML = "";

    tasks.forEach((task, index) => {
        const taskCard = createTaskCard(task, index);

        if (task.state === "To Do") {
            taskListToDo.appendChild(taskCard);
        } else if (task.state === "Doing") {
            taskListDoing.appendChild(taskCard);
        } else if (task.state === "Done") {
            taskListDone.appendChild(taskCard);
        }
    });

    // AAgregar los cositos del click para cerrar la tarea y cambiar de ubicacion
    const closeTaksButtons = document.querySelectorAll(".close-task");
    closeTaksButtons.forEach((button) => {
        button.addEventListener("click", (e) => {
            const index = e.target.getAttribute("data-index");
            tasks.splice(index, 1);
            saveTasks();
            renderTasks();
        });
    });

    const moveUpButtons = document.querySelectorAll(".move-up");
    moveUpButtons.forEach((button) => {
        button.addEventListener("click", (e) => {
            const index = e.target.getAttribute("data-index");
            if (tasks[index].state === "To Do") {
                tasks[index].state = "Doing";
            } else if (tasks[index].state === "Doing") {
                tasks[index].state = "Done";
            }
            saveTasks();
            renderTasks();
        });
    });

    const moveDownButtons = document.querySelectorAll(".move-down");
    moveDownButtons.forEach((button) => {
        button.addEventListener("click", (e) => {
            const index = e.target.getAttribute("data-index");
            if (tasks[index].state === "Done") {
                tasks[index].state = "Doing";
            } else if (tasks[index].state === "Doing") {
                tasks[index].state = "To Do";
            }
            saveTasks();
            renderTasks();
        });
    });
}

// Renderizar las tareas al cargar la página
renderTasks();

// Agrega tarea
const addTaskButton = document.getElementById("add-task");
addTaskButton.addEventListener("click", () => {
    const taskInput = document.getElementById("task-input");
    const taskTitle = taskInput.value.trim();

    if (taskTitle !== "") {
        const newTask = {
            title: taskTitle,
            state: "To Do",
        };

        tasks.push(newTask);
        saveTasks();

        taskInput.value = "";
        renderTasks();
    }
});
