import { Backdrop, Fade, makeStyles, Modal } from '@material-ui/core';
import React, { useEffect } from 'react';
import ModalCustomInsert from './modalCustomInsert'


const useStyles = makeStyles((theme) => ({
    root: {
      width: "100%",
      position: "relative",
    },
    container: {
      height: "max-content",
    },
    tableCellCustom: {
      whiteSpace: "nowrap",
      width: 200,
      padding: 10,
      fontSize: "0.8em",
      [theme.breakpoints.down("md")]: {
        fontSize: "0.8em",
      },
    },
    noData: {
      width: "90%",
      // height:40,
      fontSize: 20,
      border: "1px solid lightgray",
      margin: "20px auto",
      borderRadius: 5,
      padding: 10,
    },
    btn: {
      color: theme.palette.primary.main,
      cursor: "pointer",
      whiteSpace: "nowrap",
    },
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      border:0,
      outline:0,
    },
    paper: {
      width:'50%',
      height:400,
      overflowY:'auto',
      backgroundColor: theme.palette.background.paper,
      // border: '2px solid #000',
      border:0,
      outline:0,
      borderRadius:5,
      // height:'90%',
      boxShadow: theme.shadows[5],
      padding: 10,
      overflowX:'hidden',
      "@media (max-width: 992px)": {
        width:'95%',
      },
    },
  }));



const Index = ({flagmodalInsert,infoModal,setflagmodalInsert}) => {

    const classes = useStyles()
    const [open, setOpen] = React.useState(false);


      const handleOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
        setflagmodalInsert(false)
      };

      useEffect(() => {
          if(flagmodalInsert){
            handleOpen()
          }
      }, [flagmodalInsert]);
    return ( 
        <>
     <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <ModalCustomInsert infoModal={infoModal} handleClose={handleClose} />
          </div>
        </Fade>
      </Modal>
        </>
     );
}
 
export default Index;
