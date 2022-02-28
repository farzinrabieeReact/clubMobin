import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { ModalProgressBar } from "../../../../_metronic/_partials/controls";
import * as auth from "../../Auth";
import { connect } from "react-redux";
import SVG from "react-inlinesvg";
import { toAbsoluteUrl } from "../../../../_metronic/_helpers";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";

const isNullString = item => {
  if (item === "null") {
    return "";
  }
  return item;
};

function FormikEdit({ profile }) {
  const [loading, setloading] = useState(false);
  const [isError, setisError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [stateForm, setStateForm] = useState({
    first_name: "",
    last_name: "",
    birth_date: "",
    phone: "",
    email: "",
    gender: "",
    user: ""
  });

  useEffect(() => {
    setStateForm({
      first_name: profile[0].body.first_name,
      last_name: profile[0]?.body.last_name,
      birth_date: profile[0]?.body.birth_date,
      phone: isNullString(profile[0]?.body.phone),
      email: profile[0]?.body.email,
      gender: profile[0]?.body.gender,
      user: profile[0]?.body.user
    });
  }, [profile]);

  const saveUser = (values, setStatus, setSubmitting) => {
    setloading(true);
    setSubmitting(false);
    // let data = {
    //   _id: profile[0].id,
    //   ...values
    // };
    // updateProfile(data)
    //   .then(res => {
    //     setloading(false);
    //     setSubmitting(false);
    //     let isOk = handleNotificationAlertTryUpdate(res);
    //     if (isOk) {
    //       setIsSuccess(true);
    //       setisError(false);
    //       setStatus({ success: true });
    //     } else {
    //       setStatus({ success: false });
    //       setisError(true);
    //     }
    //   })
    //   .catch(() => {
    //     setSubmitting(false);
    //     setStatus({ success: false });
    //     setisError(true);
    //   });
  };

  let initValue = {
    first_name: profile[0].body.first_name,
    last_name: profile[0]?.body.last_name,
    birth_date: profile[0]?.body.birth_date,
    phone: isNullString(profile[0]?.body.phone),
    email: profile[0]?.body.email,
    gender: profile[0]?.body.gender,
    user: profile[0]?.body.user
  };

  const Schema = Yup.object().shape({
    first_name: Yup.string().required("نام اجباری است"),
    last_name: Yup.string().required("نام خانوادگی اجباری است"),
    birth_date: Yup.string().required("تاریخ تولد اجباری است"),
    phone: Yup.string().required("شماره همراه اجباری است"),
    email: Yup.string().required("ایمیل اجباری است"),
    // gender: Yup.string()
    // .required("جنسیت اجباری است")
    // ,
    user: Yup.string().required("نام کاربری اجباری است")
  });

  const formik = useFormik({
    initialValues: initValue,
    validationSchema: Schema,
    onSubmit: (values, { setStatus, setSubmitting }) => {
      saveUser(values, setStatus, setSubmitting);
    }
  });

  const getInputClasses = fieldname => {
    if (formik.touched[fieldname] && formik.errors[fieldname]) {
      return "is-invalid";
    }

    if (formik.touched[fieldname] && !formik.errors[fieldname]) {
      return "is-valid";
    }

    return "";
  };

  const handleChangeInput = (value, type) => {
    // setStateForm(prevState => ({ ...prevState, [type]: value }));
  };

  return (
    <form
      className="card card-custom card-stretch"
      onSubmit={formik.handleSubmit}
    >
      {loading && <ModalProgressBar />}

      <div className="card-header py-3">
        <div className="card-title align-items-start flex-column">
          <h3 className="card-label font-weight-bolder text-dark">
            بروز رسانی اطلاعات
          </h3>
          <span className="text-muted font-weight-bold font-size-sm mt-1">
            اطلاعات شخصی خود را به روز کنید
          </span>
        </div>
      </div>

      <div className="form">
        {/* begin::Body */}
        <div className="card-body">
          {/* begin::Alert */}
          {isError && (
            <div
              className="alert alert-custom alert-light-danger fade show mb-10"
              role="alert"
            >
              <div className="alert-icon">
                <span className="svg-icon svg-icon-3x svg-icon-danger">
                  <SVG
                    src={toAbsoluteUrl("/media/svg/icons/Code/Info-circle.svg")}
                  ></SVG>{" "}
                </span>
              </div>
              <div className="alert-text font-weight-bold">
                متاسفانه انجام نشد
              </div>
              <div className="alert-close" onClick={() => setisError(false)}>
                <button
                  type="button"
                  className="close"
                  data-dismiss="alert"
                  aria-label="Close"
                >
                  <span aria-hidden="true">
                    <i className="ki ki-close"></i>
                  </span>
                </button>
              </div>
            </div>
          )}
          {/* end::Alert */}

          {/* begin::Alert */}
          {isSuccess && (
            <div
              className="alert alert-custom alert-light-success fade show mb-10"
              role="alert"
            >
              <div className="alert-icon">
                <span className="svg-icon svg-icon-3x svg-icon-danger">
                  <CheckCircleIcon color="primary" />{" "}
                </span>
              </div>
              <div className="alert-text font-weight-bold">
                با موفقیت انجام شد.
              </div>
              <div className="alert-close" onClick={() => setisError(false)}>
                <button
                  type="button"
                  className="close"
                  data-dismiss="alert"
                  aria-label="Close"
                  onClick={() => setIsSuccess(false)}
                >
                  <span aria-hidden="true">
                    <i className="ki ki-close"></i>
                  </span>
                </button>
              </div>
            </div>
          )}
          {/* end::Alert */}

          {/* //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */}
          <div className="row">
            <div className="form-group col-lg-6 row">
              <label className="col-lg-4 col-form-label">نام:</label>

              <div className="col-lg-8">
                <input
                  type="text"
                  placeholder="نام"
                  className={`form-control form-control-lg form-control-solid ${getInputClasses(
                    "first_name"
                  )}`}
                  name="first_name"
                  {...formik.getFieldProps("first_name")}
                  onChange={e =>
                    handleChangeInput(e.target.value, "first_name")
                  }
                  value={stateForm.first_name}
                />
                {formik.touched.first_name && formik.errors.first_name ? (
                  <div className="invalid-feedback">
                    {formik.errors.first_name}
                  </div>
                ) : null}
              </div>
            </div>

            <div className="form-group col-lg-6 row">
              <label className="col-lg-4 col-form-label">نام خانوادگی:</label>

              <div className="col-lg-8">
                <input
                  type="text"
                  placeholder="نام خانوادگی"
                  className={`form-control form-control-lg form-control-solid ${getInputClasses(
                    "last_name"
                  )}`}
                  name="last_name"
                  {...formik.getFieldProps("last_name")}
                  onChange={e => handleChangeInput(e.target.value, "last_name")}
                  value={stateForm.last_name}
                />
                {formik.touched.last_name && formik.errors.last_name ? (
                  <div className="invalid-feedback">
                    {formik.errors.last_name}
                  </div>
                ) : null}
              </div>
            </div>

            <div className="form-group col-lg-6 row">
              <label className="col-lg-4 col-form-label">تلفن همراه:</label>

              <div className="col-lg-8">
                <input
                  type="text"
                  placeholder="تلفن همراه"
                  className={`form-control form-control-lg form-control-solid ${getInputClasses(
                    "phone"
                  )}`}
                  name="phone"
                  onChange={e => handleChangeInput(e.target.value, "phone")}
                  {...formik.getFieldProps("phone")}
                  value={stateForm.phone}
                />
                {formik.touched.phone && formik.errors.phone ? (
                  <div className="invalid-feedback">{formik.errors.phone}</div>
                ) : null}
              </div>
            </div>

            <div className="form-group col-lg-6 row">
              <label className="col-lg-4 col-form-label">پست الکترونیکی:</label>

              <div className="col-lg-8">
                <input
                  type="text"
                  placeholder="پست الکترونیکی"
                  className={`form-control form-control-lg form-control-solid ${getInputClasses(
                    "email"
                  )}`}
                  name="email"
                  onChange={e => handleChangeInput(e.target.value, "email")}
                  {...formik.getFieldProps("email")}
                  value={stateForm.email}
                />
                {formik.touched.email && formik.errors.email ? (
                  <div className="invalid-feedback">{formik.errors.email}</div>
                ) : null}
              </div>
            </div>

            <div className="form-group col-lg-6 row">
              <label className="col-lg-4 col-form-label">نام کاربری:</label>

              <div className="col-lg-8">
                <input
                  type="text"
                  placeholder="کدملی"
                  className={`form-control form-control-lg form-control-solid ${getInputClasses(
                    "user"
                  )}`}
                  name="user"
                  onChange={e => handleChangeInput(e.target.value, "user")}
                  {...formik.getFieldProps("user")}
                  value={stateForm.user}
                />
                {formik.touched.user && formik.errors.user ? (
                  <div className="invalid-feedback">{formik.errors.user}</div>
                ) : null}
              </div>
            </div>

            <div className="form-group col-lg-6 row">
              <label className="col-lg-4 col-form-label">جنسیت:</label>

              <div className="col-lg-8">
                <select
                  className={`form-control form-control-lg form-control-solid`}
                  name="gender"
                  {...formik.getFieldProps("gender")}
                  value={stateForm.gender}
                  onChange={e => handleChangeInput(e.target.value, "gender")}
                  // defaultValue={profile[0]?.body.gender}
                >
                  <option value="1">مرد</option>
                  <option value="2">زن</option>   


                  
                </select>

                {/* {formik.touched.gender && formik.errors.gender ? (
                <div className="invalid-feedback">
                  {formik.errors.gender}
                </div>
              ) : null} */}
              </div>
            </div>

            {/* <div className="form-group col-lg-6 row">
            <label className="col-lg-4 col-form-label">
              تاریخ تولد:
             </label>

            <div className="col-lg-8">
              <input
                type="text"
                placeholder="تاریخ تولد"
                defaultValue={profile[0]?.body.birth_date.split(" ")[0]}
                className={`form-control form-control-lg form-control-solid ${getInputClasses(
                  "birth_date"
                )}`}
                name="birth_date"
                {...formik.getFieldProps("birth_date")}
              />
              {formik.touched.birth_date && formik.errors.birth_date ? (
                <div className="invalid-feedback">
                  {formik.errors.birth_date}
                </div>
              ) : null}
            </div>
          </div> */}
          </div>
        </div>
        {/* end::Body */}
      </div>
    </form>
  );
}

export default connect(null, auth.actions)(FormikEdit);
