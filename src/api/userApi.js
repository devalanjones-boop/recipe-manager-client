import api from "./axios";


export let login = (data) => api.post("/user/login", data)

export let register = (data) => api.post("/user/register", data)