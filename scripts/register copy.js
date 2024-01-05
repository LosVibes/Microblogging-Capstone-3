const apiBaseURL = "http://microbloglite.us-east-2.elasticbeanstalk.com";
<<<<<<< HEAD:register/register.js
const username = document.getElementById("username");
const fullName = document.getElementById("fullName");
const password = document.getElementById("password");
const formErrorMessage = document.getElementById("formErrorMessage");
const usernameErrorMessage = document.getElementById("usernameErrorMessage");
const fullNameErrorMessage = document.getElementById("fullNameErrorMessage");
const passwordErrorMessage = document.getElementById("passwordErrorMessage");
const registerButton = document.getElementById("registerButton");

function togglePassword() {
    const passwordInput = document.getElementById("password");
    passwordInput.type = passwordInput.type === "password" ? "text" : "password";
=======
function register(data) {
    fetch(apiBaseURL + "/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    }).then(response => {
        window.location.assign("http://127.0.0.1:3000/posts%20copy.html");  // redirect
    });
>>>>>>> main:scripts/register copy.js
}

function register() {
    formErrorMessage.textContent = "";
    usernameErrorMessage.textContent = "";
    fullNameErrorMessage.textContent = "";
    passwordErrorMessage.textContent = "";

    if (password.value.length >= 8) {
        fetch(apiBaseURL + "/api/users", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                username: username.value,
                fullName: fullName.value,
                password: password.value
            }),
        }).then(response => {
            if (response.ok) {
                resetForm();
                window.location.assign("/"); 
            } else {
                response.json().then(error => {
                    handleRegistrationError(error);
                });
            }
        });
    } else {
        handleRegistrationError({ message: "Password must be at least 8 characters long." });
    }
}

function handleRegistrationError(error) {
    username.classList.add("error");
    fullName.classList.add("error");
    password.classList.add("error");

    username.placeholder = "Enter your username";
    fullName.placeholder = "Enter your full name";
    password.placeholder = "Enter your password";

    if (error.statusCode === 409 && error.message.includes("username")) {
        formErrorMessage.textContent = "Registration failed. Check your input.";
    } 

    if (error.message.includes("username")) {
        usernameErrorMessage.textContent = "Username already taken. Please choose a different one.";
    }

    if (error.message.includes("fullName")) {
        fullNameErrorMessage.textContent = "Full name is required.";
    }

    if (error.message.includes("password")) {
        passwordErrorMessage.textContent = "Password is required.";
    } else if (error.message.includes("Password must be at least 8 characters long.")) {
        passwordErrorMessage.textContent = "Password must be at least 8 characters long.";
    }
}

function resetForm() {
    username.classList.remove("error");
    fullName.classList.remove("error");
    password.classList.remove("error");

    username.value = "";
    fullName.value = "";
    password.value = "";
    username.placeholder = "Enter your username";
    fullName.placeholder = "Enter your full name";
    password.placeholder = "Enter your password";
    formErrorMessage.textContent = "";
}