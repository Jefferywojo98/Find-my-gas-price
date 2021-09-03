
function FindCity(){
    var City = $('#cityName').val()

    var Coord = 'https://api.openweathermap.org/data/2.5/forecast?q=' + City + '&appid=b16f1aea6c8a8adc1ebc2fd17697b89a';
    console.log(Coord)
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
            console.log(lat);
        })
}




$('searchButton').on('click', FindCity)