var file_host = "E:/SkyDrive/School/IndustryProject/www/GitHub/Student-Life-App-ProtoType/img/";
<<<<<<< HEAD
var img_upload_host = "http://www.gristlebone.com/School/User_2_Server/upload.php";
=======
var img_upload_host = "http://www.gristlebone.com/School/User_2_Server";
>>>>>>> 9c2b785171035a6c4da74571951573fdf498a90d
var user_id = "";
var screen_name = "";
var avatar = "";
function removeStorage()
{
	document.getElementById('remove').addEventListener('click',function(){
		intel.xdk.cache.removeCookie('user_id');
	},false);
}

function avatarDisplay()
{
	// Get avatar display div
	var avatar_display_div = document.getElementById("avatar_display");

	// Create label
	var temp_avatar_label = document.createElement("label");
	temp_avatar_label.setAttribute("for","avatar_filename");
	temp_avatar_label.textContent = "Avatar";

	// Append avatar label to avatar div
	avatar_display_div.appendChild(temp_avatar_label);

	// Create avatar file input display
	temp_avatar_filename = document.createElement("input");
	temp_avatar_filename.setAttribute("id","avatar_filename");
	temp_avatar_filename.setAttribute("name","avatar_filename");
	temp_avatar_filename.setAttribute("disabled","true");
	temp_avatar_filename.setAttribute("data-role","none");
	temp_avatar_filename.value = "user-default.png";

	// Append avatar input display to avatar div
	avatar_display_div.appendChild(temp_avatar_filename);

	// Create img thumbnail
	var temp_avatar_img = document.createElement("img")
	temp_avatar_img.setAttribute("src","img/user-default.png");
	temp_avatar_img.setAttribute("alt","default");
	temp_avatar_img.setAttribute("id","avatar_thumbnail");

	// Append avatar thumbnail to avatar div
	avatar_display_div.appendChild(temp_avatar_img);
}


function updateScreen()
{
	document.getElementById("user_id").textContent = intel.xdk.cache.getCookie("user_id");
	document.getElementById("screen_name").value = intel.xdk.cache.getCookie("screen_name");
<<<<<<< HEAD

=======
//	document.getElementById("avatar").value = file_host + window.avatar;
//	document.getElementsByTagName("body")[0].style = "height:" + window.innerHeight + " !important";
>>>>>>> 9c2b785171035a6c4da74571951573fdf498a90d
}
function updateUploadProgress(bytesSent,totalBytes)
{
   if(totalBytes>0)
        currentProgress=(bytesSent/totalBytes)*100;
   document.getElementById("progress").innerHTML=currentProgress+"%";
}
function uploadBusy(evt)
{
   alert("Sorry, a file is already being uploaded");
}

function uploadComplete(evt)
{
   if(evt.success==true)
   {
      alert("File "+evt.localURL+" was uploaded");
   }
   else {
      alert("Error uploading file "+evt.message);
   }
}

function uploadCancelled(evt)
{
    alert("File upload was cancelled "+evt.localURL);
} 
/*
        
        intel.xdk.file.uploadToServer(localURL, uploadURL, folderName, mimeType, uploadProgressCallback);
*/
<<<<<<< HEAD
function send_avatar_file(pictureURL,type)
{

	testing_display("sending: " + pictureURL + ":" + type);
 

=======
function upload_file(pictureURL)
{

    intel.xdk.file.uploadToServer(pictureURL, img_upload_host, "img", "image/jpeg", "updateUploadProgress");

>>>>>>> 9c2b785171035a6c4da74571951573fdf498a90d
}
/*
		intel.xdk.cache.setCookie(name,value,daysTillExpiry);
*/
function getSettingsFromStorage()
{
	//
	if(!(intel.xdk.cache.getCookie('user_id')))
	{
        alert('new installation');
		// NEW install
		// send default info to server and setup account
		setup_string = "http://www.gristlebone.com/School/User_2_Server/startup.php";
        profileHttp = new XMLHttpRequest();
	    profileHttp.onreadystatechange = function(){
			testing_display("ReadyState: " + profileHttp.readyState + "      Status: " + profileHttp.status);
			if(profileHttp.readyState == 4 && profileHttp.status == 200)
			{
            	// var data = profileHttp.responseText;
                window.more_data = eval("("+profileHttp.responseText+")");
<<<<<<< HEAD

=======
// console.log(profileHttp.responseText);
// console.log(more_data);
// console.log(more_data['LAST_INSERT_ID()']);
                // window.new_data = data;
                // console.log(more_data);
                // console.log(new_data);
>>>>>>> 9c2b785171035a6c4da74571951573fdf498a90d
                user = more_data['LAST_INSERT_ID()'];
alert("success got new id");
alert("id:" + user);

                intel.xdk.cache.setCookie("user_id", user,-1);
                intel.xdk.cache.setCookie("screen_name","Bob",-1);
				intel.xdk.cache.setCookie("avatar","img/user-default.png",-1);
	
<<<<<<< HEAD

=======
//alert("user id:" +intel.xdk.cache.getCookie('user_id'));
>>>>>>> 9c2b785171035a6c4da74571951573fdf498a90d
				user_id = intel.xdk.cache.getCookie("user_id");
				screen_name = intel.xdk.cache.getCookie("screen_name");

				avatar = intel.xdk.cache.getCookie("avatar");
				updateScreen();
alert(screen_name + " : " + user_id + " uses <br>" + avatar);
            }
        }
        profileHttp.open("GET", setup_string, true);
		profileHttp.send();
<<<<<<< HEAD
	}
	else
	{
		updateScreen();
	}
	avatarDisplay();
	removeStorage();
	

}
function getFile(evt)
{
	var files = evt.target.files;
 
    var result = '';
    var file;
    for (var i = 0; file = files[i]; i++) {
        // if the file is not an image, continue
        if (!file.type.match('image.*')) {
            continue;
        }

        reader = new FileReader();
        reader.onload = (function (tFile) {
            return function (evt) {
                var div = document.createElement('div');
                div.innerHTML = '<img style="width: 90px;" src="' + evt.target.result + '" />';
                document.getElementById('avatar_display').appendChild(div);
            };
        }(file));
        reader.readAsDataURL(file);
    }


	document.getElementById("avatar_filename").value = files[0].name;

=======
	}
	else
	{
		updateScreen();
	}
	avatarDisplay();
	removeStorage();
	addProfileListeners();
}
function getFile(event)
{
	var files = event.target.files;
	//console.log(event);
	//alert(event.target.value);
	//var file = this.files[0];
	testing_display("FileName: " + files[0].name);
	testing_display("Path: " + files[0].path);
	// console.log(files[0]);

	document.getElementById("avatar_filename").value = files[0].name;
	document.getElementById("avatar_thumbnail").setAttribute("src",files[0].path);
>>>>>>> 9c2b785171035a6c4da74571951573fdf498a90d

	intel.xdk.cache.setCookie("avatar",files[0].name);
}
function testing_display(string)
{
	document.getElementById("testing").innerHTML = document.getElementById("testing").innerHTML + string + "<br>";
}
function addProfileListeners()
{
<<<<<<< HEAD


}
=======
	document.getElementById('avatar_thumbnail').addEventListener('click',function(e){
					$('#avatar_browse').click();
				},false);

	document.getElementById('avatar').addEventListener('change',getFile,false);
	
	document.addEventListener("intel.xdk.file.upload.busy",uploadBusy);
	document.addEventListener("intel.xdk.file.upload",uploadComplete);
	document.addEventListener("intel.xdk.file.upload.cancel",uploadCancelled);

}
>>>>>>> 9c2b785171035a6c4da74571951573fdf498a90d
