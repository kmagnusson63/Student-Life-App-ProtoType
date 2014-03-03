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
					div.setAttribute("class","twitter first");
				}
				else if(i==(social_feed.length-1))
				{
					div.setAttribute("class","twitter last");
				}
				else
				{
					div.setAttribute("class","twitter");
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
				    var first_line_text = document.createTextNode(" @RRC");
				    first_line.appendChild(first_line_text);
                }
				div.appendChild(first_line);
				var second_line = document.createElement("p");
				second_line.textContent = social_feed[i].post_content;
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

function setDisplaySize() {
    document.getElementById("w").innerHTML = window.outerWidth;
    document.getElementById("h").innerHTML = window.outerHeight;
}
