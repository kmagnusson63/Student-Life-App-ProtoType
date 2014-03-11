function removeStorage()
{
	localStorage.removeItem("device_id");
	localStorage.removeItem("screen_name");
    //localStorage.removeItem("password");
    //localStorage.removeItem("avatar");
}

function startPage()
{
	document.getElementById("device_id_td").textContent = window.device_id;
	document.getElementById("screen_name_td").textContent = window.screen_name;
    //document.getElementById("password_td").textContent = window.password;
    //document.getElementById("avatar_td").textContent = window.avatar;
}

function updateScreen()
{
	document.getElementById("device_id_td").textContent = window.device_id;
	document.getElementById("screen_name_td").textContent = window.screen_name;
    //document.getElementById("password_td").textContent = window.password;
    //document.getElementById("avatar_td").textContent = window.avatar;
//	document.getElementsByTagName("body")[0].style = "height:" + window.innerHeight + " !important";
}

function getSettingsFromStorage()
{
	if(!(localStorage.getItem("device_id")))
	{
		localStorage.setItem("device_id","1234567890");
		localStorage.setItem("screen_name","Bob");
        //localStorage.setItem("password","Heatwave1");
        //localStorage.setItem("avatar","pic.jpg");
	}
	window.device_id = localStorage.getItem("device_id");
	window.screen_name = localStorage.getItem("screen_name");
    //window.screen_name = localStorage.getItem("password");
    //window.screen_name = localStorage.getItem("avatar");
	updateScreen();
}