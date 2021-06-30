import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/v1',
  
});


export default axiosInstance;