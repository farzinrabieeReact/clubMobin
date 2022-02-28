/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Switch, Redirect, Link } from "react-router-dom";
import { toAbsoluteUrl } from "../../../../_metronic/_helpers";
import { ContentRoute } from "../../../../_metronic/layout";
import { makeStyles } from "@material-ui/styles";
import Login from "./newPage/login";
// import Register from "./newPage/register";
import RegisterWithMobile from "./newPage/registerWithMobile";
// import RegisterOTP from "./newPage/registerOTP";
import RegisterOTPnew from "./newPage/registerOTPnew";
// import RegisterPass from "./newPage/registerPass";
import RegisterPassNew from "./newPage/registerPassNew";
import RegisterFinish from "./newPage/registerFinish";
import RegisterOTPsejam from "./newPage/registerOTPsejam";
import { Hidden } from "@material-ui/core";
import FooterLayout from "./newPage/footer";
import ForgotPass from "./newPage/ForgotPass";
import ForgotPasswordChange from "./newPage/forgotPasswordChange";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    height: "100vh",
    backgroundColor: "#ecf0f3",
    [theme.breakpoints.down("870")]: {
      minHeight: "100vh !important",
      height: "auto !important",
      display: "inline-table"
    }
  },
  box: {
    width: 872,
    height: 650,
    margin: "auto",
    display: "flex",
    marginTop: 110,
    flexDirection: "row-reverse",
    background: "#ffffff",
    borderRadius: 5,
    boxShadow: "0px 0px 86px 0px rgba(0,0,0,0.13)",
    [theme.breakpoints.down("870")]: {
      width: "90%",
      marginTop: 130,
      marginBottom: 5,
      height: "auto",
      flexDirection: "column"
    }
  },
  sidebar: {
    width: 501,
    height: "100%",
    position: "relative",
    [theme.breakpoints.down("870")]: {
      width: "auto"
    }
  },
  leftSideImg: {
    [theme.breakpoints.down("870")]: {
      display: "none"
    }
  },
  logo: {
    position: "absolute",
    bottom: 23,
    right: 27,
    width: 114,
    height: 48,
    // border: "1px dashed whitesmoke",
    [theme.breakpoints.down("870")]: {
      bottom: 0,
      top: -85,
      right: "calc(50% - 87.5px)",
      width: 179,
      height: 73,
      border: "none"
    }
  },
  content: {
    flexGrow: 1,
    fontFamily: "iransans !important",
    [theme.breakpoints.down("870")]: {
      width: "auto"
    }
  }
}));

export function AuthPageNew() {
  const classes = useStyles();

  return (
    <>
      <div className={classes.root}>
        <div className={classes.box}>
          {/* /////////////////////aside///////////// */}
          <div className={classes.sidebar}>
            <img
              className={classes.leftSideImg}
              src={toAbsoluteUrl("/media/sign-up/Untitled-1.png")}
              width="100%"
              height="100%"
              alt=""
            />
            <div className={classes.logo}>
              <Hidden mdDown>
                <Link to="/">
                  <img
                    src={toAbsoluteUrl("/media/sign-up/logo.png")}
                    width="100%"
                    height="100%"
                    alt=""
                  />
                </Link>
              </Hidden>
              <Hidden lgUp>
                <Link to="/">
                  <img
                    src={toAbsoluteUrl("/media/sign-up/logoMobile.png")}
                    width="100%"
                    height="100%"
                    alt=""
                  />
                </Link>
              </Hidden>
            </div>
          </div>
          {/* ///////////////////////////////////// */}

          {/* /////////////////////content///////////// */}
          <div className={classes.content}>
            <Switch>
              <ContentRoute path="/auth/login" component={Login} />
              {/* <ContentRoute path="/auth/register" component={Register} /> */}
              <ContentRoute path="/auth/register" component={RegisterWithMobile} />
              {/* <ContentRoute path="/auth/RegisterPass" component={RegisterPass}/> */}
              <ContentRoute path="/auth/RegisterPass" component={RegisterPassNew}/>
              {/* <ContentRoute path="/auth/registerOTP" component={RegisterOTP} /> */}
              <ContentRoute path="/auth/RegisterOTP" component={RegisterOTPnew} />
              <ContentRoute
                path="/auth/RegisterFinish"
                component={RegisterFinish}
              />
              <ContentRoute
                path="/auth/registerOTPsejam"
                component={RegisterOTPsejam}
              />
              <ContentRoute path="/auth/forgotPass" component={ForgotPass} />
              <ContentRoute path="/auth/ForgotPasswordChange" component={ForgotPasswordChange} />
              <Redirect from="/auth" exact={true} to="/auth/login" />
              <Redirect to="/auth/login" />
            </Switch>
          </div>
          {/* ///////////////////////////////////// */}
        </div>

        <div>
          <FooterLayout />
        </div>
      </div>
    </>
  );
}
