import React, { useEffect, useState } from "react";
import SplashScreen from "../../modules/Partials/SplashScreen";
import { Link } from "react-router-dom";
import { customStyles } from "../../modules/styles/customStyles";
import DataTable from "react-data-table-component";
import moment from "moment";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { GET_USER_DATA, SUSPEND_ACCOUNT } from "../../reducers/userReducer";
import StatusUpdate from "./StatusUpdate";
import TrainerVerification from "./TrainerVerification";
import Edit from "./Edit";
import { Delete, Launch } from "@mui/icons-material";
import { fetch3 } from "../../reducers/helper/fetch";
import { baseUrl } from "../../config/baseUrl";
import Modal from "./modal";
import ExpandableCompnent from "./expandableCompnent";
import EmailVerification from "./EmailVerification";

toast.configure();

const Trainer = () => {
  const dispatch = useDispatch();
  const [tarinerFilter, setTrainerFilter] = React.useState([]);
  const [totalUsers, setTotalUsers] = React.useState(0);
  const [offset, setOffset] = React.useState(0);
  const [rowId, setRowId] = React.useState("");
  const [searching, setSearching] = useState("");
  const [suspended, setSuspended] = useState(false);
  const [deleted, setDeleted] = useState(false);

  // edit or delete
  const [editShow, setEditShow] = React.useState(false);
  const [model, setModel] = React.useState(false);
  const [data, setData] = React.useState({});
  const [modalText, setModalText] = React.useState("");
  const { loading, trainer } = useSelector((state) => state.userData);

  useEffect(() => {
    if (!searching) {
      setTrainerFilter(trainer);
    }
  }, [trainer]);

  const onChange = async (e) => {
    setSearching(e.target.value);

    const query = e.target.value;
    const serachingRes = trainer.filter((item) => {
      return item.email.toLowerCase().indexOf(query.toLowerCase()) !== -1;
    });
    setTrainerFilter(serachingRes);
  };
  const handleRemoveFilter = () => {
    setSearching("");
  };
  const HandleEditShow = (row) => {
    setEditShow(true);
  };
  const handleClose = () => {
    setEditShow(false);
    setModel(false);
  };

  const reload = () => {
    dispatch(GET_USER_DATA());
  };

  const suspendAccount = () => {
    dispatch(SUSPEND_ACCOUNT(data));
  };

  const columns = [
    {
      name: "Image",
      sortable: true,
      width: "100px",
      cell: (row, index) => (
        <img
          className="rounded-circle"
          width="40px"
          alt="img-notFound"
          src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
        />
      ),
    },
    {
      name: "Role",
      sortable: true,
      width: "140px",
      cell: (row) => (
        <div style={{ overflow: "hidden", textOverflow: "ellipses" }}>
          {row.role}
        </div>
      ),
    },

    {
      name: "Email",
      sortable: true,
      width: "170px",
      cell: (row) => row?.email,
    },
    {
      name: "Registered At",
      sortable: true,
      width: "160px",
      cell: (row) => (
        <div style={{ overflow: "hidden", textOverflow: "ellipses" }}>
          {moment(row?.createdAt).format("lll")}
        </div>
      ),
    },

    {
      name: "Account Status",
      sortable: true,
      width: "160px",
      cell: (row) => (
        <div style={{ overflow: "hidden", textOverflow: "ellipses" }}>
          <StatusUpdate reload={reload} row={row} />
        </div>
      ),
    },
    {
      name: "Trainer Verified",
      sortable: true,
      width: "160px",
      cell: (row) => (
        <div style={{ overflow: "hidden", textOverflow: "ellipses" }}>
          <TrainerVerification row={row} reload={reload} />
        </div>
      ),
    },
    {
      name: "Email Verified",
      sortable: true,
      width: "120px",
      cell: (row) => <EmailVerification reload={reload} row={row} />,
    },
    {
      name: "Actions",
      cell: (row) => (
        <Link
          to={`/admin/${row?.role}/${row?._id}`}
          className="btn btn-icon mt-3 ml-2"
          style={{ color: "#248afd" }}
        >
          <Launch />
        </Link>
      ),
    },
    {
      name: "Suspend",
      sortable: true,
      width: "100px",
      cell: (row) => (
        <div
          className={`fw ${
            row.suspended
              ? "badge text-center badge-text-black"
              : "badge badge-text-red hover-red"
          }`}
          style={{ cursor: "pointer" }}
          onClick={() => {
            setModel(!model);
            setData(row);
            setDeleted(false);
            setSuspended(true);
            setModalText(!row.suspended ? "Suspend" : "Resume");
          }}
        >
          {row.suspended ? "paused" : "suspended"}
        </div>
      ),
    },
    {
      name: "Actions",
      cell: (row) => {
        return (
          <>
            <button
              type="button"
              className="btn btn-icon mr-2 hover-red"
              onClick={() => {
                setModel(!model);
                setData(row);
                setSuspended(false);
                setDeleted(true);
              }}
            >
              <Delete />
            </button>
          </>
        );
      },
    },
  ];

  return (
    <div className="content-wrapper">
      <div className="card">
        <div className="card-body">
          <div
            className="row "
            style={{
              border: "2px solid #ffff",
              borderRadius: "10px",
            }}
          >
            <div className="col-12 col-xl-8 col-md-8 mb-4 mb-xl-0">
              <h3 className="font-weight-bold">Trainers</h3>
              <h6 className="font-weight-normal mb-3">
                All registered trainers listed here
              </h6>
            </div>
            <div className="col-12 col-xl-8 col-md-8 mb-4 mb-xl-0"></div>
            <div className="col-12 col-xl-4 col-md-4 mb-4 mb-xl-0">
              <div className="row">
                <div className="col-12 input-container">
                  <div className="form-group text-center">
                    <input
                      className="form-control form-control-sm "
                      placeholder="Search trainee by email "
                      onChange={(e) => onChange(e)}
                      value={searching}
                    />

                    <span
                      className={`fa fa-close fa-1x field-icon px-4`}
                      onClick={() => handleRemoveFilter()}
                    ></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {loading ? (
            <center>
              <SplashScreen />
            </center>
          ) : (
            <div>
              <DataTable
                paginationDefaultPage={offset === 0 ? 1 : offset}
                columns={columns}
                data={tarinerFilter}
                customStyles={customStyles}
                pagination
                fixedHeader
                expandableRows
                highlightOnHover
                expandableRowsComponent={ExpandableCompnent}
              />
            </div>
          )}
          <Edit show={editShow} handleClose={handleClose} />
          <Modal
            edit={model}
            handleClose={handleClose}
            data={data}
            suspended={suspended}
            deleted={deleted}
            deleteClasses={false}
            url={`${baseUrl}/api/user/${data._id}`}
            reload={reload}
            operationsText={deleted ? "Delete" : modalText}
            relatedText={"trainer"}
            operationFunctions={suspendAccount}
          />
        </div>
      </div>
    </div>
  );
};

export default Trainer;
