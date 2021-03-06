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
    insertCountriesData(countries)
    insertGlobalData();
  }
  catch (error) {
    console.log(error);
    eror404();

  }
  finally {

  }
}

function insertCountriesData(data) {
  let dataOfCountries = document.getElementById("countries");
  dataOfCountries.innerHTML = "";
  data.forEach(countrieObject => {
    dataOfCountries.innerHTML += `<div class="countriesItem">
 <img src="${flagsApiStart + countrieObject.CountryCode + flagsApiEnd}" alt="">
 <h4>${countrieObject.Country}</h4>
 <ul>
 <li>New Confirmed : ${countrieObject.NewConfirmed}</li>
 <li>Total Confirmed : ${countrieObject.TotalConfirmed}</li>
 <li>New Deaths : ${countrieObject.NewDeaths}</li>
 <li>Total Deaths : ${countrieObject.TotalDeaths}</li>
 <li>New Recovered : ${countrieObject.NewRecovered}</li>
 <li>Total Recovered : ${countrieObject.TotalRecovered}</li>
</ul>
</div>`
  });
}
function insertGlobalData() {
  let scrollTextDiv = document.getElementById("scrollText");
  scrollTextDiv.innerHTML = `<ul class="scrollWorldUpdate">
  <li><b>New Confirmed:</b> ${global.NewConfirmed} </li> 
  <li><b>New Deaths:</b>  ${global.NewDeaths} </li> 
  <li><b>New Recovered:</b>  ${global.NewRecovered} </li> 
  <li><b>Total Confirmed:</b>  ${global.TotalConfirmed} </li> 
  <li><b>Total Deaths:</b>  ${global.TotalDeaths} </li> 
  <li><b>Total Recovered:</b>  ${global.TotalRecovered} </li> 
  </ul>`
  scrollTextDiv.innerHTML += `<ul class="scrollWorldUpdate">
<li><b>New Confirmed:</b> ${global.NewConfirmed} </li> 
<li><b>New Deaths:</b>  ${global.NewDeaths} </li> 
<li><b>New Recovered:</b>  ${global.NewRecovered} </li> 
<li><b>Total Confirmed:</b>  ${global.TotalConfirmed} </li> 
<li><b>Total Deaths:</b>  ${global.TotalDeaths} </li> 
<li><b>Total Recovered:</b>  ${global.TotalRecovered} </li> 
</ul>`
}

function showSiteData() {
  let header = document.getElementById("header");
  let title = document.getElementById("title");
  let countries = document.getElementById("countries");
  header.style.height = "0";
  countries.style.opacity = "1";
  title.style.opacity = "0"
  header.lastElementChild.style.opacity = "0"
  setTimeout(() => {
    header.style.display="none"
  }, 2000)
}

function eror404() {
  let countriesDiv = document.getElementById("countries");
  countriesDiv.style.display = "block";
  countriesDiv.innerHTML = '<img src="https://images.squarespace-cdn.com/content/v1/5e2a080f67dff416860d11f7/1580952613419-9WT11W7L3BVM11G5VLD8/ke17ZwdGBToddI8pDm48kNvT88LknE-K9M4pGNO0Iqd7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z5QPOohDIaIeljMHgDF5CVlOqpeNLcJ80NK65_fV7S1UbeDbaZv1s3QfpIA4TYnL5Qao8BosUKjCVjCf8TKewJIH3bqxw7fF48mhrq5Ulr0Hg/image-asset.png" alt="" style="width:50vw; display:block;margin:auto;"><h1 style="text-align:center;">We Will Fix It Soon</h1>'
  console.log("check");
}

function searchResults() {
  let searchValue = document.getElementById("searchBox").value.toLowerCase();
  let resultsArray = [];
  countries.forEach((countryObject) => {
    let countryName = countryObject.Country.toLowerCase()
    if (countryName.indexOf(searchValue) != -1) {
      resultsArray.push(countryObject);
    }
  })
  insertCountriesData(resultsArray);
}