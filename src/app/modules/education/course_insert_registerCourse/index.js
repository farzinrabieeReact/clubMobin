import React, { useEffect, useState } from "react";
import Table from "./tables";
import { useLocation } from "react-router-dom";
import { getDataInLocalstorage } from "../../../common/method/getDataInLocalstorage";
import { useDispatch, useSelector } from "react-redux";
import { actionTypes } from "./../../../../redux/education/courses/course_insert_regsterCourse";
import { actionTypes as actionRemove } from "./../../../../redux/education/courses/course_delete_removeCourse";
import { useHistory } from "react-router-dom";

export default function Index() {
  let location = useLocation();

  let dispatch = useDispatch();
  let { push } = useHistory();

  const [state, setstate] = useState({ status: "", data: null });
  const [loadingRegister, SetLoadingRegister] = useState(false);
  const [loadingRemove, SetLoadingRemove] = useState(false);

  const reducerInsertCourse = useSelector(
    state => state.reducerRegsterInsertCourse
  );
  const reducerRemoveCourse = useSelector(state => state.reducerRemoveCourse);

  useEffect(() => {
    if (location.state) {
      setstate({
        status: location.state.status,
        data: location.state.data
      });
    }
    return () => {
      dispatch({ type: actionTypes.registerRest, payload: false });
      dispatch({ type: actionRemove.removeCourseRest, payload: false });
    };
  }, [location]); //eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    SetLoadingRegister(reducerInsertCourse.loading);
  }, [reducerInsertCourse.loading]);

  useEffect(() => {
    if (reducerInsertCourse.done) {
      handelRouter();
    }
  }, [reducerInsertCourse.done]); //eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    SetLoadingRemove(reducerRemoveCourse.loading);
  }, [reducerRemoveCourse.loading]);

  useEffect(() => {
    if (reducerRemoveCourse.done) {
      handelRouter();
    }
  }, [reducerRemoveCourse.done]); //eslint-disable-line react-hooks/exhaustive-deps

  const apiRegsterCourse = () => {
    let data = {
      course_id: state.data.id,
      course_name: null,
      member_id: getDataInLocalstorage("member_id"),
      member_first_name: null,
      member_last_name: null,
      member_national_id: null,
      registration_date: null,
      status: null,
      register_bonus_id: null,
      unregister_bonus_id: null
    };
    dispatch({ type: actionTypes.regsterInsertCourseAsync, data: data });
  };

  const apiUnRegster = () => {
    let data = {
      _id: state.data.id
    };
    dispatch({ type: actionRemove.removeCourseAsync, data: data });
  };

  const handelRouter = () => {
    setTimeout(() => {
      push({
        pathname: "/courses"
      });
    }, 1500);
  };

  return (
    <div className={"bg-white rounded-lg"}>
      {state.status === "ActiveCourse" && (
        <>
          <Table data={state.data} />
          <div className={"text-right p-5 bg-white"}>
            {
              <>
                {loadingRegister && (
                  <button type="button" className="btn btn-secondary">
                    {" "}
                    ثبت نام
                  </button>
                )}
              </>
            }
            {
              <>
                {!loadingRegister && (
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => apiRegsterCourse()}
                  >
                    ثبت نام
                  </button>
                )}
              </>
            }
          </div>
        </>
      )}

      {state.status === "RegsterCourse" && (
        <>
          {state.data.body.status === "SUBMITTED" && (
            <div className={"text-right p-2 bg-white"}>
              {
                <>
                  {loadingRemove && (
                    <button type="button" className="btn btn-secondary">
                      لغو ثبت نام
                    </button>
                  )}
                </>
              }
              {
                <>
                  {!loadingRemove && (
                    <button
                      type="button"
                      className="btn btn-danger"
                      onClick={() => apiUnRegster()}
                    >
                      لغو ثبت نام
                    </button>
                  )}
                </>
              }
            </div>
          )}
        </>
      )}
    </div>
  );
}
