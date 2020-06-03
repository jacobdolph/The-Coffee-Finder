var options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
};
var starVar = 0
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