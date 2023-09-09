let beginnerButtonEl = document.querySelector('.beginner-btn');
let intermediateButtonEl = document.querySelector('.intermediate-btn');
let advancedButtonEl = document.querySelector('.advanced-btn');
let buttonContainerEl = document.querySelector('.button-container');
let resultsEl = document.querySelector('.results');
let userInputEl = document.querySelector('#user-input');
let location1El = document.querySelector('.location-1');
let location2El = document.querySelector('.location-2');
let location3El = document.querySelector('.location-3');

let waveHeight = Array(3);
let weather = Array(3);
let wind = Array(3);

let maxwaveheight = 0;
let minwaveheight = 0;


waveHeight[0] = document.querySelector('.wh06-location-1');
weather[0] = document.querySelector('.wr06-location-1');
wind[0] = document.querySelector('.wd06-location-1');

waveHeight[1] = document.querySelector('.wh06-location-2');
weather[1] = document.querySelector('.wr06-location-2');
wind[1] = document.querySelector('.wd06-location-2');

waveHeight[2] = document.querySelector('.wh06-location-3');
weather[2] = document.querySelector('.wr06-location-3');
wind[2] = document.querySelector('.wd06-location-3');

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
    )
};
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

                    var locationLat0 = beachLocations[0].latitude;
                    var locationLon0 = beachLocations[0].longitude;

                    let wwoAPIKey = '6d4a727b13e24cf7981194923230809'
                    let requestWeatherOnline = 'https://api.worldweatheronline.com/premium/v1/marine.ashx?key=' + wwoAPIKey + '&format=json&q=' + locationLat0 + ',' + locationLon0;
                    // get corresponding data from wwo API for each beach location
                    // hourly data, lets only get from 
                    fetch(requestWeatherOnline)
                        .then(function (response) {
                            return response.json();
                        })
                        .then(function (data) {
                            console.log(data);

                            //Choosing Beaches goes right Here.

                            //location1El.textContent = beachLocations[0].name
                            //location2El.textContent = beachLocations[1].name
                            //location3El.textContent = beachLocations[2].name
                            places = 0;
                            for (let i = 0; i < 20 && places < 3; i++) {
                                if (minwaveheight <= data.data.weather[0].hourly[3].sigHeight_m && maxwaveheight >=  data.data.weather[0].hourly[3].sigHeight_m) {
                                    waveHeight[places].textContent = 'Wave Height: ' + data.data.weather[0].hourly[3].sigHeight_m + ' m';
                                    weather[places].textContent = 'Weather: ' + data.data.weather[0].hourly[3].tempF + ' °F';
                                    wind[places].textContent = 'Wind: ' + data.data.weather[0].hourly[3].windspeedMiles + ' mph';
                                    places++;
                                }
                            }

                        })
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
    maxwaveheight = 2;
    minwaveheight = 0.1;

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
    maxwaveheight = 5;
    minwaveheight = 2;
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
    maxwaveheight = 11;
    minwaveheight = 4;
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
