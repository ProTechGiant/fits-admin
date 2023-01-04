import React, { useEffect } from "react";
import { useState } from "react";
import { Card, ListGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { CURRENCY_SYMBOLS } from "../../../countryList/countryList";
import { transactionHistory } from "../../../reducers/userReducer";

const TransactionDetails = () => {
  const { stripe, user_transaction_history, transaction_history } = useSelector(
    (state) => state.userData
  );

  const [limit, setLimit] = useState(3);
  const { cus_id, create, type } = useParams();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(transactionHistory({ type: type, create: create, id: cus_id }));
  }, []);

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-6 mt-4 ">
            <Card
              style={{
                background: "#2332",
              }}
            >
              <Card.Body>
                <Card.Title>{type}</Card.Title>
                <Card.Img
                  style={{ height: "50vh" }}
                  variant="top"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuHNrp8-1tdA_CI1W2B0yrgjuWY8zR5782dQ&usqp=CAU"
                />

                <Card.Text className="mt-3 text-success text-center font-weight-bolder ">
                  {[type.toUpperCase()]} DETAIL
                </Card.Text>

                <ListGroup className="list-group-flush">
                  <ListGroup.Item className="bg bg-dark text-white">
                    <small>
                      {type} Name
                      <span className="float-right">
                        {stripe?.customer?.name}
                      </span>
                    </small>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <small>
                      currency
                      <span className="float-right">
                        {`${
                          type == "reciver"
                            ? user_transaction_history?.infoTransferUser
                                ?.reciver?.amount
                            : user_transaction_history?.infoTransferUser?.sender
                                ?.amount
                        }
                        ${
                          CURRENCY_SYMBOLS[
                            stripe?.customer?.currency.toUpperCase()
                          ]
                        }`}
                      </span>
                    </small>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <small>
                      email{" "}
                      <span className="float-right">
                        {" "}
                        {stripe?.customer?.email}
                      </span>
                    </small>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <small>
                      {" "}
                      transaction
                      <span className="float-right">
                        {" "}
                        {new Date(
                          stripe?.customer?.created * 1000
                        ).toLocaleString()}
                      </span>
                    </small>{" "}
                  </ListGroup.Item>
                </ListGroup>
              </Card.Body>
            </Card>
          </div>
          <div className="col-12 col-md-6 mt-4 ">
            <Card
              style={{
                background: "#2332",
              }}
            >
              <Card.Body>
                <Card.Title>
                  {" "}
                  {type === "sender" ? "Reciver" : "Sender"}
                </Card.Title>
                <Card.Img
                  style={{ height: "50vh" }}
                  variant="top"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuHNrp8-1tdA_CI1W2B0yrgjuWY8zR5782dQ&usqp=CAU"
                />

                <Card.Text className="mt-3 text-success text-center font-weight-bolder ">
                  {type === "sender" ? "RECIVER" : "SENDER"} DETAIL
                </Card.Text>

                <ListGroup className="list-group-flush">
                  <ListGroup.Item className="bg bg-dark text-white">
                    <small>
                      {type === "sender" ? "reciver" : "sender"} name
                      <span className="float-right">
                        {" "}
                        {user_transaction_history?.infoStripeUser?.name}
                      </span>
                    </small>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <small>
                      currency
                      <span className="float-right">
                        {`${
                          type === "sender"
                            ? user_transaction_history?.infoTransferUser
                                ?.reciver?.amount
                            : user_transaction_history?.infoTransferUser?.sender
                                ?.amount
                        }
                        ${
                          CURRENCY_SYMBOLS[
                            user_transaction_history?.infoStripeUser?.currency.toUpperCase()
                          ]
                        }`}
                      </span>
                    </small>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <small>
                      email{" "}
                      <span className="float-right">
                        {" "}
                        {user_transaction_history?.infoStripeUser?.email}
                      </span>
                    </small>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <small>
                      {" "}
                      transaction
                      <span className="float-right">
                        {new Date(
                          user_transaction_history?.infoStripeUser?.created *
                            1000
                        ).toLocaleString()}{" "}
                      </span>
                    </small>{" "}
                  </ListGroup.Item>
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
