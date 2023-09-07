
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

    const bingKey = config.APIkey;
    const requestUrlBing = 'https://dev.virtualearth.net/REST/v1/LocationRecog/' + userLocation + '?&top=10&distanceunit=mi&verboseplacenames=false&Type=Beaches&output=json&key=' + bingKey;

    // function testTest (requestUrlBing) {
    //     console.log(requestUrlBing);
    // }

    fetch(requestUrlBing)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
        })
});




// Use zipcode as location: 


// Location recognition Url (to get list of entities given lat & long)





// NOAA API setup

//const noaaKey = configNOAA.APIkey;

// request data from NOAA using user latitude and longitude

// const requestUrlNOAA = 'https://api.weather.gov/points/' + userLat + ',' + userLon;