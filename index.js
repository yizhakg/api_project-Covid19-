let url = 'https://api.covid19api.com/summary';
let flagsApiStart = `https://www.countryflags.io/`;
let flagsApiEnd = `/flat/64.png`;
let countries;
let global;
window.onload = () => {
  getData();
}

function getApi() {
  return fetch(url).then(res => res.json())
}

async function getData() {
  try {
    global = await getApi().then(res => res.Global);
    countries = await getApi().then(res => res.Countries);
    console.log(global);
    console.log(countries);
    insertDataToWeb(countries)
  }
  catch (error) {
    console.log(error);

  }
  finally {

  }
}

function insertDataToWeb(data) {
  let dataOfCountries = document.getElementById("countries");
  data.forEach(countrieObject => {
    dataOfCountries.innerHTML += `<div class="countriesItem">
 <img src="${flagsApiStart + countrieObject.CountryCode + flagsApiEnd}" alt="">
 <h4>${countrieObject.Country}</h4>
 <ul>
 <li> NewConfirmed : ${countrieObject.NewConfirmed}</li>
 <li>TotalConfirmed : ${countrieObject.TotalConfirmed}</li>
 <li>NewDeaths : ${countrieObject.NewDeaths}</li>
 <li>TotalDeaths : ${countrieObject.TotalDeaths}</li>
 <li>NewRecovered : ${countrieObject.NewRecovered}</li>
 <li>TotalRecovered : ${countrieObject.TotalRecovered}</li>
</ul>
</div>`
  });
}

function getToDivViaId() {
  var elmnt = document.getElementById("countries");
  elmnt.scrollIntoView();
}

function showSiteData() {
  let header = document.getElementById("header");
  let title = document.getElementById("title");
  let countries = document.getElementById("countries");
  header.style.height = "50px";
  title.style.fontSize = "28px";
  countries.style.opacity = "1";
  header.lastElementChild.style.opacity = "0"
  setTimeout(() => {
    title.innerText = "Covid-19 worldwide Data";
    header.style.background = "var(--black)";
  }, 1700)
}