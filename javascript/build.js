
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

function buildCardLoop(i, data) {
    coffeeShopCard = $("<div>").attr({
        "class": "card-button col s12 m3",
        "data-address": data.candidates[i].attributes.Place_addr,
        "style": "color:#ffebcd "
    });
    cardTitle = $("<h5>").attr({
        "style": "text-align:left"
    }).text(data.candidates[i].address);
    horizontalCard = $("<div>").addClass("card horizontal").attr({
        "style": "padding-left:2rem; background-color:rgba(56, 48, 48, 0.4); border:  solid tan;"
    });
    cardImg = $("<div>").addClass("card-image");
    Img = $('<img />', {
        id: "image-" + [i],
        src: 'https://media.giphy.com/media/7qV3yswT0K8hi/giphy.gif',
        alt: 'placeholder'
    });
    cardStack = $("<div>").addClass("card-stack");
    cardContent = $("<div>").addClass("card-content card-items").attr({
        "style": "padding-left:0"
    })
    cardIdentifier = $("<h6>").text("Coffee Shop");
    cardStoreHours = $("<h6>").text("Store Hours: 6am to 9pm");
}