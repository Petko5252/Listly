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
    createTaskItem(task.text, task.completed);
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
    createTaskItem(taskText, false);
    taskInput.value = '';
    saveTasks();
  }
}

function createTaskItem(text, completed) {
  const taskItem = document.createElement('li');
  taskItem.classList.add('task-item');
  if (completed) {
    taskItem.classList.add('completed');
    tasksCompleted++;
  }

  taskItem.innerHTML = `
    <span>${text}</span>
    <div class="task-actions">
      <button onclick="markCompleted(this)" ${completed ? "disabled" : ""}>Complete</button>
      <button onclick="deleteTask(this)">Delete</button>
    </div>
  `;

  taskList.appendChild(taskItem);
  totalTasks++;

  if (completed) {
    setTimeout(() => {
      taskItem.remove();
      saveTasks();
    }, 10000);
  }

  updateProgress();
}

function markCompleted(button) {
  const taskItem = button.closest('li');
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

    setTimeout(() => {
      taskItem.remove();
      updateProgress();
      saveTasks();
    }, 10000);

    saveTasks();
  }
}

function deleteTask(button) {
  const taskItem = button.closest('li');
  if (taskItem.classList.contains('completed')) {
    tasksCompleted--;
  }
  totalTasks--;

  taskItem.remove();
  updateProgress();
  saveTasks();
}

function updateProgress() {
  const progress = totalTasks === 0 ? 0 : (tasksCompleted / totalTasks) * 100;
  progressBar.style.width = progress + "%";
}
