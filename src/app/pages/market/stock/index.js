import React, { useEffect } from "react";
import { useSubheader } from "../../../../_metronic/layout";

import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";

import Order from "./order";
import Portfolio from "./portfolio";
import OfflineOrder from "./OrderDetailsAggregates";
import ChangeBroker from "./changeBroker";
import Payment from "./payment";
import { useLocation } from "react-router-dom";

import {
  typeOrder,
  typeOfflineOrder,
  typePortfolio,
  typeChangeBroker,
  typePayment
} from "./type";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
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
    id: `scrollable-auto-tab-${index}`,
    "aria-controls": `scrollable-auto-tabpanel-${index}`
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    width: "100%"
  },
  tab: {
    fontSize: "13px !important",
    fontWeight: "bold"
  }
}));

export default function Indexx() {
  const suhbeader = useSubheader();
  suhbeader.setTitle("اوراق بهادار");

  const classes = useStyles();
  const location = useLocation();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    let key = location.state?.tabPanel;
    switch (key) {
      case typeOrder:
        setValue(0); //ثبت سفارش
        break;
      case typeOfflineOrder:
        setValue(1); // صورت معاملات
        break;
      case typeChangeBroker:
        setValue(2); // تغییر ناظر
        break;
      case typePayment:
        setValue(3); // درخواست وجه
        break;
      case typePortfolio:
        setValue(4); // سبد سهام
        break;
      default:
        setValue(0);
        break;
    }
  }, [location.state]); //eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className={"bg-white rounded-lg "}>
      <div className={`${classes.root} bg-white rounded-lg `}>
        <AppBar position="static" color="default" className={"rounded"}>
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="scrollable"
            scrollButtons="auto"
            aria-label="scrollable auto tabs example"
          >
            <Tab
              label="ثبت سفارش"
              {...a11yProps(0)}
              className={classes["tab"]}
            />
            <Tab
              label="صورت معاملات روز"
              {...a11yProps(1)}
              className={classes["tab"]}
            />
            <Tab
              label="درخواست تغییر ناظر"
              {...a11yProps(2)}
              className={classes["tab"]}
            />
            <Tab
              label="درخواست وجه"
              {...a11yProps(3)}
              className={classes["tab"]}
            />
            <Tab
              label="سبد سهام"
              {...a11yProps(4)}
              className={classes["tab"]}
              disabled={false}
            />
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
          <Order />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <OfflineOrder />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <ChangeBroker />
        </TabPanel>
        <TabPanel value={value} index={3}>
          <Payment />
        </TabPanel>
        <TabPanel value={value} index={4}>
          <Portfolio />
        </TabPanel>
      </div>
    </div>
  );
}
