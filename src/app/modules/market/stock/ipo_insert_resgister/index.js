import React, { useEffect, useState } from "react";
import {
  Button,
  Checkbox,
  FormControlLabel,
  makeStyles,
  TextField
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { useDispatch, useSelector } from "react-redux";
import { actionTypes } from "../../../../../redux/market/stock/ipo_select_active";
import { actionTypesRegister } from "../../../../../redux/market/stock/ipo_insert_register";
import { getDataInLocalstorage } from "../../../../common/method/getDataInLocalstorage";

const useStyle = makeStyles(() => ({
  title: {
    borderBottom: "1px solid #B2B2B2"
  },
  textField: {
    [`& fieldset`]: {
      borderRadius: 10
    }
  }
}));

const RecordBy = ({ setStateSelect,stateSelect }) => {
  // hook
  useEffect(() => {
    dispatch({ type: actionTypes.ipoAsync });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const dispatch = useDispatch();

  // var
  const defaultState = { text: 0 };
  const classes = useStyle();

  // reducers
  const Data = useSelector(state => state.reducer_ipo_select_list.data);

  // state
  const [state, setState] = useState(defaultState);
  const [stateId, setStateId] = useState(defaultState);
  const [validateInput1, setValidateInput1] = useState(false);
  const [validateInput2, setValidateInput2] = useState(false);
  const [validateMinInput2, setValidateMinInput2] = useState(false);
  const [priceValue, setPriceValue] = useState("");
  const [quantityValue, setQuantityValue] = useState("");
  const [checked, setChecked] = useState(false);
  const [checkedClass, setCheckedClass] = useState(false);

  // functions
  const handleChange = (e, val) => {
    
    setStateSelect(val)
    let result = val ? val.body : defaultState;
    let resultId = val ? val : defaultState;
    let result1 = val ? val.body.max_quantity : "";
    let result2 = val ? val.body.max_price : "";
    setStateId(resultId);
    setState(result);
    setQuantityValue(result1);
    setPriceValue(result2);
    setValidateMinInput2(false);
    setValidateInput2(false);
    setValidateInput1(false);
  };

  const handleInput1 = e => {
    if (state.max_quantity) {
      setQuantityValue(e.target.value);
    }

    if (parseInt(e.target.value) > state.max_quantity) {
      setQuantityValue(state.max_quantity);
      setValidateInput1(true);
    } else {
      setValidateInput1(false);
    }
  };

  const handleInput2 = e => {
    if (state.max_price) {
      setPriceValue(e.target.value);
    }
    if (parseInt(e.target.value) > state.max_price) {
      setPriceValue(state.max_price);
      setValidateInput2(true);
    } else {
      setValidateInput2(false);
    }
    if (parseInt(e.target.value) < state.min_price) {
      setValidateMinInput2(true);
    } else {
      setValidateMinInput2(false);
    }
  };

  const handleClick = () => {
    let member = getDataInLocalstorage("member_id");
    dispatch({
      type: actionTypesRegister.ipoRegisterAsync,
      payload: {
        memberId: member,
        price: priceValue,
        quantity: quantityValue,
        id: stateId?.id
      }
    });
  };

  const handleChecked = () => {
    // if (checked) {
    //   setCheckedClass(false)
    // } else {
    //   setCheckedClass(true)
    // }
    if(!stateSelect){
      setCheckedClass(true)
      return
    }
    if (validateInput1 || validateInput1 || validateInput2) {
         setCheckedClass(true);
         return
    }
    if (!validateInput1 && !validateInput1 && !validateInput2) {
      if (checked) {
        setCheckedClass(false)
      }else{
        setCheckedClass(true)
      }
return
    }

    // else {
    //   if (checked) {
    //     return false;
    //   } else {
    //     return true;
    //   }
    // }
  };
  useEffect(() => {
    handleChecked()
  }, [checked,validateInput1,validateInput2,validateMinInput2,stateSelect])
  const handleChangeCheck = e => {
    setChecked(e.target.checked);
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow mb-10" style={{height:"650px"}}>
        <div className={`${classes["title"]}  p-5 py-8 mb-2`}>
          <h3>ثبت پیش سفارش خرید</h3>
        </div>
        <div className="p-3 mb-3">
          {Data.length < 0 ? (
            <p className="mb-3">عرضه مورد نظر را انتخاب کنید</p>
          ) : null}
          <div className="w-100 d-flex justify-content-center px-5 mb-3">
            {Data.length > 0 ? (
              <Autocomplete
                id="combo-box-demo"
                options={Data}
                getOptionLabel={option => option.body.stock_name}
                fullWidth
                onChange={handleChange}
                renderInput={params => (
                  <TextField
                    {...params}
                    label="عرضه مورد نظر را انتخاب کنید"
                    variant="outlined"
                    className={classes["textField"]}
                  />
                )}
                className="rounded-lg"
              />
            ) : (
              <h3 className="badge h5 text-white  badge-warning w-100 ">
                عرضه ای وجود ندارد
              </h3>
            )}
          </div>

          <div className="p-3 pl-5 mb-7">
            <div className="d-flex justify-content-between">
              <p>حداکثر قیمت سهم</p>
              <p className="shadow-sm rounded p-2">
                {state.max_price ? state.max_price : defaultState.text} ریال
              </p>
            </div>
            <div className="d-flex justify-content-between">
              <p>حداقل قیمت سهم</p>
              <p className="shadow-sm rounded p-2">
                {state.min_price ? state.min_price : defaultState.text} ریال
              </p>
            </div>
            <div className="d-flex justify-content-between">
              <p>حداکثر تعداد سهم قابل خرید</p>
              <p className="shadow-sm rounded p-2">
                {state.max_quantity ? state.max_quantity : defaultState.text}
                عدد
              </p>
            </div>
          </div>

          <div className="px-5 mb-10">
            <TextField
              id="outlined-basic"
              label="تعداد"
              variant="outlined"
              fullWidth
              className={classes["textField"]}
              value={quantityValue}
              onChange={handleInput1}
              type="number"
            />
            {validateInput1 && state.stock_name ? (
              <p style={{ color: "red" }}>مقدار بیش از حد مجاز است</p>
            ) : null}
          </div>
          <div className="px-5 mb-10">
            <TextField
              id="outlined-basic"
              label="قیمت(ریال)"
              variant="outlined"
              fullWidth
              className={classes["textField"]}
              value={priceValue}
              onChange={handleInput2}
              type="number"
            />
            {validateInput2 && state.stock_name ? (
              <p style={{ color: "red" }}>مقدار بیش از حد مجاز است</p>
            ) : null}
            {validateMinInput2 && state.stock_name ? (
              <p style={{ color: "red" }}>مقدار کم تر از حد مجاز است</p>
            ) : null}
          </div>
          <div>
            <FormControlLabel
              control={<Checkbox color="primary" />}
              label=" اینجانب ضوابط و شرایط فوق را مطالعه کرده و همه را قبول دارم"
              onChange={e => handleChangeCheck(e)}
            />
          </div>

          <div className="w-100 d-flex justify-content-end px-5 ">
            <Button
              disabled={checkedClass}
              // disabled={checked ? false : true}
              onClick={handleClick}
              variant={"contained"}
              type="submit"
              className={
                checkedClass ?
                  `bg-gray text-white mb-10`
                  : `bg-success text-white mb-10`
              }
            >
              ثبت درخواست
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default RecordBy;
