import React, { useState, useEffect, useMemo, forwardRef, useRef } from "react";
import { ScaleLoader } from "react-spinners";
import { ScaleLoadStyler } from "../../styles/ScaleLoadStyler";
import {
  useTable,
  useGlobalFilter,
  usePagination,
  useSortBy,
  useRowSelect,
} from "react-table";
import Confirm from "../../components/Modals/Confirm";
import GradeLevelSectionModal from "../../components/Modals/GradeLevelSectionModal";
import StudentService from "../../services/StudentService";

function ConfigSectionStudents({ props }) {
  const [loading, setLoading] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [sectionToMove, setSectionToMove] = useState({
    id: 0,
    code: "",
    name: "",
    desc: "",
    entDate: null,
    modDate: null,
  });
  const [displayConfirmation, setDisplayConfirmation] = useState(false);
  const [userConfirmed, setUserConfirmed] = useState(false);
  const [displayGradeSectionModal, setDisplayGradeSectionModal] =
    useState(false);

  const IndeterminateCheckbox = forwardRef(
    ({ indeterminate, ...rest }, ref) => {
      const defaultRef = useRef();
      const resolvedRef = ref || defaultRef;

      useEffect(() => {
        resolvedRef.current.indeterminate = indeterminate;
      }, [resolvedRef, indeterminate]);

      return (
        <>
          <input type="checkbox" ref={resolvedRef} {...rest} />
        </>
      );
    }
  );

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
      Header: "Gender",
      accessor: "gender",
    },
    {
      Header: "DOB",
      accessor: "dob",
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
    selectedFlatRows,
    state: { pageIndex, pageSize, globalFilter, selectedRowIds },
  } = useTable(
    {
      columns,
      data: tableData,
      initialState: { pageIndex: 0, pageSize: 20 },
    },
    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect,
    (hooks) => {
      hooks.visibleColumns.push((columns) => [
        {
          id: "selection",
          Header: ({ getToggleAllRowsSelectedProps }) => (
            <div>
              <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
            </div>
          ),
          Cell: ({ row }) => (
            <div className="text-align-center">
              <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
            </div>
          ),
        },
        ...columns,
      ]);
    }
  );

  const handleResize = () => {
    if (window.innerWidth <= 914 && window.innerWidth > 805) {
      setHiddenColumns(["dob"]);
    } else if (window.innerWidth <= 979 && window.innerWidth > 705) {
      setHiddenColumns(["dob", "gender"]);
    } else if (window.innerWidth <= 705 && window.innerWidth > 565) {
      setHiddenColumns(["dob", "gender", "middlename"]);
    } else if (window.innerWidth <= 565) {
      setHiddenColumns(["dob", "gender", "middlename", "firstname"]);
    } else {
      setHiddenColumns([]);
    }
  };

  useEffect(() => {
    setLoading(true);
    StudentService.getAllCurrentlyEnrolledStudentsSection(props.match.params.id)
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

  useEffect(() => {
    if (userConfirmed) {
      StudentService.batchAssignStudentsToSection(
        selectedFlatRows.map((selectedFlatRow) => {
          const sdtStudent = selectedFlatRow.original;
          sdtStudent.section = sectionToMove;
          return sdtStudent;
        })
      ).then((response) => {
        console.log(response.data);
      });

      window.location.href = "/configSection";
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userConfirmed]);

  const tableHasData = () => {
    if (Object.keys(tableData).length > 0) return true;
    else return false;
  };

  const handleOnClickMove = (e) => {
    e.preventDefault();
    setDisplayGradeSectionModal(true);
  };

  const handleOnClickCancel = (e) => {
    e.preventDefault();
    props.history.push("/configSection");
  };

  return (
    <>
      <Confirm
        header="Move to section"
        message={`This will transfer the selected student(s) to the indicated grade/section, please confirm.`}
        displayConfirmation={displayConfirmation}
        setDisplayConfirmation={setDisplayConfirmation}
        setUserConfirmed={setUserConfirmed}
      />
      <GradeLevelSectionModal
        displayGradeSectionModal={displayGradeSectionModal}
        setDisplayGradeSectionModal={setDisplayGradeSectionModal}
        setDisplayConfirmation={setDisplayConfirmation}
        sectionToMove={sectionToMove}
        setSectionToMove={setSectionToMove}
      />
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
                        {...column.getHeaderProps(
                          column.getSortByToggleProps()
                        )}
                      >
                        {column.render("Header")}
                        {column.id !== "selection" && (
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
            <br />
            <div className="form-inputs">
              <button
                className={
                  Object.keys(selectedRowIds).length <= 0
                    ? "userdets-btn-add-update disable-button no-hover"
                    : "userdets-btn-add-update"
                }
                onClick={handleOnClickMove}
              >
                <i className="fas fa-suitcase-rolling"> Move</i>
              </button>
              {"  "}
              <button
                className="userdets-btn-cancel"
                onClick={handleOnClickCancel}
              >
                <i className="fas fa-ban"> Cancel</i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ConfigSectionStudents;
