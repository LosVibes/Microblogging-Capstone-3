

document.addEventListener("DOMContentLoaded", async () => {

  const input = {
    "username": "spiderman2",
    "password": "12345678"
  };

  const host = "http://microbloglite.us-east-2.elasticbeanstalk.com";
  token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ikxpb24iLCJpYXQiOjE3MDQzOTA2ODcsImV4cCI6MTcwNDQ3NzA4N30.YNjDuVCp_eVwAwITKvretyRKNxRObO8w4xEG_rJVa04";
  try {
    const response = await fetch(`${host}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input)
    });

    if (!response.ok) {
      throw new Error('Login failed');
    }

    const output = await response.json();
    const token = output.token;
    localStorage.token = output.token;

    // Fetch users and populate userList
    const usersResponse = await fetch(`${host}/api/users?limit=1000`, {
      method: "GET",
      headers: { 'Authorization': `Bearer ${token}` }
    });

    if (!usersResponse.ok) {
      throw new Error('Fetching users failed');
    }

    const usersData = await usersResponse.json();
    const userList = document.getElementById('userList');

    usersData.forEach(user => {
      userList.innerHTML += `<option value="${user.username}">${user.fullName}</option>`;
    });
    userList.addEventListener("change",e=>{
      localStorage.selected_username = userList.value;
      window.location = window.location;
    })

    // Fetch and display posts
    const postsResponse = await fetch(`${host}/api/posts`, {
      method: "GET",
      headers: { 'Authorization': `Bearer ${token}` }
    });

    if (!postsResponse.ok) {
      throw new Error('Fetching posts failed');
    }

    let postsData = await postsResponse.json();
    const result = document.getElementById('result'); // Assuming there is an element with ID 'result'
    if (localStorage.selected_username != "") {
      postsData = postsData.filter(m => m.username == localStorage.selected_username)
    }
    postsData.forEach(post => {
      result.innerHTML += `
        
          <fieldset id="messageTemplate">
            <legend>${post.username}</legend>
            <label>
              <div class ="post">
              <img src="./Images/logo.png" alt="lilGuy" style="width:2em;"> ${post.text} <br>
                ${post.likes.length} likes
              </div>
            </label>
            <br>
            <label>
              <div class ="post"></div>
              <input type="button" value="LIKE" onclick="likePost('${post._id}')">
            </label>
          </fieldset>`;
    });


  } catch (error) {
    console.error('Error:', error);
    // Handle errors here
  }



});
async function postPost(messageText) {
  await post("/api/posts", { text: messageText }, localStorage.token);

  userList.value = localStorage.username;
}
function likePost(id) {
  post("/api/likes", { postId: id }, localStorage.token)
}

async function showMessage(username = "") {
  const host = "http://microbloglite.us-east-2.elasticbeanstalk.com"
  let url = "/api/posts?limit=1000"
  fetch(host + url, {
    headers: {
      "Authorization": "Bearer " + localStorage.token
    }
  }).then(response => response.json())
    .then(messages => {

      window.location = window.location
    })
}

