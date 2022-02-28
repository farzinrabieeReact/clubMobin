import React, { useState } from "react";
import ModalCustom from "../../../../common/components/ModalCustom";
import CardDetailes from "../CardDetailes";

export default function Index({ data }) {
  const [flag, setflag] = useState(false);

  return (
    <div>
      <div
        className="btn backGroundOrangeOutLine font-weight-bolder font-size-sm"
        onClick={() => setflag(prev => !prev)}
      >
        {" "}
        مشاهده پاسخ{" "}
      </div>
      <ModalCustom open={flag} setOpen={setflag}>
        <CardDetailes
          color={"#28A745"}
          title={"پاسخ"}
          setOpen={setflag}
          data={data}
        />
      </ModalCustom>
    </div>
  );
}
