import ArrowBack from "@mui/icons-material/ArrowBack";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import UserInformation from "./userInformation";

const RefundDetail = () => {
  const history = useHistory();

  const { transaction_history_refund } = useSelector((state) => state.userData);
  console.log(transaction_history_refund);
  return (
    <div className="card">
      <div style={{ cursor: "pointer" }} onClick={() => history.goBack()}>
        <ArrowBack />
      </div>
      {transaction_history_refund.length > 1 ? (
        transaction_history_refund.map((item, i) => (
          <div className="row" key={i}>
            <UserInformation type={"Sender"} item={item.sender} />
            <UserInformation
              type={"Receiver"}
              item={item.receiver ? item.receiver : item.reciver}
            />
          </div>
        ))
      ) : (
        <div className="font-weight-normal text-center">
          User Transaction details are not found.
        </div>
      )}
    </div>
  );
};

export default RefundDetail;
