import React from "react";
import Card from "../card";




export default function Index({ data, handelClick, loading }) {

  if (data.length === 0 && !loading) {
    return (
      <div className="p-5 shadow w-75 mx-auto">
        دوره ای ثبت نام نکرده اید.
      </div>
    )
  }

  return (
    <div className={`d-flex flex-wrap justify-content-around`}>
      {
        data
          .map((item, ind) => (
            <Card key={ind} data={item} handelClick={handelClick} />
          ))
      }
    </div>
  )
}