import React from "react";
import { ListGroup } from "react-bootstrap";

const Lists = ({ keyData, value, bgcolor }) => {
  return (
    <ListGroup.Item className={`bg-${bgcolor} text-black`}>
      <small className="font-weight-bold">
        {keyData} <span className="float-right"> {value}</span>
      </small>
    </ListGroup.Item>
  );
};

export default Lists;
