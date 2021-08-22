import React, { useState, useEffect, useMemo } from "react";
import {
  useTable,
  useGlobalFilter,
  usePagination,
  useSortBy,
} from "react-table";
import { Link } from "react-router-dom";
import { ScaleLoader } from "react-spinners";
import { ScaleLoadStyler } from "../../styles/ScaleLoadStyler";
import UserService from "../../services/UserService";

import "./Users.css";

function Users() {
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(false);

  const COLUMNS = [
    {
      Header: "Username",
      accessor: "userName",
    },
    {
      Header: "Fullname",
      accessor: "fullName",
    },
    {
      Header: "Designation",
      accessor: "designation.name",
    },
    {
      Header: "Access Level",
      accessor: "accessLevel",
    },
    {
      id: "edit-links",
      Header: () => (
        <Link key="0" to={`/userdetail/-1`} className="table-link-edit">
          <i className="fas fa-user-plus"> Add New</i>
        </Link>
      ),
      Cell: ({ row }) => (
        <div className="column-center">
          <Link
            key={row.id}
            to={`/userdetail/${row.original.id}`}
            className="table-link-edit"
          >
            <i className="fas fa-user-edit"> Edit</i>
          </Link>
        </div>
      ),
    },
  ];

  const columns = useMemo(
    () => COLUMNS,
    // eslint-disable-next-line
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    setGlobalFilter,
    setHiddenColumns,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize, globalFilter },
  } = useTable(
    {
      columns,
      data: tableData,
      initialState: { pageIndex: 0, pageSize: 20 },
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const handleResize = () => {
    if (window.innerWidth <= 920 && window.innerWidth > 812) {
      setHiddenColumns(["accessLevel"]);
    } else if (window.innerWidth <= 812 && window.innerWidth > 531) {
      setHiddenColumns(["accessLevel", "fullName"]);
    } else if (window.innerWidth <= 531) {
      setHiddenColumns(["accessLevel", "fullName", "designation.name"]);
    } else {
      setHiddenColumns([]);
    }
  };

  useEffect(() => {
    setLoading(true);
    UserService.getUsersAll()
      .then((response) => {
        setTableData(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });

    window.addEventListener("resize", handleResize, false);

    handleResize();
    // eslint-disable-next-line
  }, []);

  const tableHasData = () => {
    if (Object.keys(tableData).length > 0) return true;
    else return false;
  };

  return (
    <div className="table-container">
      <div className="table-background">
        <div className="table-div">
          <input
            type="text"
            className="table-global-search"
            placeholder="Type text to search"
            value={globalFilter || ""}
            onChange={(e) => setGlobalFilter(e.target.value)}
            readOnly={!tableHasData()}
          />
          <table {...getTableProps()}>
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th
                      {...column.getHeaderProps(column.getSortByToggleProps())}
                    >
                      {column.render("Header")}
                      {column.id !== "edit-links" && (
                        <span>
                          {column.isSorted
                            ? column.isSortedDesc
                              ? " ⬇"
                              : " ⬆"
                            : " ⬆⬇"}
                        </span>
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {!loading ? (
                page.map((row, i) => {
                  prepareRow(row);
                  return (
                    <tr {...row.getRowProps()}>
                      {row.cells.map((cell) => {
                        return (
                          <td {...cell.getCellProps()}>
                            {cell.render("Cell")}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })
              ) : (
                <tr className="no-hover">
                  <td colSpan="6">
                    <ScaleLoader
                      css={ScaleLoadStyler}
                      size={250}
                      color={"rgb(87, 85, 214)"}
                      loading={loading}
                    />
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <div className="pagination">
            <button
              className={`pagination-button ${
                !canPreviousPage ? "disable-button no-hover" : ""
              }`}
              onClick={() => gotoPage(0)}
              disabled={!canPreviousPage}
            >
              <i className="fas fa-angle-double-left" />
            </button>{" "}
            <button
              className={`pagination-button ${
                !canPreviousPage ? "disable-button no-hover" : ""
              }`}
              onClick={() => previousPage()}
              disabled={!canPreviousPage}
            >
              <i className="fas fa-angle-left" />
            </button>{" "}
            <button
              className={`pagination-button ${
                !canNextPage ? "disable-button no-hover" : ""
              }`}
              onClick={() => nextPage()}
              disabled={!canNextPage}
            >
              <i className="fas fa-angle-right" />
            </button>{" "}
            <button
              className={`pagination-button ${
                !canNextPage ? "disable-button no-hover" : ""
              }`}
              onClick={() => gotoPage(pageCount - 1)}
              disabled={!canNextPage}
            >
              <i className="fas fa-angle-double-right" />
            </button>{" "}
            <div
              className={`pagination-spacer ${
                window.innerWidth >= 668 ? "hidden" : ""
              }`}
            />
            <span>
              Page{" "}
              <strong>
                {tableHasData() ? pageIndex + 1 : pageIndex} of{" "}
                {pageOptions.length}
              </strong>{" "}
            </span>
            <span>
              | Go to page:{" "}
              <input
                className="pagination-input"
                type="number"
                defaultValue={tableHasData() ? pageIndex + 1 : pageIndex}
                onChange={(e) => {
                  const page = e.target.value ? Number(e.target.value) - 1 : 0;
                  gotoPage(page);
                }}
                disabled={!tableHasData()}
              />
            </span>{" "}
            <select
              className="pagination-dropdown"
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
              }}
              disabled={!tableHasData()}
            >
              {[10, 15, 20].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  Show {pageSize}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Users;
