import axios from "axios";

const BASE_URL = import.meta.env.VITE_REACT_APP_API_URL;

export const postJob =async (jobData:any) =>{
  try {
    const response =await axios.post(
      `${BASE_URL}/jobs/post`,
      jobData
    );
    return response;
  } catch (e) {
    if (axios.isAxiosError(e)) {
      throw (
        e.response?.data || {
          errorMessage: "Invalid Data",
        }
      );
    }
    throw {
      errorMessage: "An unexpected error occured",
    };
  }
}

export const getJobs =async () => {
    try {
        const response =await axios.get(`${BASE_URL}/jobs`);
        return response;
    } catch (e) {
        if (axios.isAxiosError(e)) {
        throw (
            e.response?.data || {
            errorMessage: "Invalid Data",
            }
        );
        }
        throw {
        errorMessage: "An unexpected error occured",
        };
    }
    }

export const getJob =async (id:any) => {
    try {
        const response =await axios.get(`${BASE_URL}/jobs/${id}`);
        return response;
    } catch (e) {
        if (axios.isAxiosError(e)) {
        throw (
            e.response?.data || {
            errorMessage: "Invalid Data",
            }
        );
        }
        throw {
        errorMessage: "An unexpected error occured",
        };
    }
    } 

export const updateJob =async (id:any, jobData:any) => {
    try {
        const response =await axios.put(
        `${BASE_URL}/jobs/${id}`,
        jobData
        );
        return response;
    } catch (e) {
        if (axios.isAxiosError(e)) {
        throw (
            e.response?.data || {
            errorMessage: "Invalid Data",
            }
        );
        }
        throw {
        errorMessage: "An unexpected error occured",
        };
    }
    }

export const deleteJob =async (id:any) => {
    try {
        const response =await axios.delete(`${BASE_URL}/jobs/${id}`);
        return response;
    } catch (e) {
        if (axios.isAxiosError(e)) {
        throw (
            e.response?.data || {
            errorMessage: "Invalid Data",
            }
        );
        }
        throw {
        errorMessage: "An unexpected error occured",
        };
    }
    }


export const jobApply = async (id:any, data:any) =>{
  try {
    const response = await axios.post(`${BASE_URL}/jobs/apply/${id}`,data)
    return response;
  } catch (e) {
     if (axios.isAxiosError(e)) {
       throw (
         e.response?.data || {
           errorMessage: "Invalid Data",
         }
       );
     }
     throw {
       errorMessage:
         "An unexpected error occured",
     };
  }
}

export const getPostedBy = async(id:any) =>{
  try {
    const response = await axios.get(`${BASE_URL}/poster/${id}`);
    return response;
  } catch (e) {
     if (axios.isAxiosError(e)) {
       throw (
         e.response?.data || {
           errorMessage: "Invalid Data",
         }
       );
     }
     throw {
       errorMessage:
         "An unexpected error occured",
     };
  }
}
