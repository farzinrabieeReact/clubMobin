import React, { useEffect, useState } from "react";
import { Box, Divider } from "@material-ui/core";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import { dateConvertMiladiToShamsi } from "../../../common/method/date";

const CardArchive = ({ data }) => {

  const [answare, setAnsware] = useState([]);
  const handleChange = () => {
    return null;
  };

  // data.map((itm, ind) => {
  //   console.log("itm", itm);
  // });
  useEffect(() => {
    if (data) {
      let answare = [];
      for (let i = 0; i < 10; i++) {
        if (data.body[`answer_${i + 1}`] !== "null") {
          // console.log("shodeeeee");
          let num = i + 1;
          answare.push({
            // isTrust: data.body.correct_answer === i + 1 ? true : false,
            text: data.body[`answer_${i + 1}`],
            value: num.toString()
          });
        }
      }
      setAnsware(answare);
    }
  }, [data]);
  return (
    <>
      <div className="bg-white rounded-lg py-10 px-3 shadow mt-5">
        <p>{data.body.competition_title}</p>
        <div className="d-flex" style={{ overflow: "auto" }}>
          <p className="mx-5">
            تاریخ شروع مسابقه:
            <span className="mx-1 text-muted">
              {dateConvertMiladiToShamsi(data.body.start_date.split(" ")[0])}
            </span>
          </p>
          <p className="mx-5">
            تاریخ پایان مسابقه:
            <span className="mx-1 text-muted">
              {/*{state[0].body.participation_deadline.split(" ")[0]}*/}
              {dateConvertMiladiToShamsi(
                data.body.participation_deadline.split(" ")[0]
              )}
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
        <Divider className="mt-5 mb-5" />

        <div>
          <p className="font-weight-bold">{data.body.question}</p>
          <RadioGroup
            aria-label="gender"
            name="gender1"
            onChange={handleChange}
            className=""
          >
            <div className="mt-10  d-flex flex-wrap">
              {answare?.map((item, ind) => (
                <Box minWidth="20%" marginRight="20px" key={ind}>
                  <FormControlLabel
                    value={item.value}
                    control={<Radio className="color-g" />}
                    label={item.text}
                    onChange={handleChange}
                    checked={
                      item.value === data?.body?.correct_answer.toString()
                        ? true
                        : false
                    }
                    className="m-0 mr-1"
                  />
                  <span
                    className={
                      item.value === data?.body?.correct_answer.toString()
                        ? "color-g"
                        : "text-muted"
                    }
                  ></span>
                </Box>
              ))}
            </div>
            <div className="border p-3 mt-10">
              <span className="color-g">توضیحات گزینه صحیح:</span>{" "}
              <span>
                {data.body.correct_answer_description !== "null"
                  ? data.body.correct_answer_description
                  : "توضیحات پاسخ ندارد."}
              </span>
            </div>
          </RadioGroup>
        </div>
      </div>
    </>
  );
};

export default CardArchive;
