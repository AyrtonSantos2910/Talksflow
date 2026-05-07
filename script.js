const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');
const taskCounter = document.getElementById('taskCounter');

let tasks = [];

function updateCounter() {
    taskCounter.innerText = `${tasks.length} tarefas`;
}

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function createTask(task, index) {

    const li = document.createElement('li');

    if (task.completed) {
        li.classList.add('completed');
    }

    li.innerHTML = `
    <span>${task.text}</span>

    <div class="task-buttons">

      <button class="complete-btn">
        ✓
      </button>

      <button class="delete-btn">
        X
      </button>

    </div>
  `;

    const completeBtn = li.querySelector('.complete-btn');

    const deleteBtn = li.querySelector('.delete-btn');

    completeBtn.addEventListener('click', () => {

        li.classList.toggle('completed');

        tasks[index].completed = !tasks[index].completed;

        saveTasks();

    });

    deleteBtn.addEventListener('click', () => {

        li.remove();

        tasks.splice(index, 1);

        updateCounter();

        saveTasks();

        renderTasks();

    });

    taskList.appendChild(li);
}

function renderTasks() {

    taskList.innerHTML = '';

    tasks.forEach((task, index) => {
        createTask(task, index);
    });

}

function loadTasks() {

    const storedTasks = localStorage.getItem('tasks');

    if (storedTasks) {
        tasks = JSON.parse(storedTasks);

        renderTasks();

        updateCounter();
    }

}

function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText === '') return;

    const newTask = {
        text: taskText,
        completed: false
    };

    tasks.push(newTask);
    renderTasks();
    updateCounter();
    saveTasks();
    taskInput.value = '';
    taskInput.focus();
}

addBtn.addEventListener('click', addTask);

taskInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        addTask();
    }
});

loadTasks();