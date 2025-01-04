let points = 0;
let tasksCompleted = 0;
let totalTasks = 0;

const taskList = document.getElementById('task-list');
const pointsDisplay = document.getElementById('points');
const progressBar = document.getElementById('progress-bar');
const completionMessage = document.getElementById('completion-message');

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
        taskInput.value = ''; // Clear the input field
    }
}

function markCompleted(button) {
    const taskItem = button.parentElement;
    taskItem.classList.add('completed');
    button.disabled = true; // Disable the button once task is completed

    // Add points for completing a task
    points += 10;
    tasksCompleted++;
    pointsDisplay.innerText = `Points: ${points}`;
    updateProgress();

    // Show a message if the user completes all tasks for the day
    if (tasksCompleted === totalTasks) {
        completionMessage.innerText = "Congratulations! You completed all tasks!";
        completionMessage.style.opacity = 1;
    }
}

function updateProgress() {
    const progress = (tasksCompleted / totalTasks) * 100;
    progressBar.style.width = progress + "%";
}
