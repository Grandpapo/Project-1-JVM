let beginnerButtonEl = document.querySelector('.beginner-btn');
let intermediateButtonEl = document.querySelector('.intermediate-btn');
let advancedButtonEl = document.querySelector('.advanced-btn');
let buttonContainerEl = document.querySelector('.button-container');
let resultsEl = document.querySelector('.results');
let userInputEl = document.querySelector('#user-input');
let searchBtnEl = document.querySelector('.search-btn');


// Grab users location using HTML Geolocation API:

function initApp() {
    navigator.geolocation.getCurrentPosition(function (position) {
        const userCoords = position.coords;
        // display user geolocation results:
        const userLat = position.coords.latitude;
        const userLon = position.coords.longitude;
        // if user accepts geolocation, then use their lat and lon in google maps API
        if (userCoords !== null) {
            const userLocation = new google.maps.LatLng(userLat, userLon);
            console.log(userLat);
            console.log(userLon);
            // looking for beaches within 30km (30000 m)
            const request = {
                location: userLocation,
                radius: '30000',
                keyword: 'beach'
            }
            const service = new google.maps.places.PlacesService(document.createElement('div')); // dummy element, since we don't want map
            // nearbySearch request using Places API
            service.nearbySearch(request, callback);
            // grab latitude and longitude of all beach results from data output
            function callback(results, status) {
                if (status == google.maps.places.PlacesServiceStatus.OK) {
                    const beachLocations = results.map(place => ({
                        name: place.name,
                        latitude: place.geometry.location.lat(),
                        longitude: place.geometry.location.lng()
                    }));
                    console.log(beachLocations);
                    for (let i = 0; i < beachLocations.length; i++) {
                        // Grab place.latitude
                        // Grab place.longitude
                        // need to write if statement if (sigHeight_m > 0) {}
                        // Want to grab the first 5 locations IF it is truthy
                        // if (difficulty == 1) Then set maxwaveheight = 2ft
                        // if (difficulty == 2) then set maxwaveheight = 5ft
                        // if (difficulty == 3) then set maxwaveheight = 11ft
                        // if (difficulty == 1) Then set minwaveheight = 1ft
                        // if (difficulty == 2) then set minwaveheight = 3ft
                        // if (difficulty == 3) then set minwaveheight = 11ft
                        // MENTAL NOTE: 1ft = 0.3048meters 2ft = 0.6096 
                        var locationLat = beachLocations[i].latitude;
                        var locationLon = beachLocations[i].longitude;
                        let wwoAPIKey = '6d4a727b13e24cf7981194923230809'
                        let requestWeatherOnline = 'https://api.worldweatheronline.com/premium/v1/marine.ashx?key=' + wwoAPIKey + '&format=json&q=' + locationLat + ',' + locationLon;
                        fetch(requestWeatherOnline)
                            .then(function (response) {
                                return response.json();
                            })
                            .then(function (data) {
                                console.log(data);
                            })
                        // console.log(locationLat);
                        // console.log(locationLon);
                    }
                }
            }
        }
    });
}
initApp();
// once lat and lon are retrieved from google api, input the coords into the NOAA API to grab wave height, weather and wind
// forEach item that is returned from google, run through NOAA API
// if beginner is clicked, display locations with 1-2ft wave height
// if intermediate is clicked, display locations with 3-5ft wave height
// if advanced is clicked, display locations with 6-11ft wave height


// If user doesn't share location, they can enter zipcode
// turn zipcode into latitude and longitude
function getCoordsByZip(zipcode, callback) {

    var geocoder = new google.maps.Geocoder();
    var address = zipcode;

    geocoder.geocode({ 'address': 'zipcode ' + address }, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            var zipLat = results[0].geometry.location.lat();
            var zipLon = results[0].geometry.location.lng();
            console.log("Latitude: " + zipLat + "Longitude: " + zipLon);
            callback({ latitude: zipLat, longitude: zipLon });
        } else {
            console.error('Geocoding failed with status: ' + status);
            callback(null);
        }
    });
}

// Use lat & lon from zipcode to find nearby beaches
function findNearbyBeaches(zipcode) {
    getCoordsByZip(zipcode, function (coords) {
        if (coords) {
            const userLocation = new google.maps.LatLng(coords.latitude, coords.longitude);
            // looking for beaches within 30km (30000 m)
            const request = {
                location: userLocation,
                radius: '30000',
                keyword: 'beach'
            };

            const service = new google.maps.places.PlacesService(document.createElement('div')); // dummy element, since we don't want map
            // nearbySearch request using Places API
            service.nearbySearch(request, function (results, status) {
                if (status == google.maps.places.PlacesServiceStatus.OK) {
                    const beachLocations = results.map(place => ({
                        name: place.name,
                        latitude: place.geometry.location.lat(),
                        longitude: place.geometry.location.lng()
                    }));
                    console.log(beachLocations);
                } else {
                    console.error('Nearby beach search failed with status' + status);
                }
            });
        } else {
            console.error('Geocoding request failed.');
        }
    });
}

// let tempLat = 0;
// let tempLon = 0;
// let wwoAPIKey = '6d4a727b13e24cf7981194923230809'
// let requestWeatherOnline = 'https://api.worldweatheronline.com/premium/v1/marine.ashx?key=' + wwoAPIKey + '&format=json&q=' + locationLon + ',' + locationLat;
// fetch(requestWeatherOnline)
//     .then(function (response) {
//         return response.json();
//     })
//     .then(function (data) {
//         console.log(data);
//     })

searchBtnEl.addEventListener('click', function (event) {
    event.preventDefault();
    var userInputZip = userInputEl.value;
    userInputEl.textContent = '';
    findNearbyBeaches(userInputZip);
});

beginnerButtonEl.addEventListener('click', function (event) {
    event.preventDefault();
    buttonContainerEl.classList.add('hide'); // hide first screen
    resultsEl.classList.remove('hide'); // show second screen
});

intermediateButtonEl.addEventListener('click', function (event) {
    event.preventDefault();
    buttonContainerEl.classList.add('hide'); // hide first screen
    resultsEl.classList.remove('hide');// show second screen
});

advancedButtonEl.addEventListener('click', function (event) {
    event.preventDefault();
    buttonContainerEl.classList.add('hide'); // hide first screen
    resultsEl.classList.remove('hide');// show second screen
});
