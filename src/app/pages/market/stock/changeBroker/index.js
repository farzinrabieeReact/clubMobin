import React from 'react'
import { makeStyles } from '@material-ui/core';
import Details from './details';
import InsertCHangeBroker from '../../../../modules/market/stock/stock_insert_changeBroker';
import SelectChangeBroker from '../../../..//modules/market/stock/stock_select_changeBroker';

let useStyles = makeStyles({
    brokerchange: {
        width: '25%',
        minWidth: 300
    },
    Details: {
        flexGrow : 1 ,
        marginLeft: 20 ,
        width : "min-content"
        
    }
})

export default function Index() {

    let classes = useStyles();

    return (
        <div>
            <div className={'d-flex flex-row  flex-wrap justify-content-center'}>
                <div className={classes['brokerchange']}>
                    <InsertCHangeBroker />
                </div>
                <div className={classes['Details']}>
                    <Details />
                </div>
            </div>
            <div>
                <SelectChangeBroker />
            </div>
        </div>
    )
}
