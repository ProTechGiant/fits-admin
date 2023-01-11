import React from 'react'
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { emailUpdate } from '../../helpers/status';
const EmailVerification = ({ row, reload }) => {
    const ChangeState = (e, id) => {
        e.preventDefault();
    
        StatusUpdateFunc(e.target.value, id);
      };
      const StatusUpdateFunc = async (status, Id) => {
        try {
          await emailUpdate({ Id, status }).then((result) => {
            if (result.status===201) {
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
    <form>
    <div style={{ overflow: "hidden", textOverflow: "ellipses" }}>
      <select
        name="orders"
        id="orders"
        className="form-control"
        onChange={(e) => ChangeState(e, row?._id)}
        value={row?.emailVerified===false ?"NotVerified":"Verified"}
      
      >
        <option
          value="NotVerified"
          disabled={row?.emailVerified ===  "NotVerified" ? true : false}
        >
          NotVerified
        </option>
        <option
          value="Verified"
          disabled={row?.emailVerified === "Verified" ? true : false}
        >
          Verified
        </option>
       
      </select>
    </div>
  </form>
  )
}

export default EmailVerification