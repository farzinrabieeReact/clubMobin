import React from "react";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    borderCollapse: "collapse",
    display: "table",
    textAlign: "left"
  },
  ProvinceName: {
    height: 60,
    backgroundColor: "#E8EBEE",
    borderRadius: "8px !important"
  },
  tr: {
    height: 60
  },
  address: {
    maxWidth: 500
  }
}));

export default function Index({ data }) {
  const classes = useStyles();

  return (
    <div className={"table-responsive"}>
      <table className={`${classes["root"]} mt-5 `}>
        <thead>
          <tr>
            {th.map((value, index) => {
              return <th key={index}>{value}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {data.map((item, ind) => (
            <tr className={`${classes["tr"]}`} key={ind}>
              <td style={{ minWidth: "60px" }}>{item.body.ProvinceName}</td>
              <td className={classes["address"]}>{item.body.OfficeId}</td>
              <td style={{ minWidth: "200px", padding: "20px" }}>
                {item.body.Address}
              </td>
              <td>{item.body.PhoneNumber}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const th = ["استان", "کد دفتر", "آدرس", "تلفن یا فکس"];
