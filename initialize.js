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
//    initialize_refresh();
    //upload_load();
    
	// load Social feeds
	getSocialFeeds();
    menuTriggers();

	// Events script load event
	events_load();

	// Job Central script load
	jobcentral_load();
    

//	getSettingsFromStorage();
//	addProfileListeners();
    initialize_refresh();
}