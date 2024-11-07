import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles.css";

// Находим корневой элемент
const rootElement = document.getElementById("root");

// Инициализируем корень с использованием createRoot
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(<App />);
}
