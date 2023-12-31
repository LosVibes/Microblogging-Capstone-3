"use strict";


function login() {
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;

    fetch('https://microbloglite.onrender.com/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username: username,
            password: password,
        }),
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            localStorage.token = data.token
            window.location.href = 'posts.html';
        })
        .catch(error => {
            console.error('Error:', error);
        });
}
document.addEventListener("DOMContentLoaded", e => {
    show.addEventListener("click", e => {
        e.preventDefault()
        if (password.getAttribute("type") === "password") {
            password.setAttribute("type", "text")
        } else {
            password.setAttribute("type", "password")
        }

    })
})