import React, { useEffect, useState } from "react";
// import Table from "../../modules/Partials/DataTables";
import SplashScreen from "../../modules/Partials/SplashScreen";
import { customStyles } from "../../modules/styles/customStyles";
import DataTable from "react-data-table-component";
import moment from "moment";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { GET_USER_DATA } from "../../reducers/userReducer";
import StatusUpdate from "./StatusUpdate";
import { Link } from "react-router-dom";
toast.configure();

const Trainer = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = React.useState(false);
  const [users, setUsers] = React.useState([]);
  const [totalUsers, setTotalUsers] = React.useState(0);
  const [isDataLoading, setIsDataLoading] = React.useState(false);
  const [offset, setOffset] = React.useState(0);
  const [limit, setLimit] = React.useState(10);
  const [rowId, setRowId] = React.useState("");
  const [seaching, setSearching] = useState("");
  const [search, setSearch] = useState([]);
  // const [trainee, setTrainee] = useState([]);
  const { loading, trainee } = useSelector((state) => state.userData);
  React.useEffect(() => {
    console.log("trainer data", trainee);
  }, [trainee]);
  const onChange = async (e) => {
    setSearching(e.target.value);
    // if (e.target.value === "") {
    //   setUsers(search);
    // } else {
    // }
    // console.log("search", search);

    // var searchData = search.filter((item) => {
    //   if (
    //     item.name
    //       .toString()
    //       .toLowerCase()
    //       .includes(e.target.value.toLowerCase())
    //   ) {
    //     return item;
    //   }
    // });
    // console.log("searchData", searchData);
    // setUsers(searchData);
  };
  const handleRemoveFilter = () => {
    setSearching("");
  };

  const reload = () => {
    dispatch(GET_USER_DATA());
  };

  const columns = [
    {
      name: "Image",
      selector: "",
      sortable: true,
      width: "100px",
      cell: (row, index) => (
        <img
          class="rounded-circle"
          width="40px"
          src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
        />
      ),
    },
    {
      name: "Role",
      selector: "role",
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
      selector: "email",
      sortable: true,
      width: "170px",
    },

    {
      name: "Registered At",
      selector: "createdAt",
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
      selector: "status",
      sortable: true,
      width: "160px",
      cell: (row) => (
        <div style={{ overflow: "hidden", textOverflow: "ellipses" }}>
          <StatusUpdate reload={reload} row={row} />
        </div>
      ),
    },
    {
      name: "Email Verified",
      selector: "emailVerified",
      sortable: true,
      width: "120px",
      cell: (row) => (
        <span
          className={`badge  ${
            row?.emailVerified == false
              ? "badge-danger"
              : row?.emailVerified == true
              ? "badge-success"
              : ""
          }`}
          style={{ width: "100px" }}
        >
          {row?.emailVerified == true ? "Verified" : "NotVerified"}
        </span>
      ),
    },
    {
      name: "Actions",
      selector: "edit",
      cell: (row) => {
        return (
          <>
            <Link to={`/admin/${row?.role}/${row?._id}`}>
              <button
                type="button"
                class="btn btn-inverse-info btn-icon mr-2 fa fa-fw fa-eye field-icon toggle-password mx-2 mt-1 mb-1"
                // onClick={() => HandleEditShow(row)}
              >
                {/* <i class="ti-pencil"></i> */}
              </button>
            </Link>
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
            class="row "
            style={{
              border: "2px solid #ffff",
              borderRadius: "10px",
            }}
          >
            <div className="col-12 col-xl-8 col-md-8 mb-4 mb-xl-0">
              <h3 className="font-weight-bold">Users</h3>
              <h6 className="font-weight-normal mb-3">
                All registered users listed here
              </h6>
            </div>
            <div className="col-12 col-xl-8 col-md-8 mb-4 mb-xl-0"></div>
            <div className="col-12 col-xl-4 col-md-4 mb-4 mb-xl-0">
              <div className="row">
                <div className="col-12 input-container">
                  <div className="form-group">
                    <input
                      className="form-control form-control-sm"
                      placeholder="Search product by name "
                      onChange={(e) => onChange(e)}
                      value={seaching}
                    />
                    <span
                      className="fas fa-times fa-1x field-icon  px-3 "
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
                data={trainee}
                customStyles={customStyles}
                pagination
                fixedHeader
                paginationServer
                paginationComponentOptions={{
                  noRowsPerPage: 10,
                }}
                onChangePage={(page) => setOffset(page)}
                paginationTotalRows={totalUsers}
                // expandableRows
                // onRowExpandToggled={(bol, row) => viewManageData(row)}
                expandableRowExpanded={(row) => row._id === rowId}
                // expandableRowsComponent={
                //   <ViewManage
                //     manageData={manageData}
                //     organizationData={organizationData}
                //     manageLoading={manageLoading}
                //   />
                // }
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Trainer;
