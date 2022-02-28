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
        مشاهده سوال{" "}
      </div>
      <ModalCustom open={flag} setOpen={setflag}>
        <CardDetailes
          color={"#FFC555"}
          title={"سوال"}
          setOpen={setflag}
          data={data}
        />
      </ModalCustom>
    </div>
  );
}
