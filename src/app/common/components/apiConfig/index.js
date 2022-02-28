import axios from "axios";
import { getRandomNumber } from "../../method/getRandomNumber";
import store from "./../../../../redux/store";
import { actionTypes as actionTypesLogout } from "../../../modules/Auth/_redux/authRedux";

export const timeExpireToken = 5 * 60;

const DataLocalStorageUserMehthod = () => {
  try {
    let DataLocalStorage = JSON.parse(localStorage.getItem("persist:auth"));
    if (!DataLocalStorage.user) {
      return null;
    }
    return JSON.parse(DataLocalStorage.user);
  } catch {
    return null;
  }
};

export const getTimeActiveToken = () => {
  let DataLocalStorageUser = DataLocalStorageUserMehthod();
  if (!DataLocalStorageUser) {
    return null;
  }

  let parsDataLocalStorageUser = DataLocalStorageUser;
  let timeLogin = new Date(parsDataLocalStorageUser.startTime);
  let timeCurrent = new Date();
  let timeDiffMillSecound = Math.abs(timeCurrent - timeLogin);
  let timeDifMin = timeDiffMillSecound / 1000 / 60;
  return timeDifMin;
};

const isExpire = () => {
  const { dispatch } = store;
  const timeDifMin = getTimeActiveToken();

  if (!timeDifMin) {
    return null;
  }

  if (timeDifMin > timeExpireToken) {
    dispatch({ type: actionTypesLogout.Logout });
    return null;
  }
  return DataLocalStorageUserMehthod();
};

const AxiosCustom = (_config, _data) => {
  let userLocal = localStorage.getItem("persist:auth") ? isExpire() : null;

  let { token, member_id } = userLocal
    ? userLocal
    : {
        token: "3cf61fab-b50a-410f-9d59-3357ee4706fe",
        member_id: "_0zehXYBdxxYGfkX5_wd"
      };

  let config = {
    baseURL: getUrl(),
    method: "POST",
    headers: {
      "content-type": "application/json",
      "Access-Control-Allow-Origin": "*"
    },
    ..._config,
    data: {
      api_key: "d025488f-8ec6-4434-afbe-b6a5343815a7",
      token: token,
      member_id: member_id,
      ..._data
      // table: "",
      // method_type: "login",
      // data: {
      //     "user": "ERFAN",
      //     "pass": "ERF1234"
      // }
    }
  };

  return axios(config);
};

export default AxiosCustom;

function getUrl() {
  let protocol = window.location.protocol;
  let hostName = window.location.hostname;

  if (!protocol || !hostName || hostName === "localhost") {
    return `http://192.168.231.65:${getRandomNumber(7004, 7040)}/GradDB/V1/`;
  }

  return `${protocol}//${hostName}/GradDB/V1/`;
}
