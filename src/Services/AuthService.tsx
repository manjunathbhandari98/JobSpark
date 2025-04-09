import axios from "axios";
const BASE_URL = import.meta.env.VITE_REACT_APP_API_URL;

export const loginUser = async (login:any) => {
   try {
        const response = await axios.post(`${BASE_URL}/auth/login`, login);
        return response.data;
   } catch (error) {
       console.error("Login error:", error);
       throw error;
    
   }
}

