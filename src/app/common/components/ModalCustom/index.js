import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

const useStyles = makeStyles((theme) => ({
    root:{
        maxWidth:'80%',
        maxHeight:'80%',
        overflow : "auto"
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid rgba(0,0,0,0.1) !important ',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 2),
        borderRadius: 5,
        // maxWidth:'80%'
    },
    backDrop: {
        background: 'rgba(0,0,0,0.67) !important',
    },
}));

export default function TransitionsModal({ open, setOpen, children }) {
    const classes = useStyles();

    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={() => setOpen(false)}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                    classes: {
                        root: classes.backDrop
                    }
                }}
            >
                <Fade in={open}>
                    <div className={`${classes['root']} bg-white p-2 p-md-10 rounded-lg shadow`}>
                        {children}
                    </div>

                </Fade>
            </Modal>
        </div>
    );
}
