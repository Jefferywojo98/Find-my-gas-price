mapboxgl.accessToken =
  "pk.eyJ1IjoianVzdGlua2VtcDEwIiwiYSI6ImNrdDYxOXJpYzBlM2Yyb211NnYwYjgwaHkifQ.DHD31_ysSqszwW7LNWQs-g";
const map = new mapboxgl.Map({
  container: "map", // container ID
  style: "mapbox://styles/mapbox/streets-v11", // style URL
  center: [-74.5, 40], // starting position [lng, lat]
  zoom: 9, // starting zoom
});

function FindStation(){
        var State = $('#State').val()
    var fuel_type = $('#fuelType').val()


    var Coord = 'https://developer.nrel.gov/api/alt-fuel-stations/v1.json?api_key=HknVf14CYKrMly49l59op0xR6ZmLU87fawrITIkg&state=' + State + '&fuel_type=' + fuel_type;

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
            
            $('.Stations').children('li').remove();
            $('.list').children('ul').remove();

            var Stations = locRes.fuel_stations

            $('.list').append('<ul>').addClass('Stations')

            for(i = 0; i < Stations.length; i++){
 
                 $('<li>').appendTo('.Stations').addClass('Closer ' + locRes.fuel_stations[i].fuel_type_code).html('City: ' + locRes.fuel_stations[i].city + ' Station Name: ' + locRes.fuel_stations[i].station_name)
            }
        })
    }
            

$('#searchButton').on('click', FindStation)
