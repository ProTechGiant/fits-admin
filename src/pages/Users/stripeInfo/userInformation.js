import React from "react";
import { Card } from "react-bootstrap";

const UserInformation = (props) => {
  const { type, item } = props;
  return (
    <div className="col-12 col-md-6">
      <div className="card">
        <div className="card-body">
          <h4 className="text-center font-weight-bolder">{type}</h4>
          <Card
            style={{
              border: "1px solid black",
            }}
            className="text-center"
          >
            <Card.Body>
              <Card.Text className="py-2 text-black">
                <div className="inline-data">
                  <h6 className="font-weight-bold">Amount</h6>
                  <p>{item?.amount}</p>
                </div>
                <div className="inline-data">
                  <h6 className="font-weight-bold">Balance</h6>
                  <p>{item?.ending_balance}</p>
                </div>
                <div className="inline-data">
                  <h6 className="font-weight-bold">Customer</h6>
                  <p>{item?.customer}</p>
                </div>
              </Card.Text>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default UserInformation;
