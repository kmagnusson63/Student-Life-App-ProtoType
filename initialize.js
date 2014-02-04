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
	getSettingsFromStorage();

	// load Social feeds
	getSocialFeeds();

	// Events script load event
	events_load();

	// Job Central script load
	jobcentral_load();
}


document.addEventListener("DOMContentLoaded",initialize, false);