/***
 ***
 ***		Initial script to run
 ***
 ***
 ***
 ***
 ***
 ***/

function removeStorage()
{
	localStorage.removeItem("device_id");
	localStorage.removeItem("screen_name");
}

function startPage()
{
	document.getElementById("device_id").textContent = window.device_id;
	document.getElementById("screen_name").textContent = window.screen_name;
}

function initialize()
{
	if(!(localStorage.getItem("device_id")))
	{
		localStorage.setItem("device_id","1234567890");
		localStorage.setItem("screen_name","NULL");
	}
	window.device_id = localStorage.getItem("device_id");
	window.screen_name = localStorage.getItem("screen_name");
	startPage();
	document.getElementById("empty").addEventListener("click",removeStorage,false);
}


document.addEventListener("DOMContentLoaded",initialize, false);