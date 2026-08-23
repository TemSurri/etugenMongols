import axios from "axios";

export const api = axios.create({
    
    baseURL: "ergsefsdfesf",
    withCredentials: true,

    headers: {
        "Content-Type": "application/json"
    }
});