import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getDataInLocalstorage } from "../../../common/method/getDataInLocalstorage";
import { actionTypes } from "../../../../redux/profile/clubmember_select_info";
import FormikEdit from "./formikEdit";




export default function PersonaInformation() {

  const dispatch = useDispatch();
  const profile = useSelector((state) => state.reducerProfile.data);

  useEffect(() => {
    if (getDataInLocalstorage("member_national_id"))
      dispatch({ type: actionTypes.profileAsync, national_id: getDataInLocalstorage("member_national_id") })
  }, []) //eslint-disable-line react-hooks/exhaustive-deps

  return (
    profile[0] ? (
      <FormikEdit
        profile={profile}
      />
    ) : ""
  )
}

