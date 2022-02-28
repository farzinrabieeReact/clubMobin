//withdLoading.js
import { useHistory } from "react-router-dom";
import React from "react";
import { useSelector } from "react-redux";
import { Button } from "@material-ui/core";
import { getTimeActiveToken, timeExpireToken } from "../apiConfig";
function HocIsLogin(Component) {
  // let user = localStorage.getItem('persist:auth') ? JSON.parse(localStorage.getItem('persist:auth')).user : null
  // const { user } = useSelector((state) => state.auth);

  return function HocIsLoginComponent({ ...props }) {
    const { user } = useSelector(state => state.auth);
    const history = useHistory();

    const handleEnterLogin = () => {
      history.push({
        pathname: "/auth/login",
        state: { from: history.location.pathname }
      });
    };

    if (user && getTimeActiveToken() < timeExpireToken)
      return <Component {...props} />;

    return (
      <div className="bg-white shadow rounded-lg d-flex justify-content-center align-items-center p-5 ">
        <h4
          style={{ border: "1px solid #ff5f00" }}
          className="p-5 rounded shadow"
        >
          {/* شما لاگین نمیباشد ابتدا باید وارد سایت شوید */}
          کاربر گرامی برای دسترسی این صفحه باید وارد سایت شوید
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={handleEnterLogin}
            className="ml-4 text-white"
          >
            ورود
          </Button>
        </h4>
      </div>
    );
  };
}
export default HocIsLogin;
