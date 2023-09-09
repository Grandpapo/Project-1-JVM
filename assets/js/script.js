let beginnerButtonEl = document.querySelector('.beginner-btn');
let intermediateButtonEl = document.querySelector('.intermediate-btn');
let advancedButtonEl = document.querySelector('.advanced-btn');
let buttonContainerEl = document.querySelector('.button-container');
let resultsEl = document.querySelector('.results');
let userInputEl = document.querySelector('#user-input');

// once lat and lon are retrieved from google api, input the coords into the Weather API to grab wave height, weather and wind
// forEach item that is returned from google, run through Weather API
// if beginner is clicked, display locations with 1-2ft wave height
// if intermediate is clicked, display locations with 3-5ft wave height
// if advanced is clicked, display locations with 6-11ft wave height

// Once user enters zipcode, grab lat and lon related to zipcode

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
            // looking for locations with keyword of beache within 30km (30000 m)
            const request = {
                location: userLocation,
                radius: '30000',
                keyword: 'beach'
            };

            const service = new google.maps.places.PlacesService(document.createElement('div')); // dummy element, since we don't want map
            // nearbySearch request using Places API
            service.nearbySearch(request, function (results, status) {
                if (status == google.maps.places.PlacesServiceStatus.OK) { // if lat & lon are found in google api w/o errors, return data as an array of objects
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

// Grab users location using HTML Geolocation API:

function initApp() {
    navigator.geolocation.getCurrentPosition(function (position) {
        const userCoords = position.coords;
        // display user geolocation results:
        const userLat = position.coords.latitude;
        const userLon = position.coords.longitude;
        // if user accepts geolocation, then use their lat and lon in google maps API
        if (userCoords !== null) {
            buttonContainerEl.classList.add('hide'); // hide first screen
            resultsEl.classList.remove('hide'); // show second screen
            const userLocation = new google.maps.LatLng(userLat, userLon);
            console.log(userLat);
            console.log(userLon);
            // looking for locations with keyword of beache within 30km (30000 m)
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
                if (status == google.maps.places.PlacesServiceStatus.OK) { // if lat & lon are found in google api w/o errors, return data as an array of objects
                    const beachLocations = results.map(place => ({
                        name: place.name,
                        latitude: place.geometry.location.lat(),
                        longitude: place.geometry.location.lng()
                    }));
                    console.log(beachLocations);
                }
            }
        }
    });
}

// If a zip code is entered, and a skill level is clicked, load in second screen and information for beaches
// if no zip code is entered and a skill level is clicked, ask to use user location then load information for beaches

beginnerButtonEl.addEventListener('click', function (event) {
    event.preventDefault();
    console.log(userInputEl.value);
    if (userInputEl.value !== '') {
    var userInputZip = userInputEl.value;
    userInputEl.textContent = '';
    findNearbyBeaches(userInputZip);
    buttonContainerEl.classList.add('hide'); // hide first screen
    resultsEl.classList.remove('hide'); // show second screen
    } else {
    initApp(); // ask for user location if no zipcode is entered
}});

intermediateButtonEl.addEventListener('click', function (event) {
    event.preventDefault();
    console.log(userInputEl.value);
    if (userInputEl.value !== '') {
    var userInputZip = userInputEl.value;
    userInputEl.textContent = '';
    findNearbyBeaches(userInputZip);
    buttonContainerEl.classList.add('hide'); // hide first screen
    resultsEl.classList.remove('hide'); // show second screen
    } else {
    initApp(); // ask for user location if no zipcode is entered
}});

advancedButtonEl.addEventListener('click', function (event) {
    event.preventDefault();
    console.log(userInputEl.value);
    if (userInputEl.value !== '') {
    var userInputZip = userInputEl.value;
    userInputEl.textContent = '';
    findNearbyBeaches(userInputZip);
    buttonContainerEl.classList.add('hide'); // hide first screen
    resultsEl.classList.remove('hide'); // show second screen
    } else {
    initApp(); // ask for user location if no zipcode is entered
}});
