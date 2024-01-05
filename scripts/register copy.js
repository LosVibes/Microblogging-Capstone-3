const apiBaseURL = "http://microbloglite.us-east-2.elasticbeanstalk.com";
function register(data) {
    fetch(apiBaseURL + "/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    }).then(response => {
        window.location.assign("http://127.0.0.1:3000/posts%20copy.html");  // redirect
    });
}

document.addEventListener("DOMContentLoaded", e => {

    registerButton.addEventListener("click", async e => {
        register({
            username: username.value,
            fullName: fullName.value,
            password: password.value
        });
    });

});
