import { Select, MenuItem } from "@mui/material";
import React, { useState } from "react";

const SelectComponent = ({ data }) => {
  const [selectedValue, setSelectedValue] = useState("");

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  return (
    <>
      <Select
        value={selectedValue}
        onChange={handleChange}
        style={{ width: "10rem", height: "3rem" }}
        displayEmpty
      >
        <MenuItem value="" disabled>
          Select an option
        </MenuItem>
        {data.map((item, index) => (
          <MenuItem key={index} value={item}>
            {item}
          </MenuItem>
        ))}
      </Select>
    </>
  );
};

export default SelectComponent;
