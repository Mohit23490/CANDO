// ---------- Backend URL ----------
const BASE_URL = "http://localhost:5000"; // replace with your backend server

// ---------- DOM Elements ----------
const todo = document.querySelector("#todo");
const recent = document.querySelector("#recent");
const done = document.querySelector("#done");
const addbtn = document.querySelector("nav .right button");
const form = document.querySelector(".addnew");
const data1 = document.querySelector(".center");
const data = document.querySelector(".internal button");
const array = [todo, recent, done];

let element = null;
const todoTasks = {};

// ---------- Add a task ----------
function addtask(title, desc, column) {
    const div = document.createElement("div");
    div.classList.add("task");
    div.setAttribute("draggable", "true");
    div.innerHTML = `<h3>${title}</h3>
                     <p>${desc}</p>
                     <button>Delete</button>`;
    column.appendChild(div);

    const deleteButton = div.querySelector("button");
    deleteButton.addEventListener("click", () => {
        div.remove();
        updatetaskcount();
    });

    div.addEventListener("dragstart", () => {
        element = div;
    });

    return div;
}

// ---------- Update task count ----------
function updatetaskcount() {
    array.forEach((col) => {
        const tasks = col.querySelectorAll(".task");
        const count = col.querySelector(".right");
        if (count) count.innerText = tasks.length;

        todoTasks[col.id] = Array.from(tasks).map((t) => ({
            title: t.querySelector("h3").innerText,
            desc: t.querySelector("p").innerText,
        }));
    });

    saveTasksToBackend(todoTasks);
}

// ---------- Drag & Drop ----------
function transferElement(column) {
    column.addEventListener("dragenter", (e) => {
        column.classList.add("hover-over");
    });
    column.addEventListener("dragleave", (e) => {
        column.classList.remove("hover-over");
    });
    column.addEventListener("dragover", (e) => e.preventDefault());
    column.addEventListener("drop", (e) => {
        column.appendChild(element);
        column.classList.remove("hover-over");
        updatetaskcount();
    });
}

array.forEach(transferElement);

// ---------- Show/Hide Add Task Form ----------
data1.addEventListener("click", () => {
    form.style.visibility = "hidden";
});

addbtn.addEventListener("click", () => {
    form.style.visibility = "visible";
});

// ---------- Add New Task ----------
data.addEventListener("click", () => {
    const title = document.querySelector("#title").value.trim();
    const desc = document.querySelector("#desc").value.trim();

    if (!title) return alert("Title cannot be empty");

    addtask(title, desc, todo);
    updatetaskcount();
    form.style.visibility = "hidden";

    document.querySelector("#title").value = "";
    document.querySelector("#desc").value = "";
});

async function loadTasksFromBackend() {
    try {
        const res = await fetch(`${BASE_URL}/api/tasks`);
        if (!res.ok) throw new Error(`Server error: ${res.status}`);

        const taskData = await res.json();
        console.log(taskData)

        for (const key in taskData) {
            const column = document.querySelector(`#${key}`);
            taskData[key].forEach((task) => addtask(task.title, task.desc, column));
        }

        updatetaskcount();
    } catch (err) {
        console.log("Fetch error:", err);
    }
}

window.onload = loadTasksFromBackend;
// ---------- Save tasks to backend ----------
async function saveTasksToBackend(taskData) {
    try {
        const res = await fetch(`${BASE_URL}/api/tasks`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(taskData),
        });

        if (!res.ok) throw new Error(`Server error: ${res.status}`);

        const data = await res.json();
        console.log("Tasks saved:", data);
    } catch (err) {
        console.log("Fetch error:", err);
    }
}

// ---------- Load tasks from backend ----------