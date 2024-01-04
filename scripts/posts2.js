
async function post(endpoint,data,token){
    // token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ikxpb24iLCJpYXQiOjE3MDQzOTA2ODcsImV4cCI6MTcwNDQ3NzA4N30.YNjDuVCp_eVwAwITKvretyRKNxRObO8w4xEG_rJVa04";
const host = "http://microbloglite.us-east-2.elasticbeanstalk.com"
    fetch(host + endpoint,{
        method: "POST",
        body:JSON.stringify(data),
        headers: {
            "Content-Type":"application/json",
            "Authorization": "Bearer "+ token
        }


    })
    .then(response => response.json())
    .then(data =>{
        console.log(data);
        showMessage(localStorage.username)
    })
}