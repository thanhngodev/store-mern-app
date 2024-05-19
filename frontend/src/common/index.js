const backendUrl = "http://localhost:8080/api";

const API = {
    signIn: {
        url: `${backendUrl}/signin`,
        method: "POST"
    },
    signUp: {
        url: `${backendUrl}/signup`,
        method: "POST"
    },
    google: {
        url: `${backendUrl}/google`,
        method: "POST"
    }
}

export default API;