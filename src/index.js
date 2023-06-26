import React from "react";
import ReactDOM from "react-dom";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Board from "./components/Board";

import "antd/dist/antd.css";
import "./index.scss";

ReactDOM.render(
  <DndProvider backend={HTML5Backend}>
    <Board />
  </DndProvider>,
  document.getElementById("root")
);
