var file_host = "E:/SkyDrive/School/IndustryProject/www/GitHub/Student-Life-App-ProtoType/img/";
function removeStorage()
{
	localStorage.removeItem("user_id");
	localStorage.removeItem("screen_name");
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

function getSettingsFromStorage()
{
	//
	if(!(localStorage.getItem("user_id")))
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

				localStorage.setItem("user_id",more_data['LAST_INSERT_ID()']);
			}
		});
		
		localStorage.setItem("screen_name","Bob");
		localStorage.setItem("avatar","/img/user-default.png");
	}
	window.user_id = localStorage.getItem("user_id");
	window.screen_name = localStorage.getItem("screen_name");
	window.avatar = localStorage.getItem("avatar");
	updateScreen();//removeStorage();
}