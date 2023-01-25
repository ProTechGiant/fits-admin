import React, { useEffect } from "react";
import { useState } from "react";
import { Card, ListGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { CURRENCY_SYMBOLS } from "../../../countryList/countryList";
import { transactionHistory } from "../../../reducers/userReducer";
import ArrowBack from "@mui/icons-material/ArrowBack";
import Lists from "./DetailList";
const TransactionDetails = (props) => {
  const { cus_id, create, type } = props;

  const history = useHistory();
  const dispatch = useDispatch();
  const { stripe, user_transaction_history } = useSelector(
    (state) => state.userData
  );

  useEffect(() => {
    dispatch(transactionHistory({ type: type, create: create, id: cus_id }));
  }, []);
  const rechargeAccountData =
    user_transaction_history?.infoTransferUser?.recharge;
  return (
    <>
      <div className="container-fluid mt-2">
        <div style={{ cursor: "pointer" }} onClick={() => history.goBack()}>
          <ArrowBack />
        </div>
        <div
          className="row"
          style={{ display: "flex", justifyContent: "center" }}
        >
          <div className="col-12 col-md-10 mt-4 ">
            <Card
              style={{
                background: "#2332",
              }}
            >
              <Card.Body>
                <Card.Title>{type} Detail</Card.Title>
                {/* <Card.Img
                  style={{ height: "10%" }}
                  variant="top"
                  src="https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8YWNjb3VudHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
                /> */}

                {/* <Card.Text className="mt-3 text-center font-weight-bolder">
                  {[type.toUpperCase()]} DETAIL
                </Card.Text> */}

                <ListGroup className="list-group-flush">
                  <ListGroup.Item className="bg bg-dark text-white">
                    <small>
                      {type} Name
                      <span className="float-right">
                        {stripe?.customer?.name}
                      </span>
                    </small>
                  </ListGroup.Item>
                  <Lists
                    keyData={"Currency"}
                    value={`${rechargeAccountData?.amount}
                        ${
                          CURRENCY_SYMBOLS[
                            rechargeAccountData?.currency.toUpperCase()
                          ]
                        }`}
                    bgcolor={"gray"}
                  />
                  <Lists keyData={"Email"} value={stripe?.customer?.email} />
                  <Lists
                    keyData={"Transaction"}
                    value={new Date(
                      stripe?.customer?.created * 1000
                    ).toLocaleString()}
                    bgcolor={"gray"}
                  />
                  <Lists
                    keyData={"Balance"}
                    value={stripe?.customer?.balance}
                  />
                  <Lists
                    keyData={"Card"}
                    value={`***************${stripe?.card?.last4}`}
                    bgcolor={"gray"}
                  />
                  <Lists
                    keyData={"Description"}
                    value={rechargeAccountData?.description}
                  />
                  <Lists
                    keyData={"Payment Type"}
                    value={rechargeAccountData?.payment_method_details?.type}
                    bgcolor={"gray"}
                  />
                  <Lists
                    keyData={"Funding Type"}
                    value={rechargeAccountData?.source?.funding}
                  />
                  <Lists
                    keyData={"Invoice Prefixes"}
                    value={stripe?.customer?.invoice_prefix}
                    bgcolor={"gray"}
                  />
                  <Lists
                    keyData={"Seller message"}
                    value={rechargeAccountData?.outcome?.seller_message}
                  />
                  <Lists
                    keyData={"Status"}
                    value={rechargeAccountData?.status}
                    bgcolor={"gray"}
                  />
                </ListGroup>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default TransactionDetails;
