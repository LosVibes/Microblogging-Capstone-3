class API {
    constructor(host = "") {
        this.host = host;
    }

    async get(path, token = "") {
        console.log("GETing", "FROM:", path, "USING:", token);
        let headers = {};
        
        if (token != "") {
            headers["Authorization"] = `Bearer ${token}`
        }

        let options = { method: 'GET', headers: headers };
        const response = await fetch(this.host + path, options);
        
        if (!response.ok) { 
            const json = await response.json();
            console.log(json);
            throw new Error(`HTTP error! status: ${response.status} FULL:${response.statusText}`) 
        };

        return await response.json();
    }

    async post(path, input = {}, token = "") {
        console.log("POSTING", "TO:", path, "PAYLOAD:", JSON.stringify(input), "USING:", token);
        
        let headers = { "Content-Type": "application/json" };

        if (token != "") {
            headers["Authorization"] = `Bearer ${token}`
        }

        let options = {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(input)
        };

        const response = await fetch(this.host + path, options);

        if (!response.ok) { 
            const json = await response.json();
            console.log(json);
            throw new Error(`HTTP error! status: ${response.status} FULL:${response.statusText}`) 
        };

        return await response.json();
    }

    async register(data = { username: "string", fullName: "string", password: "string" }) {
        return await this.post("/api/users", data)
    }

    async login(data = { username: "string", password: "string" }) {
        const result = await this.post("/auth/login", data)
        return result.token;
    }

    async like(postId) {
        await api.post("/api/likes", { postId: postId }, token);
    }
}

//TESTS
let token = "";
let user = {};

const api = new API("http://microbloglite.us-east-2.elasticbeanstalk.com");