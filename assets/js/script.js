let beginnerButtonEl = document.querySelector('.beginner-btn');
let intermediateButtonEl = document.querySelector('.intermediate-btn');
let advancedButtonEl = document.querySelector('.advanced-btn');
let buttonContainerEl = document.querySelector('.button-container');
let resultsEl = document.querySelector('.results');
let userInputEl = document.querySelector('#user-input');
let location1El = document.querySelector('.location-1');
let location2El = document.querySelector('.location-2');
let location3El = document.querySelector('.location-3');

let waveHeight06L1 = document.querySelector('.wh06-location-1');
let weather06L1 = document.querySelector('.wr06-location-1');
let wind06L1 = document.querySelector('.wd06-location-1');
let waveHeight09L1 = document.querySelector('.wh09-location-1');
let weather09L1 = document.querySelector('.wr09-location-1');
let wind09L1 = document.querySelector('.wd09-location-1');
let waveHeight12L1 = document.querySelector('.wh12-location-1');
let weather12L1 = document.querySelector('.wr12-location-1');
let wind12L1 = document.querySelector('.wd12-location-1');
let waveHeight3L1 = document.querySelector('.wh3-location-1');
let weather3L1 = document.querySelector('.wr3-location-1');
let wind3L1 = document.querySelector('.wd3-location-1');
let waveHeight6L1 = document.querySelector('.wh6-location-1');
let weather6L1 = document.querySelector('.wr6-location-1');
let wind6L1 = document.querySelector('.wd6-location-1');

let waveHeight06L2 = document.querySelector('.wh06-location-2');
let weather06L2 = document.querySelector('.wr06-location-2');
let wind06L2 = document.querySelector('.wd06-location-2');
let waveHeight09L2 = document.querySelector('.wh09-location-2');
let weather09L2 = document.querySelector('.wr09-location-2');
let wind09L2 = document.querySelector('.wd09-location-2');
let waveHeight12L2 = document.querySelector('.wh12-location-2');
let weather12L2 = document.querySelector('.wr12-location-2');
let wind12L2 = document.querySelector('.wd12-location-2');
let waveHeight3L2 = document.querySelector('.wh3-location-2');
let weather3L2 = document.querySelector('.wr3-location-2');
let wind3L2 = document.querySelector('.wd3-location-2');
let waveHeight6L2 = document.querySelector('.wh6-location-2');
let weather6L2 = document.querySelector('.wr6-location-2');
let wind6L2 = document.querySelector('.wd6-location-2');

let waveHeight06L3 = document.querySelector('.wh06-location-3');
let weather06L3 = document.querySelector('.wr06-location-3');
let wind06L3 = document.querySelector('.wd06-location-3');
let waveHeight09L3 = document.querySelector('.wh09-location-3');
let weather09L3 = document.querySelector('.wr09-location-3');
let wind09L3 = document.querySelector('.wd09-location-3');
let waveHeight12L3 = document.querySelector('.wh12-location-3');
let weather12L3 = document.querySelector('.wr12-location-3');
let wind12L3 = document.querySelector('.wd12-location-3');
let waveHeight3L3 = document.querySelector('.wh3-location-3');
let weather3L3 = document.querySelector('.wr3-location-3');
let wind3L3 = document.querySelector('.wd3-location-3');
let waveHeight6L3 = document.querySelector('.wh6-location-3');
let weather6L3 = document.querySelector('.wr6-location-3');
let wind6L3 = document.querySelector('.wd6-location-3');

// once lat and lon are retrieved from google api, input the coords into the Weather API to grab wave height, weather and wind
// forEach item that is returned from google, run through Weather API
// if beginner is clicked, display locations with 1-2ft wave height
// if intermediate is clicked, display locations with 3-5ft wave height
// if advanced is clicked, display locations with 6-11ft wave height

// Once user enters zipcode, grab lat and lon related to zipcode using google geocoder API
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
            // looking for locations with keyword of beach within 30km (30000 m)
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

                    for (let i = 0; i < 3; i++) {
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
                    };
                } else {
                    console.error('Nearby beach search failed with status' + status);
                }
            });
        } else {
            console.error('Geocoding request failed.');
        }
    }
)};
// times using 600-1800
// Grab users location using HTML Geolocation API:
function initApp() {
    navigator.geolocation.getCurrentPosition(function (position) {
        const userCoords = position.coords;
        // display user geolocation results:
        const userLat = position.coords.latitude;
        const userLon = position.coords.longitude;
        // if user accepts geolocation, then use their lat and lon in google maps API
        if (userCoords !== null) {
            buttonContainerEl.classList.add('hide'); // once we get lat & lon from userlocation, hide first screen
            resultsEl.classList.remove('hide'); // show second screen
            const userLocation = new google.maps.LatLng(userLat, userLon);
            console.log(userLat);
            console.log(userLon);
            // looking for locations with keyword of beach within 30km (30000 m)
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
                    location1El.textContent = beachLocations[0].name
                    location2El.textContent = beachLocations[1].name
                    location3El.textContent = beachLocations[2].name
                    
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

                    // input data from google places API into wwo API
                    for (let i = 0; i < 3; i++) {
                        var locationLat = beachLocations[i].latitude;
                        var locationLon = beachLocations[i].longitude;

                        let wwoAPIKey = '6d4a727b13e24cf7981194923230809'
                        let requestWeatherOnline = 'https://api.worldweatheronline.com/premium/v1/marine.ashx?key=' + wwoAPIKey + '&format=json&q=' + locationLat + ',' + locationLon;
                        // get corresponding data from wwo API for each beach location
                        // hourly data, lets only get from 
                        fetch(requestWeatherOnline)
                            .then(function (response) {
                                return response.json();
                            })
                            .then(function (data) {
                                console.log(data);
                            })

                            // split up results into difficulty 1, 2 or 3 by wave height
                            // pull beach name from google api
                            // pull weather, wind and wave height from wwo API
                            // if beginner button is clicked, display difficulty 1 results
                            // if intermediate button is clicked, display difficulty 2 results
                            // if advanced button is clicked, display difficulty 3 results
                    };
                }
            }
        }
    }
    )}
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
// console.log(locationLat);
// console.log(locationLon);


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

// Once name is entered, input is saved and used to update text content of title ~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// text content saved in local storage, and persists upon reload ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~


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
        beginnerSkillEl.classList.remove('hide'); // show beginner wave height message (Beginner: We recommend wave heights of 1-2ft) - also locations w/ wave height of 1-2ft will have a green background!
    } else {
        initApp(); // ask for user location if no zipcode is entered
    }
});

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
    }
});

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
    }
});
