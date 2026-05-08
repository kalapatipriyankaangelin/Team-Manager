const API_URL = "http://localhost:5000";

// ================= LOGIN =================
async function login() {

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const res = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        window.location.href = "dashboard.html";
    } else {
        document.getElementById("msg").innerText = data.message;
    }
}

// ================= DASHBOARD =================
async function loadStats() {

    const token = localStorage.getItem("token");

    if (!token) {
        alert("Login required");
        return;
    }

    const res = await fetch(`${API_URL}/api/dashboard/stats`, {
        method: "GET",
        headers: {
            "Authorization": "Bearer " + token
        }
    });

    const data = await res.json();

    console.log("Dashboard Data:", data);

    document.getElementById("projects").innerText = data.totalProjects ?? 0;
    document.getElementById("tasks").innerText = data.totalTasks ?? 0;
    document.getElementById("completed").innerText = data.completedTasks ?? 0;
    document.getElementById("pending").innerText = data.pendingTasks ?? 0;
}

// ================= CREATE TASK =================
async function createTask() {

    const token = localStorage.getItem("token");

    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const project = document.getElementById("project").value;

    const res = await fetch(`${API_URL}/api/tasks`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        },
        body: JSON.stringify({ title, description, project })
    });

    const data = await res.json();

    alert(data.message || "Task Created");

    loadStats();
}

// ================= AUTO LOAD =================
window.onload = function () {
    if (window.location.pathname.includes("dashboard.html")) {
        loadStats();
    }
};