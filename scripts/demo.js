

document.addEventListener("DOMContentLoaded", async () => {

    const input = {
      "username": "string",
      "password": "string"
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
      const usersResponse = await fetch(`${host}/api/users`, {
        method: "GET",
        headers: { 'Authorization': `Bearer ${token}` }
      });
  
      if (!usersResponse.ok) {
        throw new Error('Fetching users failed');
      }
  
      const usersData = await usersResponse.json();
      const userList = document.getElementById('userList'); 
  
      usersData.forEach(user => {
        userList.innerHTML += `<option>${user.fullName}</option>`;
      });
  
      // Fetch and display posts
      const postsResponse = await fetch(`${host}/api/posts`, {
        method: "GET",
        headers: { 'Authorization': `Bearer ${token}` }
      });
  
      if (!postsResponse.ok) {
        throw new Error('Fetching posts failed');
      }
  
      const postsData = await postsResponse.json();
      const result = document.getElementById('result'); // Assuming there is an element with ID 'result'
  
      postsData.forEach(post => {
        result.innerHTML += `
        
          <fieldset id="messageTemplate">
            <legend>Message Template</legend>
            <label>
              <div class ="post">
                Username: ${post.username} <br>
                TEXT : ${post.text} <br>
                ${post.likes.length} likes
              </div>
            </label>
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
async function post(messageText){
    await api.post("/api/posts", {text: messageText}, localStorage.token);
    showMessage(localStorage.username)
    userList.value = localStorage.username;
}
function likePost(id) {
    api.post("/api/likes", { postId: id }, localStorage.token)
}
async function showMessage(username = "") {
    let url = "/api/posts"
    messages = await api.get(url, localStorage.token);
    if (username != "") {
        messages = messages.filter(m => m.username == username)
    }
    result.innerHTML = messages.map(showPost).join("")
}

