import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleTransactionsCustomer } from "../../../reducers/userReducer";
import TransactionHistory from "./TransactionHistory";

const Stripe = () => {
  const { stripe } = useSelector((state) => state.userData);

  const [limit, setLimit] = useState(1000);
  const dispatch = useDispatch();
  useEffect(() => {
    if (stripe?.customer?.id) {
      dispatch(
        handleTransactionsCustomer({ id: stripe?.customer?.id, limit: limit })
      );
    }
  }, [stripe]);

  return (
    <>
      <div className="container-fluid mb-5">
        <div className="row text-success font-weight-bold">
          <div className="col-6 text-start">
            <label>Closing balance</label>
          </div>
          <div className="col-6 text-right">
            <label>
              $ {stripe?.customer?.balance ? stripe?.customer?.balance : 0}
            </label>
          </div>
          <div className="col-6 text-start">Name</div>
          <div className="col-6 text-right">
            <small> {stripe?.customer?.name}</small>
          </div>
          <div className="col-6 text-start mt-3">Email</div>
          <div className="col-6 text-right mt-3">{stripe?.customer?.email}</div>
          <div className="col-6 text-start mt-3">Address</div>
          <div className="col-6 text-right mt-3">
            {stripe?.customer?.address
              ? stripe?.customer?.address
              : "adreess not found"}
          </div>
          <div className="col-6 text-start mt-3">Phone</div>
          <div className="col-6 text-right mt-3">{stripe?.customer?.phone}</div>
        </div>
      </div>
      <TransactionHistory />
    </>
  );
};

export default Stripe;
