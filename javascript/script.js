// var lon, lat, crd;
var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
};

// var latitude, longitude, coffeShopCard, cardTitle, cardIdentifier, cardMileageApi, cardStoreHours;



function buildQueryUrl(lat, lon) {
    var queryURL = "https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/findAddressCandidates?";
    var queryParams = { "f": "json" };
    queryParams.category = "coffee shop";
    queryParams.outFields = "Place_addr", "PlaceName";
    queryParams.maxLocations = "5";
    console.log(lat, lon)
    queryParams.location = `${lon},${lat}`;
    return queryURL + $.param(queryParams);
}





const getCoffeeShops = () => {
    let queryUL;

    function success(pos) {
        let crd = pos.coords;

        console.log('Your current position is:');
        console.log(`Latitude : ${crd.latitude}`);
        console.log(`Longitude: ${crd.longitude}`);
        console.log(`More or less ${crd.accuracy} meters.`);
        let lon = crd.longitude;
        let lat = crd.latitude;
        queryURL = buildQueryUrl(lat, lon);
        console.log(queryURL)
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (data) {
            dataEl = data
            console.log(dataEl)
            for (var i = 0; i < dataEl.candidates.length; i++) {
                console.log(dataEl.candidates[i].address);
<<<<<<< HEAD
                let cityEl = dataEl.candidates[i].attributes.Place_addr;
                console.log(dataEl.candidates[i].attributes.Place_addr);
                var coffeeShopCard = $("<div>").addClass("col s12 m12").attr("id", "card-button");
=======
                var coffeeShopCard = $("<div>").addClass("col s12 m12");
>>>>>>> 8170e75b213e28ffb6b56b519e348a50140e36cc
                var cardTitle = $("<h5>").addClass("header").text(dataEl.candidates[i].address);
                var horizontalCard = $("<div>").addClass("card horizontal");
                var cardImg = $("<div>").addClass("card-image");
                var Img = $('<img />', {
                    id: "image-" + [i],
                    src: 'https://media.giphy.com/media/7qV3yswT0K8hi/giphy.gif',
                    alt: 'placeholder'
                });
                var cardStack = $("<div>").addClass("card-stack");
<<<<<<< HEAD
                var cardContent = $("<div>").addClass("card-content ")
                // var cardButton = $("<a />").addClass("waves-effect waves-light btn").text("button")
                var cardIdentifier = $("<h6>").text("Coffee Shop");
                var cardStoreHours = $("<h6>").text("6am : 9pm");

                $(coffeeShopCard).append(horizontalCard);
                $(horizontalCard).append(cardTitle);
                $(horizontalCard).append(cardStack);
=======
                var cardContent = $("<div>").addClass("card-content card-items")
                // var cardButton = $("<a />").addClass("waves-effect waves-light btn").text("button")
                var cardIdentifier = $("<h6>").text("Coffee Shop");
                var cardStoreHours = $("<h6>").text("Store Hours: 6am to 9pm");

                $(coffeeShopCard).append(horizontalCard);
                $(horizontalCard).append(cardTitle);
                $(cardTitle).append(cardStack);
>>>>>>> 8170e75b213e28ffb6b56b519e348a50140e36cc
                $(cardStack).append(cardContent);
                $(cardContent).append(cardIdentifier);
                $(horizontalCard).append(cardImg);
                $(cardImg).append(Img);
                $(cardContent).append(cardStoreHours);
                $("#coffee-shops-homes").append(coffeeShopCard);




            }
            console.log(dataEl.candidates[1].address)




            $("#card-button").click(function () {


                L.mapquest.key = 'QR7nQvmiQcuP7wcQSNDMp8gjLvJsXBcr';

                var map = L.mapquest.map('map', {
                    center: [lon, lat],
                    layers: L.mapquest.tileLayer('map'),
                    zoom: 13
                });
                console.log(map)
                var cityEl = 'murray';
                L.mapquest.directions().route({
                    start: '350 5th Ave, New York, NY 10118',
                    end: cityEl

                });
                console.log(cityEl)
            })



        })

    }
    function error(err) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
    }

    navigator.geolocation.getCurrentPosition(success, error, options);




}

window.onload = () => {
    getCoffeeShops()
}


// $.ajax({
//     url: queryMapUrl,    
//     method: "GET"
// })
//     .then(function () {


//     })  