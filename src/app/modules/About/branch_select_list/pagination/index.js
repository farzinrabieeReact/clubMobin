import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            marginTop: theme.spacing(2),
        },
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'conter'
    },
}));

export default function PaginationRounded({ data  , setPagnation ,Pagnation}) {

    const classes = useStyles();
    let count = Math.ceil(data.allData.length / 10)
   

    return (
        <div className={classes.root}>
            <Pagination
                count={count}
                variant="outlined"
                shape="rounded"
                page={Pagnation}
                onChange={(event, page) => {
                    setPagnation(page)
                }}
            />
        </div>
    );
}

