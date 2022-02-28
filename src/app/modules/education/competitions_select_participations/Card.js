import React, { useEffect, useState } from "react";
import { Box, Divider } from "@material-ui/core";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import AxiosCustom from "./../../../common/components/apiConfig";
import { dateConvertMiladiToShamsi } from "../../../common/method/date";

export default function Card({ data }) {
  const [answare, setAnsware] = useState([]);
  const [state, setstate] = useState([]);

  const handleChange = () => {
    return null;
    // setValue(event.target.value);
  };

  const apicall = async () => {
    let config = {
      url: "select_request"
    };

    let dataApi = {
      table: "competition",
      method_type: "select_performance_by_id",
      data: {
        _id: data.body.competition_id
      }
    };

    let res = await AxiosCustom(config, dataApi);

    if (res.data.response.is_successful) {
      setstate(res.data.response.data.results);
    }
  };

  useEffect(() => {
    apicall(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (state.length) {
      let answare = [];
      for (let i = 0; i < 10; i++) {
        if (state[0].body[`answer_${i + 1}`] !== "null") {
          let num = i + 1;
          answare.push({
            // isTrust: data.body.correct_answer === i + 1 ? true : false,
            text: state[0].body[`answer_${i + 1}`],
            value: num.toString()
          });
        }
      }
      setAnsware(answare);
    }
  }, [state]);

  if (!state.length) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg py-10 px-3 shadow mt-5">
      <p>{data.body.competition_title}</p>
      <div className="d-flex" style={{ overflow: "auto" }}>
        <p className="mx-5">
          تاریخ شروع مسابقه:
          <span className="mx-1 text-muted">
            {dateConvertMiladiToShamsi(state[0].body.start_date.split(" ")[0])}
          </span>
        </p>
        <p className="mx-5">
          تاریخ پایان مسابقه:
          <span className="mx-1 text-muted">
            {dateConvertMiladiToShamsi(state[0].body.start_date.split(" ")[0])}
          </span>
        </p>
        <p className="mx-5">
          امتیاز لازم برای شرکت:
          <span className="mx-1 text-muted">
            {state[0].body.required_bonus}
          </span>
        </p>
        <p className="mx-5">
          امتیاز برنده شدن:
          <span className="mx-1 text-muted">{state[0].body.reward_bonus}</span>
        </p>
      </div>
      <Divider className="mt-5 mb-5" />

      <div>
        <p className="font-weight-bold">{state[0].body.question}</p>
        <RadioGroup
          aria-label="gender"
          name="gender1"
          onChange={handleChange}
          className=""
        >
          <div className="mt-10  d-flex flex-wrap">
            {answare.map((item, ind) => (
              <Box minWidth="20%" marginRight="20px" key={ind}>
                <FormControlLabel
                  value={item.value}
                  control={<Radio className="color-g" />}
                  label={item.text}
                  onChange={handleChange}
                  checked={
                    item.value === state[0].body.correct_answer.toString()
                      ? true
                      : false
                  }
                  className="m-0 mr-1"
                />
                <span
                  className={
                    item.value === state[0].body.correct_answer.toString()
                      ? "color-g"
                      : "text-muted"
                  }
                >
                  {/*{*/}
                  {/*  JSON.parse(state[0].body.freqs)*/}
                  {/*    [ind].toString()*/}
                  {/*    .split(".")[0]*/}
                  {/*}*/}
                  {/*%)*/}
                </span>
              </Box>
            ))}
          </div>
          <div className="border p-3 mt-10">
            <span className="color-g">توضیحات گزینه صحیح:</span>{" "}
            <span>
              {state[0].body.correct_answer_description !== "null"
                ? state[0].body.correct_answer_description
                : "توضیحات پاسخ ندارد."}
            </span>
          </div>
        </RadioGroup>
      </div>
    </div>
  );
}
