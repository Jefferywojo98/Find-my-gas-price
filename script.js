mapboxgl.accessToken =
  "pk.eyJ1IjoianVzdGlua2VtcDEwIiwiYSI6ImNrdDYxOXJpYzBlM2Yyb211NnYwYjgwaHkifQ.DHD31_ysSqszwW7LNWQs-g";
const map = new mapboxgl.Map({
  container: "map", // container ID
  style: "mapbox://styles/mapbox/streets-v11", // style URL
  center: [-74.5, 40], // starting position [lng, lat]
  zoom: 9, // starting zoom
});

function FindCity(){
    var City = $('#cityName').val()

    var Coord = 'https://api.openweathermap.org/data/2.5/forecast?q=' + City + '&appid=b16f1aea6c8a8adc1ebc2fd17697b89a';

    fetch(Coord)
        .then(function(response){
            if(!response.ok){
                throw response.json()
            }
            else{
                return response.json()
            }
        })
        .then(function (locRes){
            var lat = locRes.city.coord.lat
            var lon = locRes.city.coord.lon
            console.log(lat, lon);
        });
}

$('#searchButton').on('click', FindCity)
