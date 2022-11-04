import { StrictMode } from "react";
import ReactDOM from "react-dom";

import PlCalc from "./PlCalc";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <PlCalc />
  </StrictMode>,
  rootElement
);
