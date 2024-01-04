document.addEventListener("DOMContentLoaded", asy)
async function post(text){
    token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ikxpb24iLCJpYXQiOjE3MDQzOTA2ODcsImV4cCI6MTcwNDQ3NzA4N30.YNjDuVCp_eVwAwITKvretyRKNxRObO8w4xEG_rJVa04";
const host = "http://microbloglite.us-east-2.elasticbeanstalk.com"
    fetch(host+"/api/posts",{
        method: "POST",

    })
}