import { Box, FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React from "react";
import { Search, Close } from "@material-ui/icons";
import DatePicker from "../../../../common/components/DatePicker";

const useStyles = makeStyles(() => ({
  head: {
    // height: 50,
    display: "flex",
    width: "100%",
    justifyContent: "center",
    ["@media (max-width:576px)"]: {
      // eslint-disable-line no-useless-computed-key
      // height: 50,
      width: "90%",
      margin: '0 auto' , 
      flexDirection : "column"
    },
  },

  btn: {
    color: "rgb(100,165,28)",
    backgroundColor: "white",
    borderRadius: 3,
    marginRight: 5,
    margin: "0 5px",
    fontSize: 25,
    boxShadow: "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px",
    "&:hover": {
      color: "white",
      backgroundColor: "rgb(100,165,28)",
    },
  },
  btn2: {
    color: "#fe534a",
    backgroundColor: "white",
    borderRadius: 3,
    marginRight: 5,
    fontSize: 25,
    boxShadow: "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px",
    "&:hover": {
      color: "white",
      backgroundColor: "#fe534a",
    },

  },
}));

const Index = ({
  setflagFilter,
  handelChange,
  stateFilter,
  setValuePrimaryState,
  setflagApi ,
  setPagnation
}) => {
  const classes = useStyles();

  const handleExit = () => {
    setflagFilter(false)
    setValuePrimaryState()
    setflagApi(prev => !prev)
  };

  const submit = () => {
    setPagnation(1)
    setflagApi(prev => !prev)
  }

  return (
    <>
      <>
        <div className={classes.head}>
          <Box
            className="me-md-3 me-1 mb-1"
          >
            <FormControl style={{ width: 150, transform: 'translateY(-3px)' }}>
              <InputLabel id="demo-simple-select-label">نوع</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={stateFilter.status}
                label="نوع"
                onChange={(e) => handelChange(e.target.value, "status")}
              >
                <MenuItem value={""}>همه</MenuItem>
                <MenuItem value={"SUBMITTED"}>در انتظار</MenuItem>
                <MenuItem value={"FINALIZED"}>نهایی شده</MenuItem>
                <MenuItem value={"REJECTED"}>لغو شده</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Box
            className="me-md-3 me-1 mb-1"
          >
            <DatePicker
              label="از تاریخ"

              value={stateFilter.registration_date_from}
              setValue={(data) => handelChange(data, "registration_date_from")}
            />
          </Box>

          <Box
            className="me-1 me-md-3 mb-1"
          >
            <DatePicker
              label="تا تاریخ"
              value={stateFilter.registration_date_to}

              setValue={(data) => handelChange(data, "registration_date_to")}
            />{" "}
          </Box>

          <div className="d-flex mt-5 align-items-start align-items-sm-start">
            <Search
              className={classes.btn}
              onClick={submit}
            />
            <Close
              onClick={handleExit}
              className={classes.btn2}
            />
          </div>
        </div>
      </>
    </>
  );
};

export default Index;
