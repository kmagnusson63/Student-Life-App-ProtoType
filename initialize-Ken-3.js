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
	//startLog();
    initialize_refresh();
    
	// load Social feeds
	getSocialFeeds();

	// Events script load event
	events_load();

	// Job Central script load
	//jobcentral_load();
    
	// load Device Settings
	getSettingsFromStorage();
	addProfileListeners();

}