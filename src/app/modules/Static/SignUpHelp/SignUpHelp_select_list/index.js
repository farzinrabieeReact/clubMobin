import React, { useState } from "react";
import { makeStyles } from "@material-ui/core";
import Btns from "./btns";
import Levels from "./levelComponents/Levels";

const useStyles = makeStyles(theme => ({
  title: {
    borderBottom: "1px solid #64A51C"
  }
}));

function SignUpHelp(props) {
  const classes = useStyles();

  const [click, setClick] = useState(0);

  return (
    <div>
      <div>
        <h3 className={`${classes["title"]} p-5`}>راهنمای عضویت در باشگاه</h3>
        <p className="p-15">
          عضویت در باشگاه با گذراندن 4 مرحله به پایان میرسد
        </p>
      </div>
      <div className="row flex-lg-row flex-column">
        <div className="col-lg-2 col-12 text-center mb-20 mb-lg-0">
          {btn.map((item, index) => (
            <Btns
              disable={""}
              state={click}
              setState={setClick}
              btn={item}
              key={index}
              id={index}
            />
          ))}
        </div>
        <div className="col-lg col-12">
          <Levels state={click} />
        </div>
      </div>
    </div>
  );
}

let btn = [
  { item: "مرحله اول" },
  { item: "مرحله دوم" },
  { item: "مرحله سوم" },
  { item: "مرحله چهارم" }
];

export default SignUpHelp;
