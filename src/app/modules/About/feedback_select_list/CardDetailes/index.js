import React from 'react'
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
    root: {
        width:700,
        maxWidth: '100% !important',
        padding: 0,
        borderRadius: 8,
        margin: 'auto',
        position: 'relative',
        zIndex: 2
    },
    desc: {
        borderStyle: 'solid',
        borderWidth: 1,
        borderRadius: 8,
        position: 'relative'

    },
    title: {
        position: 'absolute',
        top: -10,
        left: 20,
        backgroundColor: 'white',
        width: 50,
        textAlign: 'center'
    },
    shape: {
        width: 25,
        height: 25,
        transform: 'rotate(45deg)',
        position: 'absolute',
        backgroundColor: 'white',
        zIndex: -11,
        right: 200,
        bottom: -12
    },
    icon: {
        cursor: 'pointer'
    }
})


export default React.forwardRef( function Index({ color, title, setOpen, data } ,ref) {

    let classes = useStyles();

    return (
        <div className={`${classes['root']} shadow bg-white p-5`}  >
            <CloseOutlinedIcon className={`${classes['icon']} mb-5`} size={'large'} onClick={() => setOpen(prev => !prev)} />
            <div className={classes['desc']} style={{ borderColor: color }}>
                <p className={classes['title']} style={{ color: color }} >{title}</p>
                <p className={`p-8 text-justify`}>
                    {data !== 'null' ? data : ''}
                </p>
            </div>
            <div className={classes['shape']}></div>
        </div>
    )
}
)