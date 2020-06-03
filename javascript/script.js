var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
};
function buildQueryUrl(lat, lon) {
    var queryURL = "https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/findAddressCandidates?";
    var queryParams = { "f": "json" };
    queryParams.category = "coffee shop";
    queryParams.outFields = "Place_addr", "PlaceName";
    queryParams.maxLocations = "5";
    queryParams.location = `${lat},${lon}`;
    return queryURL + $.param(queryParams);
}
// this variable allows the map builder to wait until that script is read to build the
var starVar = 0
// this function is called once the page loads with the windows.onload function at the bottom
const buildCoffeeShopCard = (coffeeShopCard, horizontalCard, cardTitle, cardStack, cardContent, cardIdentifier, cardImg, cardStoreHours) => {
    $(coffeeShopCard).append(horizontalCard);
    $(horizontalCard).append(cardTitle);
    $(cardTitle).append(cardStack);
    $(cardStack).append(cardContent);
    $(cardContent).append(cardIdentifier);
    $(horizontalCard).append(cardImg);

    $(cardContent).append(cardStoreHours);
    $("#coffee-shops-homes").append(coffeeShopCard);
}

getCoffeeShops = (lat, lon) => {
    queryURL = buildQueryUrl(lat, lon);
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (data) {

        for (var i = 0; i < 4; i++) {
            let coffeeShopCard = $("<div>").attr({
                "class": "card-button col s12 m3",
                "data-address": data.candidates[i].attributes.Place_addr,
                "style": "color:#334b51 "

            });
            let cardTitle = $("<h5>").attr({
                "style": "text-align:left"
            }).text(data.candidates[i].address);
            let horizontalCard = $("<div>").addClass("card horizontal").attr({
                "style": "padding-left:2rem; background-color:#ffebcd"
            });
            let cardImg = $("<div>").addClass("card-image");
            let Img = $('<img />', {
                id: "image-" + [i],
                src: 'https://media.giphy.com/media/7qV3yswT0K8hi/giphy.gif',
                alt: 'placeholder'
            });
            let cardStack = $("<div>").addClass("card-stack");
            let cardContent = $("<div>").addClass("card-content card-items").attr({
                "style": "padding-left:0"
            })
            // let cardButton = $("<a />").addClass("waves-effect waves-light btn").text("button")
            let cardIdentifier = $("<h6>").text("Coffee Shop");
            let cardStoreHours = $("<h6>").text("Store Hours: 6am to 9pm");
            buildCoffeeShopCard(coffeeShopCard, horizontalCard, cardTitle, cardStack, cardContent, cardIdentifier, cardImg, cardStoreHours);
        }
        // ----finding the reverse address from the lattitude and longitude

        let reverseURL = `https://www.mapquestapi.com/geocoding/v1/reverse?key=Sf1vVXP4tsAXRiAvYumsYGJTgGd0wlMe&location=${lon},${lat}&includeRoadMetadata=true&includeNearestIntersection=true`;

        // ----finding the reverse address of of the lattitude and longitude
        $.ajax({
            url: reverseURL,
            method: "GET"
        }).then(function (geoAddress) {

            var adressStart = geoAddress.results[0].locations[0]
            var startAddress = adressStart.street + ", " + adressStart.adminArea5 + ", " + adressStart.adminArea3 + ", " + adressStart.postalCode
            $(".card-button").click(function () {
                var shopAddress = $(this).data('address');
                L.mapquest.key = 'QR7nQvmiQcuP7wcQSNDMp8gjLvJsXBcr';
                if (starVar === 0) {
                    starVar = 1
                    var map = L.mapquest.map('map', {
                        center: [lon, lat],
                        layers: L.mapquest.tileLayer('map'),
                        zoom: 13
                    });
                    L.mapquest.directions().route({
                        start: startAddress,
                        end: shopAddress
                    });
                }
            })
        })
    })
}
function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
}




const findByZipcode = (pos) => {
    var options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    };


    let crds = pos.coords;
    let lat = crds.latitude;
    let lon = crds.longitude;

    var reverseURL = "https://www.mapquestapi.com/geocoding/v1/reverse?key=Sf1vVXP4tsAXRiAvYumsYGJTgGd0wlMe&location=" + lat + "," + lon + "&includeRoadMetadata=true&includeNearestIntersection=true"
    var zipcode = $('#search').val().trim();

    var url = 'https://public.opendatasoft.com/api/records/1.0/search/?dataset=us-zip-code-latitude-and-longitude&q=' + zipcode + '&facet=state&facet=timezone&facet=dst'
    $.ajax({
        url: url,
        method: "GET"
    }).then(function (zips) {
        //the lat lon data returned from this query is flipped
        let lat = zips.records[0].fields.longitude
        let lon = zips.records[0].fields.latitude
        // var queryURL = "https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/findAddressCandidates?";
        let queryURL = buildQueryUrl(lat, lon);

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {

            responseEl = response;

            for (var i = 0; i < 4; i++) {

                let cityEl = responseEl.candidates[i].attributes.Place_addr;

                let coffeeShopCard = $("<div>").attr({
                    "class": "card-button col s12 m3",
                    "data-address": response.candidates[i].attributes.Place_addr
                });
                let cardTitle = $("<h5>").addClass("header").text(responseEl.candidates[i].address);
                let horizontalCard = $("<div>").addClass("card horizontal").attr({
                    "style": "padding-left:2rem; background-color:#ffebcd"
                });
                let cardImg = $("<div>").addClass("card-image");
                let Img = $('<img />', {
                    id: "image-" + [i],
                    src: 'https://media.giphy.com/media/7qV3yswT0K8hi/giphy.gif',
                    alt: 'placeholder'
                });
                let cardStack = $("<div>").addClass("card-stack");
                let cardContent = $("<div>").addClass("card-content card-items").attr({
                    "style": "padding-left:0"
                })

                let cardIdentifier = $("<h6>").text("Coffee Shop");
                let cardStoreHours = $("<h6>").text("Store Hours: 6am to 9pm");
                buildCoffeeShopCard(coffeeShopCard, horizontalCard, cardTitle, cardStack, cardContent, cardIdentifier, cardImg, cardStoreHours);

            }
            $.ajax({
                url: reverseURL,
                method: "GET"
            }).then(function (geoAddress) {
                var adressStart = geoAddress.results[0].locations[0]
                var startAddress = adressStart.street + ", " + adressStart.adminArea5 + ", " + adressStart.adminArea3 + ", " + adressStart.postalCode
                $(".card-button").click(function () {
                    $(".theMap").empty();
                    var shopAddress = $(this).data('address');

                    L.mapquest.key = 'QR7nQvmiQcuP7wcQSNDMp8gjLvJsXBcr';
                    if (starVar === 0) {
                        starVar = 1
                        var map = L.mapquest.map('map', {
                            center: [lon, lat],
                            layers: L.mapquest.tileLayer('map'),
                            zoom: 13
                        });
                    }
                    L.mapquest.directions().route({
                        start: startAddress,
                        end: shopAddress
                    });
                })
            })
        })
        $('#search').val(null);
        $('#coffee-shops-homes').empty();
    })
}

window.onload = () => {
    navigator.geolocation.getCurrentPosition(success, error, options);

    function success(pos) {
        let crd = pos.coords;
        let lon = crd.longitude;
        let lat = crd.latitude;
        getCoffeeShops(lon, lat)
    }

}
$('#searchButton').on("click", function () {
    navigator.geolocation.getCurrentPosition(success, error, options)
    function success(pos) {
        let crd = pos.coords;
        let lon = crd.longitude;
        let lat = crd.latitude;
        findByZipcode(pos)
    }
})