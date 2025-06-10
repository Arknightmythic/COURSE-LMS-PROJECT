import { apiInsteanceAuth } from "../utils/axios"

export const getOverviews = async() =>{
    return apiInsteanceAuth.get('/overview').then((res) => res.data);
}