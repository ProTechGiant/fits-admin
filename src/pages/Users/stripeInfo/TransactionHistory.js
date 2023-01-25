import { Launch } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { CURRENCY_SYMBOLS } from "../../../countryList/countryList";
import SplashScreen from "../../../modules/Partials/SplashScreen";
import { customStyles } from "../../../modules/styles/customStyles";
import "./TransactionHistory";
const TransactionHistory = () => {
  const { transaction_history_recharge } = useSelector(
    (state) => state.userData
  );

  const columns = [
    {
      name: "Index",
      sortable: true,
      width: "auto",
      cell: (row, index) => <small>{index + 1}</small>,
    },
    {
      name: "Amount",
      sortable: true,
      width: "auto",
      cell: (row, index) => (
        <small>
          {`${row?.recharge?.amount}
           ${CURRENCY_SYMBOLS[row?.recharge?.currency.toUpperCase()]}`}
        </small>
      ),
    },
    {
      name: "Created At",
      sortable: true,
      width: "auto",
      cell: (row, index) => (
        <span>{new Date(row?.recharge?.created * 1000).toLocaleString()}</span>
      ),
    },
    {
      name: "Ending Balance",
      sortable: true,
      width: "auto",
      cell: (row, index) => (
        <small>
          {`${row?.recharge?.amount}
    ${CURRENCY_SYMBOLS[row?.recharge?.currency.toUpperCase()]}`}
        </small>
      ),
    },
    {
      name: "Type",
      sortable: true,
      width: "auto",
      cell: (row, index) => <small>{row?.type}</small>,
    },
    {
      name: "Actions",
      cell: (row) => {
        return (
          <>
            <Link
              to={`/transaction_history/${row?.type}/${row?.recharge?.created}/${row?.recharge?.customer}`}
              className="btn btn-icon mt-3 ml-2"
              style={{ color: "#248afd" }}
            >
              <Launch />
            </Link>
          </>
        );
      },
    },
  ];
  return (
    <>
      <DataTable
        columns={columns}
        data={transaction_history_recharge}
        customStyles={customStyles}
        pagination
      />
    </>
  );
};

export default TransactionHistory;
