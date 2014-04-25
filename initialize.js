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
//    initialize_refresh();
 //   upload_load();
    
	// load Social feeds
	getSocialFeeds();
    
    // Load the unofficial links
    unofficial_load();
    
	// Events script load event
	events_load();

	// Job Central script load
	jobcentral_load();
    
	// load Device Settings
	getSettingsFromStorage();
	//addProfileListeners();
    initialize_refresh();
}