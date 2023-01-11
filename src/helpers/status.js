import { baseUrl } from "../config/baseUrl";

export const statusUpdate = (body) => {
  const { Id, status } = body;
  return fetch(`${baseUrl}/api/admin/user/${Id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
    body: JSON.stringify({ accountVerified: status }),
  })
    .then(async (response) => {
      const data = await response.json();
      let result = {
        status: response.status,
        data,
      };
      return result;
    })
    .catch((err) => {
      console.log(err);
    });
};
export const emailUpdate = (body) => {
  const { Id, status } = body;
  return fetch(`${baseUrl}/api/user/status/${Id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
    body: JSON.stringify({ emailVerified: status==="NotVerified"?false:true }),
  })
    .then(async (response) => {
      const data = await response.json();
      let result = {
        status: response.status,
        data,
      };
      return result;
    })
    .catch((err) => {
      console.log(err);
    });
};
export const TrainerVerification = (body) => {
  const { Id, status } = body;

  return fetch(`${baseUrl}/api/admin/trainer/status/${Id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
    body: JSON.stringify({ trainerVerified: status }),
  })
    .then((response) => response.json())
    .then((responseResult) => {
      return responseResult;
    })
    .catch((err) => {
      console.log(err);
    });
};
