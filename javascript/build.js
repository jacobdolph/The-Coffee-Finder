
function buildQueryUrl(lat, lon) {
    var queryURL = "https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/findAddressCandidates?";
    var queryParams = { "f": "json" };
    queryParams.category = "coffee shop";
    queryParams.outFields = "Place_addr", "PlaceName";
    queryParams.maxLocations = "5";
    queryParams.location = `${lat},${lon}`;
    return queryURL + $.param(queryParams);
}

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