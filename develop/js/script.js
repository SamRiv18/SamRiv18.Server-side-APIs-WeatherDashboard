var userSearch = [];
var APIKey= 'a12c8ed33df1450f8eb9318841d28b8e';
var weatherApiUrl= 'https://api.openweathermap.org';

var city = document.querySelector('#userSearch-city');



fetchWeather = (location) => {
    var lat = 33.753746;
    var lon = -84.386330;
    var units = 'imperial'
    
    var apiURL = `${weatherApiUrl}/data/2.5/onecall?lat=${lat}&lon=${lon}&units=${units}&exclude=minutely,hourly&appid=${APIKey}`

    fetch(apiURL)
        .then((res) => {
             
            return res.json();
        })
        .then((data) => {
            
            console.log(data);
        })
        .catch((err)=>{
            console.error(err);
        });
}           

renderHistory = (city,data)=> {
    showWeather(city,data.current,data.timezone)
    showWeeklyWeather(dailyForecast[i],timezone)
}

fetchCoordinates = (search) =>{
    var apiUrl = `${eatherApiUrl}/geo/1.0/direct?q=${search}&limit=5&appid=${ApiKey}`;

    fetch(apiUrl)
        .then((res) => {
            return res.json();
        })
        .then((data)=>{
            if (!data[0]){
                alert('Location not found')
            }
            else{
                
                fetchWeather(data[0]);
            }
        })
        .catch ((err)=>{
            console.log(err);
        })
}

