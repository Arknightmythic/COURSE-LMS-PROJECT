import axios from "axios";
import secureLocalStorage from "react-secure-storage";
import { STORAGE_KEY } from "./const";

const apiURL = import.meta.env.VITE_API_URL

const apiInstance = axios.create({
    baseURL : apiURL,
    timeout : 3000,
})


export const apiInsteanceAuth = axios.create({
    baseURL: apiURL,
    timeout: 3000,
})

apiInsteanceAuth.interceptors.request.use((config)=>{
    const session = secureLocalStorage.getItem(STORAGE_KEY)
    console.log(session)
    if (!session) {
        return config
    }
    config.headers.Authorization = `JWT ${session.token}`
    return config
})


apiInsteanceAuth.interceptors.response.use((response)=>response,(err)=>{
    if (err?.response?.status === 400) {
    secureLocalStorage.removeItem(STORAGE_KEY);
    window.location.replace('/manager/sign-in');
}

    return Promise.reject(err)
})

export default apiInstance