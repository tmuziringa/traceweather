function refreshWeather(response){
    let temperatureElement=document.querySelector("#temperature");
    let temperature= response.data.temperature.current;
    let cityElement=document.querySelector("#city");
    let descriptionElement=document.querySelector("#description");
    let humidityElement=document.querySelector("#humidity");
    let windSpeedElement=document.querySelector("#wind-speed");
    let timeElement=document.querySelector("#time");
    let date=new Date(response.data.time *1000);
    let iconElement= document.querySelector("#icon");


    iconElement.innerHTML =`<img src="${response.data.condition.icon_url}"class="weather-app-icon" />`;
    cityElement.innerHTML=response.data.city;
    temperatureElement.innerHTML=Math.round(temperature);
    descriptionElement.innerHTML=response.data.condition.description;
    humidityElement.innerHTML= `${response.data.temperature.humidity}%`;
    windSpeedElement.innerHTML=`${response.data.wind.speed}km/h`;
    timeElement.innerHTML= formatDate(date);


}
function formatDate(date){
    let minutes= date.getMinutes();
    let hours=date.getHours();
    let days=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday",];
    let day= days[date.getDay()];
if (minutes<10) {
minutes=`0${minutes}`;
}
if(hours<10){
    hours=`0${hours}`;
}
    return `${day} ${hours}:${minutes}`


}
function searchCity(city){
let apiKey="0bb03dodf4t67bd073b315986695ca76";
let apiUrl=`https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
axios.get(apiUrl).then(refreshWeather)
}


function handleSearchSubmit(event){
event.preventDefault()
let searchInput=document.querySelector("#search-form-input");


searchCity(searchInput.value)


}

function displayForecast(){ 

   
   let days=["Tue","Wed","Thu","Fri","Sat",];
   let forecastHtml="";
   days.forEach(function(day){
    forecastHtml=forecastHtml +`
 <div class="forecast-day">
        <div class="forecast-date">${day}</div>
        <div class=" forecast-icon">🌧️</div> 
        <div class="forecast-temps"><div class="forecast-temp"><strong>15°</strong></div> 
        <div class="forecast-temp">9°</div></div>
    </div>
    `;
   });
   let forecastElement=document.querySelector("#forecast");
   forecastElement.innerHTML=forecastHtml;

}

 
let searchFormElement=document.querySelector("#search-form");
searchFormElement.addEventListener
("submit",handleSearchSubmit);
searchCity("Harare");
displayForecast();