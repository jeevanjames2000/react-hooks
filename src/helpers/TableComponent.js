import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Button,
  Grid2,
} from "@mui/material";
const TableComponent = ({ columns, data }) => {
  const [editRowIndex, setEditRowIndex] = useState(null);
  const [editedData, setEditedData] = useState(data);
  const handleEdit = (rowIndex) => {
    setEditRowIndex(rowIndex);
  };
  const handleSave = (rowIndex) => {
    setEditRowIndex(null);
  };
  const handleCancel = () => {
    setEditRowIndex(null);
  };
  return (
    <div
      style={{
        padding: "5rem",
        borderRadius: "10px",
      }}
    >
      <Table style={{ border: "1px solid black", borderRadius: "10px" }}>
        <TableHead>
          <TableRow>
            {columns.map((item, index) => (
              <TableCell key={index}>{item.header}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {editedData.map((rowData, rowIndex) => (
            <TableRow key={rowIndex}>
              {columns.map((column, colIndex) => (
                <TableCell key={colIndex}>
                  {column.key === "options" ? (
                    <Grid2 display={"flex"} gap={2}>
                      {editRowIndex === rowIndex ? (
                        <>
                          <Button
                            variant="outlined"
                            onClick={() => handleSave(rowIndex)}
                          >
                            Save
                          </Button>
                          <Button variant="outlined" onClick={handleCancel}>
                            Cancel
                          </Button>
                        </>
                      ) : (
                        <Button
                          variant="outlined"
                          onClick={() => handleEdit(rowIndex)}
                        >
                          Edit
                        </Button>
                      )}
                      <Button variant="outlined">Delete</Button>
                    </Grid2>
                  ) : editRowIndex === rowIndex && column.key !== "options" ? (
                    <TextField
                      defaultValue={rowData[column.key]}
                      variant="outlined"
                      fullWidth
                      onChange={(e) => {
                        const newData = [...editedData];
                        newData[rowIndex][column.key] = e.target.value;
                        setEditedData(newData);
                      }}
                    />
                  ) : (
                    rowData[column.key]
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
export default TableComponent;
