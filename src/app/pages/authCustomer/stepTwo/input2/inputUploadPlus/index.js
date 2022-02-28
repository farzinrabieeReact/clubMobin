import { Add } from "@material-ui/icons";
import { set } from "object-path";
import React, { useEffect, useRef, useState } from "react";
import Styles from "../../index.module.scss";

const InputUploadPlus = ({
  value,
  setValue,
  title,
  setflag
  // handelChangeInput,
  // handleClickInput,
  // handleDeleteImage,
}) => {

  // const [get, setget] = useState();
  // useEffect(() => {
  //   var form = document.getElementById("form5");
  //   setget(form);
  // }, []);

  const input = useRef();

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
      setValue(data);
    };

    reader.readAsDataURL(input.files[0]);
  };

  const handleClickInput = () => {
    if(value){
      return
    }
    input.current.click();
  };

  const handleDeleteImage = () => {
    input.current.value = null;
    setValue("");
    if(setflag){
      setflag(false)
    }
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
          style={!value?{cursor:'pointer'}:null}
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
          {value?.file && (
            <img src={value?.file} style={{ width: 70, height: 45 }} alt="" />
          )}
          {!value?.file && (
            <Add style={{ fontSize: 35 }} />
          )}

        </div>
        <div className="d-flex flex-column">
          <div
            className={
              value
                ? `d-flex mx-auto mt-1 justify-content-between align-content-center`
                : `d-flex mx-auto mt-1 justify-content-between align-content-center opacity-0`
            }
            style={{
              backgroundColor: "#e8e8e8",
              width: "max-content",
              height: "max-content",
              borderRadius: 10,
            }}
          >
            <div
              className="d-flex justify-content-center align-content-center mx-1 mt-1"
              style={{ width: 21, height: 21, fontSize: 16, color: "white",cursor:'pointer',backgroundColor:'grey',borderRadius:"50%",marginBottom:2}}
              onClick={() => handleDeleteImage()}
            >
              x
            </div>
            <div
              className="ps-2 pt-1 d-flex justify-content-center align-content-lg-center mt-1"
              style={{ fontSize: 11 }}
            >
              {value?.file_name}
            </div>
          </div>
          <div
           className={`${Styles["contractual-text"]} text-center mt-1`}
          >
            {title}
          </div>
        </div>
      </form>
    </>
  );
};

export default InputUploadPlus;
