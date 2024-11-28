import React, { useState, useEffect } from "react";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Modal from "./ModalComp";
export default function TableComponent(props) {
  const { data, columns, rowsPerPage } = props;
  const [rows, setRows] = useState(rowsPerPage);
  const [currentPage, setCurrentPage] = useState(1);
  const [paginatedData, setPaginatedData] = useState([]);
  const totalPages = Math.ceil(data.length / rows);
  const [tableData, setTableData] = useState(data);

  useEffect(() => {
    const startIndex = (currentPage - 1) * rows;
    const endIndex = startIndex + rows;
    setPaginatedData(tableData.slice(startIndex, endIndex));
  }, [rows, currentPage, tableData]);
  const handleSelect = (e) => {
    setRows(Number(e.target.value));
    setCurrentPage(1);
  };
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };
  const cellStyle = {
    padding: 10,
    textAlign: "center",
    border: "1px solid #ccc",
    wordWrap: "break-word",
    width: "auto",
  };

  const [openModal, setOpenModal] = useState(false);
  const [modalData, setModalData] = useState(null);
  const handleModal = (data) => {
    setModalData(data);
    setOpenModal(!openModal);
  };
  const handleSubmit = (updatedRow) => {
    const updatedTableData = tableData.map((row) =>
      row.id === updatedRow.id ? updatedRow : row
    );
    setTableData(updatedTableData);
  };
  const handleLoadMore = () => {
    if (currentPage < totalPages) {
      setPaginatedData(data.slice(0, (currentPage + 1) * rows));
      setCurrentPage((prev) => prev + 1);
    }
  };
  //   useEffect(() => {
  //     // for scroll bottom to load new pages pagination
  //     const handleScroll = () => {
  //       const isBottom =
  //         window.innerHeight + document.documentElement.scrollTop >=
  //         document.documentElement.offsetHeight;
  //       if (isBottom && currentPage < totalPages) {
  //         setCurrentPage((prev) => prev + 1);
  //       }
  //     };

  //     window.addEventListener("scroll", handleScroll);
  //     return () => window.removeEventListener("scroll", handleScroll);
  //   }, [currentPage, totalPages]);

  //   useEffect(() => {
  //     const endIndex = currentPage * rows;
  //     setPaginatedData(data.slice(0, endIndex));
  //   }, [currentPage]);

  const getVisiblePages = () => {
    const maxVisible = 5;
    const start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    const end = Math.min(totalPages, start + maxVisible - 1);
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  const handleJumpToPage = (e) => {
    const page = Math.min(Math.max(1, Number(e.target.value)), totalPages);
    if (page) setCurrentPage(page);
  };

  const handleDelete = (id) => {
    const res = tableData.filter((item) => item.id !== id);
    setTableData(res);
  };

  return (
    <div style={{ backgroundColor: "#ddd", height: "100vh", padding: 10 }}>
      <table
        style={{
          borderCollapse: "collapse",
          width: "100%",
          backgroundColor: "#fff",
          border: "1px solid black",
          borderRadius: "10px",
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
          overflow: "hidden",
        }}
      >
        <thead>
          <tr>
            <th
              colSpan={columns.length}
              style={{
                padding: "10px",
                textAlign: "left",
                backgroundColor: "#fff",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <h4 style={{ margin: 0 }}>Table Component</h4>
                <button style={{ padding: "5px 10px", borderRadius: "5px" }}>
                  Add
                </button>
              </div>
            </th>
          </tr>
          <tr>
            {columns.map((item, i) => (
              <th key={i} style={cellStyle}>
                {item}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((row, i) => (
            <tr key={i}>
              <td style={cellStyle} align="center">
                {row.id}
              </td>
              <td style={cellStyle} align="center">
                {row.col1}
              </td>
              <td style={cellStyle} align="center">
                {row.col2}
              </td>
              <td style={cellStyle} align="center">
                {row.col3}
              </td>
              <td
                style={{
                  width: "10rem",
                  padding: 10,
                  textAlign: "center",
                  border: "1px solid #ccc",
                  wordWrap: "break-word",
                }}
                align="center"
              >
                <div
                  style={{ display: "flex", justifyContent: "center", gap: 5 }}
                >
                  <button onClick={() => handleModal(row)}>Edit</button>
                  <button onClick={() => handleDelete(row.id)}>Delete</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={columns.length} align="right">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                  padding: "10px",
                  gap: "10px",
                }}
              >
                <button onClick={handlePrevPage} disabled={currentPage === 1}>
                  <ChevronLeftIcon fontSize="inherit" />
                </button>
                <span>
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                >
                  <ChevronRightIcon fontSize="inherit" />
                </button>
                <select
                  onChange={handleSelect}
                  value={rows}
                  style={{ height: "1.5rem", width: "3rem" }}
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={15}>15</option>
                </select>
              </div>
            </td>
          </tr>
          {/* <button
            onClick={handleLoadMore}
            disabled={currentPage === totalPages}
            style={{
              padding: "10px",
              marginTop: "10px",
              backgroundColor: "#007bff",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: currentPage < totalPages ? "pointer" : "not-allowed",
            }}
          >
            Load More
          </button>

          {getVisiblePages().map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              style={{
                padding: "5px 10px",
                backgroundColor: currentPage === page ? "#ddd" : "#fff",
                border: "1px solid #ccc",
              }}
            >
              {page}
            </button>
          ))}

          <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <span>Page:</span>
            <input
              type="number"
              value={currentPage}
              onChange={handleJumpToPage}
              style={{ width: "50px", padding: "5px", textAlign: "center" }}
              min={1}
              max={totalPages}
            />
          </div> */}
        </tfoot>
      </table>
      {openModal && (
        <Modal
          data={modalData}
          title={"Modal Component"}
          handleModal={handleModal}
          handleSubmit={handleSubmit}
        />
      )}
    </div>
  );
}
