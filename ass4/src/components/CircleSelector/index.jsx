import React, { useState } from "react";
import "./style.css";

const CircleSelector = ({
  selectCircle,
  selectedCircleArr,
  setSelectCircle
}) => {
  return (
    <div className="CircleSelector">
      {selectedCircleArr.map((c,i) => (
        <button
          className={selectCircle === c ? `selected ` : ""}
          onClick={() => setSelectCircle(c)}
        >
          {selectCircle === c ? `Circle ${i+1} Selected` : c}
        </button>
      ))}
    </div>
  );
};

export default CircleSelector;