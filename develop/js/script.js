dayjs.extend(window.dayjs_plugin_utc);
dayjs.extend(window.dayjs_plugin_timezone);

var userSearch = [];
var APIKey= 'a12c8ed33df1450f8eb9318841d28b8e';
var weatherApiUrl= 'https://api.openweathermap.org';

var city = document.querySelector('#userSearch-city');
var searchClick = document.querySelector('#sideBar')
var formEL = document.querySelector('#form');
var displayHistory = document.querySelector('#history-list')

listenForSubmit = (e) =>{
    if(!city.value) {
        return console.log("no input")
    } 
    e.preventDefault();
        var search = city.value.trim();
        fetchCoordinates(search);
        city.value = '';    
}

btnClick = (e) =>{
    if(!e.target.matches('.btn-history')){
        return console.log("no input button")
    }
        var btn = e.target;
        var search = btn.getAttribute('search-history');
        fetchCoordinates(search)  
}

fetchWeather = (location) => {
    var { lat } = location;
    var { lon } =  location;
    var units = 'imperial'
    var apiURL = `${weatherApiUrl}/data/2.5/onecall?lat=${lat}&lon=${lon}&units=${units}&exclude=minutely,hourly&appid=${APIKey}`

    fetch(apiURL)
        .then((res) => {
             
            return res.json();
        })
        .then((data) => {
            showWeather(data);
        })
        .catch((err)=>{
            console.error(err);
        });
}           

historyList = (city,data) => {
    showWeather(city,data.current,data.timezone)
    showWeeklyWeather(dailyForecast[i],timezone)
}

fetchCoordinates = (search) => {
    var apiUrl = `${weatherApiUrl}/geo/1.0/direct?q=${search}&limit=5&appid=${APIKey}`;
    
    fetch(apiUrl)
        .then((res) => {
            console.log(res);
            return res.json();
            
        })
        .then((data) => {
            if (!data[0]){
                alert('Location not found')
            }
            else{
                //appendToHistory(search);
                fetchWeather(data[0]);
            }
        })
        .catch ((err) => {
            console.log(err);
        })
}

showWeather = (response)=>{
    var row = document.querySelector('.weather.row');
    row.style.display="";
    row.innerHTML = response.daily.map(day =>{
        var dateTime = new Date(day.dt * 1000);//change this format
        return `<div class="card" style="width: 10rem">
        <h5 class="card-title p-2">${dateTime.toString()}</h5>
        <img src="http://openweathermap.org/img/wn/${day.weather[0].icon}@4x.png" class="card-img-top" alt="${day.weather[0].description}">
        <div class="card-body">
            <h3 class="card-title">${day.weather[0].main}</h3>
            <p class="card-text">Temp: ${day.temp.day}°F</p>
            <p class="card-text">Humidity: ${day.humidity}%</p>
            <p class="card-text">Wind: ${day.wind_speed}mph</p>
        </div>
    </div>`
    }).join('');
}

formEL.addEventListener('submit', listenForSubmit);
searchClick.addEventListener('click', btnClick);