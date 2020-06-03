let coffeeShopCard, cardTitle, horizontalCard, cardImg, Img, cardStack, cardContent, cardIdentifier, cardStoreHours;



getCoffeeShops = (lat, lon) => {
    queryURL = buildQueryUrl(lat, lon);
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (data) {

        for (var i = 0; i < 4; i++) {
            buildCardLoop(i, data);
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
                    L.mapquest.geocodingControl().addTo(map)
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
        let queryURL = buildQueryUrl(lat, lon);
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            responseEl = response;
            for (var i = 0; i < 4; i++) {
                buildCardLoop(i, response);
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