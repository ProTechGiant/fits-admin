import { useEffect } from "react";
import { useSelector } from "react-redux";

const Stripe = () => {
  const { loading, stripe } = useSelector((state) => state.userData);

  useEffect(() => {}, [stripe]);
  return <div>Stripe</div>;
};

export default Stripe;
