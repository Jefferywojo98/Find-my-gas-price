
mapboxgl.accessToken =
  "pk.eyJ1IjoianVzdGlua2VtcDEwIiwiYSI6ImNrdDYxOXJpYzBlM2Yyb211NnYwYjgwaHkifQ.DHD31_ysSqszwW7LNWQs-g";
const map = new mapboxgl.Map({
  container: "map", // container ID
  style: "mapbox://styles/mapbox/streets-v11", // style URL
  center: [-74.5, 40], // starting position [lng, lat]
  zoom: 9, // starting zoom
});

function FindStation(lat, lon){
    var Coord = 'https://developer.nrel.gov/api/alt-fuel-stations/v1.json?api_key=HknVf14CYKrMly49l59op0xR6ZmLU87fawrITIkg&latitude=' + lat + '&longitude=' + lon + '&radius=500.0';

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
            console.log(locRes)
            
            var Stations = locRes.fuel_stations

            $('.list').append('<ul>').addClass('Stations')

            // for(i = 0; i < Stations.length; i++){
            //     // console.log(Stations[i])
            //     $('<li>').addClass('Closer')
            //     $('.Stations').append('.Closer').html(Stations[i].distance)
            // }
            
        })
}

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
            
            FindStation()
        });
}


$('#searchButton').on('click', FindCity)