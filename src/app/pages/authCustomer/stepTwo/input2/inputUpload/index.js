import React, { useEffect, useRef, useState } from "react";
import Styles from "../../index.module.scss";
// import {NotificationAlert} from '../../../../../common/components/NotificationAlert'
import { actionTypes as notify } from "../../../../../../redux/notificationAlert";
import { useDispatch } from "react-redux";

const InputUpload = ({ value, setValue, title }) => {
  // const [get, setget] = useState();
  // useEffect(() => {
  //   var form = document.getElementById("form5");
  //   setget(form);
  // }, []);

  const input = useRef();
  const dispatch = useDispatch();

  const handelChangeInput = (file) => {
    const input = file.target;
    const reader = new FileReader();

    reader.onload = function() {
      const dataURL = reader.result;
      let image = input.files[0].type;

      let data = {
        file: dataURL,
        file_type: image.split("/")[1],
        file_name: input.files[0].name,
        file_size: input.files[0].size,
      };
      if (data.file_size > 4194304) {
        dispatch({
          type: notify.warning,
          textAlert: "حجم فایل باید کمتر از 4 مگابایت باشد",
        });
        return;
      }
      if (
        data.file_type === "jpeg" ||
        data.file_type === "jpg" ||
        data.file_type === "pdf"
      ) {
        setValue(data);
      } else {
        dispatch({ type: notify.warning, textAlert: "فرمت فایل اشتباه است" });
      }
    };
    reader.readAsDataURL(input.files[0]);
  };

  const handleClickInput = () => {
    if (value) {
      return;
    }
    input.current.click();
  };

  const handleDeleteImage = () => {
    input.current.value = null;
    setValue("");
  };

  return (
    <>
      <form
        className={`${Styles["w-md-100"]} d-flex flex-row-reverse flex-md-column justify-content-between justify-content-md-center ${Styles["mt-custom"]}`}
        id="form5"
      >
        <div
          className={
            value?.file
              ? Styles["stepTwo-content-file-green"]
              : Styles["stepTwo-content-file"]
          }
          style={!value ? { cursor: "pointer" } : null}
          onClick={() => handleClickInput()}
        >
          {value?.file && (
            <div
              className={`${Styles["stepTwo-content-file-circle-green"]} d-flex justify-content-center align-items-center`}
            >
              <img
                src="/media/authCustomer/Path 2554@2x.png"
                alt=""
                style={{ width: 13, height: 13 }}
              />
            </div>
          )}
          <input
            type="file"
            className="d-none"
            ref={input}
            onChange={(event) => handelChangeInput(event)}
          />

          <img
            src={
              value?.file ? value.file : "/media/authCustomer/XMLID_10_@2x.png"
            }
            style={
              value?.file
                ? { width: 70, height: 45 }
                : { width: 19, height: 18 }
            }
            alt=""
          />
        </div>
        <div className="d-flex flex-column">
          <div
            className={
              value
                ? `d-flex mx-auto mt-1 justify-content-between align-items-center`
                : `d-flex mx-auto mt-1 justify-content-between align-items-center opacity-0`
            }
            style={{
              backgroundColor: "#e8e8e8",
              width: "max-content",
              height: "max-content",
              borderRadius: 10,
              width: 100,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            <div
              className="d-flex justify-content-center align-content-center mx-1 mt-1"
              style={{
                width: 21,
                height: 21,
                fontSize: 16,
                color: "white",
                cursor: "pointer",
                backgroundColor: "grey",
                borderRadius: "50%",
                marginBottom: 2,
              }}
              onClick={() => handleDeleteImage()}
            >
              x
            </div>
            <div
              className="ps-2  d-flex justify-content-center align-content-lg-center text-e w-75"
              style={{
                fontSize: 10,
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              
              }}
            >
              {value?.file_name}
            </div>
          </div>
          <div
            className={`${Styles["contractual-text"]} text-center mt-1 d-flex justify-content-center`}
          >
            <span style={{ color: "red" }} className="ms-2 mt-1">
              *
            </span>
            {title}
          </div>
        </div>
      </form>
    </>
  );
};

export default InputUpload;
