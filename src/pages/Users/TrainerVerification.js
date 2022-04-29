import React, { useState } from "react";
import { statusUpdate } from "../../helpers/status";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const StatusUpdate = (props) => {
  const [state, setState] = useState("");

  const { row, reload } = props;

  const ChangeState = (e, id) => {
    e.preventDefault();
    setState(e.target.value);
    StatusUpdateFunc(e.target.value, id);
  };

  const StatusUpdateFunc = async (status, Id) => {
    console.log("status", status);
    console.log("id", Id);
    let message;
    if (status == "approved") {
      message = "Status is appoved";
    } else if (status == "disappoved") {
      message = "Status is disappoved";
    } else if (status == "pending") {
      message = "Status is pending";
    }
    console.log("message", message);
    try {
      await statusUpdate({ Id, status, message }).then((result) => {
        console.log("status page", result);
        // console.log("status page message", data?.message);
        if (result.status == 201) {
          toast.success("status updated", {
            autoClose: 2000,
          });
          reload();
        } else {
          toast.error("something went wrong!", {
            autoClose: 3000,
          });
        }
      });
    } catch (error) {
      toast.error(error, {
        autoClose: 3000,
      });
    }
  };
  return (
    <>
      <form>
        <div style={{ overflow: "hidden", textOverflow: "ellipses" }}>
          <select
            name="orders"
            id="orders"
            className="form-control"
            onChange={(e) => ChangeState(e, row?._id)}
          >
            <option
              value="disapproved"
              selected={row?.TrainerVerified === "disapproved" ? true : false}
              disabled={row?.TrainerVerified === "disapproved" ? true : false}
            >
              Disapproved
            </option>
            <option
              value="approved"
              selected={row?.TrainerVerified === "approved" ? true : false}
              disabled={row?.TrainerVerified === "approved" ? true : false}
            >
              Approved
            </option>
            <option
              value="pending"
              selected={row?.TrainerVerified === "pending" ? true : false}
              disabled={row?.TrainerVerified === "pending" ? true : false}
            >
              Pending
            </option>
          </select>
        </div>
      </form>
    </>
  );
};

export default StatusUpdate;
