
// Grab users location using HTML Geolocation API:
navigator.geolocation.getCurrentPosition(position => {
    const userCoords = position.coords;
    // display user geolocation results:
    console.log(userCoords);
    let userLat = position.coords.latitude;
    let userLon = position.coords.longitude;

    console.log(userLat);
    console.log(userLon);

    let userLocation = userLat + ',' + userLon;

    //userLocation = '33.613548, -117.929779'

    let requestNOAAurl = 'https://api.weather.gov/points/' + userLat + ',' + userLon;

    fetch(requestNOAAurl)
        .then(function (response) {
            return response.json();
        })
        .then (function(data){
            console.log(data);
        });

    if (userCoords !== null) {

        let map;

        async function initMap() {
            const { Map } = await google.maps.importLibrary("maps");

            map = new Map(document.getElementById("map"), {
                center: { lat: 33.613548, lng: -117.929779 },
                zoom: 8,
            });
        }

        let service;

        function initialize() {
            var userCoordinates = new google.maps.LatLng(userLocation);

            map = new google.maps.Map(document.getElementById('map'), {
                center: userCoordinates,
                zoom: 15
            });

            var request = {
                location: userCoordinates,
                radius: '500',
                keyword: ['beach']
            };

            service = new google.maps.places.PlacesService(map);
            service.nearbySearch(request, callback);
        }

        function callback(results, status) {
            if (status == google.maps.places.PlacesServiceStatus.OK) {
                for (var i = 0; i < results.length; i++) {
                    createMarker(results[i]);
                }
            }
            console.log(results);
        }

        initMap();
        initialize();
    }
});





// Create the script tag, set the appropriate attributes
// var script = document.createElement('script');
// script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyARr4d7FW6fKgE5ZHkaPxvAkve8lBmm5DQ&callback=initMap';
// script.async = true;

// // Attach your callback function to the `window` object
// window.initMap = initMap;

// // Append the 'script' element to 'head'
// document.head.appendChild(script);
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