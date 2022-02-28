import { Button, Checkbox, withStyles } from "@material-ui/core";
import { grey } from "@material-ui/core/colors";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import StepOneContent from "./content";
import Styles from "./index.module.scss";
import { actionTypes as actionTypesNotif } from "../../../../redux/notificationAlert";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import {actionTypes as authLoading} from '../../../../redux/authCustomer/authCusotmer_Loading'
const OrangeCheckbox = withStyles({
  root: {
    color: grey[600],
    "&$checked": {
      color: "#ef6d22",
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

const StepOne = ({
  handleNextStep,
  sejamInfoState,
}) => {
  // -----------------------------------state-------------------------------
  const dispatch = useDispatch();
  const [checkedStepOne, setcheckedStepOne] = useState(false);

  // ------------------------------------function-------------------------------

  const handleChange = (event) => {
    setcheckedStepOne((prev) => !prev);
  };

  const handleClickCheckBox = () => {
    if (!checkedStepOne) {
      dispatch({
        type: actionTypesNotif.warning,
        textAlert: "لطفا اطلاعات خود را تایید نمایید",
      });
      return;
    }

dispatch({type:authLoading.authCustomerLoading,payload:true})

    handleNextStep();
  };

  return (
    <>
      <div className={Styles["stepOne-Parent"]}>
        <div className={Styles["stepOne-scroll"]}>
          <div className={`${Styles["stepOne-box_blue"]} d-flex mt-5 mb-5`}>
            <div>
            <InfoOutlinedIcon
              // style={{ position: "absolute", top: 15, right: 5 }}
              className="mr-3"
            />
             صفحه اطلاعات سجام - در صورت تمایل برای ویرایش اطلاعات می‌بایست به سامانه سجام مراجعه نموده و از طریق گزینه «ویرایش اطلاعات»، اطلاعات حساب کاربری خود را به‌روزرسانی نمایید. سپس مراحل ثبت نام را انجام دهید.
            </div>
          </div>
          <div className={Styles["stepOne-main"]}>
            <StepOneContent sejamInfoState={sejamInfoState} />
          </div>
        </div>
        <div className={Styles["stepOne-footer"]}>
          <div className="d-flex justify-content-center align-items-center">
            <div style={{ marginTop: -5 }}>
              <OrangeCheckbox
                checked={checkedStepOne}
                onChange={handleChange}
              />
            </div>
            <div className={Styles["stepOne-content-text"]}>
              اطلاعات مورد تایید است
            </div>
          </div>
          <Button
            className={
              checkedStepOne
                ? Styles["stepOne-footer-button-active"]
                : Styles["stepOne-footer-button"]
            }
            onClick={handleClickCheckBox}
          >
            مرحله بعدی
          </Button>
        </div>
      </div>
    </>
  );
};

export default StepOne;

// let data = [
//   {
//     title: "اطلاعات فردی",
//   },
//   {
//     title: "اطلاعات شناسنامه",
//   },
//   {
//     title: "اطلاعات تماس",
//   },
//   {
//     title: "اطلاعات شغلی",
//   },
//   {
//     title: "اطلاعات حساب بانکی",
//   },
//   {
//     title: "اطلاعات مالی",
//   },
// ];
