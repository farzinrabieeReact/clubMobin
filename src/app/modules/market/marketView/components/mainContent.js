import React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import TabPanel1 from './TabPanel1';
import TabPanel2 from './TabPanel2';
import { useSelector } from 'react-redux';



export default function MainContent() {
    return (
        <FullWidthTabs />
    )
}

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        width: "100%",
    },
    tab: {
        '& .MuiBox-root': {
            padding: '0 10px',
        },
    },
}));


function FullWidthTabs() {
    const classes = useStyles();
    const theme = useTheme();
    const [value, setValue] = React.useState(0);
    const reducerMainContentTabpanel1 = useSelector(state => state.reducermarketViewnMainContentTabpanel1)
    const reducerMainContentTabpanel2 = useSelector(state => state.reducermarketViewAbnormalVolume)
    let { loading } = reducerMainContentTabpanel1
    let loadingTabpanel2 = reducerMainContentTabpanel2.loading


    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index) => {
        setValue(index);
    };

    return (
        <div className={classes.root}>
            <AppBar position="static" color="default">
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="fullWidth"
                    aria-label="full width tabs example"
                >
                    <Tab label={
                        <div>
                            <span>نمای بازار</span>
                            {
                                loading && (<span className="ml-2 spinner"></span>)
                            }
                        </div>
                    } {...a11yProps(0)} />
                    <Tab label={
                        <div>
                            <span>حجم مشکوک</span>
                            {
                                loadingTabpanel2 && (<span className="ml-2 spinner"></span>)
                            }
                        </div>
                    } {...a11yProps(1)} />
                </Tabs>
            </AppBar>

            <SwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={value}
                onChangeIndex={handleChangeIndex}
            >
                <TabPanel className={classes.tab} value={value} index={0}>
                    <TabPanel1
                        reducerMainContentTabpanel1={reducerMainContentTabpanel1}
                    />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <TabPanel2
                        reducerMainContentTabpanel2={reducerMainContentTabpanel2}
                    />
                </TabPanel>

            </SwipeableViews>
        </div>
    );
}