import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "react-bootstrap/Card";
import SplashScreen from "../../../modules/Partials/SplashScreen";
import { Delete, Edit } from "@mui/icons-material";
import EditClass from "./Edit";
import Modals from "../modal";
import { baseUrl } from "../../../config/baseUrl";
import { GET_USER_DETAIL_BY_ID } from "../../../reducers/userReducer";

const Classes = (props) => {
  const { _id } = props;
  const [edit, setEdit] = useState(false);
  const [id, setId] = useState("");
  const [model, setModel] = React.useState(false);
  const [deleteClasses, setDeleteClasses] = useState(false);
  const [searching, setSearching] = useState("");
  const [trainerClassess, setTrainerClassess] = useState([]);
  const dispatch = useDispatch();

  const { loading, user_classes } = useSelector((state) => state.userData);
  const handleClose = () => {
    setEdit(false);
    setModel(false);
  };

  useEffect(() => {
    if (!searching) {
      setTrainerClassess(user_classes);
    }
  }, [user_classes]);

  const reload = () => {
    dispatch(GET_USER_DETAIL_BY_ID(_id));
  };

  const Searching = (e) => {
    setSearching(e.target.value);

    const query = e.target.value;
    const serachingRes = user_classes.filter((item) => {
      return item.class_name.toLowerCase().indexOf(query.toLowerCase()) !== -1;
    });
    setTrainerClassess(serachingRes);
  };

  const handleSorting = () => {
    setTrainerClassess(
      user_classes
        .slice()
        .sort((a, b) => a.class_name.localeCompare(b.class_name))
    );
  };
  return (
    <>
      {loading ? (
        <SplashScreen />
      ) : (
        <>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span
              onClick={handleSorting}
              style={{
                cursor: "pointer",
              }}
              className="btn-sorted px-3 pt-2 py-1"
            >
              Sort By Alphabets
            </span>
            <input
              className="form-control form-control-sm"
              style={{ width: "180px" }}
              placeholder="Search class by name"
              onChange={(e) => Searching(e)}
              value={searching}
            />
          </div>
          <div
            className="row py-3"
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            {trainerClassess?.length > 0
              ? trainerClassess?.map((item, index) => {
                  return (
                    <div className="col-12 col-md-5 mx-3 my-2" key={index}>
                      <Card
                        style={{
                          border: "1px solid black",
                        }}
                        className="text-center"
                      >
                        <Card.Body>
                          <div className="inline-data">
                            <Card.Title
                              style={{ fontSize: "20px" }}
                              className="mt-1 fw"
                            >
                              {item.class_name} Class
                            </Card.Title>
                            <Card.Title>
                              <Edit
                                style={{ color: "#4b49ac", cursor: "pointer" }}
                                onClick={() => {
                                  setEdit(!edit);
                                  setId(item._id);
                                }}
                              />
                              <Delete
                                className="text-danger"
                                style={{ cursor: "pointer" }}
                                onClick={() => {
                                  setModel(!model);
                                  setId(item._id);
                                  setDeleteClasses(true);
                                }}
                              />
                            </Card.Title>
                          </div>
                          <Card.Text className="py-2 text-black">
                            <div className="inline-data">
                              <h6 className="font-weight-bold">url</h6>
                              <p>{item.class_links}</p>
                            </div>
                            <div className="inline-data">
                              <h6 className="font-weight-bold">format</h6>
                              <p>{item.class_format}</p>
                            </div>
                            <div className="inline-data">
                              <h6 className="font-weight-bold">Des</h6>
                              <p>{item.class_des}</p>
                            </div>
                          </Card.Text>
                        </Card.Body>
                      </Card>
                    </div>
                  );
                })
              : "Classess does not found"}
            <EditClass
              edit={edit}
              handleClose={handleClose}
              id={id}
              reload={reload}
            />
            <Modals
              edit={model}
              handleClose={handleClose}
              data={id}
              suspended={false}
              deleted={true}
              deleteClasses={deleteClasses}
              url={`${baseUrl}/api/admin/classes/${id}`}
              reload={reload}
              operationsText={"delete"}
              relatedText={"class"}
            />
          </div>
        </>
      )}
    </>
  );
};

export default Classes;
