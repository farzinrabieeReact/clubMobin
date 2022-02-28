import { Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React, { useEffect } from "react";
import { Search, Close } from "@material-ui/icons";
import DatePicker from "../../../../common/components/DatePicker";

const useStyles = makeStyles(() => ({
  head: {
    height: 50,
    display: "flex",
    width: "100%",
    justifyContent: "center",
    "@media (max-width:576px)": {
      // eslint-disable-line no-useless-computed-key
      width: "100%",
      margin: "0 auto",
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
    "@media (max-width:576px)": {
      // eslint-disable-line no-useless-computed-key
      fontSize: 20,
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
    "@media (max-width:576px)": {
      // eslint-disable-line no-useless-computed-key
      fontSize: 20,
    },
  },
}));

const Index = ({
  setstateFilter,
  setflagFilter,
  handelChangeDate,
  stateFilter,
  submit,
  handleRefresh,
}) => {
  const classes = useStyles();
  const handleExit = () => {
    handleRefresh();

    setflagFilter(false);
    setstateFilter((prev) => ({
      ...prev,
      start_time: null,
      end_time: null,
    }));
  };

  useEffect(() => {
    if (stateFilter.start_time) {
      if (stateFilter.start_time.includes("undefined")) {
        setstateFilter((prev) => ({
          ...prev,
          start_time: null,
        }));
      }
    }
  }, [stateFilter.start_time]);
  useEffect(() => {
    if (stateFilter.end_time) {
      if (stateFilter.end_time.includes("undefined")) {
        setstateFilter((prev) => ({
          ...prev,
          end_time: null,
        }));
      }
    }
  }, [stateFilter.end_time]);

  return (
    <>
      <>
        <div className={classes.head}>
          <Box className="me-md-3 me-1 mb-1">
            <DatePicker
              label="از تاریخ"
              value={stateFilter.start_time}
              setValue={(data) => handelChangeDate(data, "start_time")}
            />
          </Box>

          <Box className="me-1 me-md-3 mb-1">
            <DatePicker
              label="تا تاریخ"
              value={stateFilter.end_time}
              setValue={(data) => handelChangeDate(data, "end_time")}
            />{" "}
          </Box>

          <div className="d-flex mt-5 align-items-center align-items-md-start mb-2 mb-md-0">
            <Search className={classes.btn} onClick={submit} />
            <Close style={{}} onClick={handleExit} className={classes.btn2} />
          </div>
        </div>
      </>
    </>
  );
};

export default Index;
