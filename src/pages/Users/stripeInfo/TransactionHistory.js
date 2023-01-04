import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { CURRENCY_SYMBOLS } from "../../../countryList/countryList";
import SplashScreen from "../../../modules/Partials/SplashScreen";
import { customStyles } from "../../../modules/styles/customStyles";
import "./TransactionHistory";
const TransactionHistory = () => {
  const { transaction_history } = useSelector((state) => state.userData);
  const [rowId, setRowId] = React.useState("");
  const [offset, setOffset] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(false);
  const [totalTransactions, setTotalTransaction] = useState(0);
  useEffect(() => {
    setIsLoading(true);
    if (transaction_history?.data) {
      const lengthData = transaction_history?.data.length;
      setTotalTransaction(lengthData);
    }
    setIsLoading(false);
  }, [transaction_history]);
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
          {`${row.amount}
          ${CURRENCY_SYMBOLS[row.currency.toUpperCase()]}`}
        </small>
      ),
    },
    {
      name: "Created At",
      sortable: true,
      width: "auto",
      cell: (row, index) => (
        <span>{new Date(row.created * 1000).toLocaleString()}</span>
      ),
    },
    {
      name: "Ending Balance",
      sortable: true,
      width: "auto",
      cell: (row, index) => (
        <small>
          {`${row.ending_balance}
          ${CURRENCY_SYMBOLS[row.currency.toUpperCase()]}`}
        </small>
      ),
    },
    {
      name: "Type",
      sortable: true,
      width: "auto",
      cell: (row, index) => <small>{row.object}</small>,
    },
    {
      name: "Actions",
      cell: (row) => {
        return (
          <>
            <Link
              to={`/transaction_history/${
                row?.amount > 0 ? "sender" : "reciver"
              }/${row?.created}/${row?.customer}`}
            >
              <button
                type="button"
                className="btn btn-inverse-info btn-icon mr-2 fa fa-fw fa-eye field-icon toggle-password mx-2 mt-1 mb-1"
              ></button>
            </Link>
          </>
        );
      },
    },
  ];
  return (
    <>
      {isLoading && <SplashScreen />}
      <DataTable
        paginationDefaultPage={offset === 0 ? 1 : offset}
        columns={columns}
        selectableRows
        data={transaction_history && transaction_history?.data}
        customStyles={customStyles}
        pagination
        fixedHeader
        paginationServer
        paginationComponentOptions={{
          noRowsPerPage: 10,
        }}
        onChangePage={(page) => setOffset(page)}
        paginationTotalRows={totalTransactions}
        expandableRowExpanded={(row) => row._id === rowId}
      />
    </>
  );
};

export default TransactionHistory;
