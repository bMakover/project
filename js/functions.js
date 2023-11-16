import Country from "./countryClass.js";

export const startUi = async () => {
  let countryCodes = [["IL", "US", "GB", "FR", "TH"]];
  let url = `https://restcountries.com/v3.1/alpha?codes=${countryCodes.join( ";")}`;

  let resp = await fetch(url);
  let data = await resp.json();


  creatCountry(data);
};
const countryNameMap = {};

export const initDictionary = async () => {

  let url = `https://restcountries.com/v3.1/all?fields=name,cca3`;

  let resp = await fetch(url);
  let data = await resp.json();
  
  data.forEach(item => {
    countryNameMap[item.cca3] = item.name.common;
  });
 
  
};





export const getCountryName =  (countryCode) => {
  
  return  countryNameMap[countryCode] ;
};

export const getCountry= async (_searchQuery) => {
  
  let search = _searchQuery ? _searchQuery.toLowerCase() : '';
 
  let url = `https://restcountries.com/v3.1/name/${search}`;
 
  let resp = await fetch(url);

if (resp.status==200) {
    let data = await resp.json();

 

  creatCountry(data);
}
else if (resp.status==404) 
alert("country didnt found");

};

// export const getCountryName = async (countryCode) => {
//   let url = `https://restcountries.com/v3.1/alpha/${countryCode}`;
//   let resp = await fetch(url);
//   let data = await resp.json();
//   console.log(data);
//   return data[0].name.common;
// };

export const getCountryByCode = async (countryCode) => {

  let url = `https://restcountries.com/v3.1/alpha/${countryCode}`;

  let resp = await fetch(url);
  let data = await resp.json();



  creatCountry(data);
};
export const createSelector = async(id_select)=>{
  let url="https://restcountries.com/v3.1/all?fields=name";
  
  let resp = await fetch(url);
  let data = await resp.json();

    data.sort((a, b) => {
      let nameA = a.name.common.toUpperCase(); 
      let nameB = b.name.common.toUpperCase();
      if (nameA < nameB) {
          return -1; 
      }
      if (nameA > nameB) {
          return 1; 
      }
      return 0; 
  });

    data.forEach((country) => {
      
      const option = document.createElement("option");
      option.value = country.name.common;
      option.textContent = country.name.common;
      id_select.append(option);
    });
  }



const creatCountry = (_country) => {
  document.querySelector("#id_row").innerHTML = "";
  _country.forEach((item) => {
    let country = new Country("#id_row", item);
    country.render();
  });
};
