import axios from "axios";

export const api = axios.create({
    
    baseURL: "idontwantosetupenvvarinvercelrnlol",
    withCredentials: true,

    headers: {
        "Content-Type": "application/json"
    }
});