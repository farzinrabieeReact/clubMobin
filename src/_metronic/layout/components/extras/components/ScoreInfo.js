import React, { useState } from "react";

import { SportsEsportsRounded } from "@material-ui/icons";
import { Link } from "react-router-dom";

const ScoreInfo = () => {
  const [show, setshow] = useState(true);

  return (
    <li
      className="nav-item mb-2"
      data-placement="left"
      onMouseEnter={() => setshow(false)}
      onMouseLeave={() => setshow(true)}
      style={{ position: "relative" }}
    >
      <div
        style={{
          width: "240px",
          minHeight: "50px",
          backgroundColor: "white",
          borderRadius: "7px",
          position: "absolute",
          top: "0",
          right: "50px",
          boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px"
        }}
        className={show ? "handleHover" : null}
      >
        <div className="p-4 text-light w-100 d-flex justify-content-center">
          <Link to={"/myGift"}>جوایز قابل انتخاب من</Link>
        </div>
        <div className="p-4 text-light w-100 d-flex justify-content-center">
          <Link to={"/gift/request"}>لیست جوایز درخواستی من</Link>
        </div>
        <div className="p-4 text-light w-100 d-flex justify-content-center">
          <Link to={"/gift"}>کلیه جوایز</Link>
        </div>
        <span className="flash"></span>
      </div>

      <div className="btn btn-sm btn-icon btn-bg-light btn-text-warning btn-hover-danger">
        <SportsEsportsRounded color="action" fontSize="large" />
      </div>
    </li>
  );
};

export default ScoreInfo;
