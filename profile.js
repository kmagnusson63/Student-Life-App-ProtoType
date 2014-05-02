var server_host = "http://www.gristlebone.com/School/User_2_Server/";

function app_startup()
{
	// Get settings from server
	if(!intel.xdk.cache.getCookie('user_id'))
	{
		// Initialize new user
		id = "new";
	}
	else
	{
		id = intel.xdk.cache.getCookie('user_id');
	}
	ajax_url = server_host + "startup.php";
	// Use ajax to get data from server
	$.ajax({
		type: "POST",
		url: ajax_url,
		dataType: 'json',
		data: {
			user_id: id
		},
		success: function(data){
var_dump(data);
			updateUserCache(data);
		},
		fail: function(){
			// send error message
			alert("error receiving user info");
		}

	});

	// create listener for screen name change
	$('#profile_screen_name').click(function(){
			$('#profile_screen_name').attr('readonly',false).focusout(function(){$('#profile_screen_name').attr('readonly',true)});

	});

	// Create save routine
	$("#save").click(function(){saveUserProfile();});
}

function saveUserProfile()
{
	// IF screen name displayed != screen name in cache then update database
	if(!(intel.xdk.cache.getCookie('screen_name') == $('#profile_screen_name').val()))
	{
testing_display("In");
		//  build data to send
		data = "{ action: 'update', id: '" + intel.xdk.cache.getCookie('user_id') + "', screen_name: '" + $('#profile_screen_name').val() + "'}";
		updateDB(data);
	}
}

/*
	Sends ajax call to update database
*/
function updateDB(update_data)
{
//var_dump(update_data);
	$.ajax({
		type: "POST",
		url: ajax_url,
		dataType: 'json',
		data: {
			action: 'update',
			user_id: intel.xdk.cache.getCookie('user_id'),
			screen_name: $('#profile_screen_name').val()
		},
		success: function(data){
testing_display("Worked");
		},
		fail: function(){
			// send error message
			alert("error receiving user info");
		}
	});
}
/*
		Updates user info received from database server into cache

		receives json oject of user info
*/
function updateUserCache(data)
{

	try
	{
		intel.xdk.cache.setCookie('user_id', data['user_id'], -1);
		intel.xdk.cache.setCookie('screen_name', data['user_screen_name'], -1);
		intel.xdk.cache.setCookie('avatar',data['user_avatar'], -1);
	    intel.xdk.cache.setCookie('avatar_image',data['user_image'],-1);

	    // Update user display
	    $('#profile_screen_name').attr("value",intel.xdk.cache.getCookie('screen_name'));
	    $('#profile_avatar').attr('src',server_host + "images/" + intel.xdk.cache.getCookie('avatar'));
	}
	catch(err)
	{
		alert("Error: " + err.message);
	}
}
/*
		Debugging display
*/
function testing_display(string)
{
	document.getElementById("testing").innerHTML = document.getElementById("testing").innerHTML + string + "<br>";
}

/*
	Method to get file objects from input after change has been caught
*/
function getFileToSend(evt)
{
	// Put files array into variable
	var files = evt.target.files;
var_dump(files);

	// Get 1st file
	var file = files[0];

	// Create new filereader for file object
	var fileRead = new FileReader();

	// Routine for file read
	fileRead.onload = function(e){
		// Store read file into variable
		var file_image_string = fileRead.result;
		$('#profile_avatar').attr('src',file_image_string);
		
		// Save image to temporary folder
		saveTempImageFile(file_image_string, file);

		upload_url = "http://www.gristlebone.com/School/User_2_Server/upload.php";
        $.ajax({ 
            type: "POST", 
            url: upload_url,
            dataType: 'text',
            data: {
            	user_id: intel.xdk.cache.getCookie('user_id'),
            	screen_name: intel.xdk.cache.getCookie('screen_name'),
                img_name : file.name,
                base64data : file_image_string
            },
            success: function(data){
            	data = JSON.parse(data);
            	updateUserCache(data);
            },
            fail: function(){
            	alert("File upload error");
            }
        });

	};
	fileRead.readAsDataURL(file);
}

/*
	Commands to be run only once during lifetime
*/
function run_once()
{

	// Listener for image selection
	$('#profile_avatar').click(function(){

		$('#avatar_browse').click();
	});

	// Listen for change in file selection
	$('#avatar_browse').change(function(evt){
		getFileToSend(evt);
	});
}