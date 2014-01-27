function updateScreen()
{
	document.getElementById("device_name").textContent = window.device_name;
	document.getElementById("screen_name").textContent = window.screen_name;
}
document.addEventListener("DONContentLoaded",updateScreen, false);