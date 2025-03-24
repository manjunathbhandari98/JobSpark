import axios from 'axios'
const BASE_URL = import.meta.env.VITE_REACT_APP_API_URL;

export const registerUser = async (user: any) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/users/register`,
      user,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response;
  } catch (e: unknown) {
    // Use `unknown` for better type safety
    if (axios.isAxiosError(e)) {
      throw (
        e.response?.data || {
          message: "Signup failed",
        }
      );
    }
    throw {
      message:"An unexpected error occurred",
    };
  }
};


export const loginUser = async(loginData:any) =>{
    try {
        const response = await axios.post(
            `${BASE_URL}/users/login`,
            loginData,
            {
            headers:{
                'Content-Type':'application/json'
            }
        });
        return response;
    } catch (e:unknown) {
      if (axios.isAxiosError(e)) {
        throw (
          e.response?.data || {
            message: "Signup failed",
          }
        );
      }
      throw {
        message: "An unexpected error occurred",
      };
    }
}

export const sendOTP = async (email: any) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/users/sendOTP/${email}`
    );

    // If the backend returns an error response, explicitly throw it
    if (response.data.success === false) {
      throw {
        errorMessage:
          response.data.message ||
          "Failed to send OTP",
      };
    }

    return response.data;
  } catch (e) {
    if (axios.isAxiosError(e)) {
      throw (
        e.response?.data || {
          errorMessage: "Invalid Email",
        }
      );
    }
    throw {
      errorMessage:
        "An unexpected error occurred",
    };
  }
};

export const verifyOTP = async(email:any, otp:any) =>{
  try{
    const response = await axios.get(`${BASE_URL}/users/verifyOTP/${email}/${otp}`);
    if (response.data.success === false){
      throw{
      errorMessage: response.data.message || 'Failed to verify OTP'
    }}
  }
  catch(e){
    if(axios.isAxiosError(e)){
      throw(
        e.response?.data || {
          errorMessage: 'Invalid Data',
        }
      )
    }
    throw{
      errorMessage:'An unexpected error occured'
    }
  }
}

export const resetPassword = async(email:any,password:any) =>{
  try{
    const data = {
      email:email,
      password:password
    }
    const response = await axios.post(`${BASE_URL}/users/resetPassword`,data)
    if (response.data.success === false){
      throw{
        errorMessage:response.data.message || 'Failed to Reset password'
      }
    }
    console.log(data)
  }
  catch(e){
    if(axios.isAxiosError(e)){
      throw(e.response?.data || {
        errorMessage: 'Invalid Data'
      })
    }
    throw{
      errorMessage: 'An unexpected error occured'
    }
  }
}

