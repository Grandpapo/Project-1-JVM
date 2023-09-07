
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

    const googleKey = config.APIkey;
    const requestUrlGoogle = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?&location=' + userLocation + '&radius=1500&type=beaches&key=' + googleKey;

    fetch(requestUrlGoogle)
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