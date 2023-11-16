
import {declareEvents} from "./viewEvents.js"
import Country from "./countryClass.js";
import {startUi,initDictionary} from "./functions.js";


const init = () => {
  declareEvents();
  initDictionary();
  startUi();
}



init();