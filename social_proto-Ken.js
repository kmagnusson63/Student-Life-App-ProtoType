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
                div.setAttribute("class", div.getAttribute("class") + " " + social_feed[i].post_type);
                
                var info_div = document.createElement("div");
                info_div.setAttribute("class","info_line");
                
				var image = document.createElement("img");
                if(social_feed[i].post_type == "Twitter")
                {
                    image.setAttribute("src", "img/Twitter_logo_blue_48_48.png");
                }
				else if(social_feed[i].post_type == "Facebook")
                {
                    image.setAttribute("src", "img/Facebook_logo_blue_48_48.png");
                }
				info_div.appendChild(image);
                
                var screen_name_div = document.createElement("div");
                screen_name_div.setAttribute("class","post_screen_name");
				screen_name_div.textContent = "Red River College";
                
				info_div.appendChild(screen_name_div);
                
                if(social_feed[i].post_type == "Twitter")
                {
				    var user_name_div = document.createElement("div");
                    user_name_div.setAttribute("class","post_user_name");
                    
                    // Get username from feed
                    user_name_div.textContent = "@RRC";
				    info_div.appendChild(user_name_div);
                }
                var time_div = document.createElement("div");
                time_div.setAttribute("class","post_time");
                
                // format time from feed and add to div
                time_div.textContent = social_feed[i].post_created_at;
                info_div.appendChild(time_div);
                
				div.appendChild(info_div);
                
				var content_div = document.createElement("div");
                content_div.setAttribute("class","post_content");

				if(social_feed[i].post_content.length > 139)
				{
					var l = 139;
					var search_string = social_feed[i].post_content.substr(0,199);
					while(search_string.indexOf(" ",l) == -1 || l < 70)
					{
						l--;
					}
					if(l < 70)
					{
						span_text = search_string;
						l = 199;
					}
					else
					{
						span_text = social_feed[i].post_content.substr(0,l);
					}
					var temp_span_trunc = document.createElement("span");
					var temp_span_trigger = document.createElement("span");
                    temp_span_trigger.setAttribute("class","more_trigger");
					temp_span_trigger.textContent = "More..";
					temp_span_trunc.appendChild(temp_span_trigger);
					temp_span_trunc.innerHTML = span_text + temp_span_trunc.innerHTML;

					var temp_span = document.createElement("span");
					var temp_span_trigger_2 = document.createElement("span");
                    temp_span_trigger_2.setAttribute("class","less_trigger");
					temp_span_trigger_2.textContent = "Less..";

					temp_span.appendChild(temp_span_trigger_2);
					temp_span.innerHTML = social_feed[i].post_content + temp_span.innerHTML;

					content_div.appendChild(temp_span_trunc);
					content_div.appendChild(temp_span);
					addMoreLessTriggers(content_div);
//					console.log(temp_span_trunc.getElementsByTagName("span")[0].innerHTML);
					
				}
				else
				{
					content_div.textContent = social_feed[i].post_content;
                   // alert(second_line.getElementsByTagName("span"));
				}
				
				div.appendChild(content_div);
                var time_div = document.createElement("div");
                time_div.setAttribute("class","post_time");
                
                // format time from feed and add to div
                time_div.textContent = social_feed[i].post_created_at;
                div.appendChild(time_div);
                

                
				main.appendChild(div);
                var clone_div = div.cloneNode(true);
                //alert(clone_div.textContent);//.indexOf("<span>");
                if(clone_div.getElementsByClassName("more_trigger").length > 0)
                {
                    addMoreLessTriggers(clone_div);
                }
                document.getElementById(social_feed[i].post_type.toLowerCase() + "_main").appendChild(clone_div);
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

function addMoreLessTriggers(div)
{
    div.getElementsByClassName("more_trigger")[0].addEventListener("click",function(e){
        e.target.parentNode.style.display = "none";
        e.target.parentNode.nextSibling.style.display = "block";
    });
    div.getElementsByClassName("less_trigger")[0].addEventListener("click",function(e){
        e.target.parentNode.style.display = "none";
        e.target.parentNode.previousSibling.style.display = "block";
    });
}

// Swipe social pages
$('div.social').live("swipeleft", function(){
    var nextpage = $(this).next('.social');
    if (nextpage.length > 0) {
    $.mobile.changePage(nextpage, {transition: "slide", reverse: false}, false, true);
    }
});

$('div.social').live("swiperight", function(){
    var prevpage = $(this).prev('.social');
    if (prevpage.length > 0) {
    $.mobile.changePage(prevpage, {transition: "slide",
    reverse: true}, true, true);
    }
});
//function setDisplaySize() {
//    document.getElementById("w").innerHTML = window.outerWidth;
//    document.getElementById("h").innerHTML = window.outerHeight;
//}
