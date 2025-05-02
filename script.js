let points = 0;
let tasksCompleted = 0;
let totalTasks = 0;

const taskList = document.getElementById('task-list');
const pointsDisplay = document.getElementById('points');
const progressBar = document.getElementById('progress-bar');
const completionMessage = document.getElementById('completion-message');

window.onload = function () {
  const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
  const savedPoints = parseInt(localStorage.getItem('points')) || 0;

  points = savedPoints;
  pointsDisplay.innerText = `Points: ${points}`;

  savedTasks.forEach(task => {
    const taskItem = document.createElement('li');
    taskItem.classList.add('task-item');
    if (task.completed) {
      taskItem.classList.add('completed');
      tasksCompleted++;
    }
    taskItem.innerHTML = `
      <span>${task.text}</span>
      <button onclick="markCompleted(this)" ${task.completed ? "disabled" : ""}>Complete</button>
    `;
    taskList.appendChild(taskItem);
    totalTasks++;
  });

  updateProgress();
};

function saveTasks() {
  const tasks = [];
  taskList.querySelectorAll('li').forEach(item => {
    tasks.push({
      text: item.querySelector('span').innerText,
      completed: item.classList.contains('completed')
    });
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
  localStorage.setItem('points', points.toString());
}

function addTask() {
  const taskInput = document.getElementById('task-input');
  const taskText = taskInput.value.trim();

  if (taskText !== "") {
    const taskItem = document.createElement('li');
    taskItem.classList.add('task-item');
    taskItem.innerHTML = `
      <span>${taskText}</span>
      <button onclick="markCompleted(this)">Complete</button>
    `;
    taskList.appendChild(taskItem);
    totalTasks++;
    updateProgress();
    saveTasks();
    taskInput.value = '';
  }
}

function markCompleted(button) {
  const taskItem = button.parentElement;
  if (!taskItem.classList.contains('completed')) {
    taskItem.classList.add('completed');
    button.disabled = true;

    points += 10;
    tasksCompleted++;
    pointsDisplay.innerText = `Points: ${points}`;
    updateProgress();

    if (tasksCompleted === totalTasks) {
      completionMessage.innerText = "Congratulations! You completed all tasks!";
      completionMessage.style.opacity = 1;
    }

    saveTasks();
  }
}

function updateProgress() {
  const progress = totalTasks === 0 ? 0 : (tasksCompleted / totalTasks) * 100;
  progressBar.style.width = progress + "%";
}
