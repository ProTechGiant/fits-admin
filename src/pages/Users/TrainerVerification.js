import { TrainerVerification } from "../../helpers/status";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const StatusUpdate = ({ row, reload }) => {
  const ChangeState = (e, id) => {
    e.preventDefault();
    StatusUpdateFunc(e.target.value, id);
  };

  const StatusUpdateFunc = async (status, Id) => {
    try {
      await TrainerVerification({ Id, status }).then((result) => {
        if (result?.statusCode === 200) {
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
            value={row?.trainerVerified}
          >
            <option
              value="disapproved"
              selected={row?.trainerVerified === "disapproved" ? true : false}
              disabled={row?.trainerVerified === "disapproved" ? true : false}
            >
              Disapproved
            </option>
            <option
              value="approved"
              selected={row?.trainerVerified === "approved" ? true : false}
              disabled={row?.trainerVerified === "approved" ? true : false}
            >
              Approved
            </option>
            <option
              value="pending"
              selected={row?.trainerVerified === "pending" ? true : false}
              disabled={row?.trainerVerified === "pending" ? true : false}
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
