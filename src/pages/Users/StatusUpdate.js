import { statusUpdate } from "../../helpers/status";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const StatusUpdate = ({ row, reload }) => {
  const ChangeState = (e, id) => {
    e.preventDefault();

    StatusUpdateFunc(e.target.value, id);
  };
  const StatusUpdateFunc = async (status, Id) => {
    try {
      await statusUpdate({ Id, status }).then((result) => {
        if (result.data.statusCode === 200) {
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
            defaultValue={row?.accountVerified}
          >
            <option
              value="disapproved"
              selected={row?.accountVerified === "disapproved" ? true : false}
              disabled={row?.accountVerified === "disapproved" ? true : false}
            >
              Disapproved
            </option>
            <option
              value="approved"
              selected={row?.accountVerified === "approved" ? true : false}
              disabled={row?.accountVerified === "approved" ? true : false}
            >
              Approved
            </option>
            <option
              value="pending"
              selected={row?.accountVerified === "pending" ? true : false}
              disabled={row?.accountVerified === "pending" ? true : false}
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
