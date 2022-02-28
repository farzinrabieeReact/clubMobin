import React from 'react'
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        alignItems: 'center'
    },
    icon: {
        width: 25,
        height: 25,
        marginRight: 10
    }
}));


export default function Index() {

    const classes = useStyles();

    return (
        <div className={classes['root']}>
            <svg className={classes['icon']}>
                <use href="/sprite.svg#location-city"></use>
            </svg>
            <p className={'pt-5'}>شعبه مرکزی: تهران،خیابان سهروردی شمالی، خیابان خرمشهر (آپادانا)، جنب شهرداری، پلاک 35</p>
        </div>
    )
}
