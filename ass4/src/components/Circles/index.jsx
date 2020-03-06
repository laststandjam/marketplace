import React from "react";
import "./style.css";

const Circles = ({ selectCircle }) => {
  return (
    <div className="Circles">
      <div className={selectCircle === "Select Circle 1" ? "selected" : ""}>
        1
      </div>
      <div className={selectCircle === "Select Circle 2" ? "selected" : ""}>
        2
      </div>
      <div className={selectCircle === "Select Circle 3" ? "selected" : ""}>
        3
      </div>
      <div className={selectCircle === "Select Circle 4" ? "selected" : ""}>
        4
      </div>
    </div>
  );
};

export default Circles;