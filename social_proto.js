/**
 *		Social Feed 
 *
 *
 *		Link statements:
 *
 *				<link rel="stylesheet" type="text/css" href="social_proto.css" />
 *				<script type="text/javascript" src="social_proto.js"></script>
 */

/*		Global variables	*/

var social_feed;

/*		Functions			*/

function getSocialFeeds()
{
	postsHttp = new XMLHttpRequest();
	
	postsHttp.onreadystatechange = function(){
		
		if(postsHttp.readyState == 4 && postsHttp.status == 200)
		{
			social_feed = eval(postsHttp.responseText);
			
			/*		parse json to Social 		*/
			var main = document.getElementById("official");
			for(var i=0;i<social_feed.length;i++)
			{
				var div = document.createElement("div");
				if(i==0)
				{
					div.setAttribute("class","post first");
				}
				else if(i==(social_feed.length-1))
				{
					div.setAttribute("class","post last");
				}
				else
				{
					div.setAttribute("class","post");
				}
				var image = document.createElement("img");
                if(social_feed[i].post_type == "Twitter")
                {
                    image.setAttribute("src", "img/Twitter_logo_blue_48_48.png");
                }
				else if(social_feed[i].post_type == "Facebook")
                {
                    image.setAttribute("src", "img/Facebook_logo_blue_48_48.png");
                }
				div.appendChild(image);
				var first_line = document.createElement("p");
				var first_line_span = document.createElement("b");
				
				first_line_span.textContent = "Red River College";
				first_line.appendChild(first_line_span);
                if(social_feed[i].post_type == "Twitter")
                {
				    var first_line_text = document.createTextNode("@RRC");
				    first_line.appendChild(first_line_text);
                }
				div.appendChild(first_line);
				var second_line = document.createElement("p");

				if(social_feed[i].post_content.length > 139)
				{
					var l = 139;
					var search_string = social_feed[i].post_content.substr(0,139);
					while(search_string.indexOf(" ",l) == -1 || l < 70)
					{
						l--;
					}
					if(l < 70)
					{
						span_text = search_string;
						l = 139;
					}
					else
					{
						span_text = social_feed[i].post_content.substr(0,l);
					}
					var temp_span_trunc = document.createElement("span");
					var temp_span_trigger = document.createElement("span");
					temp_span_trigger.textContent = "More..";
					temp_span_trunc.appendChild(temp_span_trigger);
					temp_span_trunc.innerHTML = span_text + temp_span_trunc.innerHTML;

					var temp_span = document.createElement("span");
					var temp_span_trigger_2 = document.createElement("span");
					temp_span_trigger_2.textContent = "Less..";

					temp_span.appendChild(temp_span_trigger_2);
					temp_span.innerHTML = social_feed[i].post_content + temp_span.innerHTML;

					second_line.appendChild(temp_span_trunc);
					second_line.appendChild(temp_span);
					
//					console.log(temp_span_trunc.getElementsByTagName("span")[0].innerHTML);
					temp_span_trunc.getElementsByTagName("span")[0].addEventListener("click",function(e){
						e.target.parentNode.style.display = "none";
						e.target.parentNode.nextSibling.style.display = "block";
					});
					temp_span.getElementsByTagName("span")[0].addEventListener("click",function(e){
						e.target.parentNode.style.display = "none";
						e.target.parentNode.previousSibling.style.display = "block";
					});
				}
				else
				{
					second_line.textContent = social_feed[i].post_content;
				}
				
				div.appendChild(second_line);
				main.appendChild(div);
				/*
						name @screen_name time
						text
				*/
			}
			
		}
	}
	postsHttp.open("GET", "https://www.gristlebone.com/School/User_2_Server/social.php", true);
	postsHttp.send();
}

//function setDisplaySize() {
//    document.getElementById("w").innerHTML = window.outerWidth;
//    document.getElementById("h").innerHTML = window.outerHeight;
//}
