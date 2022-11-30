import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

import { baseUrl } from "../../config/baseUrl";
import { Close } from "@mui/icons-material";
const ProfileUpdate = (props) => {
  const { user } = useSelector((state) => state?.user);

  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [edit, setEdit] = useState(false);
  const [title, setTitle] = useState("");
  const [subTitle, setSubTitle] = useState("");
  const [labelTitle, setLabelTitle] = useState(" ");

  const [oldPassword, setOldPassword] = useState("");
  const [updateNewPassword, setUpdatePassword] = useState("");
  const [updateConfirmPassword, setUpdateConfirmPassword] = useState("");

  const { newEdit, data, handleClose, reload } = props;

  useEffect(() => {
    if (data?.name !== "") {
      updateName();
    } else if (data?.email !== "") {
      updateEmail();
    } else if (data?.password !== false) {
      updatePassword();
    }
  }, [data]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (edit && !(updateNewPassword || updateConfirmPassword || oldPassword)) {
      toast.error("Full fill requirments");
      setIsLoading(false);
    } else if (edit && updateNewPassword !== updateConfirmPassword) {
      toast.error("Password does not match");

      setIsLoading(false);
    } else if (edit === false && !name) {
      toast.error("Name is require");

      setIsLoading(false);
    } else {
      let res;
      try {
        res = await fetch(
          `${baseUrl}/api/profile/edit/${title}/${
            title === "name" ? data?.id : user?._id
          }`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
            body: JSON.stringify({
              email,
              name,
              password: updateNewPassword,
              oldPassword: oldPassword,
            }),
          }
        );
        setIsLoading(false);
        if (res?.status === 200 || res?.status === 201) {
          handleCloseButton();
          reload();
          toast.success(`${labelTitle} updated successfully`, {
            autoClose: 2000,
          });

          setIsLoading(false);
        } else {
          toast.error("Something went wrong", {
            autoClose: 2000,
          });
          setIsLoading(false);
        }
      } catch (error) {
        toast.error("Error", error, {
          autoClose: 2000,
        });
        setIsLoading(false);
      }
    }
  };
  const updateName = () => {
    setEdit(false);
    setLabelTitle("Name");
    setTitle("name");
    setSubTitle("This is how we we'll address you");
    setName(data?.name);
  };
  const updateEmail = () => {
    setEdit(false);
    setLabelTitle("Email");
    setTitle("email");
    setSubTitle("Make sure we can reach you at your new email");
    setEmail(data?.email);
  };
  const updatePassword = () => {
    setLabelTitle("Password");
    setEdit(true);
    setTitle("password");
    setSubTitle("Changing  your  password ? Go for at least 6 characters");
  };
  const handleCloseButton = () => {
    handleClose();
    setEdit(false);
    setLabelTitle("");
    setTitle("");
    setSubTitle("");
    setEmail("");
    setName("");
    setUpdatePassword("");
    setUpdateConfirmPassword("");
  };
  return (
    <div>
      <Modal
        size="md"
        show={newEdit}
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
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>

        <form
          onSubmit={handleSubmit}
          className="form form-label-right "
          encType="multipart/form-data"
        >
          <Modal.Body className="overlay overlay-block cursor-default pb-5  ">
            <div className="form-group row  mb-3">
              <div className="col-sm-12">
                <p>{subTitle}</p>
              </div>
              <div className="col-sm-12 mt-2">
                {edit ? (
                  <>
                    <label className="mt-2">Old {labelTitle}</label>
                    <input
                      className="typeahead"
                      type="password"
                      value={oldPassword}
                      onChange={(e) => setOldPassword(e.target.value)}
                      placeholder={`Old ${labelTitle}`}
                    />
                    <label>{labelTitle}</label>
                    <div id="the-basics">
                      <input
                        className="typeahead"
                        type="password"
                        value={updateNewPassword}
                        onChange={(e) => setUpdatePassword(e.target.value)}
                        placeholder={`New ${labelTitle}`}
                      />
                      <label className="mt-2">Confirm Password</label>
                      <input
                        className="typeahead"
                        type="password"
                        value={updateConfirmPassword}
                        onChange={(e) =>
                          setUpdateConfirmPassword(e.target.value)
                        }
                        placeholder={`Confirm New ${labelTitle}`}
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <label>{labelTitle}</label>
                    <div id="the-basics">
                      <input
                        className="typeahead"
                        disabled={data.email}
                        type="text"
                        value={data.name ? name : email}
                        onChange={
                          data?.name
                            ? (e) => setName(e.target.value)
                            : (e) => setEmail(e.target.value)
                        }
                        placeholder={labelTitle}
                      />
                    </div>{" "}
                  </>
                )}
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
        </form>
      </Modal>
    </div>
  );
};

export default ProfileUpdate;
