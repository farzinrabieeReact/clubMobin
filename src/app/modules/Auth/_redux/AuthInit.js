import React, { useRef, useEffect, useState } from "react";
import { shallowEqual, useSelector, connect } from "react-redux";
import { LayoutSplashScreen } from "../../../../_metronic/layout";
import * as auth from "./authRedux";
// import { getUserByToken } from "./authCrud";

function AuthInit(props) {
  const didRequest = useRef(false);
  // const dispatch = useDispatch();
  const [showSplashScreen, setShowSplashScreen] = useState(true);
  const { user } = useSelector(
    ({ auth }) => ({
      user: auth.user,
    }),
    shallowEqual
  );

  // We should request user by authToken before rendering the application
  useEffect(() => {
    const requestUser = async () => {
      try {
        if (!didRequest.current) {
          // const { data: user } = await getUserByToken();
          // dispatch(props.fulfillUser(user));
        }
      } catch (error) {
        console.error(error);
        if (!didRequest.current) {
          // dispatch(props.logout());
        }
      } finally {
        setShowSplashScreen(false);
      }

      return function cleanup() {
        didRequest.current = true
      }
    };

    if (user) {
      requestUser();
    } else {
      // dispatch(props.fulfillUser(undefined));
      setShowSplashScreen(false);
    }
    // eslint-disable-next-line
  }, []);

  return showSplashScreen ? <LayoutSplashScreen /> : <>{props.children}</>;
}

export default connect(null, auth.actions)(AuthInit);
