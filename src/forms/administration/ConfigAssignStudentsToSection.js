import React, { useState, useEffect, useMemo } from "react";
import {
  useTable,
  useGlobalFilter,
  usePagination,
  useSortBy,
} from "react-table";
import { Link } from "react-router-dom";
import { ScaleLoader } from "react-spinners";
import EnrollmentService from "../../services/EnrollmentService";
import { ScaleLoadStyler } from "../../styles/ScaleLoadStyler";

import "./ConfigAssignStudentsToSection.css";

function ConfigAssignStudentsToSection() {
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(false);

  const COLUMNS = [
    {
      Header: "LRN",
      accessor: "lrnNo",
    },
    {
      Header: "Lastname",
      accessor: "lastname",
    },
    {
      Header: "Firstname",
      accessor: "firstname",
    },
    {
      Header: "Middlename",
      accessor: "middlename",
    },
    {
      Header: "House No.",
      accessor: "addrHouseNo",
    },
    {
      Header: "Street",
      accessor: "addrStreet",
    },
    {
      Header: "Barangay",
      accessor: "addrBarangay",
    },
    {
      Header: "City/Municipality",
      accessor: "addrCityMunicipality",
    },
    {
      Header: "Gender",
      accessor: "gender",
    },
    {
      Header: "Date of Birth",
      accessor: "dob",
    },
    {
      id: "edit-links",
      Header: () => <span>Assign Section</span>,
      Cell: ({ row }) => (
        <div className="column-center">
          <Link
            key={row.id}
            to={`/configAssignStudentToSectionDetails/${row.original.id}`}
            className="table-link-edit"
          >
            <i className="fas fa-address-card"> Assign</i>
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
    if (window.innerWidth <= 1720 && window.innerWidth > 1597) {
      setHiddenColumns(["addrHouseNo"]);
    } else if (window.innerWidth <= 1597 && window.innerWidth > 1408) {
      setHiddenColumns(["addrHouseNo", "addrStreet"]);
    } else if (window.innerWidth <= 1408 && window.innerWidth > 1289) {
      setHiddenColumns(["addrHouseNo", "addrStreet", "addrBarangay"]);
    } else if (window.innerWidth <= 1289 && window.innerWidth > 1119) {
      setHiddenColumns([
        "addrHouseNo",
        "addrStreet",
        "addrBarangay",
        "addrCityMunicipality",
      ]);
    } else if (window.innerWidth <= 1119 && window.innerWidth > 972) {
      setHiddenColumns([
        "addrHouseNo",
        "addrStreet",
        "addrBarangay",
        "addrCityMunicipality",
        "middlename",
      ]);
    } else if (window.innerWidth <= 972 && window.innerWidth > 828) {
      setHiddenColumns([
        "addrHouseNo",
        "addrStreet",
        "addrBarangay",
        "addrCityMunicipality",
        "middlename",
        "dob",
      ]);
    } else if (window.innerWidth <= 828 && window.innerWidth > 724) {
      setHiddenColumns([
        "addrHouseNo",
        "addrStreet",
        "addrBarangay",
        "addrCityMunicipality",
        "middlename",
        "dob",
        "gender",
      ]);
    } else if (window.innerWidth <= 724 && window.innerWidth > 521) {
      setHiddenColumns([
        "addrHouseNo",
        "addrStreet",
        "addrBarangay",
        "addrCityMunicipality",
        "middlename",
        "dob",
        "gender",
        "firstname",
      ]);
    } else if (window.innerWidth <= 521) {
      setHiddenColumns([
        "addrHouseNo",
        "addrStreet",
        "addrBarangay",
        "addrCityMunicipality",
        "middlename",
        "dob",
        "gender",
        "firstname",
        "lastname",
      ]);
    } else {
      setHiddenColumns([]);
    }
  };

  useEffect(() => {
    setLoading(true);
    EnrollmentService.getAllCurrentlyEnrolledStudentsForSectionAssigment()
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
                  <td colSpan="11">
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

export default ConfigAssignStudentsToSection;
