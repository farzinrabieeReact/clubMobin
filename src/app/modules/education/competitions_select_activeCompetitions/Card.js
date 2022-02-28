import React, { useEffect, useState } from "react";
import { Box, Divider } from "@material-ui/core";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import { useDispatch, useSelector } from "react-redux";
import { actionTypes } from "./../../../../redux/education/competitions_select_activeCompetitions/competition_insert_participate";
import { getDataInLocalstorage } from "../../../common/method/getDataInLocalstorage";
import { dateConvertMiladiToShamsi } from "./../../../common/method/date"
import { actionTypes as actionTypesNotif } from "../../../../redux/notificationAlert";


export default function Card({ data }) {
  const [value, setValue] = useState("");
  const [answare, setAnsware] = useState([]);
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);


  const handleChange = event => {
    setValue(event.target.value);
  };

  useEffect(() => {
    let answare = [];
    for (let i = 0; i < 10; i++) {
      if (data.body[`answer_${i + 1}`] !== "null") {
        let num = i + 1;
        answare.push({
          // isTrust: data.body.correct_answer === i + 1 ? true : false,
          text: data.body[`answer_${i + 1}`],
          value: num.toString()
        });
      }
    }

    setAnsware(answare);
  }, [data]);

  const handleSubmit = () => {
    if (auth.user === undefined) {
      dispatch({
        type: actionTypesNotif.warning,
        textAlert: "برای شرکت در مسابقه ابتدا باید لاگین کنید"
      });
      return;
    }


    if (getDataInLocalstorage("member_id")) {
      let param = {
        competition_id: data.id,
        member_id: getDataInLocalstorage("member_id"),
        choice_number: value
      };

      dispatch({ type: actionTypes.insert_participateAsync, payload: param });
    }
  };

  return (
    <div className="bg-white rounded-lg py-10 px-3 shadow mt-5">
      <p>{data.body.competition_title}</p>
      <div className="d-flex" style={{ overflow: "auto" }}>
        <p className="mx-5">
          تاریخ شروع مسابقه:
          <span className="mx-1 text-muted">
            {dateConvertMiladiToShamsi(data.body.start_date)}
          </span>
        </p>
        <p className="mx-5">
          تاریخ پایان مسابقه:
          <span className="mx-1 text-muted">
            {dateConvertMiladiToShamsi(data.body.participation_deadline)}
          </span>
        </p>
        <p className="mx-5">
          امتیاز لازم برای شرکت:
          <span className="mx-1 text-muted">{data.body.required_bonus}</span>
        </p>
        <p className="mx-5">
          امتیاز برنده شدن:
          <span className="mx-1 text-muted">{data.body.reward_bonus}</span>
        </p>
      </div>
      <Divider className="mt-10 mb-10" />

      <div>
        <p className="font-weight-bold">{data.body.question}</p>
        <RadioGroup
          aria-label="gender"
          name="gender1"
          value={value}
          onChange={handleChange}
          className=""
        >
          <div className="mt-20 mb-20 d-flex flex-wrap">
            {answare.map((item, ind) => (
              <Box minWidth="25%" key={ind}>
                <FormControlLabel
                  value={item.value}
                  control={<Radio className="color-g" />}
                  label={item.text}
                  onChange={handleChange}
                  checked={item.value === value ? true : false}
                />
              </Box>
            ))}
          </div>
        </RadioGroup>
      </div>

      <div className="text-right">
        <button
          className="btn btn-sm btn-primary font-weight-bold py-2 px-4 px-xxl-5 my-1 h5"
          onClick={handleSubmit}
        >
          ارسال
        </button>
      </div>
    </div>
  );
}
