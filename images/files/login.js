document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("login-form");

    loginForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

       
        const user = JSON.parse(localStorage.getItem("user"));

        if (user && user.email === email && user.password === password) {
            alert(`Welcome back, ${user.username}!`);
            window.location.href = "index.html";
        } else {
            alert("Invalid email or password. Please try again.");
        }
    });
});