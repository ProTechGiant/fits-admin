import React, { useState } from "react";
import { Modal } from "react-bootstrap";

const Edit = (props) => {
  const { show, handleClose } = props;
  console.log("handle", show);
  const [role, setRole] = useState("");
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        size="md"
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header>
          <span
            style={{
              right: "0",
              position: "absolute",
              marginRight: "20px",
              cursor: "pointer",
            }}
            onClick={handleClose}
          >
            <i class="fas fa-times"></i>
          </span>
          <Modal.Title>Users</Modal.Title>
        </Modal.Header>
        <Modal.Body className="overlay overlay-block cursor-default">
          <form className="form form-label-right">
            {/*  Form */}
            <div className="form-group row">
              <div className="col-lg-6">
                <label htmlFor="ProductName">Role</label>
                <input
                  type="text"
                  className="form-control"
                  value={role}
                  onChange={(e) => {
                    setRole(e.target.value);
                  }}
                  placeholder="Role"
                />
              </div>
              <div className="col-lg-6">
                <label htmlFor="ProductName">Role</label>
                <input
                  type="text"
                  className="form-control"
                  value={role}
                  onChange={(e) => {
                    setRole(e.target.value);
                  }}
                  placeholder="Role"
                />
              </div>
            </div>
            {/* <button
              type="submit"
              //   onClick={handleSubmit}
              className="btn btn-danger mr-2"
              style={{ width: "6rem" }}
              disabled={isLoading ? "true" : null}
            >
              {isLoading ? (
                <div
                  class="spinner-border spinner-border-sm"
                  role="status"
                ></div>
              ) : (
                "Submit"
              )}
            </button> */}
            <button
              type="button"
              className="btn btn-light"
              onClick={handleClose}
            >
              Cancel
            </button>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};
export default Edit;
