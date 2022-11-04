import { baseUrl } from "../config/baseUrl";

export const statusUpdate = async (body) => {
  console.log("helpers body", body);
  const { Id, status, message } = body;
  console.log("helpers id", Id);
  console.log("helpers status", status);
  return await fetch(`${baseUrl}/api/admin/user/${Id}`, {
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
      console.log("status helpers page", response);
      return result;
    })
    .catch((err) => {
      console.log(err);
    });
};
export const TrainerVerification = async (body) => {
  const { Id, status } = body;

  return await fetch(`${baseUrl}/api/admin/trainer/status/${Id}`, {
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
