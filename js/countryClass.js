import { getCountryName, getCountryByCode } from "./functions.js";

export default class Country {
  constructor(_parent, _item) {
    this.parent = _parent;
    this.name = _item.name.common;
    this.population = _item.population.toLocaleString();
    this.languages = _item.languages;
    this.currencyCode = Object.keys(_item.currencies)[0];
    this.currencyName = _item.currencies[this.currencyCode].name;
    this.latitude = _item.capitalInfo.latlng[0];
    this.longitude = _item.capitalInfo.latlng[1];
    this.capital = _item.capital[0];
    this.flag = _item.flags.png;
    this.borders = _item.borders;
  }

  render() {
    let div = document.createElement("div");
    div.className = "col-md-4 border  card";
    document.querySelector(this.parent).append(div);

    div.innerHTML = `
    
            <h3>${this.name}</h3>
            <p>Population: ${this.population}</p>
            <p id=language></p>
            <p>Currency: ${this.currencyCode}, ${this.currencyName}</p>
            <p>Capital: ${this.capital}</p>
            <img src="${this.flag}" alt="Flag of ${this.name}" class="centered-image";">

            <div id="id_borders"> </div>
            
            <div >
                <iframe width="300px" height="300px" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"
                src="https://maps.google.com/maps?q=${this.latitude},${this.longitude}&hl=es&z=6&amp;output=embed">
                </iframe>
            </div>
            
        `;
    const numLanguages = this.languages
      ? Object.keys(this.languages).length
      : 0;

    if (numLanguages > 0) {
      const languageText = numLanguages > 1 ? "Languages" : "Language";
      const languageNames = Object.values(this.languages).join(", ");
      const languageHTML = `${languageText}: ${languageNames}`;
      div.querySelector("#language").innerHTML = languageHTML;
    }

    if (this.borders) {
      if (this.borders.length == 1)
        div.querySelector("#id_borders").innerHTML = "Neighboring Nation: ";
      else div.querySelector("#id_borders").innerHTML = "Neighboring Nations: ";

      for (const border of this.borders) {
        const lastBorder = this.borders[this.borders.length - 1];
        let a = document.createElement("a");
        a.href = "#";
        a.style.textDecoration = "none";
        let name = getCountryName(border);
        if (border != lastBorder) a.innerHTML = `${name}, `;
        else a.innerHTML = `${name}. `;

        div.querySelector("#id_borders").append(a);
        a.addEventListener("click", () => {
          getCountryByCode(border);
        });
      }
    } else div.querySelector("#id_borders").innerHTML = "";
  }
}
