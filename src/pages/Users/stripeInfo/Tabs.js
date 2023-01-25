import React from "react";
import { Tab, Tabs } from "react-bootstrap";
import { useParams } from "react-router-dom";
import TransactionUsersDetail from "./bookingDetails";
import RefundDetail from "./refundDetails";
import TransactionDetails from "./TransactionDetails";

const TransactionTabs = () => {
  const { cus_id, create, type } = useParams();

  return (
    <Tabs
      defaultActiveKey="Recharge Detail"
      className="mt-5"
      id="justify-tab-example"
      justify
    >
      <Tab eventKey="Recharge Detail" title="Recharge Detail">
        <TransactionDetails cus_id={cus_id} create={create} type={type} />
      </Tab>
      <Tab eventKey="Booking Detail" title="Booking Detail">
        <TransactionUsersDetail />
      </Tab>
      <Tab eventKey="Refund detail" title="Refund detail">
        <RefundDetail />
      </Tab>
    </Tabs>
  );
};

export default TransactionTabs;
