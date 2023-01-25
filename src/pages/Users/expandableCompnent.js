import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { baseUrl } from "../../config/baseUrl";
import { fetch2 } from "../../reducers/helper/fetch";
import { toast } from "react-toastify";

const ExpandableCompnent = ({ data }) => {
  const [password, setPassword] = useState("");
  console.log("pass", password);
  const handleUpdatePassword = () => {
    fetch2(
      `${baseUrl}/api/admin/update/user/password/${data._id}`,
      { password: password },
      "put"
    ).then((res) => {
      console.log(res);
      if (res.statusCode === 200) {
        toast.success(res.message, {
          autoClose: 1000,
        });
      } else {
        toast.error(res.message, {
          autoClose: 1000,
        });
      }
    });
  };
  return (
    <div
      className="form-group row m-4"
      style={{ display: "flex", flexDirection: "row" }}
    >
      <div style={{ width: "40%" }}>
        <label className="form-label pr-1 fw" style={{ fontSize: "18px" }}>
          Update Password
        </label>
        <input
          type="password"
          className="form-control"
          style={{ width: "93%" }}
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          placeholder="Edit Password"
        />
      </div>
      <div className="mt-2">
        <button
          type="button"
          className="btn btn-inverse-info btn-icon fa fa-fw fa-pencil field-icon toggle-password mt-4"
          onClick={() => handleUpdatePassword(data)}
        ></button>
      </div>
    </div>
  );
};

export default ExpandableCompnent;
