import axios from "axios";

export const getUserDetails = async () => {
  try {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      throw new Error("User ID not found in localStorage");
    }

    const reqUrl = `http://localhost:4004/api/v1/auth/userDetails?userId=${userId}`;
    const response = await axios.get(reqUrl);
    const data = response.data;
    console.log(data);
    return data; // Return the data fetched from the server
  } catch (error) {
    throw error;
  }
};
