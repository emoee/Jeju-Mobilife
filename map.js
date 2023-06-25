function initMap() {
  var mapOptions = {
    center: { lat: 33.3702887, lng: 126.5265874 },    
    zoom: 10
  };
  var map = new google.maps.Map(document.getElementById("map"), mapOptions);
}
