import React from "react";
import { makeStyles } from "@material-ui/core";
import CardNoData from "../../../../common/components/cardNoData";
import { dateConvertMiladiToShamsi } from "../../../../common/method/date";
import { handleNull, handleNumber } from "../../../../common/method/displayData";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    display: "table",
    textAlign: "left",
    borderTop: "1px solid lightGray",
  },
  ProvinceName: {
    height: 60,
    backgroundColor: "#E8EBEE",
    borderRadius: "8px !important",
  },
  thead: {
    borderBottom: "1px solid black",
  },
  tr: {
    height: 60,
    width: "100%",
  },
}));

export default function Index({ data, loading }) {
  const classes = useStyles();

  const handleStatus = (data) => {
    switch (data) {
      case "FINALIZED":
        return "تایید شده";
      case "REJECTED":
        return "لغو شده";
      case "SUBMITTED":
        return "در انتظار";
      default:
        return "نا مشخص";
    }
  };

  const hadleIsRemove = (data) => {
    switch (data) {
      case "TRUE":
        return "کسر شده";
      case "FALSE":
        return "اضافه شده";
      default:
        return "-";
    }
  };

  const handleSource = (statement) => {
    if (statement == "GIFT") {
      return <span>مربوط به جایزه</span>
    } else if (statement == "COURSE") {
      return <span>مربوط به دوره آموزشی</span>
    } else if (statement == "BIRTHDAY") {
      return <span>مربوط به تولد</span>
    } else if (statement == "CLUBMEMBER") {
      return <span>مربوط به عضو باشگاه</span>
    } else if (statement == "ADMIN") {
      return <span>مربوط به ادمین</span>
    } else if (statement == "ORDERS") {
      return <span>مربوط به سفارشات</span>
    } else if (statement == "COMETITION") {
      return <span>مربوط به مسابقات</span>
    } else {
      return <span>---</span>;
    }
  };

  return (
    <div
      className="table-responsive"
      style={{ height: "calc(100vh - 370px)", overflowY: "auto" }}
    >
      {data.length === 0 ? (
        <CardNoData text={loading ? "در حال بارگذاری..." : null} />
      ) : (
          <table className={`${classes["root"]} `}>
            <thead className={`${classes["thead"]}`}>
              <tr className={`${classes["tr"]}`}>
                {th.map((item, index) => (
                  <th className="px-5 text-center" key={index}>
                    {item}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr className={`${classes["tr"]}`} key={index}>
                  <td className="px-5 text-center">{index + 1}</td>
                  <td className="px-5 text-center">
                    {dateConvertMiladiToShamsi(
                      item.body.create_date.split(" ")[0]
                    )}
                  </td>
                  <td className="px-5 text-center">{handleSource(item.body.source)}</td>
                  <td className="px-5 text-center">
                    {handleNumber(item.body.value)} امتیاز
                </td>
                  <td className="px-5 text-center">
                    {handleStatus(item.body.status)}
                  </td>
                  <td className="px-5 text-center">
                    {hadleIsRemove(item.body.is_removed)}
                  </td>
                  <td className="px-5 text-center">
                    {item.body.member_available_bonus}
                  </td>
                  <td style={{ minWidth: 110 }} className="px-5 text-center">
                    {handleNull(item.body.source_description)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
    </div>
  );
}

const th = [
  "#",
  "تاریخ",
  "شرح",
  "امتیاز",
  "وضیعت",
  "نوع",
  "امتیاز باقی مانده",
  "توضیحات",
];
