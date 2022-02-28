import React from 'react';
import AutorenewOutlinedIcon from '@material-ui/icons/AutorenewOutlined';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';
import { makeStyles } from '@material-ui/core';
import ModalCustom from '../../../../../common/components/ModalCustom';


const useStyles = makeStyles({
    btnTilt: {
        display: 'flex',
        alignItems: 'center',
    },
    btnClose: {
        cursor: 'pointer',
        fill: 'white',
        width: 30,
        height: 30,
        fill:'rgba(0,0,0,1)' //eslint-disable-line  no-dupe-keys
    },
    img: {
        borderRadius: 10,
        maxheight:"500px !important"
    }
})


export default function DraggableDialog() {
    let classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(prev =>!prev);
    };

    const handleClose = () => {
        setOpen(prev =>!prev);
    };

    return (
        <>
            <p onClick={handleClickOpen} className={classes['btnTilt']}>
                <span className={'mr-2'}>
                    < AutorenewOutlinedIcon />
                </span>
                <span>
                    روند رسیدگی به شکایات
                </span>
            </p>

            <ModalCustom open={open} setOpen={setOpen} >
                <div className={'d-flex flex-column '}>
                    <CloseOutlinedIcon size={'large'} className={classes['btnClose']} color="secondary" onClick={() => handleClose()} />
                    <img style={{maxHeight:700}} className={classes['img']} src="/media/common/feedbackflow.png" alt="" />

                </div>
            </ModalCustom>

        </>
    );
}
