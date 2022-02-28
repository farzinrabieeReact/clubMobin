import React from "react";
import { Box } from "@material-ui/core";
import { Star } from "react-bootstrap-icons";
import { makeStyles } from "@material-ui/styles";

const useStyle = makeStyles(() => ({
  title: {
    borderBottom: "1px solid #64A51C",
    display: "flex",
    alignItems: "center"
  },
  box: {
    width: "100%",
    border: "1px solid #B2B2B2",
    minHeight: "10vh"
  }
}));

const Boxes = ({ data, allData }) => {
  const classes = useStyle();

  let selectorColor = data => {
    let str = String(data).includes("%");
    if (str) {
      let number = +data.split("%")[0];
      return number >= 0 ? "green" : "red";
    }
    return "black";
  };

  return (
    <div>
      <Box className={`${classes["box"]} rounded-lg p-7 shadow`}>
        <div className="row">
          <div className="col-lg col-12 mb-10 mb-lg-0">
            <div className="mb-5">
              <p>{data[0].text}</p>
            </div>

            <div className="mb-5">
              {allData.data.length !== 0 ? (
                <>
                  <h4>{data[1].text}</h4>
                  <p>({data[2].text})</p>
                </>
              ) : (
                // <p>سهم مورد نظر یافت نشد</p>
                <></>
              )}
              {!data[0].text && <p>سهم مورد نظر یافت نشد</p>}
            </div>
            <div className="text-success">
              <p className="m-0">
                {/*<Star style={{ verticalAlign: "inherit", marginLeft: "5px" }} />*/}
                {/*افزودن به علاقه مندی ها*/}
              </p>
            </div>
          </div>
          <div className="col-lg col-6">
            <div className="mb-15">
              <p>آخرین قیمت: {data[3].text}</p>
            </div>
            <div>
              <p>حجم معاملات : {data[4].text}</p>
            </div>
          </div>
          <div className="col-lg col-6">
            <div className="mb-15">
              <p>قیمت دیروز : {data[5].text} </p>
            </div>
            <div>
              <p>
                درصد تغییر :
                <span style={{ color: selectorColor(data[6].text) }}>
                  {data[6].text}
                </span>
              </p>
            </div>
          </div>
        </div>
      </Box>
    </div>
  );
};

export default Boxes;
