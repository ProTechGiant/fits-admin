import axios from "axios";
import { baseUrl } from "../config/baseUrl";

export const getCategory = async () => {
  try {
    const response = await fetch(`${baseUrl}/api/categories`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

export const addCategory = async (body) => {
  try {
    const response = await axios.post(`${baseUrl}/categories`, body, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    });
    return response.json();
  } catch (err) {
    console.log(err);
  }
};
