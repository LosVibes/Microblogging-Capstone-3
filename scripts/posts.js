

document.addEventListener("DOMContentLoaded", async e => {
    const host = "http://microbloglite.us-east-2.elasticbeanstalk.com"

    let token = localStorage.token
    fetch(host + "/api/users", {
        method: "GET",
        headers: { 'Authorization': `Bearer ${token}` }
    }).then(response => response.json())
        .then(data => { 
            data.forEach(item => {
                userList.innerHTML += `<option>${item.fullName}</option>`
            })
        })
})


host = "http://microbloglite.us-east-2.elasticbeanstalk.com"

fetch(host + "/api/posts", {
    method: "GET",
    headers: { 'Authorization': `Bearer ${token}` }
}).then(response => response.json())
    .then(data => { //console.log(data);TEST
        data.forEach(showPost)
    });


function showPost(post) {
    result += `
       <fieldset id="messageTemplate">
       <legend>Message Template</legend>
       <label>
        <div class ="post">Username: ${post.username} <br>
         TEXT : ${post.text} <br>
         ${post.likes.length} likes
         </div>
        
        <label>
        <div class ="post"></div><input type="button" value="LIKE" onclick="likePost('${post._id}')">
        </label>
        </fieldset>
        `

}
async function post(messageText) {
    await api.post("/api/posts", { text: messageText }, localStorage.token);
    showMessage(localStorage.username);
    userList.value = localStorage.username;
}

function likePost(id) {
    api.post("/api/likes", { postId: id }, localStorage.token)
}

async function showMessage(username = "") {
    let url = "/api/posts"
    messages = await api.get(host + url, localStorage.token);
    if (username != "") {
        messages = messages.filter(m => m.username == username)
    }
    result.innerHTML = messages.map(showPost).join("")
}


// function getUserOption(user) {
//     return `<option>${user.username}</option>`
// }

// document.addEventListener("DOMContentLoaded", async e => {
//     const users = await api.get("/api/users",localStorage.token)
//     userList.innerHTML += users.map(getUserOption).join("")

//     showMessage();

//     userList.addEventListener("change", async e => {
//         showMessage(userList.selectedOption[0].value)
//     });
// });
