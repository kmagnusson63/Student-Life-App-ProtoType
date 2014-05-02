/***
 ***
 ***		Initial script to run
 ***
 ***
 ***
 ***
 ***
 ***/

function initialize()
{
    // load Device Settings
    app_startup();
    run_once();
   
	// load Social feeds
	getSocialFeeds();
    menuTriggers();

	// Events script load event
	events_load();

	// Job Central script load
	jobcentral_load();
    
    initialize_refresh();
}
var onDeviceReady=function(){
//hide splash screen
	intel.xdk.device.hideSplashScreen();
	intel.xdk.device.setAutoRotate(true);
	initialize();
};

document.addEventListener("intel.xdk.device.ready",onDeviceReady,false);