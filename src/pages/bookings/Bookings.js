import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";
import SplashScreen from "../../modules/Partials/SplashScreen";
import { customStyles } from "../../modules/styles/customStyles";
import {
  BOOKED_SEESIONS,
  RECOMMEND_SEESIONS,
} from "../../reducers/bookingsReducer";
import Modals from "../Users/modal";
import { Delete } from "@mui/icons-material";
import { baseUrl } from "../../config/baseUrl";

const Bookings = () => {
  const { loading, bookings } = useSelector((state) => state.bookings);
  const [recommend, setRecommend] = useState(false);
  const [model, setModel] = useState(false);
  const [data, setData] = useState({});
  const [modalText, setModalText] = React.useState("");
  const [deleted, setDeleted] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(BOOKED_SEESIONS());
  }, []);

  const reload = () => {
    dispatch(BOOKED_SEESIONS());
  };

  const handleClose = () => {
    setModel(false);
  };

  const recommendSessions = () => {
    dispatch(RECOMMEND_SEESIONS(data));
  };

  const columns = [
    {
      name: "Trainer",
      selector: (row) => row?.trainer?.email,
    },
    {
      name: "Trainee",
      selector: (row) => row?.trainee?.email,
    },
    {
      name: "Session Category",
      selector: (row) => row?.session?.category,
    },
    {
      name: "Session Time",
      selector: (row) => row?.session?.class_time,
    },
    {
      name: "Session Duration",
      selector: (row) => row?.session?.duration,
    },
    {
      name: "Session Price",
      selector: (row) => row?.session?.price,
    },
    {
      name: "Session Slots",
      selector: (row) => row?.session?.no_of_slots,
    },
    {
      name: "Session Reviews",
      selector: (row) => row?.session?.numReviews,
    },
    {
      name: "Actions",
      cell: (row) => (
        <div
          className="text-success font-weight-bold"
          style={{ cursor: "pointer" }}
          onClick={() => {
            setData(row);
            setModalText(row?.recommended ? "Unrecommend" : "Recommend");
            setRecommend(true);
            setDeleted(false);
            setModel(!model);
          }}
        >
          {row?.recommended ? "Recommended" : "Unrecommended"}
        </div>
      ),
    },
    {
      name: "Actions",
      cell: (row) => {
        return (
          <button
            type="button"
            className="btn btn-icon mr-2 hover-red"
            onClick={() => {
              console.log("=============>", row);
              setData(row);
              setRecommend(false);
              setDeleted(true);
              setModel(!model);
            }}
          >
            <Delete />
          </button>
        );
      },
    },
  ];
  return (
    <div className="content-wrapper">
      <div className="card">
        <div className="card-body">
          <div className="col-12 col-md-8 mb-4 mb-xl-0">
            <h3 className="font-weight-bold">Booked Sessions</h3>
            <h6 className="font-weight-normal mb-3">
              All registered trainers listed here
            </h6>
          </div>
          {loading ? (
            <center>
              <SplashScreen />
            </center>
          ) : (
            <div>
              <DataTable
                columns={columns}
                data={bookings}
                customStyles={customStyles}
                pagination
              />
            </div>
          )}
          <Modals
            edit={model}
            handleClose={handleClose}
            data={data}
            suspended={false}
            deleted={deleted}
            recommended={recommend}
            url={`${baseUrl}/api/book-a-session/trainee/${data._id}`}
            reload={reload}
            operationsText={deleted ? "Delete" : modalText}
            relatedText={"Session"}
            operationFunctions={recommendSessions}
          />
        </div>
      </div>
    </div>
  );
};

export default Bookings;
