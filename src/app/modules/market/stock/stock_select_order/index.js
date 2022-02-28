import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import { useDispatch, useSelector } from 'react-redux';
import { actionTypes } from '../../../../../redux/market/stock/stock_select_offlineOrders';
import Order from './order';

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
      {value === index && (
        <Box p={3} style={{ padding: "24px 0" }}>
          {children}
        </Box>
      )}
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
  }
}));

export default function Indexx() {

    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const dispatch = useDispatch()
    const [state, setstate] = useState([]);
    const reducerStockOfflineOrders = useSelector(state => state.reducerStockOfflineOrders)

    useEffect(() => {
        dispatch({ type: actionTypes.stockOfflineOrdersAsync })
    }, []) //eslint-disable-line react-hooks/exhaustive-deps


    useEffect(() => {
        if (reducerStockOfflineOrders.data.length > 0)
            setstate(reducerStockOfflineOrders.data)
    }, [reducerStockOfflineOrders.data]) //eslint-disable-line react-hooks/exhaustive-deps


    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    let order  =state.filter(item => item.body.state === '2' || item.body.state === '3')
    let openOrder = state.filter(item => item.body.state !== '2' || item.body.state !== '3')
    
    return (
        <div className={"rounded-lg"}>
            <div className={`${classes.root}`}>
                <AppBar position="static" color="default" className={'rounded'}>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        indicatorColor="primary"
                        textColor="primary"
                        variant="scrollable"
                        scrollButtons="auto"
                        aria-label="scrollable auto tabs example"
                    >
                        <Tab label="سفارشات باز" {...a11yProps(0)} />
                        <Tab label="سفارشات امروز" {...a11yProps(1)} />
                    </Tabs>
                </AppBar>
                <TabPanel value={value} index={0}>
                    <Order data={openOrder} />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <Order data={order} />
                </TabPanel>
            </div>
        </div>
    )
}
