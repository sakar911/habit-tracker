const quotes = [
    "Success is the product of daily habits, not once-in-a-lifetime transformations.",
    "You do not rise to the level of your goals. You fall to the level of your systems. - James Clear",
    "The key to success is consistency, not perfection.",
    "Small daily improvements over time lead to stunning results. - Robin Sharma",
    "Your habits are either the reason you’re successful or the reason you’re not. - Unknown",
    "Success is the sum of small efforts, repeated day in and day out. - Robert Collier",
    "What you do today can improve all your tomorrows. - Ralph Marston",
    "The difference between who you are and who you want to be is what you do.",
    "Motivation is what gets you started. Habit is what keeps you going. – Jim Ryun",
    "The best way to predict the future is to create it. – Abraham Lincoln",
    "Every action you take is a vote for the type of person you wish to become. – James Clear",

];

function displayRandomQuote() {
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    const quoteElement = document.querySelector(".quote");
    const caretElement = document.querySelector(".caret");

    quoteElement.textContent = "";
    caretElement.style.display = 'inline-block'; // Show caret

    let i = 0;
    const typingInterval = setInterval(function () {
        if (i < randomQuote.length) {
            quoteElement.textContent += randomQuote[i];
            i++;
        } else {
            clearInterval(typingInterval);
            caretElement.style.display = 'none'; // Hide caret after typing
        }
    }, 100); // Adjust the speed of typing here (100ms per character)
}

// Call the function when the page loads
displayRandomQuote();

// Change quote every 60 seconds (1 minute)
setInterval(displayRandomQuote, 18000);

// Generate falling leaves
const leavesContainer = document.getElementById('leaves-container');
const numLeaves = 40;

for (let i = 0; i < numLeaves; i++) {
    const leaf = document.createElement('img');
    leaf.classList.add('leaf');
    leaf.src = 'leaf.png';
    const posX = Math.random() * 100;
    leaf.style.left = posX + '%';
    const delay = Math.random() * -20;
    leaf.style.animationDelay = delay + 's';
    const duration = 10 + Math.random() * 15;
    leaf.style.animationDuration = duration + 's';
    const scale = 0.8 + Math.random() * 0.8;
    leaf.style.transform = `scale(${scale})`;
    leavesContainer.appendChild(leaf);
}

// Habit Tracker Logic
document.addEventListener("DOMContentLoaded", loadHabits);
const addBtn = document.getElementById("add-btn");
const habitInput = document.getElementById("habit-input");
const habitList = document.getElementById("habit-list");

addBtn.addEventListener("click", addHabit);
habitInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") addHabit();
});

function addHabit() {
    let habitText = habitInput.value.trim();
    if (habitText === "") return;

    let habitItem = createHabitElement(habitText);
    habitList.appendChild(habitItem);

    saveHabit();
    habitInput.value = "";
}

function createHabitElement(habitText) {
    let li = document.createElement("li");
    let span = document.createElement("span");
    span.textContent = habitText;
    li.appendChild(span);

    li.addEventListener("click", function (e) {
        if (e.target.classList.contains("delete-btn")) return;
        li.classList.toggle("completed");
        saveHabit();
    });

    let deleteBtn = document.createElement("button");
    deleteBtn.textContent = "❌";
    deleteBtn.classList.add("delete-btn");
    deleteBtn.addEventListener("click", function (e) {
        e.stopPropagation();
        li.style.animation = "slideOut 0.5s forwards";
        li.addEventListener("animationend", () => {
            li.remove();
            saveHabit();
        });
    });
    li.appendChild(deleteBtn);

    return li;
}

function saveHabit() {
    let habits = [];
    document.querySelectorAll("#habit-list li").forEach(habit => {
        let text = habit.querySelector("span").textContent;
        habits.push({ text: text, completed: habit.classList.contains("completed") });
    });
    localStorage.setItem("habits", JSON.stringify(habits));
}

function loadHabits() {
    let storedHabits = JSON.parse(localStorage.getItem("habits")) || [];
    storedHabits.forEach(habit => {
        let li = createHabitElement(habit.text);
        if (habit.completed) li.classList.add("completed");
        habitList.appendChild(li);
    });
}