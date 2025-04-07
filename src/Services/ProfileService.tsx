import axios from 'axios';
const BASE_URL = import.meta.env.VITE_REACT_APP_API_URL;
export const getProfile = (id:number) =>{
    try{
        const response = axios.get(`${BASE_URL}/profile/${id}`);
        return response;
    }
    catch(e : unknown){
        if (axios.isAxiosError(e)) {
            throw (
                e.response?.data || {
                    message: "Failed to load profile",}
            );
        }
        throw {
            message: "An unexpected error occurred",
        }
    }
}

export const getAllProfiles = () =>{
    try {
        const response = axios.get(`${BASE_URL}/profile`)
        return response;
    } catch (e:unknown) {
         if (axios.isAxiosError(e)) {
            throw (
                e.response?.data || {
                    message: "Failed to update profile",}
            );
        }
        throw {
            message: "An unexpected error occurred",
        }
    }
}

export const updateProfile = async (
  data: any
) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/profile/update`,
      data
    );
    return response.data; // return the updated profile data
  } catch (e: unknown) {
    if (axios.isAxiosError(e)) {
      throw (
        e.response?.data || {
          message: "Failed to update profile",
        }
      );
    }
    throw {
      message: "An unexpected error occurred",
    };
  }
};


