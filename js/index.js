getlocation();
getLocationData();
getcity();
let allCities = {};

//
// search for city
//
let searchInput = document.getElementById("searchinput");
let searchBtn = document.getElementById("searchbtn");
searchInput.addEventListener("input", function () {
  getcity(searchInput.value);
  addCurrentDay();
  NextDayData();
  document.getElementById("contact").classList.remove("fixed-bottom");
});

async function getcity(city) {
  try {
    let response = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=6ac898ca411641dd85f230116241412&q=${city}&days=3`
    );
    allCities = await response.json();
    console.log(allCities);
  } catch (error) {
    window.alert(error);
  }
}

//
// current day
//
let date = new Date();
let weekDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let Months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let currentDay = weekDays[date.getDay()];
let currentMonth = Months[date.getMonth()];
let dayNumber = date.getDate();
let NextDay = weekDays[date.getDay() + 1];
let TwoDaysLater = weekDays[date.getDay() + 2];

function addCurrentDay() {
  var box = "";
  box += `
   
            <div class="inner">
              <div class="d-flex justify-content-between bg-dark py-3 px-2 text-warning">
                <span>${currentDay}</span>
                <span>${dayNumber} ${currentMonth}</span>
              </div>
              <div class="p-3 bg-black text-light text-center">
                <p class="fs-4">${allCities.location.name}</p>
                <h2 class="display-1 fw-bold ">${allCities.current.temp_c} <sup>o</sup>C</h2>
                <img src="https:${allCities.current.condition.icon}" alt="condition icon" class="w-25 m-auto d-block">
                <p>${allCities.current.condition.text}</p>
                <div class="d-flex my-4 ms-5">
                  <div class="d-flex ms-5">
                    <i class="fa-solid fa-umbrella me-2"></i>
                    <p>${allCities.current.humidity} %</p>
                  </div>
                  <div class="d-flex ms-3">
                    <i class="fa-solid fa-wind me-2"></i>
                    <p>${allCities.current.wind_kph} km/h</p>
                  </div>
                  <div class="d-flex ms-3">
                    <i class="fa-solid fa-compass me-2"></i>
                    <p>${allCities.current.wind_dir}</p>
                  </div>
                </div>
              </div>
            </div>
          `;
  document.getElementById("rowdata").innerHTML = box;
}

//
// Next Two days
//

function NextDayData() {
  let next = "";
  let laterDay = "";
  next += `
  <div class="inner">
              <div class="d-flex justify-content-between bg-dark text-light py-3 px-2">
                <span>${NextDay}</span>
                <span>${allCities.forecast.forecastday[1].date}</span>
              </div>
              <div class="p-3 bg-secondary text-center">
                <p class="fs-4">${allCities.location.name}</p>
                <h2 class="display-1 fw-bold">${allCities.forecast.forecastday[1].day.avgtemp_c} <sup>o</sup>C</h2>
                <img src="https:${allCities.forecast.forecastday[1].day.condition.icon}" alt="condition icon">
                <p>${allCities.forecast.forecastday[1].day.condition.text}</p>
                <div class="d-flex my-4 ms-5">
                  <div class="d-flex ms-5">
                    <i class="fa-solid fa-umbrella me-1"></i>
                    <p>${allCities.forecast.forecastday[1].day.avghumidity} %</p>
                  </div>
                  <div class="d-flex ms-5">
                    <i class="fa-solid fa-wind me-1"></i>
                    <p>${allCities.forecast.forecastday[1].day.maxwind_kph} km/h</p>
                  </div>
                </div>
              </div>
            </div>
  `;
  laterDay += `
  <div class="inner">
              <div class="d-flex justify-content-between bg-dark text-light py-3 px-2">
                <span>${TwoDaysLater}</span>
                <span>${allCities.forecast.forecastday[2].date}</span>
              </div>
              <div class="p-3 bg-secondary text-center">
                <p class="fs-4">${allCities.location.name}</p>
                <h2 class="display-1 fw-bold">${allCities.forecast.forecastday[2].day.avgtemp_c} <sup>o</sup>C</h2>
                <img src="https:${allCities.forecast.forecastday[2].day.condition.icon}" alt="condition icon">
                <p>${allCities.forecast.forecastday[2].day.condition.text}</p>
                <div class="d-flex my-4 ms-5">
                  <div class="d-flex ms-5">
                    <i class="fa-solid fa-umbrella me-1"></i>
                    <p>${allCities.forecast.forecastday[2].day.avghumidity} %</p>
                  </div>
                  <div class="d-flex ms-5">
                  

                    <i class="fa-solid fa-wind me-1"></i>
                    <p>${allCities.forecast.forecastday[2].day.maxwind_kph} km/h</p>
                  </div>
                </div>
              </div>
            </div>
  `;
  document.getElementById("nextday").innerHTML = next;
  document.getElementById("laterday").innerHTML = laterDay;
}

//
// get location
//

async function getLocationData(lat, lon) {
  try {
    let response = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=6ac898ca411641dd85f230116241412&q=${lat},${lon}&days=3`
    );
    if (response.ok) {
      let data = await response.json();
      addCurrentDay(data);
      NextDayData(data.forecast.forecastday);
    }
  } catch (error) {
    console.log(error);
  }
}
function getlocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;

        getLocationData(lat, lon);
      },
      function (error) {
        console.log(error);
        getcity("Cairo");
      }
    );
  }
}
