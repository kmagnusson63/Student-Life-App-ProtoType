var map;
const LAT = 49.900412;
const LNG = -97.141117;
const EXCHANGE_DISTRICT_LAT = 49.900313;
const EXCHANGE_DISTRICT_LNG = -97.141131;
const NOTRE_DAME_LAT = 49.919397;
const NOTRE_DAME_LNG = -97.210831;
const LTC_LAT = 49.888905;
const LTC_LNG = -97.134612;
const STEINBACH_LAT = 49.532227;
const STEINBACH_LNG = -96.672994;
const PORTAGE_LAT = 49.971712;
const PORTAGE_LNG = -98.282310;
const INTERLAKE_LAT = 50.150190;
const INTERLAKE_LNG = -96.884432;
const WINKLER_LAT = 49.186350;
const WINKLER_LNG = -97.939159;
const EVENTS_MENU_USER_LAT = 55.860870;
const EVENTS_MENU_USER_LNG = -97.503113;
var exchangeDistrictLatLng = new google.maps.LatLng(EXCHANGE_DISTRICT_LAT,EXCHANGE_DISTRICT_LNG);
var notreDameLatLng = new google.maps.LatLng(NOTRE_DAME_LAT,NOTRE_DAME_LNG);
var languageCentreLatLng = new google.maps.LatLng(LTC_LAT,LTC_LNG);
var steinbachLatLng = new google.maps.LatLng(STEINBACH_LAT,STEINBACH_LNG);
var portageLatLng = new google.maps.LatLng(PORTAGE_LAT,PORTAGE_LNG);
var interlakeLatLng = new google.maps.LatLng(INTERLAKE_LAT,INTERLAKE_LNG);
var winklerLatLng = new google.maps.LatLng(WINKLER_LAT,WINKLER_LNG);
var events_menu_userLatLng = new google.maps.LatLng(EVENTS_MENU_USER_LAT,EVENTS_MENU_USER_LNG);
var multipleCampusLatLng = new google.maps.LatLng(49.814711, -97.399781);
var defaultLatLng = new google.maps.LatLng(49.894313,-97.140209);
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
var filterList_array = new Array();
var errorMessage;
var previousInfo = null;
var circle = new google.maps.Circle();
var campusesArray = new Array();
var campusArea = 500;

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
//		minZoom: 10,
        disableDefaultUI:true,
        disableDoubleClickZoom: true,
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
    document.getElementById("event_list_rrc").style.display = "block";
}
function createMarkerOnMap(marker)
{
	// create google map marker
    var latlng = new google.maps.LatLng(marker.event_lat, marker.event_long);
   	var contentString = '<div id = "info_content">'+
      '<h3>'+ marker.event_content + '</h3>'+
      '<p>Posted By: '+ marker.event_user_screen_name +'</p>' +
       '</div>';

    map_marker = new google.maps.Marker({
		position: latlng,
		map: map,
        icon: EVENT_ADDRESS + "img/" + "pushpin.png"
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
    var list_div_rrc = document.getElementById("event_list_rrc");
	var temp_div = document.createElement("div");
	temp_div.setAttribute("class","list_marker" + " " + marker.event_user_screen_name);
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
    temp_p_img.setAttribute("src",EVENT_ADDRESS + "images/" + marker.event_user_avatar);
    temp_p_img.setAttribute("alt","standard");
    temp_div.appendChild(temp_p_img);
    
	var temp_p_content = document.createElement("div");
    temp_p_content.setAttribute("id","list_content");
	temp_p_content.textContent = temp_content;
	temp_div.appendChild(temp_p_content);

	var temp_p_time = document.createElement("div");
    temp_p_time.setAttribute("id","time");
   
    var time = new Date(marker.event_created_at);
    var month = time.getMonth();
    var monthName = convertToText(month);
    var day = time.getDate();
    
	temp_p_time.textContent = "Posted by " + marker.event_user_screen_name + " on " + monthName + " " + day;
	temp_div.appendChild(temp_p_time);

    if(marker.event_user_admin == 1)
    {
        list_div_rrc.appendChild(temp_div)
    }
    else
    {
	   list_div.appendChild(temp_div);
    }
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
            document.getElementById("event_list_rrc").innerHTML = "";

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
function submitForm(e,marker_latLng)
{
    var latLng = marker_latLng;
    //alert(latLng);
    var form_content = document.getElementById("event_form_content").value;
    var eventParent = e.target.parentNode.parentNode.parentNode.parentNode.parentNode.id;
    var errors = validateForm(form_content,eventParent);
	if(errors)
	{
		// Validation error
        cancel_form();
        displayError(errorMessage,eventParent);
	}
	else
	{
        //var map_marker = createMarkerOnMap(latLng);
		// create new event marker and push to array
		var temp_marker = new event_marker(latLng,strip_special(document.getElementById("event_form_content").value),"Me")

		// post to server
//alert(latLng.lat);
		var post_string = "posts.php?lat="+latLng.k + "&long=" + latLng.A + "&content=" + temp_marker.content + "&user_id=" + intel.xdk.cache.getCookie('user_id');
//console.log(post_string);
		postEventFeeds(post_string);

//		markerArray.push(temp_marker);
		// dump array to storage
		//localStorage.setItem("markerArray", JSON.stringify(markerArray));

		document.getElementById("event_form").style.display = "none";
        document.getElementById("event_list_rrc").style.display = "block";
		document.getElementById("event_list").style.display = "block";
        document.getElementById("form_footer").style.display = "block";
		addMarkerListener();
	}
	document.getElementById("event_form_submit").removeEventListener("click",submit_handler,false);
}
   
function setMarker(event)
{
    var marker_latLng = event.latLng
	removeMarkerListener();
	// show form
	document.getElementById("event_list").style.display = "none";
    document.getElementById("event_list_rrc").style.display = "none";
	document.getElementById("event_form").style.display = "block";
    document.getElementById("form_footer").style.display = "none";
	document.getElementById("event_form_content").value = "";
	document.getElementById("event_form_content").focus();
	submit_handler = function(e){submitForm(e,marker_latLng);}
	document.getElementById("event_form_submit").addEventListener("click",submit_handler,false);
    document.getElementById("event_form_cancel").addEventListener("click",cancel_form,false);
//    document.getElementById("event_list").style.top = "70%";
//    document.getElementById("event_form").style.top = "70%";
//    document.getElementById("event_list_rrc").style.top = "70%";
//    document.getElementById("events_wrapper").style.height = "70%";
//    document.getElementById("event_list").style.height = "30%";
//    document.getElementById("event_form").style.height = "30%";
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
        map.setZoom(20);
//        map.setZoom(15);
        if(previousInfo == null)
        {
            
        }
        else
        {
            previousInfo.infoWindow.close();
        }
    
        marker.infoWindow.open(marker.map,marker);
        previousInfo = marker;
	}
}
function events_load()
{

	startMap();
	setDisplay();
	postEventFeeds("posts.php?start");
    startMarkerListener = null;
    document.getElementById("event_list").addEventListener("click",list_listener, false);
    document.getElementById("event_list_rrc").addEventListener("click",list_listener, false);
	addMarkerListener();
    addMenuBarListeners();
    focusMapEvents();
    $("#events").on('pageshow',function() {
        google.maps.event.trigger(map, 'resize');                      
    });
}
function cancel_form()
{
    document.getElementById("event_form").style.display = "none";
    document.getElementById("event_list").style.display = "block";
    document.getElementById("event_list_rrc").style.display = "block";
    document.getElementById("form_footer").style.display = "block";
    addMarkerListener();
    
}

function displayError(errorMessage,page)
{
    var errorDiv = document.getElementById(page + "_error");
        errorDiv.innerHTML = "<p>" + errorMessage + "</p>";
        $(errorDiv).show().fadeOut(3000);      
}

function validateForm(validateMessage,page)
{
    var error = false;
    
    if((validateMessage.length < 1) || (validateMessage == null))
        {
            // Validation error
            errorMessage = "Error: You must enter some content.";
            error = true;
            return error;
        }
    if(page == "events")
    {
//        else
//        {
            var regex = new RegExp( /^[a-zA-Z0-9_ !@#\$%\^\&*\)\(+=._-]+$/g)
            if (!regex.test(validateMessage))
            {
                errorMessage = "Error: Content can't include special characters.";
                error = true;
                return error;
            }
//        }
    }
    if(page == "settings")
    {
        var regex = new RegExp( /^[a-zA-Z0-9_!@#\$%\^\&*\)\(+=._-]+$/g)
            if (!regex.test(validateMessage))
            {
                errorMessage = "Error: Content can't include special characters.";
                error = true;
            }
        if(validateMessage.charAt(0) == "_")
        {
            errorMessage = "Error: Content can't include special characters.";
            error = true;
        }
    }
    return error;
}

/* Function Name: addMenuBarListeners
*  Purpose: The purpose of this function is to add the event listeners.
*  Parameters: None
*  Returns: None
*/
function addMenuBarListeners()
{
    
    var notreDameEle = document.getElementById("notreDame");
    var languageTrainingEle = document.getElementById("languageTraining");
    var exchangeDistrictEle = document.getElementById("exchangeDistrict");
    var steinbachEle = document.getElementById("steinbach");
    var portageEle = document.getElementById("portage");
    var interlakeEle = document.getElementById("interlake");
    var winklerEle = document.getElementById("winkler");
    var eventsMenuUserEle = document.getElementById("eventsMenuUser");
    
    eventsMenuUserEle.setAttribute("class","selectedCampus");
    campusesArray.push(eventsMenuUser.getAttribute("id"));
    
    var clickCampusHandler = function(e){focusOnCampus(e);}
    
    notreDameEle.addEventListener("click",clickCampusHandler,false);
    languageTrainingEle.addEventListener("click",clickCampusHandler,false);
    exchangeDistrictEle.addEventListener("click",clickCampusHandler,false);
    steinbachEle.addEventListener("click",clickCampusHandler,false);
    portageEle.addEventListener("click",clickCampusHandler,false);
    interlakeEle.addEventListener("click",clickCampusHandler,false);
    winklerEle.addEventListener("click",clickCampusHandler,false);
    eventsMenuUserEle.addEventListener("click",clickCampusHandler,false);
    
}

/* Function Name: focusOnCampus
*  Purpose: The purpose of this is to center the map on to certain spots depending on what the select
*  Parameters: This function takes in an event.
*  Returns: None.
*/
function focusOnCampus(e)
{
//    campusCircle.setMap(null);
//var_dump(e.target.id);
    var campusSelected = e.target.id;
//    var campusCoord = campusSelected + 'LatLng';
//    alert(campusCoord);
//    map.setCenter(campusCoord);
//    map.setZoom(18);
//    var circleOptions = {
//      strokeColor: '#C81F45',
//      strokeOpacity: 0.8,
//      strokeWeight: 2,
//      fillColor: '#C81F45',
//      fillOpacity: 0.35,
//      map: map,
//      center: notreDameLatLng,
//      radius: 40
//    };
//    campusCircle = new google.maps.Circle(circleOptions);
//    alert(campusCircle.getBounds());
    var campusEle = document.getElementById(campusSelected);
    
 //   alert(campusEle.getAttribute("class"));
    if(campusEle.getAttribute("class") == "selectedCampus")
    {
        var removeAttribute = campusEle.setAttribute("class",null);
        var elementToRemove = campusesArray.indexOf(e.target.id);
        var removedElement = campusesArray.splice(elementToRemove,1);
        if (campusesArray.length == 0)
        {
            
            document.getElementById("eventsMenuUser").setAttribute("class","selectedCampus");
            campusesArray.push(document.getElementById("eventsMenuUser").getAttribute("id"));
        }
    }
    else
    {
        var selectedAttribute = campusEle.setAttribute("class","selectedCampus");
        campusesArray.push(campusSelected);
//        alert(campusesArray);
    }
    
//    if(campusesArray.length == 1)
//    {
    for(var i = 0;i<campusesArray.length;i++)
    {
        campusArea = 500;
        switch(campusesArray[i])
        {
            case "notreDame":
                map.setCenter(notreDameLatLng);
                map.setZoom(18);
                filterEventList(notreDameLatLng);
            break;
            case "languageTraining":
                map.setCenter(languageCentreLatLng);
                map.setZoom(18);
                filterEventList(languageCentreLatLng);
            break;
            case "exchangeDistrict":
                map.setCenter(exchangeDistrictLatLng);
                map.setZoom(18);
                filterEventList(exchangeDistrictLatLng);
            break;
            case "steinbach":
                map.setCenter(steinbachLatLng);
                map.setZoom(18);
                filterEventList(steinbachLatLng);
            break;
            case "portage":
                map.setCenter(portageLatLng);
                map.setZoom(18);
                filterEventList(portageLatLng);
            break;
            case "interlake":
                map.setCenter(interlakeLatLng);
                map.setZoom(18);
                filterEventList(interlakeLatLng);
            break;
            case "winkler":
                map.setCenter(winklerLatLng);
                map.setZoom(18);
                filterEventList(winklerLatLng);
            break; 
            default:
                map.setCenter(defaultLatLng);
                map.setZoom(5);
                postEventFeeds("posts.php?start");
//                campusArea = 90000;
//                filterEventList(defaultLatLng);
        }
    }
//    }
    if(campusesArray.length > 1)
    {
        map.setCenter(multipleCampusLatLng);
        map.setZoom(8);
    }   
    
    var listItems = document.getElementsByClassName("list_marker");
    
    for(var l = 0;l<listItems.length;l++)
    {
        if(listItems[l].getAttribute("id") == "filter")
        {
           filterList_array.push(listItems[l]);
           listItems[l].style.display = "block";
           listItems[l].setAttribute("id",null);
        }
        else
        {
            listItems[l].style.display = "none";
        }
    }
    filterList_array[filterList_array.length-1].style.marginBottom = "43px";
    filterList_array = [];
}

function filterEventList(mapLatLng)
{

    var circle = new google.maps.Circle({
        map: map,
        radius:campusArea,
        fillColor: '#fff',
        fillOpacity: 0,
        strokeColor: '#313131',
        strokeOpacity: 0,
        strokeWeight: 0,
        center: mapLatLng
    });
        var checkBounds = circle.getBounds();
        var newListItems = document.getElementsByClassName("list_marker");
        for(var k = 0;k<newListItems.length;k++)
        {
            var markerLatLng = event_array[k].position;
            if(checkBounds.contains(markerLatLng))
            {
                newListItems[k].setAttribute("id","filter");
            }
        }
        circle.setMap(null);
}

function convertToText(monthNumber)
{
    var monthText;
    switch(monthNumber)
    {
            case 0:
            monthText = "January";
            break;
            
            case 1:
            monthText = "February";
            break;
            
            case 2:
            monthText = "March";
            break;
            
            case 3:
            monthText = "April";
            break;
            
            case 4:
            monthText = "May";
            break;
            
            case 5:
            monthText = "June";
            break;
            
            case 6:
            monthText = "July";
            break;
            
            case 7:
            monthText = "August";
            break;
            
            case 8:
            monthText = "September";
            break;
            
            case 9:
            monthText = "October";
            break;
            
            case 10:
            monthText = "November";
            break;
            
            case 11:
            monthText = "December";
            break;
    }
    
    return monthText;
}

function focusMapEvents()
{
     $("#event_map").click(function()
                          {
                                document.getElementById("event_list").style.top = "60%";
                                document.getElementById("event_list_rrc").style.top = "60%";
                                document.getElementById("events_wrapper").style.height = "75%";
                                document.getElementById("event_form").style.height = "40%";
                                document.getElementById("event_form").style.top = "60%";
                                document.getElementById("event_list").style.height = "40%";
                          });
     $("#event_list").click(function()
                          {
                                document.getElementById("event_list").style.top = "40%";
                                document.getElementById("event_list_rrc").style.top = "40%";
                                document.getElementById("events_wrapper").style.height = "45%";
                                document.getElementById("event_list").style.height = "60%";
                          });
}