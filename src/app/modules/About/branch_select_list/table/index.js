import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        borderCollapse: 'collapse',
        display: 'table',
        textAlign: 'left'
    },
    ProvinceName: {
        height: 60,
        backgroundColor: '#E8EBEE',
        borderRadius: '8px !important'
    },
    tr: {
        height: 60,
    },
    address: {
        maxWidth: 500,
        minWidth: 350,
    },
    minWidth: {
        minWidth: 120,
        padding: 2
    }
}));


export default function Index({ data, ProvinceName }) {

    const classes = useStyles();

    return (
        <div className={'table-responsive'}>
            <table className={`${classes['root']} mt-5 `}>
                <thead>
                    <tr>
                        {
                            th.map((value, index) => {
                                return <th key={index}>
                                    {value}
                                </th>
                            })
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        ProvinceName.map((city, index) => {
                            return (
                                <Fragment key={index}>
                                    <tr className={`${classes['ProvinceName']}`}>
                                        <td className={'pl-3'} colSpan={+th.length}> {city}</td>
                                    </tr>
                                    {
                                        data
                                            .filter(itme => city === itme.body.ProvinceName)
                                            .map((item, ind) =>
                                                <tr className={`${classes['tr']}`} key={ind} >
                                                    <td className={classes.minWidth}>{item.body.Name}</td>
                                                    <td className={classes.minWidth}>{item.body.DirectorName}</td>
                                                    <td className={classes['address']}>{item.body.Address}</td>
                                                    <td>{item.body.PhoneNumber}</td>
                                                    <td>{item.body.CityCodePhoneNumber}</td>
                                                    <td>{item.body.PostalCode}</td>
                                                    <td>{' '}</td>
                                                </tr>
                                            )
                                    }
                                </Fragment>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

const th = [
    'شعبه',
    'مسئول',
    'آدرس',
    'تلفن',
    'پیش شماره',
    'کد پستی',
    'نقشه',
]
