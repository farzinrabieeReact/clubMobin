//withdLoading.js
import { Button } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getTimeActiveToken, timeExpireToken } from "../apiConfig";

function HocIsCustomer(Component) {
  return function HocIsLoginComponent({ ...props }) {
    const { user } = useSelector(state => state.auth);
    // const history = useHistory()

    const uiGenarate = () => {
      return (
        <>
          <div className="bg-white shadow rounded-lg p-5 text-center">
            <h3 className="mb-4">
              برای دسترسی به این قسمت باید مشتری کارگزاری مبین سرمایه باشید.
            </h3>
            <h5>
              از این{" "}
              <Button variant="contained" color="primary" size="large">
                <Link
                  to="/user-profile/personal-edit"
                  style={{ color: "white" }}
                >
                  لینک
                </Link>
              </Button>{" "}
              می توانید مشتری مبین سرمایه شوید.
            </h5>
          </div>
        </>
      );
    };

    if (!user) return uiGenarate();
    if (getTimeActiveToken() > timeExpireToken) {
      return uiGenarate();
    }
    if (user?.member_automation_id === "null") return uiGenarate();

    return <Component {...props} />;
  };
}

export default HocIsCustomer;
