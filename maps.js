  /*
  Title: Google Map Event JavaScript
  Description:This will add the markers on to the map when you click and you will fill out a form for that event.
  How to use: 1) In your HTML page put this line of code in your head element to link the html page to the stylesheet -->( <link rel = "stylesheet" type = "text/css" href = "map_styles.css" /> ) <--
  			  2) Also enter these lines into your code so that your html will link to the google api and link to the JavaScript file -->( <script src="https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false"></script>  <script src='maps.js'></script> )<--
  			  3) You will need a div element with the id of john so that you will be able to load the map onto the page.
  */

  var markerArray = new Array();
function initialize() {
    var mapOptions = {
        zoom: 40,
        minZoom: 12,
        center: new google.maps.LatLng(49.900412,-97.141117)
    };
    var contentText = "<div class='info'><label for='info_title'>Title:</label><input id='info_title' name='info_title' type='text'/><br /><label for='content'>Content:</label><input id='content' name='content' type='text'/><br /><button id='event_submit'>Submit</button></div>";
    var map = new google.maps.Map(document.getElementById('john'),
        mapOptions);

    google.maps.event.addListener(map, 'click', function(e){


        markerArray.push(new ourMarker(map, e.latLng,contentText));

        var marker2 = new google.maps.Marker({
            position: e.latLng,
            map: map
        });
        var infoWindow = new google.maps.InfoWindow({
            content: contentText,
            "maxWidth": "900"
        });
        infoWindow.open(map, marker2);
        google.maps.event.addListener(infoWindow,"domready", function(e){
            document.getElementById("event_submit").addEventListener("click",function(){
           		infoWindow.setContent("<div class='info'><h1>"+document.getElementById("info_title").value+"</h1><br /><p>"+document.getElementById("content").value+"</p></div>")
            },false);
        });


        google.maps.event.addListener(marker2, 'click', function() {
            infoWindow.open(map,marker2);
        });

    });
}

function ourMarker(map, latLng, content)
{
    this.map = map;
    this.latLng = latLng;
    this.content = content;
}
google.maps.event.addDomListener(window, 'load', initialize);