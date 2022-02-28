import React from "react";
import {
  FormControl,
  FormControlLabel,
  makeStyles,
  Radio,
  RadioGroup
} from "@material-ui/core";
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

const Filter = ({
  setFlag,
  value,
  setValue,
  flaq,
  setValueFilter,
  valueFilter,
  setValue1,
  value1,
  flaqAgree,
  setFlagAgree
}) => {
  const classes = useStyle();

  const handleChangeRadio = e => {
    setValue(e.target.value);
    if (e.target.value === "details") {
      setFlag(true);
      setFlagAgree(false);
    } else if (e.target.value === "aggre") {
      setFlagAgree(true);
      setValueFilter(null);
      setFlag(false);
      setValue1("all");
    }
  };
  const handleChange = e => {
    setValue1(e.target.value);
    let type = e.target.value;
    // if (flaqAgree) {
    //   type = "all";
    // }
    if (type === "kharid") {
      setValueFilter({ trade_type: "1" });
    } else if (type === "forosh") {
      setValueFilter({ trade_type: "2" });
    } else if (type === "all") {
      setValueFilter(null);
    }
  };
  return (
    <>
      <div className="w-100 bg-white shadow rounded-lg  mb-10">
        <div className={`${classes["title"]}  p-5 py-8 mb-2`}>
          <h3>جستجو</h3>
        </div>
        <div className="p-5 py-8">
          <h5>جستجو بر اساس:</h5>
        </div>
        <div>
          <FormControl>
            <span className="px-5 ">نوع سفارش:</span>
            <div className="pl-8 py-2">
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                value={value1}
                onChange={handleChange}
              >
                <FormControlLabel
                  value="all"
                  control={<Radio />}
                  label="هر دو"
                />
                <FormControlLabel
                  value="kharid"
                  control={<Radio />}
                  label="خرید"
                  disabled={flaqAgree}
                />
                <FormControlLabel
                  value="forosh"
                  control={<Radio />}
                  label="فروش"
                  disabled={flaqAgree}
                />
              </RadioGroup>
            </div>
          </FormControl>
        </div>
        <div className="mb-5">
          <FormControl>
            <span className="px-5 ">نوع گزارش:</span>
            <div className="pl-8 py-2">
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                value={value}
                onChange={handleChangeRadio}
              >
                <FormControlLabel
                  value="aggre"
                  control={<Radio />}
                  label="تجمیعی"
                />
                <FormControlLabel
                  value="details"
                  control={<Radio />}
                  label="ریز سفارشات"
                />
              </RadioGroup>
            </div>
          </FormControl>
        </div>
      </div>
    </>
  );
};

export default Filter;
