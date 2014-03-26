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
    
	// load Social feeds
	getSocialFeeds();

	// Events script load event
	events_load();

	// Job Central script load
	jobcentral_load();
    
	// load Device Settings
	//getSettingsFromStorage();
	//addProfileListeners();

}

function testing_display(string)
{
	document.getElementById("testing").innerHTML = document.getElementById("testing").innerHTML + string + "\n";
}