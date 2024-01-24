import axios from "axios";

export const axiosNoBaseURL = axios.create()
   
axiosNoBaseURL.interceptors.request.use((config) =>{
    const token = sessionStorage.getItem('access_token')
    config.headers.Authorization = `Bearer ${token}`
    return config;
},(error) =>{
    // Do something with request error
    return Promise.reject(error);
})