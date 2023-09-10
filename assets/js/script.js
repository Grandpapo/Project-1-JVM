let beginnerButtonEl = document.querySelector('.beginner-btn');
let intermediateButtonEl = document.querySelector('.intermediate-btn');
let advancedButtonEl = document.querySelector('.advanced-btn');
let buttonContainerEl = document.querySelector('.button-container');
let resultsEl = document.querySelector('.results');
let userInputEl = document.querySelector('#user-input');
let userNameEl = document.querySelector('#user-name');
let userNameFormEl = document.querySelector('.user-name-form');
let userNameHeader = document.querySelector('.surf-planner');
let skillTextEl = document.querySelector('.skill-text');
let skillWaveHeightEl = document.querySelector('.skill-wh');
let location1El = document.querySelector('.location-1');
let location2El = document.querySelector('.location-2');
let location3El = document.querySelector('.location-3');
let googleFooterEl = document.querySelector('.gf');

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
                    location1El.textContent = beachLocations[0].name
                    location2El.textContent = beachLocations[1].name
                    location3El.textContent = beachLocations[2].name

                    let wwoAPIKey = 'f4799e0f512945df87a201101230909'

                    var locationLat0 = beachLocations[0].latitude;
                    var locationLon0 = beachLocations[0].longitude;

                    let requestWeatherOnline0 = 'https://api.worldweatheronline.com/premium/v1/marine.ashx?key=' + wwoAPIKey + '&format=json&q=' + locationLat0 + ',' + locationLon0;
                    // get corresponding data from wwo API for each beach location
                    // hourly data, lets only get from 
                    fetch(requestWeatherOnline0)
                        .then(function (response) {
                            return response.json();
                        })
                        .then(function (data) {
                            console.log(data);
                            waveHeight06L1.textContent = 'Wave Height: ' + Math.round(data.data.weather[0].hourly[2].sigHeight_m * 3.28084) + ' ft';
                            weather06L1.textContent = 'Weather: ' + data.data.weather[0].hourly[2].tempF + ' °F';
                            wind06L1.textContent =  'Wind: ' + data.data.weather[0].hourly[2].windspeedMiles + ' mph';
                            waveHeight09L1.textContent = 'Wave Height: ' + Math.round(data.data.weather[0].hourly[3].sigHeight_m * 3.28084) + ' ft';
                            weather09L1.textContent = 'Weather: ' + data.data.weather[0].hourly[3].tempF + ' °F';
                            wind09L1.textContent =  'Wind: ' + data.data.weather[0].hourly[3].windspeedMiles + ' mph';
                            waveHeight12L1.textContent = 'Wave Height: ' + Math.round(data.data.weather[0].hourly[4].sigHeight_m * 3.28084) + ' ft';
                            weather12L1.textContent = 'Weather: ' + data.data.weather[0].hourly[4].tempF + ' °F';
                            wind12L1.textContent =  'Wind: ' + data.data.weather[0].hourly[4].windspeedMiles + ' mph';
                            waveHeight3L1.textContent = 'Wave Height: ' + Math.round(data.data.weather[0].hourly[5].sigHeight_m * 3.28084) + ' ft';
                            weather3L1.textContent = 'Weather: ' + data.data.weather[0].hourly[5].tempF + ' °F';
                            wind3L1.textContent =  'Wind: ' + data.data.weather[0].hourly[5].windspeedMiles + ' mph';
                            waveHeight6L1.textContent = 'Wave Height: ' + Math.round(data.data.weather[0].hourly[6].sigHeight_m * 3.28084) + ' ft';
                            weather6L1.textContent = 'Weather: ' + data.data.weather[0].hourly[6].tempF + ' °F';
                            wind6L1.textContent =  'Wind: ' + data.data.weather[0].hourly[6].windspeedMiles + ' mph';
                        });

                    var locationLat1 = beachLocations[1].latitude;
                    var locationLon1 = beachLocations[1].longitude;

                    let requestWeatherOnline1 = 'https://api.worldweatheronline.com/premium/v1/marine.ashx?key=' + wwoAPIKey + '&format=json&q=' + locationLat1 + ',' + locationLon1;
                    // get corresponding data from wwo API for each beach location
                    // hourly data, lets only get from 
                    fetch(requestWeatherOnline1)
                        .then(function (response) {
                            return response.json();
                        })
                        .then(function (data) {
                            console.log(data);
                            waveHeight06L2.textContent = 'Wave Height: ' + Math.round(data.data.weather[1].hourly[2].sigHeight_m * 3.28084) + ' ft';
                            weather06L2.textContent = 'Weather: ' + data.data.weather[1].hourly[2].tempF + ' °F';
                            wind06L2.textContent =  'Wind: ' + data.data.weather[1].hourly[2].windspeedMiles + ' mph';
                            waveHeight09L2.textContent = 'Wave Height: ' + Math.round(data.data.weather[1].hourly[3].sigHeight_m * 3.28084) + ' ft';
                            weather09L2.textContent = 'Weather: ' + data.data.weather[1].hourly[3].tempF + ' °F';
                            wind09L2.textContent =  'Wind: ' + data.data.weather[1].hourly[3].windspeedMiles + ' mph';
                            waveHeight12L2.textContent = 'Wave Height: ' + Math.round(data.data.weather[1].hourly[4].sigHeight_m * 3.28084) + ' ft';
                            weather12L2.textContent = 'Weather: ' + data.data.weather[1].hourly[4].tempF + ' °F';
                            wind12L2.textContent =  'Wind: ' + data.data.weather[1].hourly[4].windspeedMiles + ' mph';
                            waveHeight3L2.textContent = 'Wave Height: ' + Math.round(data.data.weather[1].hourly[5].sigHeight_m * 3.28084) + ' ft';
                            weather3L2.textContent = 'Weather: ' + data.data.weather[1].hourly[5].tempF + ' °F';
                            wind3L2.textContent =  'Wind: ' + data.data.weather[1].hourly[5].windspeedMiles + ' mph';
                            waveHeight6L2.textContent = 'Wave Height: ' + Math.round(data.data.weather[1].hourly[6].sigHeight_m * 3.28084) + ' ft';
                            weather6L2.textContent = 'Weather: ' + data.data.weather[1].hourly[6].tempF + ' °F';
                            wind6L2.textContent =  'Wind: ' + data.data.weather[1].hourly[6].windspeedMiles + ' mph';

                        });

                    var locationLat2 = beachLocations[2].latitude;
                    var locationLon2 = beachLocations[2].longitude;

                    let requestWeatherOnline2 = 'https://api.worldweatheronline.com/premium/v1/marine.ashx?key=' + wwoAPIKey + '&format=json&q=' + locationLat2 + ',' + locationLon2;
                    // get corresponding data from wwo API for each beach location
                    // hourly data, lets only get from 
                    fetch(requestWeatherOnline2)
                        .then(function (response) {
                            return response.json();
                        })
                        .then(function (data) {
                            console.log(data);
                            waveHeight06L3.textContent = 'Wave Height: ' + Math.round(data.data.weather[2].hourly[2].sigHeight_m * 3.28084) + ' ft';
                            weather06L3.textContent = 'Weather: ' + data.data.weather[2].hourly[2].tempF + ' °F';
                            wind06L3.textContent =  'Wind: ' + data.data.weather[2].hourly[2].windspeedMiles + ' mph';
                            waveHeight09L3.textContent = 'Wave Height: ' + Math.round(data.data.weather[2].hourly[3].sigHeight_m * 3.28084) + ' ft';
                            weather09L3.textContent = 'Weather: ' + data.data.weather[2].hourly[3].tempF + ' °F';
                            wind09L3.textContent =  'Wind: ' + data.data.weather[2].hourly[3].windspeedMiles + ' mph';
                            waveHeight12L3.textContent = 'Wave Height: ' + Math.round(data.data.weather[2].hourly[4].sigHeight_m * 3.28084) + ' ft';
                            weather12L3.textContent = 'Weather: ' + data.data.weather[2].hourly[4].tempF + ' °F';
                            wind12L3.textContent =  'Wind: ' + data.data.weather[2].hourly[4].windspeedMiles + ' mph';
                            waveHeight3L3.textContent = 'Wave Height: ' + Math.round(data.data.weather[2].hourly[5].sigHeight_m * 3.28084) + ' ft';
                            weather3L3.textContent = 'Weather: ' + data.data.weather[2].hourly[5].tempF + ' °F';
                            wind3L3.textContent =  'Wind: ' + data.data.weather[2].hourly[5].windspeedMiles + ' mph';
                            waveHeight6L3.textContent = 'Wave Height: ' + Math.round(data.data.weather[2].hourly[6].sigHeight_m * 3.28084) + ' ft';
                            weather6L3.textContent = 'Weather: ' + data.data.weather[2].hourly[6].tempF + ' °F';
                            wind6L3.textContent =  'Wind: ' + data.data.weather[2].hourly[6].windspeedMiles + ' mph';

                        });
                } else {
                    console.error('Nearby beach search failed with status' + status);
                }
            });
        } else {
            console.error('Geocoding request failed.');
        }
    }
    )
};

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
            googleFooterEl.classList.remove('google-footer'); // format footer for second screen
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

                    // input data from google places API into wwo API
                    let wwoAPIKey = 'f4799e0f512945df87a201101230909'

                    var locationLat0 = beachLocations[0].latitude;
                    var locationLon0 = beachLocations[0].longitude;

                    let requestWeatherOnline0 = 'https://api.worldweatheronline.com/premium/v1/marine.ashx?key=' + wwoAPIKey + '&format=json&q=' + locationLat0 + ',' + locationLon0;
                    // get corresponding data from wwo API for each beach location
                    // hourly data, lets only get from 
                    fetch(requestWeatherOnline0)
                        .then(function (response) {
                            return response.json();
                        })
                        .then(function (data) {
                            console.log(data);
                            waveHeight06L1.textContent = 'Wave Height: ' + Math.round(data.data.weather[0].hourly[2].sigHeight_m * 3.28084) + ' ft';
                            weather06L1.textContent = 'Weather: ' + data.data.weather[0].hourly[2].tempF + ' °F';
                            wind06L1.textContent =  'Wind: ' + data.data.weather[0].hourly[2].windspeedMiles + ' mph';
                            waveHeight09L1.textContent = 'Wave Height: ' + Math.round(data.data.weather[0].hourly[3].sigHeight_m * 3.28084) + ' ft';
                            weather09L1.textContent = 'Weather: ' + data.data.weather[0].hourly[3].tempF + ' °F';
                            wind09L1.textContent =  'Wind: ' + data.data.weather[0].hourly[3].windspeedMiles + ' mph';
                            waveHeight12L1.textContent = 'Wave Height: ' + Math.round(data.data.weather[0].hourly[4].sigHeight_m * 3.28084) + ' ft';
                            weather12L1.textContent = 'Weather: ' + data.data.weather[0].hourly[4].tempF + ' °F';
                            wind12L1.textContent =  'Wind: ' + data.data.weather[0].hourly[4].windspeedMiles + ' mph';
                            waveHeight3L1.textContent = 'Wave Height: ' + Math.round(data.data.weather[0].hourly[5].sigHeight_m * 3.28084) + ' ft';
                            weather3L1.textContent = 'Weather: ' + data.data.weather[0].hourly[5].tempF + ' °F';
                            wind3L1.textContent =  'Wind: ' + data.data.weather[0].hourly[5].windspeedMiles + ' mph';
                            waveHeight6L1.textContent = 'Wave Height: ' + Math.round(data.data.weather[0].hourly[6].sigHeight_m * 3.28084) + ' ft';
                            weather6L1.textContent = 'Weather: ' + data.data.weather[0].hourly[6].tempF + ' °F';
                            wind6L1.textContent =  'Wind: ' + data.data.weather[0].hourly[6].windspeedMiles + ' mph';
                        });

                    var locationLat1 = beachLocations[1].latitude;
                    var locationLon1 = beachLocations[1].longitude;

                    let requestWeatherOnline1 = 'https://api.worldweatheronline.com/premium/v1/marine.ashx?key=' + wwoAPIKey + '&format=json&q=' + locationLat1 + ',' + locationLon1;
                    // get corresponding data from wwo API for each beach location
                    // hourly data, lets only get from 
                    fetch(requestWeatherOnline1)
                        .then(function (response) {
                            return response.json();
                        })
                        .then(function (data) {
                            console.log(data);
                            waveHeight06L2.textContent = 'Wave Height: ' + Math.round(data.data.weather[1].hourly[2].sigHeight_m * 3.28084) + ' ft';
                            weather06L2.textContent = 'Weather: ' + data.data.weather[1].hourly[2].tempF + ' °F';
                            wind06L2.textContent =  'Wind: ' + data.data.weather[1].hourly[2].windspeedMiles + ' mph';
                            waveHeight09L2.textContent = 'Wave Height: ' + Math.round(data.data.weather[1].hourly[3].sigHeight_m * 3.28084) + ' ft';
                            weather09L2.textContent = 'Weather: ' + data.data.weather[1].hourly[3].tempF + ' °F';
                            wind09L2.textContent =  'Wind: ' + data.data.weather[1].hourly[3].windspeedMiles + ' mph';
                            waveHeight12L2.textContent = 'Wave Height: ' + Math.round(data.data.weather[1].hourly[4].sigHeight_m * 3.28084) + ' ft';
                            weather12L2.textContent = 'Weather: ' + data.data.weather[1].hourly[4].tempF + ' °F';
                            wind12L2.textContent =  'Wind: ' + data.data.weather[1].hourly[4].windspeedMiles + ' mph';
                            waveHeight3L2.textContent = 'Wave Height: ' + Math.round(data.data.weather[1].hourly[5].sigHeight_m * 3.28084) + ' ft';
                            weather3L2.textContent = 'Weather: ' + data.data.weather[1].hourly[5].tempF + ' °F';
                            wind3L2.textContent =  'Wind: ' + data.data.weather[1].hourly[5].windspeedMiles + ' mph';
                            waveHeight6L2.textContent = 'Wave Height: ' + Math.round(data.data.weather[1].hourly[6].sigHeight_m * 3.28084) + ' ft';
                            weather6L2.textContent = 'Weather: ' + data.data.weather[1].hourly[6].tempF + ' °F';
                            wind6L2.textContent =  'Wind: ' + data.data.weather[1].hourly[6].windspeedMiles + ' mph';

                        });

                    var locationLat2 = beachLocations[2].latitude;
                    var locationLon2 = beachLocations[2].longitude;

                    let requestWeatherOnline2 = 'https://api.worldweatheronline.com/premium/v1/marine.ashx?key=' + wwoAPIKey + '&format=json&q=' + locationLat2 + ',' + locationLon2;
                    // get corresponding data from wwo API for each beach location
                    // hourly data, lets only get from 
                    fetch(requestWeatherOnline2)
                        .then(function (response) {
                            return response.json();
                        })
                        .then(function (data) {
                            console.log(data);
                            waveHeight06L3.textContent = 'Wave Height: ' + Math.round(data.data.weather[2].hourly[2].sigHeight_m * 3.28084) + ' ft';
                            weather06L3.textContent = 'Weather: ' + data.data.weather[2].hourly[2].tempF + ' °F';
                            wind06L3.textContent =  'Wind: ' + data.data.weather[2].hourly[2].windspeedMiles + ' mph';
                            waveHeight09L3.textContent = 'Wave Height: ' + Math.round(data.data.weather[2].hourly[3].sigHeight_m * 3.28084) + ' ft';
                            weather09L3.textContent = 'Weather: ' + data.data.weather[2].hourly[3].tempF + ' °F';
                            wind09L3.textContent =  'Wind: ' + data.data.weather[2].hourly[3].windspeedMiles + ' mph';
                            waveHeight12L3.textContent = 'Wave Height: ' + Math.round(data.data.weather[2].hourly[4].sigHeight_m * 3.28084) + ' ft';
                            weather12L3.textContent = 'Weather: ' + data.data.weather[2].hourly[4].tempF + ' °F';
                            wind12L3.textContent =  'Wind: ' + data.data.weather[2].hourly[4].windspeedMiles + ' mph';
                            waveHeight3L3.textContent = 'Wave Height: ' + Math.round(data.data.weather[2].hourly[5].sigHeight_m * 3.28084) + ' ft';
                            weather3L3.textContent = 'Weather: ' + data.data.weather[2].hourly[5].tempF + ' °F';
                            wind3L3.textContent =  'Wind: ' + data.data.weather[2].hourly[5].windspeedMiles + ' mph';
                            waveHeight6L3.textContent = 'Wave Height: ' + Math.round(data.data.weather[2].hourly[6].sigHeight_m * 3.28084) + ' ft';
                            weather6L3.textContent = 'Weather: ' + data.data.weather[2].hourly[6].tempF + ' °F';
                            wind6L3.textContent =  'Wind: ' + data.data.weather[2].hourly[6].windspeedMiles + ' mph';

                        });
                    // split up results into difficulty 1, 2 or 3 by wave height
                    // pull beach name from google api
                    // pull weather, wind and wave height from wwo API
                    // if beginner button is clicked, display difficulty 1 text
                    // if intermediate button is clicked, display difficulty 2 text 
                    // if advanced button is clicked, display difficulty 3 text

                }
            }
        }
    }
    )
}

// If a zip code is entered, and a skill level is clicked, load in second screen and information for beaches
// if no zip code is entered and a skill level is clicked, ask to use user location then load information for beaches

// Logic to save name for your surf planner
let savedNameForm = localStorage.getItem('name');
if (savedNameForm) {
    userNameHeader.textContent = 'Surf Planner for ' + savedNameForm;
}

userNameFormEl.addEventListener('submit', function (event) {
    event.preventDefault();
    let savedName = userNameEl.value;
    userNameHeader.textContent = 'Surf Planner for ' + userNameEl.value;
    localStorage.setItem('name', savedName);
});

beginnerButtonEl.addEventListener('click', function (event) {
    event.preventDefault();
    console.log(userInputEl.value);
    skillTextEl.classList.add('beginner');
    skillTextEl.textContent = 'Beginner:';
    skillWaveHeightEl.classList.add('beginner');
    skillWaveHeightEl.textContent = 'Wave height of 1-2ft recommended'; // show beginner wave height message

    if (userInputEl.value !== '') {
        var userInputZip = userInputEl.value;
        userInputEl.textContent = '';
        findNearbyBeaches(userInputZip);
        buttonContainerEl.classList.add('hide'); // hide first screen
        resultsEl.classList.remove('hide'); // show second screen
        googleFooterEl.classList.remove('google-footer'); // format footer for second screen
    } else {
        initApp(); // ask for user location if no zipcode is entered
    }
});

intermediateButtonEl.addEventListener('click', function (event) {
    event.preventDefault();
    console.log(userInputEl.value);
    skillTextEl.classList.add('intermediate');
    skillTextEl.textContent = 'Intermediate:';
    skillWaveHeightEl.classList.add('intermediate');
    skillWaveHeightEl.textContent = 'Wave height of 3-5ft recommended'; // show intermediate wave height message

    if (userInputEl.value !== '') {
        var userInputZip = userInputEl.value;
        userInputEl.textContent = '';
        findNearbyBeaches(userInputZip);
        buttonContainerEl.classList.add('hide'); // hide first screen
        resultsEl.classList.remove('hide'); // show second screen
        googleFooterEl.classList.remove('google-footer'); // format footer for second screen
    } else {
        initApp(); // ask for user location if no zipcode is entered
    }
});

advancedButtonEl.addEventListener('click', function (event) {
    event.preventDefault();
    console.log(userInputEl.value);
    skillTextEl.classList.add('advanced');
    skillTextEl.textContent = 'Advanced:';
    skillWaveHeightEl.classList.add('advanced');
    skillWaveHeightEl.textContent = 'Wave height of 6-11ft recommended'; // show advanced wave height message

    if (userInputEl.value !== '') {
        var userInputZip = userInputEl.value;
        userInputEl.textContent = '';
        findNearbyBeaches(userInputZip);
        buttonContainerEl.classList.add('hide'); // hide first screen
        resultsEl.classList.remove('hide'); // show second screen
        googleFooterEl.classList.remove('google-footer'); // format footer for second screen
    } else {
        initApp(); // ask for user location if no zipcode is entered
    }
});
