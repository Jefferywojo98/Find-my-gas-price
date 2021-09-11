mapboxgl.accessToken =
  "pk.eyJ1IjoianVzdGlua2VtcDEwIiwiYSI6ImNrdDYxOXJpYzBlM2Yyb211NnYwYjgwaHkifQ.DHD31_ysSqszwW7LNWQs-g";
const map = new mapboxgl.Map({
  container: "map", // container ID
  style: "mapbox://styles/mapbox/streets-v11", // style URL
  center: [-74.5, 40], // starting position [lng, lat]
  zoom: 5, // starting zoom
});

var color = 0

var currentMarkers = [];

function FindStation(){
    var State = $('#State').val();
    var fuel_type = $('#fuelType').val();


    var Coord = 'https://developer.nrel.gov/api/alt-fuel-stations/v1.json?api_key=HknVf14CYKrMly49l59op0xR6ZmLU87fawrITIkg&limit=20&state=' + State + '&fuel_type=' + fuel_type;

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

            console.log(locRes)

            $('.Stations').children('li').remove();
            $('.list').children('ul').remove();

            var Stations = locRes.fuel_stations;
            var lon = 0;
            var lat = 0;
            
            $('.Loading').append('<h3>').addClass('Waiting').html('One Moment Please...');
            
            if (currentMarkers!==null) {
                for (var i = currentMarkers.length - 1; i >= 0; i--) {
                currentMarkers[i].remove();
                };
            };

            if(locRes.fuel_stations.length > 0){
                for(i = 0; i < locRes.fuel_stations.length; i++){
                    lon = lon + locRes.fuel_stations[i].longitude;
                    lat = lat + locRes.fuel_stations[i].latitude;
                };

                lon = lon / locRes.fuel_stations.length;
                lat = lat / locRes.fuel_stations.length;

                map.flyTo({center: [lon, lat],});
                
                $('.list').append('<ul>').addClass('Stations');

                for(i = 0; i < Stations.length; i++){
                  
                  $('<li>').appendTo('.Stations').addClass('list-group-item list-group-item-action station').html('Station Name: ' + locRes.fuel_stations[i].station_name)  
                  $('<li>').appendTo('.Stations').addClass('list-group-item list-group-item-action city').html('City: ' + locRes.fuel_stations[i].city + '; Address: ' + locRes.fuel_stations[i].street_address);
                 // Create a default Marker and add it to the map.
                    const marker = new mapboxgl.Marker()
                    .setLngLat([locRes.fuel_stations[i].longitude, locRes.fuel_stations[i].latitude])
                    .setPopup(
                        new mapboxgl.Popup({ offset: 25 })
                        .setHTML(`<h3>City: ${locRes.fuel_stations[i].city}</h3><h5>Station: ${locRes.fuel_stations[i].station_name}</h5><p>Address: ${locRes.fuel_stations[i].street_address}</p>`)
                    )
                    .addTo(map);
                    currentMarkers.push(marker);
                    
                    if(i == (Stations.length - 1)){
                        $('.Waiting').html('')
                    }
                }
            }else{
                $('.Waiting').html('Results Not Found')
            }

            

        });

    };
        
function darkMode(){
    if(color === 0){
        color = 1;
        $('.coded').removeClass('bg-success').addClass('dark-mode');
        $('.Title').addClass('light-text');
        $('.settle').removeClass('bg-white').addClass('gray-mode')
        $('.modeChange').addClass('dark-mode light-text').html('Light Mode');
    }else{
        color = 0;
        $('.coded').removeClass('dark-mode').addClass('bg-success');
        $('.Title').removeClass('light-text');
        $('.settle').removeClass('gray-mode').addClass('bg-white')
        $('.modeChange').removeClass('dark-mode light-text').html('Dark Mode');
    };
};

$('#searchButton').on('click', FindStation);
$('.modeChange').on('click', darkMode)

