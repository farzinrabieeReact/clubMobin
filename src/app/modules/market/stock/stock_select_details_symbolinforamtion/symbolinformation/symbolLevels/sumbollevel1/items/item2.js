import React from "react";
import { handleNumber } from "../../../../../../../../common/method/displayData";

const Item2 = ({ itm, background }) => {
  const selectorColor = data => {
    let str = String(data).includes("%");
    if (str) {
      let number = +data.split("%")[0];
      return +number >= 0 ? "green" : "red";
    }
    return "black";
  };

  return (
    <>
      <div className={`d-flex flex-column rounded-sm w-100`}>
        <div
          className={` w-100 d-flex align-items-center ${background} `}
          style={{
            height: "45px",
            borderRadius: "10px 0 0 10px",
            color: selectorColor(itm.text)
          }}
        >
          <span
            className="d-flex align-items-center mr-3"
            style={{
              borderRight: "2px solid #707070",
              height: "30px"
            }}
          />
          {isNaN(itm.text) ? itm.text : handleNumber(parseFloat(itm.text))}
          {/*{itm.text}*/}
        </div>
      </div>
    </>
  );
};

export default Item2;
