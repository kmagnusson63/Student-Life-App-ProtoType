var file_host = "E:/SkyDrive/School/IndustryProject/www/GitHub/Student-Life-App-ProtoType/img/";
//var img_upload_host = "http://www.gristlebone.com/School/User_2_Server";
var img_upload_host = "http://www.gristlebone.com/School/User_2_Server";

var user_id = "";

var screen_name = "";
var avatar = "";
// function removeStorage()
// {
// 	document.getElementById('remove').addEventListener('click',function(){
// 		intel.xdk.cache.removeCookie('user_id');
// 	},false);
// }

function avatarDisplay()
{
	// Get avatar display div
	// var avatar_display_div = document.getElementById("avatar_display");

	// // Create label
	// var temp_avatar_label = document.createElement("label");
	// temp_avatar_label.setAttribute("for","avatar_filename");
	// temp_avatar_label.textContent = "Avatar";

	// // Append avatar label to avatar div
	// avatar_display_div.appendChild(temp_avatar_label);

	// // Create avatar file input display
	// temp_avatar_filename = document.createElement("input");
	// temp_avatar_filename.setAttribute("id","avatar_filename");
	// temp_avatar_filename.setAttribute("name","avatar_filename");
	// temp_avatar_filename.setAttribute("disabled","true");
	// temp_avatar_filename.setAttribute("data-role","none");
	// temp_avatar_filename.value = "user-default.png";

	// // Append avatar input display to avatar div
	// avatar_display_div.appendChild(temp_avatar_filename);

	
}


function updateScreen()
{
	//document.getElementById("user_id").textContent = intel.xdk.cache.getCookie("user_id");
	$("#profile_screen_name").text(intel.xdk.cache.getCookie("screen_name"));
	//document.getElementById("avatar_name").textContent = intel.xdk.cache.getCookie("avatar");
//testing_display(img_upload_host + "/img/" + intel.xdk.cache.getCookie("avatar"));
//	var av_string = img_upload_host + "/img/" + intel.xdk.cache.getCookie("avatar");
    var av_string = intel.xdk.cache.getCookie('avatar_image');
testing_display("av string:::::::<br>\n" + intel.xdk.cache.getCookie('avatar_image'));
	$("#profile_avatar").attr("src", intel.xdk.cache.getCookie('avatar_image'));
	// var avatar = new Image();
	// avatar.onload = function(){
	// }
	// avatar.src = av_string;
	

//	document.getElementsByTagName("body")[0].style = "height:" + window.innerHeight + " !important";
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
function upload_file(pictureURL)
{

    //intel.xdk.file.uploadToServer(pictureURL, img_upload_host, "img", "image/jpeg", "updateUploadProgress");

}
/*
		intel.xdk.cache.setCookie(name,value,daysTillExpiry);
*/
function getSettingsFromStorage()
{
	setup_string = "http://www.gristlebone.com/School/User_2_Server/startup.php";
	//
	if(!(intel.xdk.cache.getCookie('user_id')))
	{
		// NEW install
		// send default info to server and setup account
        profileHttp = new XMLHttpRequest();
	    profileHttp.onreadystatechange = function(){
			testing_display("ReadyState: " + profileHttp.readyState + "      Status: " + profileHttp.status);
			if(profileHttp.readyState == 4 && profileHttp.status == 200)
			{
            	
                window.more_data = eval("("+profileHttp.responseText+")");

                user = more_data['LAST_INSERT_ID()'];

                intel.xdk.cache.setCookie("user_id", user,-1);
                intel.xdk.cache.setCookie("screen_name","Anonymous",-1);
				intel.xdk.cache.setCookie("avatar","img/user-default.png",-1);
	
				updateScreen();
            }
        }
        profileHttp.open("GET", setup_string, true);
		profileHttp.send();
	}
	else
	{
		$.ajax({
			type: "POST",
			url: setup_string,
			dataType: "text",
			data: {
				user_id: intel.xdk.cache.getCookie('user_id')
			},
			success: function(data){
                try{                    
				data = JSON.parse(data);
				updateUserCache(data);
                }
                catch(err)
                {
                    alert(err);   
                }
			},
			fail: function(){
				alert("Error connecting to server.\nPlease restart app.");
			}
		});

//		updateScreen();
	}
	// avatarDisplay();
	// removeStorage();
//	addProfileListeners();
}
function updateUserCache(data)
{
//var_dump(data);
var_dump(data);
	intel.xdk.cache.setCookie('user_id', 4, -1);
	intel.xdk.cache.setCookie('screen_name', data['user_screen_name'], -1);
	intel.xdk.cache.setCookie('avatar',data['user_avatar'], -1);
    intel.xdk.cache.setCookie('avatar_image',data['user_image'],-1);
	updateScreen();
}
function getFile(event)
{
    // if (window.navigator.standalone) {
    //   $("meta[name='apple-mobile-web-app-status-bar-style']").remove();
    // }

	var files = event.target.files;
	//console.log(event);
	//alert(event.target.value);
	var file = files[0];
    var fileReader = new FileReader();
    alert("HERE");
testing_display('URL: ' + URL.createObjectURL(file) + "<br>");
    fileReader.onload = function(e){
     
        var test = fileReader.result;
        $('#profile_avatar').attr('src',test);
        // document.getElementById("img_thumbnail").setAttribute("src",test);
        

testing_display("Size: " + test.length + "<br>");
//var_dump(test);
        
        upload_string = '{ "user_id": "' + intel.xdk.cache.getCookie('user_id') + 
            	', "screen_name": "' + intel.xdk.cache.getCookie('screen_name') +
                ', "img_name": "' + file.name +
                ', "base64data": "' + test + '"}';
        console.log(upload_string);
        
        upload_url = img_upload_host + "/upload.php";
        $.ajax({ 
            type: "POST", 
            url: upload_url,
            dataType: 'text',
            data: {
            	user_id: intel.xdk.cache.getCookie('user_id'),
            	screen_name: intel.xdk.cache.getCookie('screen_name'),
                img_name : file.name,
                base64data : test
            },
            success: function(data){
var_dump(data);
            	data = JSON.parse(data);
            	updateUserCache(data);
            },
            fail: function(){
            	alert("File upload error");
            }
        });
    }
    fileReader.readAsDataURL(file);
    
	testing_display("FileName: " + files[0].name + "<br>");
	testing_display("Path: " + files[0].path + "<br>");

	// console.log(files[0]);

	//document.getElementById("avatar_browse").value = files[0].name;
	

	intel.xdk.cache.setCookie("avatar",files[0].name);
}
// function testing_display(string)
// {
// 	document.getElementById("testing").innerHTML = document.getElementById("testing").innerHTML + string + "<br>";
// }
function addProfileListeners()
{
	document.getElementById('profile_avatar').addEventListener('click',function(e){
testing_display("tapped file select");
					$('#avatar_browse').click();
				},false);
//
	document.getElementById('avatar_browse').addEventListener('change',getFile,false);
	
	// document.addEventListener("intel.xdk.file.upload.busy",uploadBusy);
	// document.addEventListener("intel.xdk.file.upload",uploadComplete);
	// document.addEventListener("intel.xdk.file.upload.cancel",uploadCancelled);

}