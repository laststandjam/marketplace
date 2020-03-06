import React, { useState } from "react";

import "./App.css";
import CircleSelector from "./components/CircleSelector";
import Circles from "./components/Circles";

function App() {
  const [selectedCircleArr, setSelectedCircleArr] = useState([
    "Select Circle 1",
    "Select Circle 2",
    "Select Circle 3",
    "Select Circle 4"
  ]);
  const [selectCircle, setSelectCircle] = useState(selectedCircleArr[0]);

  return (
    <div className="App">
      <header className="App-header">UNIT 4 FINAL ASSESSMENT</header>
      <main>
        <CircleSelector
          selectCircle={selectCircle}
          selectedCircleArr={selectedCircleArr}
          setSelectCircle={setSelectCircle}
        />
        <Circles selectCircle={selectCircle} />
      </main>
    </div>
  );
}

export default App;
