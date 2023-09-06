

// Grab users location:
navigator.geolocation.getCurrentPosition(position => {
    const userLocation = position.coords;
    // Show a map centered at latitude / longitude.
    console.log(userLocation);
    return(userLocation);
});



// Use zipcode as location: 


// Location recognition Url (to get list of entities given lat & long)
const myKey = config.APIkey;
const requestUrl = 'https://dev.virtualearth.net/REST/v1/LocationRecog/' + userLocation + '?&top={10}&distanceunit=mi&verboseplacenames=false&includeEntityTypes=naturalPOI&key=' + myKey;