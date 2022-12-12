import { useEffect } from "react";
import { useSelector } from "react-redux";

const Stripe = () => {
  const { stripe } = useSelector((state) => state.userData);

  useEffect(() => {}, [stripe]);
  return (
    <div className="container">
      <div className="row">
        <div className="col-4">
          <label className="font-weight-bold">Closing balance</label>
        </div>
        <div className="col-4"></div>
        <div className="col-4 text-right">
          <label className="font-weight-bold text-success ">
            {stripe?.customer?.balance}
          </label>
        </div>
      </div>
    </div>
  );
};

export default Stripe;
