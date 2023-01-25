import ArrowBack from "@mui/icons-material/ArrowBack";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { fetch3 } from "../../../reducers/helper/fetch";
import { GET_CUSTOMER_DETAIL_BY_ID } from "../../../reducers/userReducer";
import UserInformation from "./userInformation";

const TransactionUsersDetail = () => {
  const history = useHistory();

  const { transaction_history_booking } = useSelector(
    (state) => state.userData
  );

  return (
    <div className="card">
      <div style={{ cursor: "pointer" }} onClick={() => history.goBack()}>
        <ArrowBack />
      </div>
      {transaction_history_booking.length > 1 ? (
        transaction_history_booking.map((item, i) => (
          <div className="row" key={i}>
            <UserInformation type={"Sender"} item={item.sender} />
            <UserInformation type={"Receiver"} item={item.receiver} />
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

export default TransactionUsersDetail;
