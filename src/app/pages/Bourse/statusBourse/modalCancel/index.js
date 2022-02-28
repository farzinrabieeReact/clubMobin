import {
  Backdrop,
  CircularProgress,
  Fade,
  makeStyles,
  Modal,
} from "@material-ui/core";
import React, { useEffect } from "react";
import { ime_request_cancel } from "../../../../../redux/bourse/request_cancel/inde";
import {
  handleNotificationAlertCatch,
  handleNotificationAlertTryUpdate,
} from "../../../../common/method/handleNotificationAlert";

let useStyles = makeStyles((theme) => ({
  parent: {
    width: "98%",
  },

  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.753)",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(2, 4, 3),
    borderRadius: 7,
    width: 350,
    height: 150,
    border: 0,
    outline: 0,
  },
  btnGreen: {
    display: "inline-block",
    width: 70,
    height: 30,
    border: "1.5px solid green",
    color: "green",
    borderRadius: 5,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 5,
    "&:hover": {
      backgroundColor: "green",
      color: "white",
      cursor: "pointer",
    },
  },
  btnRed: {
    width: 70,
    height: 30,
    color: "rgb(180, 40, 40)",
    border: "1.5px solid rgb(180, 40, 40)",
    borderRadius: 5,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    "&:hover": {
      cursor: "pointer",

      backgroundColor: "rgb(180, 40, 40)",
      color: "white",
    },
  },
}));

const Index = ({
  flagModalCancel,
  setflagModalCancel,
  loading,
  flagAccordian,
  setloading,
}) => {
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setflagModalCancel(false);
  };
  useEffect(() => {
    if (flagModalCancel) {
      handleOpen();
    } else {
      handleClose();
    }
  }, [flagModalCancel]);
  const apiCancel = () => {
    // setloading(true)
    let data = {
        request_id: flagAccordian?.info?.requestId ? flagAccordian?.info?.requestId:'',
        national_code: "",
        description:null
    }
   
    ime_request_cancel(data)
      .then((result) => {
        let isok = handleNotificationAlertTryUpdate(result);
        if (!isok) {
          return;
        }
      })
      .catch((err) => {
        handleNotificationAlertCatch();
      })
      .finally(() => {
          setloading(false)
      });
  };

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
            <h3 id="transition-modal-title">
                ابطال عرضه
            </h3>
            <p
              className="mt-4 me-4"
              style={{ fontSize: 15, color: "grey" }}
            >
                آیا برای ابطال عرضه مطمئن هستید؟
            </p>
            <div className="d-flex justify-content-end mt-5">
              <div
                onClick={!loading ? apiCancel : null}
                className={classes.btnGreen}
              >
                {loading ? (
                  <CircularProgress
                    style={{ fontSize: 20, width: 30, height: 30 }}
                  />
                ) : (
                  "تایید"
                )}
              </div>
              <div onClick={handleClose} className={classes.btnRed}>
                لغو
              </div>
            </div>
          </div>
        </Fade>
      </Modal>
    </>
  );
};

export default Index;
