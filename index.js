const container = document.querySelector(".container");
const errorWeather = document.querySelector(".error-weather");
const weatherCont = document.querySelector(".weather-container");
const weatherDet = document.querySelector(".weather-details");
const search = document.querySelector(".search-box");

search.addEventListener('click', () => {
  const APIKey = '';
  const city = document.querySelector(".search-box input").value;
  const title = document.querySelector(".title")
  if (!city) 
    return;

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}`).then(response => response.json()).then(json => {
        
        if (json.cod === '404') {
          container.style.height = "450px";
          weatherCont.style.display = "none";
          weatherDet.style.display = "none";

          errorWeather.style.display = "block";
          errorWeather.classList.add('fadeIn');
          return
        }

        if(!json.weather || json.weather.length === 0){
            alert('Weather data is missing.')
            return
        }
        title.style.display = 'none'
        errorWeather.style.display = 'none'
        errorWeather.classList.remove('fadeIn')

        const image = document.querySelector(".weather-container img");
        const temperature = document.querySelector(
          ".weather-container .temperature"
        );
        const description = document.querySelector(
          ".weather-container .description"
        );
        const pressure = document.querySelector(
          ".weather-details .pressure span"
        );
        const humidity = document.querySelector(
          ".weather-details .humidity span"
        );
        const wind = document.querySelector(".weather-details .wind span");

        switch (json.weather[0].main) {
            case "Clear":
              image.src = "/weather-app/images/clear.jpg";
              break;
            case "Rain":
              image.src = "/weather-app/images/rain.jpg";
              break;
            case "Snow":
              image.src = "/weather-app/images/snow.jpg";
              break;
            case "Clouds":
              image.src = "/weather-app/images/clouds.jpg";
              break;
            case "Haze":
              image.src = "/weather-app/images/haze.jpg";
              break;
            default:
              image.src = "";
          }

        temperature.innerHTML = `${Math.round(json.main.temp)}<span>°C</span>`;
        description.innerHTML = `${json.weather[0].description}`;
        pressure.innerHTML = `${json.main.pressure}hPa`;
        humidity.innerHTML = `${json.main.humidity}%`;
        wind.innerHTML = `${json.wind.speed}Km/h`;

        weatherCont.style.display = "";
        weatherDet.style.display = "";
        weatherCont.classList.add("fadeIn");
        weatherDet.classList.add("fadeIn");
        container.style.height = "620px";
    })
});
