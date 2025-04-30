document.addEventListener("DOMContentLoaded", () => {
    const registerForm = document.getElementById("register-form");

    registerForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const username = document.getElementById("username").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

       
        const user = { username, email, password };
        localStorage.setItem("user", JSON.stringify(user));

        alert("Registration successful! You can now log in.");
        window.location.href = "login.html"; 
    });
});