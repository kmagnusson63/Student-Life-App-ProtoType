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
//    initialize_refresh();
=======

    initialize_refresh();
>>>>>>> 681308f876f0877f8e6a14ac92feae683c5ae66a
    
	// load Social feeds
	getSocialFeeds();

	// Events script load event
	events_load();

	// Job Central script load
	jobcentral_load();
    
	// load Device Settings
<<<<<<< HEAD
	getSettingsFromStorage();
	addProfileListeners();
    initialize_refresh();
=======
	//getSettingsFromStorage();
	//addProfileListeners();

}

function testing_display(string)
{
	document.getElementById("testing").innerHTML = document.getElementById("testing").innerHTML + string + "\n";
>>>>>>> 681308f876f0877f8e6a14ac92feae683c5ae66a
}