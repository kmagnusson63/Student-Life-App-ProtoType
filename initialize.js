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
<<<<<<< HEAD
	//startLog();
=======
>>>>>>> 9c2b785171035a6c4da74571951573fdf498a90d
    initialize_refresh();
    
	// load Social feeds
	getSocialFeeds();

	// Events script load event
	events_load();

	// Job Central script load
	jobcentral_load();
    
	// load Device Settings
	getSettingsFromStorage();
	addProfileListeners();

}