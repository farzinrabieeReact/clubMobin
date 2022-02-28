import { makeStyles } from "@material-ui/core";
import React from "react";

let useStyles = makeStyles((theme) => ({
  titleParent: {
    width: "100%",
    display: "grid",
    gridTemplateColumns: "auto auto auto",
    justifyContent: "center",
    alignItems: "center",
    margin: "0 auto",
    "@media (max-width: 780px)": {
      gridTemplateColumns: "auto",
    },
    "@media (min-width: 780px) and (max-width: 1200px)": {
      gridTemplateColumns: "auto auto",
    },
  },
  box: {
    width: 280,
    height: 320,
    backgroundColor: "#f2f2f2",
    borderRadius: 10,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center",
    marginLeft: 20,
    paddingBottom: 10,
    marginTop: 20,
    "@media (max-width: 780px)": {
      marginLeft: 0,
      paddingBottom: 10,
      marginTop: 20,
    },
  },
  text: {
    fontSize: 22,
    fontWeight: 700,
    color: "#1a1a1a",
  },
  text2: {
    fontSize: 20,
    fontWeight: 400,
    color: "#1a1a1a",
  },
  number: {
    fontSize: 50,
    fontWeight: 700,
    color: "#1a1a1a",
    marginLeft: 5,
    marginRight: 5,
  },
  btn: {
    width: 240,
    height: 40,
    backgroundColor: "#60418a",
    color: " #ffffff",
    fontSize: 16,
    borderRadius: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
  },
  btnDis: {
    width: 240,
    height: 40,
    backgroundColor: "lightgray",
    color: "gray",
    fontSize: 16,
    borderRadius: 10,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  iconParent: {
    width: 40,
    height: 40,
    position: "relative",
    marginTop:15
  },
  icon: {
    width: 40,
    height: 40,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
  },
  numIcon: {
    display: "inline-block",
    width: 40,
    height: 40,
    position: "absolute",
    top: 5,
    right: 0,
    fontSize: 20,
    color: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
}));

const SubscriptionHadaf = ({
  planReducer,
  handleFlagModalInsert,
  reservePlan,
  reservedPlan,
  user,
}) => {
  const classes = useStyles();

  const handleTypeDate = (type) => {
    switch (type) {
      case "year":
        return "ساله";
      case "month":
        return "ماهه";
      case "day":
        return "روزه";
      default:
        return "_";
    }
  };

  const handleDays = (type, days) => {
    switch (type) {
      case "year":
        return days / 365;
      case "month":
        return days / 30;
      case "day":
        return days;
      default:
        return "_";
    }
  };


  return (
    <>
      <div>
        <div>
          <div className={classes.titleParent}>
            {planReducer.data.map((itm, ind) => (
              <>
                {itm.body.is_active === "TRUE" && (
                  <div className={classes.box}>
                    <div className={classes.iconParent}>
                      <span className={classes.numIcon}>
                        {" "}
                        {handleDays(
                          itm.body.duration_type,
                          itm.body.duration_day
                        )}
                      </span>
                      <svg className={classes.icon}>
                        <use xlinkHref="/sprite.svg#Group 719"></use>
                      </svg>
                    </div>
                    <div>
                      <span className={classes.text}>اشتراک</span>
                      <span
                        className={classes.number}
                        style={{ marginRight: 10 }}
                      >
                        {handleDays(
                          itm.body.duration_type,
                          itm.body.duration_day
                        )}
                      </span>
                      <span className={classes.text}>
                        {handleTypeDate(itm.body.duration_type)}
                      </span>
                    </div>
                    <div
                      className={classes.text2}
                    >{`امتیاز ${itm.body.required_bonus}`}</div>
                    {!reservePlan &&
                      user.member_available_bonus >=
                        itm.body.required_bonus && (
                        <div
                          className={classes.btn}
                          onClick={(e) => handleFlagModalInsert(e, itm.id)}
                        >
                          {reservedPlan &&
                            !reservePlan &&
                            user.member_available_bonus >=
                              itm.body.required_bonus &&
                            "تمدید اشتراک"}
                          {!reservePlan &&
                            !reservedPlan &&
                            user.member_available_bonus >=
                              itm.body.required_bonus &&
                            "خرید اشتراک"}
                        </div>
                      )}
                    {
                      user.member_available_bonus <
                        itm.body.required_bonus && (
                        <div
                          className={classes.btnDis}
                        >
                          {reservedPlan &&
                            !reservePlan &&
                            user.member_available_bonus >=
                              itm.body.required_bonus &&
                            "تمدید اشتراک"}
                          {!reservePlan &&
                            !reservedPlan &&
                            user.member_available_bonus >=
                              itm.body.required_bonus &&
                            "خرید اشتراک"}
                        </div>
                      )}
                    {reservePlan && (
                      <div
                        className={classes.btnDis}
                      >
                        {"خرید اشتراک"}
                      </div>
                    )}
                  </div>
                )}
              </>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default SubscriptionHadaf;
