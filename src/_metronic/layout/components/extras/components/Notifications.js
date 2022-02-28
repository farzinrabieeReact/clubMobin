import React, { useEffect, useState } from "react";
import { NotificationsNone, WarningRounded } from "@material-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import { actionTypes } from "../../../../../redux/notifications/notification_select_notificationLast4";
import { Link } from "react-router-dom";
import { dateConvertMiladiToShamsi } from "../../../../../app/common/method/date";
import { useHistory } from "react-router-dom";

const Notifications = () => {
  const dispatch = useDispatch();
  let { push } = useHistory();
  const [show3, setshow3] = useState(true);
  const [state, setstate] = useState({
    data: [
      {
        body: {
          name: "اعلانی وجود ندارد",
          start_time: ""
        }
      }
    ]
  });

  const dataReducer = useSelector(
    state => state.reducer_notification_select_notificationLast4
  );

  useEffect(() => {
    dispatch({
      type: actionTypes.notificationAsync
    }); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (dataReducer) {
      setstate(dataReducer);
    }
  }, [dataReducer]);

  const handelRoute = data => {
    push({
      pathname: "/notifications/detailes",
      state: {
        data: data
      }
    });
  };

  return (
    <li
      className="nav-item "
      data-placement="left"
      onMouseEnter={() => setshow3(false)}
      onMouseLeave={() => setshow3(true)}
      style={{ position: "relative" }}
    >
      <div
        style={{
          width: "240px",
          minHeight: "100px",
          backgroundColor: "white",
          borderRadius: "7px",
          position: "absolute",
          top: "63px",

          right: "-125px",
          boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px"
        }}
        className={show3 ? "handleHover" : null}
      >
        <div
          className="p-4 bg-light w-100 d-flex justify-content-center"
          style={{ borderRadius: "7px 7px 0 0" }}
        >
          <WarningRounded />
          <h5 className="ml-2">اعلان ها</h5>
        </div>

        {state.data
          // .filter((info)=> info.body.is_active === 'TRUE')
          .map((info, index) => (
            <div className="border-bottom" key={index}>
              <div className="py-3 pl-2">
                {/* {console.log("info",info.body.name)} */}
                <div
                  onClick={() => {
                    handelRoute(info);
                  }}
                  className="text-primary"
                  style={{ cursor: "pointer" }}
                >
                  {info.body.name}
                </div>
                {/* <Link to={"/notifications/detailes"} >{info.body.name}</Link> */}
              </div>
              <div className="text-right pr-3" style={{ fontSize: "10px" }}>
                {dateConvertMiladiToShamsi(info.body.start_time.split(" ")[0])}
              </div>
            </div>
          ))}

        {/* {

        state.data.length === 0 &&(
          <div>
            <p className="p-4 text-center">اعلانی وجود ندارد</p>
          </div>
        )


          } */}
        <div className="d-flex justify-content-center py-3">
          <button className="btn backGroundOrange">
            <Link to={"/notifications"} className="text-light">
              مشاهده همه اعلانات
            </Link>
          </button>
        </div>
        {/*<span className="flash"></span>*/}
      </div>

      <div className="btn btn-sm btn-icon btn-bg-light btn-text-warning btn-hover-warning">
        {/*<NotificationsRounded color="action" fontSize="large" />*/}
        <NotificationsNone style={{ fontSize: "23px" }} />
      </div>
    </li>
  );
};

export default Notifications;
