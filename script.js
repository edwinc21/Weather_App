
// call the DOM elements
const search_input = document.querySelector('.search_input');
const weatherData = document.querySelector('.weatherData');
const datalist = document.querySelector('#cities');
const ubication = document.querySelector('#google_maps');

// initialize variable
const ApiKey = 'b09fa731747f4a8faaf220308230410'  // Apikey the www.weatherapi.com
let counter = 0;   
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'Octuber', 'November', 'December'];


// Function to autocomplete the search for the city in the search_input
function cityFilter() {
    counter++  // I count the times the function is called
    if (counter >= 4) {
        fetch(`http://api.weatherapi.com/v1/search.json?key=${ApiKey}&q=${search_input.value}`)
            .then(response => response.json())
            .then(data => {
                datalist.innerHTML = '';
                data.forEach(data => {
                    datalist.innerHTML += `<option value="${data.name},${data.country}"  ></option>`;
                });
            })
            .catch()
    }
};

// listener event when they press enter and generate the request to the Api
search_input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {

        ubication.src = `https://maps.google.com/maps?q=${search_input.value}&t=&z=11&ie=UTF8&iwloc=&output=embed`;

        fetch(`https://api.weatherapi.com/v1/current.json?key=${ApiKey}&q=${search_input.value}&aqi=yes`)
            .then(response => response.json())
            .then(data => {
                showWeatherData(data);
                search_input.value = '';
            })
            .catch(error => console.log(error));
    }
});


//function to display weather data
function showWeatherData(data) {
    let date = new Date(data.location.localtime);
    date = `${days[date.getDay()]}, ${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`
    weatherData.innerHTML = ` 
<div class="main_data">
    <div class="place">${data.location.name},${data.location.country}</div>
    <div class="date">${date}</div>
    <div class="temp">
        <img src="${data.current.condition.icon}" alt="weather_icon">
        <div>${data.current.temp_c}°C</div>
    </div>
    <div class="weather_condition">${data.current.condition.text}</div>
</div>
<div class="current_data">
    <table id="current_weather_items">

        <thead>
           <tr>
               <th colspan="2">Current Data</th>
           </tr>
        </thead>    
        <tr>
            <td>feelslike:</td>
            <td>${data.current.feelslike_c}°C / ${data.current.feelslike_f}°F</td>
        </tr>
        <tr>
            <td>Humidity:</td>
            <td>${data.current.humidity}%</td>
        </tr>
        <tr>
            <td>Pressure:</td>
            <td>${data.current.pressure_in} in</td>
        </tr>
        <tr>
            <td>Wind Speed:</td>
            <td>${data.current.wind_dir} ${(data.current.wind_kph)} Km/h</td>
        </tr>
        <tr>
            <td>UV:</td>
            <td>${data.current.uv}</td>
        </tr>
    </table>

    <table id="current_weather_items">

        <thead>
           <tr>
               <th colspan="2">Air quality data</th>
           </tr>
        </thead>

        <tr>
            <td>CO:</td>
            <td>${data.current.air_quality.co}μg/m3</td>
        </tr>
        <tr>
            <td>O₃:</td>
            <td>${data.current.air_quality.o3}μg/m3</td>
        </tr>
        <tr>
            <td>NO₂:</td>
            <td>${data.current.air_quality.no2}μg/m3</td>
        </tr>
        <tr>
            <td>SO₂:</td>
            <td>${data.current.air_quality.so2}μg/m3</td>
        </tr>
        <tr>
            <td>PM 2.5:</td>
            <td>${data.current.air_quality.pm2_5}μg/m3</td>
        </tr>
        <tr>
            <td>PM 10:</td>
            <td>${data.current.air_quality.pm10}μg/m3</td>
        </tr>
    </table>
</div>

   `
}










