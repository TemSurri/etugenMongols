import axios from "axios";

export const api = axios.create({
    
    baseURL: "idadasdavacascxsx",
    withCredentials: true,

    headers: {
        "Content-Type": "application/json"
    }
});