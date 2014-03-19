var file_host = "E:/SkyDrive/School/IndustryProject/www/GitHub/Student-Life-App-ProtoType/img/";
function removeStorage()
{
	document.getElementById('remove').addEventListener('click',function(){
		intel.xdk.cache.removeCookie('user_id');
	},false);
}

function startPage()
{
//	document.getElementById("device_id_td").textContent = window.device_id;
	document.getElementById("screen_name").value = window.screen_name;
}

function updateScreen()
{
	document.getElementById("user_id").textContent = window.user_id;
	document.getElementById("screen_name").value = window.screen_name;
//	document.getElementById("avatar").value = file_host + window.avatar;
//	document.getElementsByTagName("body")[0].style = "height:" + window.innerHeight + " !important";
}

/*
        
        intel.xdk.file.uploadToServer(localURL, uploadURL, folderName, mimeType, uploadProgressCallback);
*/
function upload_file()
{
    
}
/*
		intel.xdk.cache.setCookie(name,value,daysTillExpiry);
*/
function getSettingsFromStorage()
{
	//
	if(!(intel.xdk.cache.getCookie("user_id")))
	{
        alert('new install');
		// NEW install
		// send default info to server and setup account
		setup_string = "https://www.gristlebone.com/School/User_2_Server/startup.php";
		$.ajax({
			url: setup_string,
			type: 'GET',
			datatype: 'json',
			async: false,
			success: function(data){
				window.more_data = eval("("+data+")");
				// window.new_data = data;
				// console.log(more_data);
				// console.log(new_data);
				// alert();

				intel.xdk.cache.setCookie("user_id",more_data['LAST_INSERT_ID()'],-1);
			}
		});
		
		intel.xdk.cache.setCookie("screen_name","Bob");
		intel.xdk.cache.setCookie("avatar","/img/user-default.png");
	}
	window.user_id = intel.xdk.cache.getCookie("user_id");
	window.screen_name = intel.xdk.cache.getCookie("screen_name");
	window.avatar = intel.xdk.cache.getCookie("avatar");
	updateScreen();
	removeStorage();
}