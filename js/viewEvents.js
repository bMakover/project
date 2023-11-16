import {getCountry,createSelector} from './functions.js'
export const declareEvents = () => {
  let search_btn = document.querySelector("#search_btn");
  let id_input = document.querySelector("#id_input");
  let id_select = document.querySelector("#id_select");
  let id_nav = document.querySelectorAll("#id_nav");


  createSelector(id_select);
  id_select.addEventListener("change", () => {
    const selectedOption = id_select.options[id_select.selectedIndex];
    const selectedValue = selectedOption.value;
    getCountry(selectedValue);
  });
  id_input.addEventListener("keydown", (e) => {
    
    if (e.key == "Enter") {
      getCountry(id_input.value);
    }
  });

  search_btn.addEventListener("click", () => {
    getCountry(id_input.value);
  });

  id_nav.forEach((item) => {
    item.addEventListener("click", () => {
      if (item.textContent=="UK") {
      getCountry("GB"); 
      }
      else
      getCountry(item.textContent.trim()); 
    });
  });
};
