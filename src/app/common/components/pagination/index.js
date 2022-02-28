import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';

const useStyles = makeStyles((theme) => ({
    root: {
        '@media(minWidth: 500px)' : {
            width: '50%'
          },
        '& > *': {
            marginTop: theme.spacing(2),
        },
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'conter'
    },
}));

export default function PaginationRounded({ pagnation, setPagnation, count }) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Pagination
                count={count}
                variant="outlined"
                shape="rounded"
                page={pagnation}
                onChange={(event, page) => {
                    setPagnation(+page)
                }}
            />
        </div>
    );
}

