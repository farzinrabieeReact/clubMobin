import React, { useEffect, useState } from "react";
import Layout from "./layout";
import Styles from "./layout/index.module.scss";
import Route from "./Route";
import StepOne from "./stepOne";
import StepTwo from "./stepTwo";
import StepThree from "./stepThree";
import StepFour from "./stepFour";
// import StepFive from "./stepFive";
// import { actionTypes as authCustomerStepOne } from "../../../redux/authCustomer/authCustomer_select_stepOne";
import { useDispatch, useSelector } from "react-redux";
// import { makeStyles } from "@material-ui/core";
import Loading from "./loading";
import { authCustomerInsertStepThree } from "../../../redux/authCustomer/authCustomer_insert_StepThree";
import {
  handleNotificationAlertCatch,
  handleNotificationAlertTryUpdate,
} from "../../common/method/handleNotificationAlert";
import { useLocation } from "react-router";
import { actionTypes as actionTypesNotif } from "../../../redux/notificationAlert";

// const useStyles = makeStyles((theme) => ({
//   backdrop: {
//     zIndex: 1000000,
//     backgroundColor: "rgba(0, 0, 0, 0.76)",
//     color: "orange",
//   },
// }));

const AuthCustomer = () => {
  // const classes = useStyles();
  // ---------------------------------------------state-------------------------------------
  const [step, setstep] = useState(1);
  const [nationalState, setnationalState] = useState("");
  const [code, setcode] = useState("");
  const [sejamInfoState, setsejamInfoState] = useState([]);
  const [loadingStepTwo, setloadingStepTwo] = useState(false);

  const dispatch = useDispatch();


  const location = useLocation();

  
  const loadingReducer = useSelector((state) => state.authCustomer_loading);
  // ---------------------------------------------Apifunction---------------------------------

 
  // ---------------------------------------------function-------------------------------------

  const handleNextStep = () => {
    if (step < 4) {
      setstep((prev) => prev + 1);
    }
  };
  const handlePrevStep = () => {
    setstep((prev) => prev - 1);
  };

  // ----------------------------useEffect-------------------
  useEffect(() => {
   
    if (location.state.sejamInfo) {
      setsejamInfoState(location.state.sejamInfo[0]);
    }
  }, [location]);

  const apicallSendCode = (flag) => {
    let data = {
      national_id: sejamInfoState?.body?.uniqueIdentifier
        ? sejamInfoState?.body?.uniqueIdentifier
        : "",
    };
    if (data.national_id === "") {
      dispatch({
        type: actionTypesNotif.warning,
        textAlert: "مشکلی بوجود آمده است لطفا دوباره تلاش کنید",
      });
      return;
    }
   
    authCustomerInsertStepThree(data)
      .then((result) => {
        let isok = handleNotificationAlertTryUpdate(result);
        if (!isok) {
          return;
        }
        if (flag === "refresh") {
          return;
        }
        handleNextStep();
      })
      .catch((err) => {
        handleNotificationAlertCatch();
      });
  };



  return (
    <>
      <Layout step={step} setstep={setstep} sejamInfoState={sejamInfoState}>
        {loadingReducer.loading && (
          <Loading flag={loadingReducer.loading}/>
        )}
        <div className={Styles["layout-content"]}>
          <Route step={step}>
            <StepOne
              step={step}
              handleNextStep={handleNextStep}
              setstep={setstep}
              sejamInfoState={sejamInfoState}
            
            />
            <StepTwo
         
              handleNextStep={handleNextStep}
              handlePrevStep={handlePrevStep}
              sejamInfoState={sejamInfoState}
              apicallSendCode={apicallSendCode}
            />
            <StepThree
              step={step}
              nationalState={nationalState}
              handleNextStep={handleNextStep}
              handlePrevStep={handlePrevStep}
              apicallSendCode={apicallSendCode}
              sejamInfoState={sejamInfoState}
            />
            <StepFour sejamInfoState={sejamInfoState} />
            {/* <StepFive /> */}
          </Route>
        </div>
      </Layout>
    </>
  );
};

export default AuthCustomer;
