import React from "react";
import Styles from '../../index.module.scss'

const StepOneContactContent = ({addresses}) => {

  // if(!addresses){
  //   return <> </>
  // }
  return (
    <>
      <div className="d-flex flex-column m-0 ms-md-5">
        <div style={{color: "#888888",marginBottom:5}} className={Styles["stepOne-content-text"]}>کشور</div>
        <div className={Styles["stepOne-content-text"]}>{!addresses ? '_'  :addresses[0]?.country?.name}</div>
      </div>
      <div className="d-flex flex-column m-0 ms-md-5">
        <div style={{color: "#888888" }} className={Styles["stepOne-content-text"]}>استان</div>
        <div className={Styles["stepOne-content-text"]}>{!addresses ? '_'  :addresses[0]?.province?.name}</div>
      </div>
      <div className="d-flex flex-column m-0 ms-md-5">
        <div style={{color: "#888888" }} className={Styles["stepOne-content-text"]}>شهر</div>
        <div className={Styles["stepOne-content-text"]}>{!addresses ? '_'  :addresses[0]?.city?.name}</div>
      </div>
      <div className="d-flex flex-column m-0 ms-md-5">
        <div style={{color: "#888888" }} className={Styles["stepOne-content-text"]}>خیابان</div>
        <div className={Styles["stepOne-content-text"]}>{!addresses ? '_':addresses[0]?.alley}</div>
      </div>
    
    </>
  );
};

export default StepOneContactContent;
