import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { Close } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import {
  GET_CLASS_BY_ID,
  UPDATE_CLASS_BY_ID,
} from "../../../reducers/userReducer";
const EditClass = (props) => {
  const dispatch = useDispatch();
  const { single_class, isLoading, success } = useSelector(
    (state) => state.userData
  );

  const { edit, handleClose, id, reload } = props;
  const [name, setName] = useState("");
  const [des, setDes] = useState("");
  const [link, setLink] = useState("");
  const [format, setFormat] = useState("");
  const handleCloseButton = () => {
    handleClose();
  };
  const getData = () => {
    dispatch(GET_CLASS_BY_ID(id));
  };
  useEffect(() => {
    getData();
  }, [id]);
  useEffect(() => {
    setName(single_class?.data?.class_name);
    setLink(single_class?.data?.class_links);
    setDes(single_class?.data?.class_des);
    setFormat(single_class?.data?.class_format);
  }, [single_class, dispatch]);

  const handleSubmit = () => {
    const body = {
      class_name: name,
      class_links: link,
      class_des: des,
      class_format: format,
    };
    dispatch(UPDATE_CLASS_BY_ID({ id, body }));
    if (success) {
      handleClose();
      reload();
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
          <span
            style={{
              right: "0",
              position: "absolute",
              marginRight: "20px",
              cursor: "pointer",
            }}
            onClick={handleCloseButton}
          >
            <Close />
          </span>
          <Modal.Title>Update Classes</Modal.Title>
        </Modal.Header>
        <Modal.Body className="overlay overlay-block cursor-default pb-5  ">
          <div className="form-group row  mb-3">
            <div className="col-sm-12">{/* <p>{subTitle}</p> */}</div>
            <div className="col-sm-12 mt-2">
              <>
                <label className="mt-2">Class Name</label>
                <input
                  className="typeahead"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Class Name"
                />
                <label className="mt-2">Class Link</label>
                <input
                  className="typeahead"
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                  placeholder="link"
                />
                <label className="mt-2">Class Des</label>
                <input
                  className="typeahead"
                  value={des}
                  onChange={(e) => setDes(e.target.value)}
                  placeholder="description"
                />
                <label className="mt-2">Class Format</label>
                <input
                  className="typeahead"
                  value={format}
                  onChange={(e) => setFormat(e.target.value)}
                  placeholder="format"
                />
              </>
            </div>
          </div>
        </Modal.Body>
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
            style={{ width: "6rem" }}
            onClick={handleSubmit}
          >
            {isLoading ? (
              <div
                className="spinner-border spinner-border-sm"
                role="status"
              ></div>
            ) : (
              "Save"
            )}
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default EditClass;
