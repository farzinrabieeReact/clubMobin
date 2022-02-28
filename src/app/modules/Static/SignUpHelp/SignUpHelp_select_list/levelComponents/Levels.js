import React from "react";
import Level4 from "./Level4";
import Level3 from "./Level3";
import Level2 from "./Level2";
import Level1 from "./Level1";

const Levels = ({ state }) => {
  return (
    <div>
      {state === 0 ? <Level1 /> : null}
      {state === 1 ? <Level2 /> : null}
      {state === 2 ? <Level3 /> : null}
      {state === 3 ? <Level4 /> : null}
    </div>
  );
};

export default Levels;
