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
    initialize_refresh();
	// load Device Settings
	getSettingsFromStorage();

	// load Social feeds
	getSocialFeeds();

	// Events script load event
	events_load();

	// Job Central script load
	jobcentral_load();
}