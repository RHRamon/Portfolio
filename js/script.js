//if ('serviceWorker' in navigator) {
//	navigator.serviceWorker
//		.register("js/sw.js")
//		.then(function(){
//			console.log("Service worker is registered!");
//		});
//}

if ('serviceWorker' in navigator && 'PushManager' in window) {
  console.log('Service Worker and Push is supported');

  navigator.serviceWorker.register('sw.js')
  .then(function(swReg) {
    console.log('Service Worker is registered', swReg);

    swRegistration = swReg;
  })
  .catch(function(error) {
    console.error('Service Worker Error', error);
  });
} else {
  console.warn('Push messaging is not supported');
  pushButton.textContent = 'Push Not Supported';
}

$(function(){
    $("[data-role='header'], [data-role='footer']").toolbar();
})



//LOCATIE
 var map, infoWindow;
      function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 51.697816, lng: 5.303675},
          zoom: 12
        });
        infoWindow = new google.maps.InfoWindow;
          
        var marker = new google.maps.Marker({
  position:  {lat: 51.694845, lng: 5.308116},
  map: map
});

        // Try HTML5 geolocation.
        if (navigator.geolocation) {
          navigator.geolocation.watchPosition(function(position) {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };

            infoWindow.setPosition(pos);
            infoWindow.setContent('Hier ben jij!');
            infoWindow.open(map);
            map.setCenter(pos);
          }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
          });
        } else {
          // Browser doesn't support Geolocation
          handleLocationError(false, infoWindow, map.getCenter());
        }
      }

      function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
                              'Error: Locatie is geblokkeerd..' :
                              'Error: Your browser doesn\'t support geolocation.');
        infoWindow.open(map);
      }