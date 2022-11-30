import { baseUrl } from "../config/baseUrl";

export const login = async (body) => {
  try {
    const response = await fetch(`${baseUrl}/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

export const authenticate = (data, next) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("access_token", data?.access_token);
    next();
  }
};

export const isAuthenticated = () => {
  if (typeof window == "undefined") {
    return false;
  }
  if (localStorage.getItem("access_token")) {
    return JSON.parse(localStorage.getItem("access_token"));
  } else {
    return false;
  }
};

export const me = async () => {
  try {
    return fetch(`${baseUrl}/api/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    }).then((response) => {
      return response.json();
    });
  } catch (err) {
    console.log(err);
  }
};
export const totalRecords = async () => {
  try {
    const response = await fetch(`${baseUrl}/api/records/total`, {
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
