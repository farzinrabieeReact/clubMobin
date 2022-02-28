import { Backdrop, Fade, makeStyles, Modal } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import StatusHadaf from "./status";
import SubscriptionHadaf from "./Subscription";
import TableHadaf from "./table";
import TitleBoxHadaf from "./titleBox";
import { actionTypes as hadafPlan } from "../../../../redux/hadafHafez/hadaf_select_plan";
import { actionTypes as hadafdocument } from "../../../../redux/hadafHafez/hadaf_select_document";
import { actionTypes as hadafDetails } from "../../../../redux/hadafHafez/hadaf_select_dateils";
import { actionTypes as hadafStatus } from "../../../../redux/hadafHafez/hadaf_current_status";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import BuyHadaf from "./buy";
import { hadaf_insert_plan } from "../../../../redux/hadafHafez/hadaf_insert_plan";
import {
  handleNotificationAlertCatch,
  handleNotificationAlertTryUpdate,
} from "../../../common/method/handleNotificationAlert";
import ModalInsert from "./InsertModal";
import ModalDelete from "./modalDelete";
import { hadaf_delete_plan } from "../../../../redux/hadafHafez/hadaf_delete_plan";
import NoSubscription from "./noSubscription";
import { useSubheader } from "../../../../_metronic/layout";
import { actionTypes as bounusUpdater} from "../../../../redux/profile/clubmember_select_bonus";


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
      backgroundColor: "rgb(180, 40, 40)",
      color: "white",
    },
  },
}));
const HadafHafez = () => {
  const suhbeader = useSubheader();
  suhbeader.setTitle("اشتراک ویژه تحلیل");
  const classes = useStyles();
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const [flagModalInsert, setflagModalInsert] = useState(false);
  const [flagModalDelete, setflagModalDelete] = useState(false);
  const [idPlan, setidPlan] = useState("");
  const [idPlanDelete, setidPlanDelete] = useState("");
  const [reservePlan, setreservePlan] = useState(null);
  const [reservedPlan, setreservedPlan] = useState(null);
  const [pagination, setpagination] = useState({
    number: 1,
    count: 0,
  });

  const [loading, setloading] = useState(false);


  const { user } = useSelector(
    ({ auth }) => ({
      user: auth.user,
    }),
    shallowEqual
  );


  const planReducer = useSelector((state) => state.hadaf_select_plan_reducer);
  const documentReducer = useSelector(
    (state) => state.hadaf_select_document_reducer
  );
  const detailsReducer = useSelector(
    (state) => state.hadaf_select_details_reducer
  );
  const statusReducer = useSelector(
    (state) => state.hadaf_current_status_reducer
  );

  const apiCallSelectPlan = () => {
    dispatch({ type: hadafPlan.hadafSelectPlanAsync, payload: {} });
  };

  const apiCallSelectDocument = () => {
    let pagi = {
      from: pagination.count,
      size: 10,
    };
    dispatch({
      type: hadafdocument.hadafSelectDocumentAsync,
      payload: { ...pagi },
    });
  };

  const apiCallSelectDetaiils = (id, ind) => {
    const data = {
      _id: id,
    };

    dispatch({
      type: hadafDetails.hadafSelectdetailsAsync,
      payload: { data: data },
    });
  };
  const apiCallCurrentStatus = () => {
    dispatch({ type: hadafStatus.hadafCurrentStatusAsync, payload: {} });
  };

  const apiInsert = () => {
    let data = {
      subscription_id: idPlan,
    };
    setloading(true)
    hadaf_insert_plan(data)
      .then((result) => {
        let isok = handleNotificationAlertTryUpdate(result);
        if (!isok) {
          return;
        }else{
          dispatch({ type: bounusUpdater.bonusSelectAsync });
        }
        apiCallCurrentStatus();
        setflagModalInsert(false);
      })
      .catch((err) => {
        handleNotificationAlertCatch();
      })
      .finally(()=>{
        setloading(false)
      })
  };

  const apiDelete = () => {
    let data = {
      _id: idPlanDelete,
    };
    setloading(true)
    hadaf_delete_plan(data)
      .then((result) => {
        let isok = handleNotificationAlertTryUpdate(result);
        if (!isok) {
          return;
        }
        apiCallCurrentStatus();
        setflagModalDelete(false);
        dispatch({ type: bounusUpdater.bonusSelectAsync });
      })
      .catch((err) => {
        handleNotificationAlertCatch();
      })
      .finally(()=>{
        setloading(false)
      })
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleFlagModalInsert = (e, id) => {
    setidPlan(id);
    setflagModalInsert(true);
  };
  const handelFlagModalDelete = (e, id) => {
    setidPlanDelete(id);
    setflagModalDelete(true);
  };

  const handlePagiNext = () => {
    if (pagination.number < Math.ceil(documentReducer.total / 10)) {
      setpagination((prev) => ({
        number: prev.number + 1,
        count: prev.count + 10,
      }));
    } else {
      return;
    }
  };
  const handlePagiPrev = () => {
    if (pagination.number > 1) {
      setpagination((prev) => ({
        number: prev.number - 1,
        count: prev.count - 10,
      }));
    } else {
      return;
    }
  };

  const handlePagiPrevDouble = () => {
    if (pagination.number > 1) {
      setpagination({
        number: 1,
        count: 0,
      });
    } else {
      return;
    }
  };

  const handlePagiNextDouble = () => {
    if (pagination.number < Math.ceil(documentReducer.total / 10)) {
      setpagination((prev) => ({
        number: Math.ceil(documentReducer.total / 10),
        count: (Math.ceil(documentReducer.total / 10) - 1) * 10,
      }));
    } else {
      return;
    }
  };

  

  useEffect(() => {
    apiCallSelectPlan();
    apiCallSelectDocument();
    apiCallCurrentStatus();
  }, []);

  useEffect(() => {
    if (detailsReducer?.data.length > 0) {
      handleOpen();
    }
  }, [detailsReducer?.data]);

  useEffect(() => {
    if (statusReducer.data.length === 1) {
      setreservedPlan(statusReducer.data[0]);
      setreservePlan(null);
    } else if (statusReducer.data.length > 1) {
      setreservedPlan(statusReducer.data[1]);
      setreservePlan(statusReducer.data[0]);
    } else {
      setreservedPlan(null);
      setreservePlan(null);
    }
  }, [statusReducer]);

  useEffect(() => {
    apiCallSelectDocument();
  }, [pagination]);



  return (
    <>
      <div className="bg-white rounded-lg p-10 shadow d-flex justify-content-center align-items-center flex-column">
        <div
          className={`${classes.parent} d-flex justify-content-center align-items-center flex-column`}
        >
          <TitleBoxHadaf />
          <h5
            className="text-center mb-4"
            style={{ fontWeight: 700, fontSize: 24, marginTop: 100 }}
          >
            اشتراک شما
          </h5>
          {reservedPlan && <StatusHadaf reservedPlan={reservedPlan} />}
          {reservePlan && (
            <BuyHadaf
              reservePlan={reservePlan}
              handelFlagModalDelete={handelFlagModalDelete}
            />
          )}
          {!reservePlan && !reservedPlan && <NoSubscription />}
          <div id="hadaf" style={{ marginTop: 120 }}>
            <h5
              className="text-center mb-5"
              style={{ fontWeight: 700, fontSize: 24 }}
            >
              اشتراک هدف حافظ
            </h5>
            <SubscriptionHadaf
            user={user}
              planReducer={planReducer}
              handleFlagModalInsert={handleFlagModalInsert}
              reservedPlan={reservedPlan}
              reservePlan={reservePlan}
            />
          </div>
          <TableHadaf
            documentReducer={documentReducer}
            apiCallSelectDetaiils={apiCallSelectDetaiils}
            pagination={pagination}
            handlePagiNext={handlePagiNext}
            handlePagiPrev={handlePagiPrev}
       
            handlePagiNextDouble={handlePagiNextDouble}
            handlePagiPrevDouble={handlePagiPrevDouble}
            reservedPlan={reservedPlan}
            reservedPlan={setreservePlan}
          />

          {detailsReducer.data.length > 0 && (
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
                  <h3 id="transition-modal-title">دانلود فایل PDF</h3>
                  <p
                    className="mt-3 me-4"
                    style={{ fontSize: 15, color: "grey" }}
                  >
                    آیا برای دانلود مطمئن هستید؟
                  </p>
                  <div className="d-flex justify-content-end mt-5">
                    <a
                      className={classes.btnGreen}
                      download="pdf.pdf"
                      href={
                        detailsReducer?.data[0]?.body?.document
                          ? `data:application/pdf;base64,${detailsReducer?.data[0]?.body?.document}`
                          : ""
                      }
                      onClick={handleClose}
                    >
                      تایید
                    </a>
                    <a className={classes.btnRed} onClick={handleClose}>
                      لغو
                    </a>
                  </div>
                </div>
              </Fade>
            </Modal>
          )}

          {flagModalInsert && (
            <ModalInsert
              flagModalInsert={flagModalInsert}
              setflagModalInsert={setflagModalInsert}
              apiInsert={apiInsert}
              reservedPlan={reservedPlan}
              reservePlan={reservePlan}
              loading={loading}
              setloading={setloading}
            />
          )}
          {flagModalDelete && (
            <ModalDelete
              apiDelete={apiDelete}
              setflagModalDelete={setflagModalDelete}
              flagModalDelete={flagModalDelete}
              loading={loading}
              setloading={setloading}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default HadafHafez;
