import React, { useState, useEffect } from "react";
import Header from "./header";

import { useSelector, useDispatch } from "react-redux";
import { actionTypes } from "../../../../redux/notifications/notification_select_list";
import { actionTypes as actionTypeEmail } from "../../../../redux/notifications/notification_email_select";
import { actionTypes as actionTypeSms } from "../../../../redux/notifications/notification_sms_select";

import GerneralInformation from "./content/gerneralInformation";
import PersonalInformationn from "./content/personalInformation";
import { convertDigitToEnglish } from "../../../common/method/convertDigitToEnglish";

export default function Index() {
  let generalInformation = "اعلانات عمومی";
  let PersonalInformation = "اعلانات شخصی";

  // ---------------------------------------useState---useSelector--------------------------------

  const [stateWeb, setStateWeb] = useState([]);
  const [stateEmail, setStateEmail] = useState([]);
  const [stateSms, setStateSms] = useState([]);
  const [stateRafresh, setstateRafresh] = useState(false);

  const [stateTitleBtnGeneral, setstateTitleBtnGeneral] = useState({
    start_time: null,
    end_time: null,
  });
  const [stateTitleBtnPersonal, setstateTitleBtnPersonal] = useState({
    start_time: null,
    end_time: null,
  });

  const [flagFilter, setflagFilter] = useState(false);

  const [flagSwich, setflagSwich] = useState(generalInformation);

  const dispatch = useDispatch();

  const notificationWeb = useSelector(
    (state) => state.reducerNotificationSelectList
  );
  const notificationEmail = useSelector(
    (state) => state.notification_email_select_reducer
  );
  const notificationSms = useSelector(
    (state) => state.notification_sms_select_reducer
  );


  // --------------------------------------------------apiCallFunction------------------------------------------

  const apiCallWeb = () => {
    let obj = {};
    if (flagSwich === generalInformation) {
      Object.keys(stateTitleBtnGeneral).forEach((element) => {
        if (stateTitleBtnGeneral[element]) {
          obj[element] = stateTitleBtnGeneral[element];
        }
      });
    } else {
      Object.keys(stateTitleBtnPersonal).forEach((element) => {
        if (stateTitleBtnPersonal[element]) {
          obj[element] = stateTitleBtnPersonal[element];
        }
      });
    }

    obj = { ...obj, type: "WEB" };

    let data = {
      data: obj,
      type: "WEB",
    };
    dispatch({
      type: actionTypes.notificationSelectAsync,
      payload: data,
    }); //web
  };

  const apiCallSms = () => {
    let obj = {};
    if (flagSwich === generalInformation) {
      Object.keys(stateTitleBtnGeneral).forEach((element) => {
        if (stateTitleBtnGeneral[element]) {
          obj[element] = stateTitleBtnGeneral[element];
        }
      });
    } else {
      Object.keys(stateTitleBtnPersonal).forEach((element) => {
        if (stateTitleBtnPersonal[element]) {
          obj[element] = stateTitleBtnPersonal[element];
        }
      });
    }
    obj = { ...obj, type: "SMS" };

    let data = {
      data: obj,
    };
    dispatch({
      type: actionTypeSms.notificationSmsAsync,
      payload: data,
    }); //sms
  };

  const apiCallEmail = () => {
    let obj = {};
    if (flagSwich === generalInformation) {
      Object.keys(stateTitleBtnGeneral).forEach((element) => {
        if (stateTitleBtnGeneral[element]) {
          obj[element] = stateTitleBtnGeneral[element];
        }
      });
    } else {
      Object.keys(stateTitleBtnPersonal).forEach((element) => {
        if (stateTitleBtnPersonal[element]) {
          obj[element] = stateTitleBtnPersonal[element];
        }
      });
    }
    obj = { ...obj, type: "EMAIL" };

    let data = {
      data: obj,
      type: "EMAIL",
    };
    dispatch({
      type: actionTypeEmail.notificationEmailAsync,
      payload: data,
    }); //email
  };
  // ----------------------------------------------------useEffect-------------------------------

  useEffect(() => {
    apiCallWeb();
    apiCallSms();
    apiCallEmail();
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (notificationWeb.data) {
      setStateWeb(notificationWeb.data);
    }
  }, [notificationWeb.data]); //eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (notificationEmail.data) {
      setStateEmail(notificationEmail.data);
    }
  }, [notificationEmail.data]); //eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (notificationSms.data) {
      setStateSms(notificationSms.data);
    }
  }, [notificationSms.data]); //eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (stateRafresh) {
      apiCallWeb();
      apiCallSms();
      apiCallEmail();
    }
    setstateRafresh(false);
  }, [stateRafresh]); //eslint-disable-line react-hooks/exhaustive-deps

  // --------------------------------------------------------function---------------------------------

  const submit = () => {
    apiCallWeb();
    apiCallSms();
    apiCallEmail();
  };
  const handelChangeDate = (data, type) => {
    let date = convertDigitToEnglish(data?.format("YYYY/MM/DD"));

    if (type === "start_time") {
      date = `${date} 00:00:00.000000`;
    }
    if (type === "end_time") {
      date = `${date} 23:59:59.999999`;
    }

    if (flagSwich === generalInformation) {
      setstateTitleBtnGeneral((prev) => ({
        ...prev,
        [type]: date,
      }));
    } else {
      setstateTitleBtnPersonal((prev) => ({
        ...prev,
        [type]: date,
      }));
    }
  };
  const handelDataGeneral = (data) => {
    let arr = data ? data : [];

    let res = arr.filter((item) => {
      if (item.body.receiver_id === "null" || !item.body.receiver_id) {
        return true;
      }
      return false;
    });

    return res;
  };
  const handelDataPersonal = (data) => {
    let arr = data ? data : [];
    let res = arr.filter((item) => {
      if (item.body.receiver_id !== "null" && item.body.receiver_id)
        return item;
      return false;
    });

    return res;
  };

  const handleRefresh = () => {
    setstateTitleBtnGeneral({
      start_time: null,
      end_time: null,
    });
    setstateTitleBtnPersonal({
      start_time: null,
      end_time: null,
    });
    setstateRafresh(true);
  };

  return (
    <div className={"bg-white rounded-lg shadow p-5"}>
      <Header
        handleRefresh={handleRefresh}
        flagSwich={flagSwich}
        stateTitleBtnGeneral={stateTitleBtnGeneral}
        stateTitleBtnPersonal={stateTitleBtnPersonal}
        setflagSwich={setflagSwich}
        generalInformation={generalInformation}
        PersonalInformation={PersonalInformation}
        setflagFilter={setflagFilter}
        submit={submit}
        handelChangeDate={handelChangeDate}
        flagFilter={flagFilter}
        setstateTitleBtnGeneral={setstateTitleBtnGeneral}
        setstateTitleBtnPersonal={setstateTitleBtnPersonal}
      />

      {flagSwich === generalInformation && (
        <GerneralInformation
          dataWeb={handelDataGeneral(stateWeb)}
          dataEmail={handelDataGeneral(stateEmail)}
          dataSms={handelDataGeneral(stateSms)}
        />
      )}
      {flagSwich === PersonalInformation && (
        <PersonalInformationn
          dataWeb={handelDataPersonal(stateWeb)}
          dataEmail={handelDataPersonal(stateEmail)}
          dataSms={handelDataPersonal(stateSms)}
          setStateWeb={setStateWeb}
          setStateEmail={setStateEmail}
          setStateSms={setStateSms}
        />
      )}
    </div>
  );
}
