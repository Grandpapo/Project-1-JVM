let beginnerButtonEl = document.querySelector('.beginner-btn');
let intermediateButtonEl = document.querySelector('.intermediate-btn');
let advancedButtonEl = document.querySelector('.advanced-btn');
let buttonContainerEl = document.querySelector('.button-container');
let resultsEl = document.querySelector('.results');
let userInputEl = document.querySelector('#user-input');

// Grab users location using HTML Geolocation API:

function initApp() {
    navigator.geolocation.getCurrentPosition(function (position) {
        const userCoords = position.coords;
        // display user geolocation results:
        const userLat = position.coords.latitude;
        const userLon = position.coords.longitude;
        const userLocation = new google.maps.LatLng(userLat, userLon);

        console.log(userLat);
        console.log(userLon);

        const request = {
            location: userLocation,
            radius: '30000',
            keyword: 'beach'
        }

        const service = new google.maps.places.PlacesService(document.createElement('div')); // dummy element, since we don't want map

        service.nearbySearch(request, callback);
        // use google maps API to search for beaches within a 30 km radius of user location, 
        // grab latitude and longitude of all beach results from data output

        function callback(results, status) {
            if (status == google.maps.places.PlacesServiceStatus.OK) {
                const beachLocations = results.map(place => ({
                    name: place.name,
                    latitude: place.geometry.location.lat(),
                    longitude: place.geometry.location.lng()
                }));
                console.log(beachLocations);
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

//     let requestNOAAurl = 'https://api.weather.gov/points/' + userLat + ',' + userLon;

//     fetch(requestNOAAurl)
//         .then(function (response) {
//             return response.json();
//         })
//         .then (function(data){
//             console.log(data);
//         });


// // If user doesn't share location, they can enter zipcode
// // turn zipcode into latitude and longitude

function coordsZip(zipcode) 
{
    var geocoder = new google.maps.Geocoder();
    var address = zipcode;

    geocoder.geocode({ 'address': 'zipcode '+ address }, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            var zipLat = results[0].geometry.location.lat();
            var zipLon = results[0].geometry.location.lng();
            console.log("Latitude: " + zipLat + "Longitude: " + zipLon);
        } else {
            console.error('Geocoding failed with status: ' + status);
            callback(null);
        }
    });
}

let userInputZip = userInputEl.value

var userZipcode = userInputZip;
getCoordsbyZip(userZipcode, function (coords){
    if (coords) {
        // Use
    }
})

beginnerButtonEl.addEventListener('click', function (event) {
    event.preventDefault();
    buttonContainerEl.classList.add('hide'); // hide first screen
    resultsEl.classList.remove('hide');
});

intermediateButtonEl.addEventListener('click', function (event) {
    event.preventDefault();
    buttonContainerEl.classList.add('hide'); // hide first screen
    resultsEl.classList.remove('hide');
});

advancedButtonEl.addEventListener('click', function (event) {
    event.preventDefault();
    buttonContainerEl.classList.add('hide'); // hide first screen
    resultsEl.classList.remove('hide');
});

// const googleKey = configGoogle.APIkey;
// const requestUrlGoogle = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?&keyword=beach&location=' + userLocation + '&radius=1500&key=' + googleKey;



// fetch(requestUrlGoogle)
//     .then(function (response) {
//         return response.json();
//     })
//     .then(function (data) {
//         console.log(data);
//     });
//});




// Use zipcode as location: 


// Location recognition Url (to get list of entities given lat & long)





// NOAA API setup

//const noaaKey = configNOAA.APIkey;

// request data from NOAA using user latitude and longitude

// const requestUrlNOAA = 'https://api.weather.gov/points/' + userLat + ',' + userLon;