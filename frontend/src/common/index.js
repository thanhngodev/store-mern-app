const backendUrl = "http://localhost:8080/api";

const API = {
    signIn: {
        url: `${backendUrl}/signin`,
        method: "POST"
    },
    signUp: {
        url: `${backendUrl}/signup`,
        method: "POST"
    }
}

export default API;