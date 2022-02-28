import { Box } from '@material-ui/core';
import React from 'react';
import MostTransactional from "./components/MostTransactional"
import { makeStyles } from "@material-ui/styles";
import EfficiencyCompany from './components/efficiencyCompany';
import MainContent from './components/mainContent';

const useStyles = makeStyles(theme => ({
    MainContent: {
        height: 550,
        [theme.breakpoints.down(900)]: {
            height: "auto",
            maxHeight: 1200,
        }
    },
    efficiency: {
        width: 350,
        height: 550,
        [theme.breakpoints.down(900)]: {
            width: "100%"
        }
    }
}));

export function MarketViewModule() {
    const classes = useStyles();

    return (
        <div>
            <div className="my-2">
                <MostTransactional />
            </div>

            <div className="d-flex flex-column flex-md-row">
                <Box className={`flex-grow-1 bg-white rounded mr-0 mr-md-2 mb-2 mb-md-0 ${classes.MainContent}`}>
                    <MainContent />
                </Box>
                <Box className={`bg-white rounded ${classes.efficiency} p-2`}>
                    <EfficiencyCompany />
                </Box>
            </div>
        </div>
    )
}


export const recColor = (value) => {
    if (value > 0) return "colorGreen"
    else if (value < 0) return "colorRed"
    return ""
}
