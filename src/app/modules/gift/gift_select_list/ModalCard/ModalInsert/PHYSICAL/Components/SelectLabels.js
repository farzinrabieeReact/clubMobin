import * as React from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";

export default function SelectLabels({ list, setState, state }) {
  const handleChange = (event) => {
    setState(event.target.value);
  };

  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-helper-label">
          {list.map((item, index) => index === 0 && item.name)}
        </InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={state}
          label="city/state"
          onChange={handleChange}
          style={{width:270}}
        >
          {list.map((itm, ind) =>
            (
              <MenuItem key={ind} value={itm.value}>
                {itm.name}
              </MenuItem>
            ) 
          )}
         
        </Select>
      </FormControl>
    </div>
  );
}
