import React, { useEffect } from "react";
import CardNotif from "./cardNotif";
import { Box } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import { useSelector, useDispatch } from "react-redux";
import { actionTypes } from "../../../../redux/notifications/notification_select_notificationLast4";
import { makeStyles } from "@material-ui/core/styles";
import CardonData from "../../../common/components/cardNoData";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  notification: {
    minHeight: 100
  }
}));

export default function Index() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { push } = useHistory();

  const notification = useSelector(
    state => state.reducer_notification_select_notificationLast4
  ).data;

  useEffect(() => {
    dispatch({ type: actionTypes.notificationAsync });
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  const handelRout = () => {
    push({
      pathname: "/notifications"
    });
  };
  return (
    <Box width={"100%"}>
      <Box className={"mb-5"}>
        <h3>آخرین اعلانات</h3>
      </Box>
      <Box className={`${classes.notification} d-flex row`}>
        {notification?.map((notif, index) => (
          <Box className={"col-md-6 col-lg-3"} key={index}>
            <CardNotif data={notif} />
          </Box>
        ))}
        {!notification.length && (
          <CardonData text={" در حال حاضر اعلانی موجود نمی باشد"} />
        )}
      </Box>
      <Box className={"text-right"}>
        <Button
          className={"text-success h6"}
          size="large"
          onClick={() => handelRout()}
        >
          {" "}
          لیست اعلانات
        </Button>
      </Box>
    </Box>
  );
}
