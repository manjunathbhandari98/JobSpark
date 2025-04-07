import axios from "axios";

const BASE_URL = import.meta.env
  .VITE_REACT_APP_API_URL;

// GET notifications by user ID
export const getNotifications = async (
  id: any
) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/notifications/get/${id}`
    );
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw (
        error.response?.data || {
          errorMessage: "Invalid Data",
        }
      );
    }
    throw {
      errorMessage:
        "An unexpected error occurred",
    };
  }
};

// ✅ UPDATE notifications to mark as READ for a user
export const markNotificationsAsRead = async (
  userId: number,
  notificationId: number
) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/notifications/update/${userId}/${notificationId}`,
      "READ", // ✅ raw string
      {
        headers: {
          "Content-Type": "application/json", // ✅ important!
        },
      }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw (
        error.response?.data || {
          errorMessage:
            "Failed to update notifications",
        }
      );
    }
    throw {
      errorMessage:
        "An unexpected error occurred",
    };
  }
};
