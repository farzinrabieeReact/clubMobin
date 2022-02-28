import React from "react";
import Item1 from "./item1";
import Item2 from "./item2";

const Items = ({ data,data1 }) => {
  return (
    <>
      <div className="d-flex w-100">
        <div className="w-100">
          {data?.map((itm, ind) => (
            <Item1 itm={itm} key={ind} background={ind%2===0?"bg-secondary":"bg-white"}  />
          ))}
        </div>

        <div className="w-100">
          {data1?.map((itm, ind) => (
            <Item2 itm={itm} key={ind} background={ind%2===0?"bg-secondary":"bg-white"} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Items;
// let item1 = [
//     { text: "نماد" },
//     { text: "آخرین قیمت " },
//     { text: "قیمت پایانی" },
//     { text: "درصد تغییر قیمت" },
//     { text: "تغییر قیمت" },
//     { text: "بالاترین قیمت" },
//     { text: "پایین ترین قیمت" },
//     { text: "قیمت دیروز" },
//     { text: "حجم" },
//     { text: "ارزش" }
// ];
