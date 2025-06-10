import { apiInsteanceAuth } from "../utils/Axios";


export const getOverviews = async() =>{
    return apiInsteanceAuth.get('/overview').then((res) => res.data);
}