var map;
const LAT = 49.900412;
const LNG = -97.141117;
var startMarkerListener = null;
var form_submit_listener = null;
var markerArray = new Array();
const LIST_TABLE_CONTENT_LENGTH = 20;
const EVENT_ADDRESS = "http://www.gristlebone.com/School/User_2_Server/";
var marker_image //= "rrc_logo_1.png";
var submit_handler;
var contentString = '<h1>hi</h1>';
var infoWindow;
var map_marker;
var temp_marker;
var event_marker;
var event_array = new Array();
function event_marker(latLng,content,screen_name)
{
	this.id = "marker" + (markerArray.length + 1);
	this.latLng = latLng;
	this.content = content;
	this.user = screen_name;
	this.timestamp = "12:00";
}
function startMap()
{
	var mapOptions = {
		zoom: 18,
		//maxZoom: 18,
		minZoom: 10,
        disableDefaultUI:true,
		center: new google.maps.LatLng(LAT,LNG)
	};
	map = new google.maps.Map(document.getElementById("event_map"),mapOptions);
    google.maps.event.trigger(map, "resize");
    
    // bounds of the desired area
    var allowedBounds = new google.maps.LatLngBounds(
         new google.maps.LatLng(48.99824008113872, -101.35986328125),
         new google.maps.LatLng(59.987997631212224, -88.39599609375)
    );
    var lastCenter = map.getCenter();

    google.maps.event.addListener(map, 'center_changed', function() {
    if (allowedBounds.contains(map.getCenter())) {
        // still within valid bounds, so save the last valid position
        lastCenter = map.getCenter();
        return;
    }
    map.panTo(lastCenter);
    });
}

function setDisplay()
{
	// Hide form
	document.getElementById("event_form").style.display = "none";
}
function createMarkerOnMap(marker)
{
	// create google map marker
    var latlng = new google.maps.LatLng(marker.event_lat, marker.event_long);
   	var contentString = '<div id = "content">'+
       marker.event_content+
       '</div>';

	map_marker = new google.maps.Marker({
		position: latlng,
		map: map,
        icon: EVENT_ADDRESS + "img/" + marker.user_avatar
	});
    google.maps.event.addListener(map_marker, 'click', function(e)
                                  {
                                      map.setCenter(e.latLng);
                                  });
    map_marker.infoWindow = new google.maps.InfoWindow({
      content: contentString
  	});
    return map_marker;
}

function addMarkerToList(index,marker)
{
	var list_div = document.getElementById("event_list");
	var temp_div = document.createElement("div");
	temp_div.setAttribute("class","list_marker");
	temp_div.setAttribute("marker",index);
	var temp_content = "";

	if(marker.event_content.length>LIST_TABLE_CONTENT_LENGTH)
	{
		temp_content = marker.event_content.substring(0,LIST_TABLE_CONTENT_LENGTH);
	}
	else
	{
		temp_content = marker.event_content;
	}
    
    //This code is to be changed to be for user avatar
    var temp_p_img = document.createElement("img");
    temp_p_img.setAttribute("src",EVENT_ADDRESS + "img/" + marker.user_avatar);
    temp_p_img.setAttribute("alt","standard");
    temp_div.appendChild(temp_p_img);
    
	var temp_p_content = document.createElement("div");
    temp_p_content.setAttribute("id","content");
	temp_p_content.textContent = temp_content;
	temp_div.appendChild(temp_p_content);

	var temp_p_time = document.createElement("div");
    temp_p_time.setAttribute("id","time");
	temp_p_time.textContent = marker.event_created_at;
	temp_div.appendChild(temp_p_time);

    var newContentString = '<div id="content">'+
        '<h1>'+marker.event_content+'</h1>'+
        '</div>';
    
	list_div.appendChild(temp_div);
	return temp_div;

}

function postEventFeeds(post_string)
{
	eventsHttp = new XMLHttpRequest();
	
	eventsHttp.onreadystatechange = function(){
		
		if(eventsHttp.readyState == 4 && eventsHttp.status == 200)
		{
			markerArray = eval(eventsHttp.responseText);
			document.getElementById("event_list").innerHTML = "";

			// show saved markers on the map
			for(var i=0;i<markerArray.length;i++)
			{
				var map_marker = createMarkerOnMap(markerArray[i]);
				event_array[i] = map_marker;
				var temp_div = addMarkerToList(i, markerArray[i]);
				
//				var latLng = new google.maps.LatLng(parseFloat(markerArray[i].event_lat),parseFloat(markerArray[i].event_long));

			}
		}
	}
	eventsHttp.open("GET", EVENT_ADDRESS + post_string, true);
	eventsHttp.send();
}
function strip_special(data_string)
{
    return escape(data_string);
}
function submitForm(latLng)
{
	if((document.getElementById("event_form_content").value.length < 1) || (document.getElementById("event_form_content").value == null))
	{
		// Validation error

	}
	else
	{
//		var map_marker = createMarkerOnMap(latLng);
		// create new event marker and push to array
		var temp_marker = new event_marker(latLng,strip_special(document.getElementById("event_form_content").value),"Me")

		// post to server
//alert(latLng.lat);
		var post_string = "posts.php?lat="+latLng.k + "&long=" + latLng.A + "&content=" + temp_marker.content + "&user_id=" + user_id;
//console.log(post_string);
		postEventFeeds(post_string);

//		markerArray.push(temp_marker);
		// dump array to storage
		//localStorage.setItem("markerArray", JSON.stringify(markerArray));

		document.getElementById("event_form").style.display = "none";
		document.getElementById("event_list").style.display = "block";
        document.getElementById("form_footer").style.display = "block";
		addMarkerListener();
	}
	document.getElementById("event_form_submit").removeEventListener("click",submit_handler,false);
}

function setMarker(event)
{
//alert(event.latLng);
	removeMarkerListener();
	// show form
	document.getElementById("event_list").style.display = "none";
	document.getElementById("event_form").style.display = "block";
    document.getElementById("form_footer").style.display = "none";
	document.getElementById("event_form_content").value = "";
	document.getElementById("event_form_content").focus();
	submit_handler = function(){submitForm(event.latLng);}
	document.getElementById("event_form_submit").addEventListener("click",submit_handler,false);
    document.getElementById("event_form_cancel").addEventListener("click",cancel_form,false);
	

}
function addMarkerListener()
{
    //alert(startMarkerListener);
	if(startMarkerListener == null)
	{
		startMarkerListener = google.maps.event.addListener(map, 'click', function(e){setMarker(e);});
        
	}
	
}
function removeMarkerListener()
{
	google.maps.event.removeListener(startMarkerListener);
	startMarkerListener = null;
}
function list_listener(e)
{
	if(e.target.parentNode.getAttribute('marker'))
	{
		var marker = event_array[e.target.parentNode.getAttribute("marker")];
		map.setCenter(marker.position);
		marker.infoWindow.open(marker.map,marker);
	}
}
function events_load()
{

	startMap();
	setDisplay();
	postEventFeeds("posts.php?start");
    startMarkerListener = null;
    document.getElementById("event_list").addEventListener("click",list_listener, false);
	addMarkerListener();
}
function cancel_form()
{
    document.getElementById("event_form").style.display = "none";
    document.getElementById("event_list").style.display = "block";
    document.getElementById("form_footer").style.display = "block";
    addMarkerListener();
    
}
