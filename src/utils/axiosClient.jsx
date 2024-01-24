import axios from "axios";
import { BaseURL } from "./BaseURL";

export const axiosClient = axios.create({
    baseURL: BaseURL
})


axiosClient.interceptors.request.use((config) =>{
    const token = sessionStorage.getItem('access_token')
    config.headers.Authorization = `Bearer ${token}`
    return config;
},(error) =>{
    // Do something with request error
    return Promise.reject(error);
})

axiosClient.interceptors.response.use((response) =>{ 
    const {data} = response
    if(data.code === 401 || data.code === 403){
        sessionStorage.removeItem('access_token'); 
    }
    if(data.code === 404){
        console.log('not found')
    }
    return response
},(error) =>{
    const {response} = error
    if(response.status === 401 || response.status === 403){
        sessionStorage.removeItem('access_token')
    }
    if(response.status === 404){
        console.log('not found')
    }
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
})


// Cleanup ongoing requests when the component unmounts
export const cleanupOngoingRequests = () => {
    axiosClient.interceptors.request.eject(0); // Eject the request interceptor
    axiosClient.interceptors.response.eject(0); // Eject the response interceptor
};