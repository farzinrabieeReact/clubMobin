import React, { useEffect, useState } from "react";
import TableWeb from "./../table/tableWeb";
import TableSms from "./../table/tableSms";
import TableEmail from "./../table/tableEmail";
import { makeStyles } from "@material-ui/core";
import OutlinedCard from "../../../../common/components/cardNoData";

import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import PropTypes from "prop-types";

let useStyles = makeStyles({
  line: {
    backgroundColor: "black",
    position: "absolute",
    width: "100%",
    top: 25
  }
});

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`nav-tabpanel-${index}`}
      aria-labelledby={`nav-tab-${index}`}
      {...other}
    >
      {value === index && <>{children}</>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

function a11yProps(index) {
  return {
    id: `nav-tab-${index}`,
    "aria-controls": `nav-tabpanel-${index}`
  };
}

function LinkTab(props) {
  return (
    <Tab
      component="a"
      onClick={event => {
        event.preventDefault();
      }}
      {...props}
    />
  );
}

export default function PersonalInformation({ dataWeb, dataEmail, dataSms, }) {
  let classes = useStyles();

  const [valueTab, setvalueTab] = useState(0);

  


  const handleChange = (event, Value) => {
    setvalueTab(Value);
  };

  return (
    <div>
      <AppBar style={{ zIndex: 0, position: "unset" }}>
        <Tabs
          value={valueTab}
          onChange={handleChange}
          aria-label="wrapped label tabs"
          className={classes.appBar}
        >
          <LinkTab label="اعلانات وب" {...a11yProps(0)} />
          <LinkTab label="اعلانات پیامکی" {...a11yProps(1)} />
          <LinkTab label="اعلانات ایمیلی" {...a11yProps(1)} />
        </Tabs>
      </AppBar>
      <TabPanel value={valueTab} index={0} onClick={() => {}}>
        <div className={"mt-5 position-relative"}>
          <div className={"mb-5"}>
            <h3>اعلانات وب</h3>
          </div>
          <div>
            <hr className={classes["line"]} />
            {dataWeb.length !== 0 && <TableWeb data={dataWeb} />}
            {dataWeb.length === 0 && <OutlinedCard />}
          </div>
        </div>
      </TabPanel>
      <TabPanel value={valueTab} index={1}>
        <div className={"mt-5 position-relative"}>
          <div className={"mb-5"}>
            <h3>اعلانات پیامکی</h3>
          </div>
          <div>
            <hr className={classes["line"]} />
            {dataSms.length !== 0 && <TableSms data={dataSms} />}
            {dataSms.length === 0 && <OutlinedCard />}
          </div>
        </div>
      </TabPanel>
      <TabPanel value={valueTab} index={2}>
        <div className={"mt-5 position-relative"}>
          <div className={"mb-5"}>
            <h3>اعلانات ایمیل</h3>
          </div>
          <div>
            <hr className={classes["line"]} />
            {dataEmail.length !== 0 && <TableEmail data={dataEmail} />}
            {dataEmail.length === 0 && <OutlinedCard />}
          </div>
        </div>
      </TabPanel>
    </div>
  );
}
