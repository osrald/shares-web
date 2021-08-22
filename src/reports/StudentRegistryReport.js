import React, { useState, useEffect, useMemo } from "react";
import { ScaleLoader } from "react-spinners";
import { ScaleLoadStyler } from "../styles/ScaleLoadStyler";
import ReactExport from "react-data-export";
import {
  useTable,
  useGlobalFilter,
  usePagination,
  useSortBy,
} from "react-table";
import Confirm from "../components/Modals/Confirm";
import StudentService from "../services/StudentService";

function StudentRegistryReport() {
  const ExcelFile = ReactExport.ExcelFile;
  const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;

  const [tableData, setTableData] = useState([]);
  const [statsData, setStatsData] = useState([]);
  const [displayConfirmation, setDisplayConfirmation] = useState(false);
  const [userConfirmed, setUserConfirmed] = useState(false);
  const [loading, setLoading] = useState(false);

  const dataSet = [
    {
      columns: [
        {
          title: "LRN",
          style: { font: { sz: "12", bold: true } },
          width: { wch: 15 },
        },
        {
          title: "Student Name",
          style: { font: { sz: "12", bold: true } },
          width: { wch: 55 },
        },
        {
          title: "First Choice School",
          style: { font: { sz: "12", bold: true } },
          width: { wch: 37 },
        },
        {
          title: "First Choice Other School",
          style: { font: { sz: "12", bold: true } },
          width: { wch: 50 },
        },
        {
          title: "First Choice Track",
          style: { font: { sz: "12", bold: true } },
          width: { wch: 21 },
        },
        {
          title: "First Choice Strand/Specialization",
          style: { font: { sz: "12", bold: true } },
          width: { wch: 45 },
        },
        {
          title: "Second Choice School",
          style: { font: { sz: "12", bold: true } },
          width: { wch: 37 },
        },
        {
          title: "Second Choice Other School",
          style: { font: { sz: "12", bold: true } },
          width: { wch: 50 },
        },
        {
          title: "Second Choice Track",
          style: { font: { sz: "12", bold: true } },
          width: { wch: 21 },
        },
        {
          title: "Second Choice Strand/Specialization",
          style: { font: { sz: "12", bold: true } },
          width: { wch: 45 },
        },
        {
          title: "Gender",
          style: { font: { sz: "12", bold: true } },
          width: { wch: 6 },
        },
      ],
      data: tableData.map((data) => [
        { value: data.lrn, style: { font: { sz: "12" } } },
        { value: data.studentName, style: { font: { sz: "12" } } },
        { value: data.fcSchoolName, style: { font: { sz: "12" } } },
        { value: data.fcSchoolOthers, style: { font: { sz: "12" } } },
        { value: data.fcTrackName, style: { font: { sz: "12" } } },
        { value: data.fcStrndSpecName, style: { font: { sz: "12" } } },
        { value: data.scSchoolName, style: { font: { sz: "12" } } },
        { value: data.scSchoolOthers, style: { font: { sz: "12" } } },
        { value: data.scTrackName, style: { font: { sz: "12" } } },
        { value: data.scStrndSpecName, style: { font: { sz: "12" } } },
        { value: data.gender, style: { font: { sz: "12" } } },
      ]),
    },
  ];

  const statistics = [
    {
      columns: [
        {
          title: "",
          style: { font: { sz: "12", bold: true } },
          width: { wch: 25 },
        },
        {
          title: "",
          style: { font: { sz: "12", bold: true } },
          width: { wch: 45 },
        },
        {
          title: "",
          style: { font: { sz: "12", bold: true } },
          width: { wch: 12 },
        },
      ],
      data: statsData.map((data) => [
        { value: data.field1, style: { font: { sz: "12" } } },
        { value: data.field3, style: { font: { sz: "12" } } },
        { value: data.field4, style: { font: { sz: "12" } } },
      ]),
    },
  ];

  const COLUMNS = [
    {
      id: "student",
      Header: "Student Info",
      columns: [
        {
          Header: "LRN",
          accessor: "lrn",
        },
        {
          Header: "Name of Student",
          accessor: "studentName",
        },
        {
          Header: "Gender",
          accessor: "gender",
        },
      ],
    },
    {
      id: "firstchoice",
      Header: "First Choice",
      columns: [
        {
          Header: "School",
          accessor: "fcSchoolName",
        },
        {
          Header: "Track",
          accessor: "fcTrackName",
        },
        {
          Header: "Strand/Specialization",
          accessor: "fcStrndSpecName",
        },
        {
          Header: "Other School",
          accessor: "fcSchoolOthers",
        },
      ],
    },
    {
      id: "secondchoice",
      Header: "Second Choice",
      columns: [
        {
          Header: "School",
          accessor: "scSchoolName",
        },
        {
          Header: "Track",
          accessor: "scTrackName",
        },
        {
          Header: "Strand/Specialization",
          accessor: "scStrndSpecName",
        },
        {
          Header: "Other School",
          accessor: "scSchoolOthers",
        },
      ],
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

  useEffect(() => {
    if (userConfirmed) {
      setLoading(true);
      StudentService.getAllCurrentlyRegisteredStudents()
        .then((response) => {
          if (response.data != null) {
            setTableData(response.data.firstReturn);
            setStatsData(response.data.secondReturn);
            setLoading(false);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userConfirmed]);

  const handleOnClickGenerate = (e) => {
    e.preventDefault();
    setDisplayConfirmation(true);
  };

  const tableHasData = () => {
    if (Object.keys(tableData).length > 0) return true;
    else return false;
  };

  return (
    <>
      <Confirm
        header="Generate Report"
        message="This will take some time to generate the student registry report, please confirm."
        displayConfirmation={displayConfirmation}
        setDisplayConfirmation={setDisplayConfirmation}
        setUserConfirmed={setUserConfirmed}
      />
      <div className="table-container">
        <div className="table-background">
          <div className="table-div">
            <div className="report-ui-row">
              <div className="report-ui-left">
                <button
                  className="report-btn-generate"
                  onClick={handleOnClickGenerate}
                >
                  <i className="fas fa-scroll"> Generate Report</i>
                </button>
                {"  "}
                <input
                  type="text"
                  className="table-global-search"
                  placeholder="Type text to search"
                  value={globalFilter || ""}
                  onChange={(e) => setGlobalFilter(e.target.value)}
                  readOnly={!tableHasData()}
                />
              </div>
              <div className="report-ui-right">
                {tableHasData() ? (
                  <ExcelFile
                    filename="students-registry-report"
                    element={
                      <button
                        className="report-btn-export"
                        disabled={!tableHasData()}
                      >
                        <i className="fas fa-file-excel">
                          <span className="export-text"> Export</span>
                        </i>
                      </button>
                    }
                  >
                    <ExcelSheet dataSet={dataSet} name="Students" />
                    <ExcelSheet dataSet={statistics} name="Stats" />
                  </ExcelFile>
                ) : null}
              </div>
            </div>
            <table {...getTableProps()}>
              <thead>
                {headerGroups.map((headerGroup) => (
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column) => (
                      <th
                        {...column.getHeaderProps(
                          column.getSortByToggleProps()
                        )}
                      >
                        {column.render("Header")}
                        {column.id !== "student_0" &&
                          column.id !== "firstchoice_3" &&
                          column.id !== "secondchoice_7" && (
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
                    const page = e.target.value
                      ? Number(e.target.value) - 1
                      : 0;
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
    </>
  );
}

export default StudentRegistryReport;
