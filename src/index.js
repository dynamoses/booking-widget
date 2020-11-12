require("@babel/polyfill");
import "./scss/index.scss";
const bookingWidget = require("./app");
bookingWidget();

const appFormEl = document.querySelector("#app-form");
if (appFormEl) {
  const appForm = require("./app-form");
  appForm();
}
