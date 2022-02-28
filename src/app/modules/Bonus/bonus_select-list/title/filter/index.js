import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React, { useEffect } from "react";
import { Search, Close } from "@material-ui/icons";
import DatePicker from "../../../../../common/components/DatePicker";

const useStyles = makeStyles(() => ({
  head: {
    // height: 50,
    display: "flex",
    width: "100%",
    justifyContent: "center",
    flexWrap:"wrap",
    
    "@media (max-width:768px)": {
      // eslint-disable-line no-useless-computed-key
      // height: 100,
      width: "90%",
      margin: "0 auto",
      // flexDirection:'column'
    },
  },

  btn: {
    color: "rgb(100,165,28)",
    backgroundColor: "white",
    borderRadius: 3,
    marginRight: 5,
    margin: "0 5px",
    fontSize: 25,
    boxShadow:
      "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px",
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
    boxShadow:
      "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px",
    "&:hover": {
      color: "white",
      backgroundColor: "#fe534a",
    },
  },
}));

const Index = ({
  setstateFilter,
  setflagFilter,
  handelChangeDate,
  stateFilter,
  submit,
}) => {
  const classes = useStyles();
  const [type, settype] = React.useState(undefined);

  const handleChange = (event) => {
    settype(event.target.value);
  };

  const handleExit = () => {
    setflagFilter(false);
    submit("Refresh");
    setstateFilter({
      is_removed:'',
      create_date_from: null,
      create_date_to: null,
    });
    settype("")
  };

  useEffect(() => {
    setstateFilter(prev=>({
      ...prev,
      is_removed:type
    }))
  }, [type]);

  useEffect(() => {
    if(stateFilter.create_date_from?.includes("undefined")){
      setstateFilter(prev =>({
        ...prev,
        create_date_from:null
      }))
    }
  }, [stateFilter.create_date_from]);

  useEffect(() => {
    if(stateFilter.create_date_to?.includes("undefined")){
      setstateFilter(prev =>({
        ...prev,
        create_date_to:null
      }))
    }
  }, [stateFilter.create_date_to]);


  return (
    <>
      <>
        <div className={classes.head}>
          <Box sx={{width: 150 }} className="me-1 me-md-3 mb-1">
            <FormControl style={{width:150,transform: 'translateY(-3px)'}}>
              <InputLabel id="demo-simple-select-label">نوع</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={type}
                label="نوع"
                onChange={handleChange}
              >
                <MenuItem value={undefined}>همه</MenuItem>
                <MenuItem value={"TRUE"}>کسر شده</MenuItem>
                <MenuItem value={"FALSE"}>اضافه شده</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box className="me-md-3 me-1 mb-1">
            <DatePicker
              label="از تاریخ"
              value={stateFilter.create_date_from}
              setValue={(data) => handelChangeDate(data, "create_date_from")}
            />
          </Box>

          <Box className="me-1 me-md-3 mb-1">
            <DatePicker
              label="تا تاریخ"
              value={stateFilter.create_date_to}
              setValue={(data) => handelChangeDate(data, "create_date_to")}
            />{" "}
          </Box>

          <div className="d-flex mt-5 align-items-start align-items-sm-start">
            <Search className={classes.btn} onClick={submit} />
            <Close onClick={handleExit} className={classes.btn2} />
          </div>
        </div>
      </>
    </>
  );
};

export default Index;
