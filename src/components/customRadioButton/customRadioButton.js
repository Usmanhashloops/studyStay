import React from "react";
import FormControl from "@mui/material/FormControl";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";

const CustomRadioButton = ({ value, onChange }) => {
  return (
    <RadioGroup row aria-labelledby="demo-row-radio-buttons-group-label" name="row-radio-buttons-group" value={value} onChange={onChange}>
      <FormControlLabel value="yes" control={<Radio size="small" />} label="yes" />
      <FormControlLabel value="no" control={<Radio size="small" />} label="no" />
    </RadioGroup>
  );
};

export default CustomRadioButton;
