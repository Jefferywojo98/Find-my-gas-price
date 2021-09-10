mapboxgl.accessToken =
  "pk.eyJ1IjoianVzdGlua2VtcDEwIiwiYSI6ImNrdDYxOXJpYzBlM2Yyb211NnYwYjgwaHkifQ.DHD31_ysSqszwW7LNWQs-g";
const map = new mapboxgl.Map({
  container: "map", // container ID
  style: "mapbox://styles/mapbox/streets-v11", // style URL
  center: [-74.5, 40], // starting position [lng, lat]
  zoom: 5, // starting zoom
});

var currentMarkers = [];

function FindStation(){
    var State = $('#State').val();
    var fuel_type = $('#fuelType').val();


    var Coord = 'https://developer.nrel.gov/api/alt-fuel-stations/v1.json?api_key=HknVf14CYKrMly49l59op0xR6ZmLU87fawrITIkg&state=' + State + '&fuel_type=' + fuel_type;

    fetch(Coord)
        .then(function(response){
            if(!response.ok){
                throw response.json();
            }
            else{
                return response.json();
            }
        })
        .then(function (locRes){

            $('.Stations').children('li').remove();
            $('.list').children('ul').remove();

            var Stations = locRes.fuel_stations;
            var lon = 0;
            var lat = 0;


            $('.list').append('<ul>').addClass('Stations');
            
            for(i = 0; i < locRes.fuel_stations.length; i++){
                lon = lon + locRes.fuel_stations[i].longitude;
                lat = lat + locRes.fuel_stations[i].latitude;
            };

            lon = lon / locRes.fuel_stations.length;
            lat = lat / locRes.fuel_stations.length;

            map.flyTo({center: [lon, lat],});

            if (currentMarkers!==null) {
                for (var i = currentMarkers.length - 1; i >= 0; i--) {
                  currentMarkers[i].remove();
                };
            };

            for(i = 0; i < Stations.length; i++){
 
                 $('<li>').appendTo('.Stations').addClass('Closer ' + locRes.fuel_stations[i].fuel_type_code).html('City: ' + locRes.fuel_stations[i].city + ' Station Name: ' + locRes.fuel_stations[i].station_name);
                 // Create a default Marker and add it to the map.
                 const marker = new mapboxgl.Marker()
                .setLngLat([locRes.fuel_stations[i].longitude, locRes.fuel_stations[i].latitude])
                .setPopup(
                    new mapboxgl.Popup({ offset: 25 })
                    .setHTML(`<h3>City: ${locRes.fuel_stations[i].city}</h3><h5>Station: ${locRes.fuel_stations[i].station_name}</h5><p>Address: ${locRes.fuel_stations[i].street_address}</p>`)
                )
                .addTo(map);
                currentMarkers.push(marker);
            }
        });
    };
            

$('#searchButton').on('click', FindStation);
