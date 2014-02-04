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
				image.setAttribute("src", "img/Twitter_logo_blue_48_48.png");
				div.appendChild(image);
				var first_line = document.createElement("p");
				var first_line_span = document.createElement("b");
				
				first_line_span.textContent = social_feed[i].user.name;
				first_line.appendChild(first_line_span);
				var first_line_text = document.createTextNode(" @" + social_feed[i].user.screen_name);
				first_line.appendChild(first_line_text);
				div.appendChild(first_line);
				var second_line = document.createElement("p");
				second_line.textContent = social_feed[i].text;
				div.appendChild(second_line);
				main.appendChild(div);
				/*
						name @screen_name time
						text
				*/
			}
			
		}
	}
	postsHttp.open("GET", "social_feed.json", true);
	postsHttp.send();
}

function setDisplaySize() {
    document.getElementById("w").innerHTML = window.outerWidth;
    document.getElementById("h").innerHTML = window.outerHeight;
}
