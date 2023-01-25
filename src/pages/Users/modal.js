import React from "react";
import { Modal } from "react-bootstrap";
import { fetch3 } from "../../reducers/helper/fetch";

const Modals = (props) => {
  const {
    edit,
    handleClose,
    data,
    suspended,
    deleted,
    url,
    reload,
    operationsText,
    relatedText,
    recommended,
    operationFunctions,
  } = props;
  const [isLoading, setIsLoading] = React.useState(false);
  const handleCloseButton = () => {
    handleClose();
  };
  const afterResponse = () => {
    handleClose();
    setIsLoading(false);
    reload();
  };

  const submit = async () => {
    setIsLoading(true);
    if (deleted) {
      fetch3(url, "delete").then((res) => {
        if (res.statusCode === 200) {
          afterResponse();
        }
      });
    } else if (recommended || suspended) {
      operationFunctions();
      afterResponse();
    }
  };

  return (
    <div>
      <Modal
        size="md"
        show={edit}
        onHide={handleCloseButton}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header>
          <Modal.Title className="p-1">
            Are you sure you want to {operationsText} this{" "}
            <span className="p-1 fw">{data?.email}</span> {relatedText}
          </Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <button
            type="button"
            onClick={handleCloseButton}
            className="btn btn-light btn-elevate"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn btn-danger btn-elevate"
            disabled={isLoading ? true : false}
            style={{ width: "fit-content" }}
            onClick={submit}
          >
            {isLoading ? (
              <div
                className="spinner-border spinner-border-sm"
                role="status"
              ></div>
            ) : (
              operationsText
            )}
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Modals;
