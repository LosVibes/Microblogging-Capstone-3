data = [{
    "_id": "65837c845f43a2d27769d078",
    "text": "Another post",
    "username": "test123",
    "createdAt": "2023-12-20T23:45:08.054Z",
    "likes": []
}]
data.forEach(item => console.log(item.username));

//USER LIST
users = [
    {
        "fullName": "Patrick Starfish",
        "username": "patpat",
        "bio": "",
        "createdAt": "2023-12-20T17:40:28.808Z",
        "updatedAt": "2023-12-20T17:40:28.808Z"
    },
    {
        "fullName": "Fred",
        "username": "fflintstone",
        "bio": "my ip is 221.180.76.56 ",
        "createdAt": "2023-12-20T17:44:54.755Z",
        "updatedAt": "2023-12-20T19:30:53.412Z"
    }
]
users.forEach(item => console.log(item.fullName))
//REFRESH TOKEN
input = {
    "username": "string",
    "password": "string"
};
host = "http://microbloglite.us-east-2.elasticbeanstalk.com"
fetch(host + "/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input)
})
    .then(response => response.json())
    .then(output => {
        //TODO set session rembmer that we are logged in
        // localStorage.token = output.token;
        // localStorage.username = output.username;
        // document.body.innerHTML += `<pre>` + JSON.stringify(output,0,4) + `</pre>`;
        token = output.token;
        // posts();//ask only after login

        //token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InN0cmluZyIsImlhdCI6MTcwMzE3MTQ4NCwiZXhwIjoxNzAzMjU3ODg0fQ.WlBmOJK7bk4L5MknRCH8iDTTju9RgCv88sovLybYkNY"

        fetch(host + "/api/users", {
            method: "GET",
            headers: { 'Authorization': `Bearer ${token}` }
        }).then(response => response.json())
            .then(data => { //console.log(data);TEST
                data.forEach(item => {
                    userList.innerHTML +=`<option>${item.fullName}</option>`
                })
            })

            //

        fetch(host + "/api/posts", {
            method: "GET",
            headers: { 'Authorization': `Bearer ${token}` }
        }).then(response => response.json())
            .then(data => { //console.log(data);TEST
                data.forEach(showPost)
            })
    });
    function showPost(post){
        Result.innerHTML += `
        <div class ="post">
        ${post.username}
        <button onclick="likePost('${post._id}')">like</button>
        </div>
        `

    }
    function likePost(id){
        alert(id)
    }
