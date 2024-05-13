import axios from "axios";

//axios configuration

const sampleUrl="https://eventmanagement-lquh.onrender.com"

export const axiosRequest=axios.create({
       baseURL:sampleUrl,  
})