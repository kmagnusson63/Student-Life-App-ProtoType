/**
 *      Social Feed 
 *
 *
 *      Link statements:
 *
 *              <link rel="stylesheet" type="text/css" href="social_proto.css" />
 *              <script type="text/javascript" src="social_proto.js"></script>
 */

/*      Global variables    */

var social_feed;

/*      Functions           */

function getSocialFeeds()
{
<<<<<<< HEAD
    postsHttp = new XMLHttpRequest();
    
    postsHttp.onreadystatechange = function(){
        
        if(postsHttp.readyState == 4 && postsHttp.status == 200)
        {
            social_feed = eval(postsHttp.responseText);
            
            /*      parse json to Social        */
            var main = document.getElementById("official");
            main.innerHTML="";
 //          }
            for(var i=0;i<social_feed.length;i++)
            {
                var div = document.createElement("div");
                

                if(i==0)
                {
                    div.setAttribute("class","post first");
                    div.setAttribute("id","first_post");
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

                
                switch(social_feed[i].post_type)
                {
                    case "Twitter":
                        image.setAttribute("src", "img/Twitter_logo_blue_48_48.png");
                        break;
                    case "Facebook":
                        image.setAttribute("src", "img/Facebook_logo_blue_48_48.png");
               
                        break;
                    case "Blog":
                        image.setAttribute("src", "img/blog_icon_48x48.png");
                        break;
                    case "Instagram":
                    case "YouTube":
                    default:
                        image.setAttribute("src", "img/user-default.png");
                        break;
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
                   
                }
                else
                {
                    content_div.textContent = social_feed[i].post_content;
                }
                
                div.appendChild(content_div);
                var time_div = document.createElement("div");
                time_div.setAttribute("class","post_time");
                
                
                temp_span = document.createElement("span");
                
                temp_link = document.createElement("a");
                temp_link.setAttribute("href","#");
                switch(social_feed[i].post_type)
                {
                    case "Twitter":
                        temp_host = "http://twitter.com/rrc/status/";
                        break;
                    case "Facebook":
                        temp_host = "http://facebook.com/";
                        break;
                    case "Blog":
                        temp_host = "http://news.rrc.ca?p=";
                        break;
                }
                
                temp_link.setAttribute("onclick", "window.open('" + temp_host + social_feed[i].post_site_id + "', '_blank', 'location=yes')");
                temp_link.innerHTML = "Link";
                temp_span.appendChild(temp_link);
                time_div.appendChild(temp_span);
                div.appendChild(time_div);
                

                
                main.appendChild(div);

            }
            
        }
    }
    postsHttp.open("GET", "https://www.gristlebone.com/School/User_2_Server/social.php", true);
    postsHttp.send();

   

=======
    testing_display("Test<br>");
    postsHttp = new XMLHttpRequest();
	
	postsHttp.onreadystatechange = function()
    {
        if(postsHttp.readyState == 4 && postsHttp.status == 200)
		{
            try
            {
                var_dump(postsHttp.responseText);
                social_feed = eval(postsHttp.responseText);
                displaySocialFeed(social_feed);
            }
            catch(err)
            {
                testing_display("** ERROR: " + err.message);
            }
        }
    }
	postsHttp.open("GET", "https://www.gristlebone.com/School/User_2_Server/social.php", false);
	postsHttp.send();
//    $.ajax({
//        type: "GET",
//        url: "https://www.gristlebone.com/School/User_2_Server/social.php",
//        dataType: "json",
//        async: true,
//        cache: false,
//        processData: false,
//        success: function(data, textStatus, jqxhr)
//        {
//            try{
//            var_dump(data);
//            //var_dump(JSON.parse(data));
//                json_data = data;
//            var_dump(eval(json_data));
//            displaySocialFeed(json_data);
//            }
//            catch(err)
//            {
//                testing_display(err.message);   
//            }
//        },
//        error: function(jqxhr, textStatus, errorMessage)
//        {
//            testing_display("AJAX ERROR!! " + errorMessage);
//        }
//    });
}
function displaySocialFeed(json_array)
{
	
	social_feed = json_array;
	
	/*		parse json to Social 		*/
	var main = document.getElementById("official");
    main.innerHTML="";
    var social_array = ['twitter','facebook','instagram','youtube','blog'];
    for(var k=0;k<social_array.length;k++)
    {
        //alert(social_array[k]+'_main');
        document.getElementById(social_array[k]+'_main').innerHTML = " ";
    }
	for(var i=0;i<social_feed.length;i++)
	{
		var div = document.createElement("div");
		if(i===0)
		{
			div.setAttribute("class","post first");
            div.setAttribute("id","first_post");
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
        switch(social_feed[i].post_type)
        {
            case "Twitter":
                image.setAttribute("src", "img/Twitter_logo_blue_48_48.png");
                break;
            case "Facebook":
                image.setAttribute("src", "img/Facebook_logo_blue_48_48.png");
                break;
            case "Blog":
                image.setAttribute("src", "img/blog_icon_48x48.png");
                break;
            case "Instagram":
            case "YouTube":
            default:
                image.setAttribute("src", "img/user-default.png");
                break;
        }
//                if(social_feed[i].post_type == "Twitter")
//                {
//                    image.setAttribute("src", "img/Twitter_logo_blue_48_48.png");
//                }
//				else if(social_feed[i].post_type == "Facebook")
//                {
//                    image.setAttribute("src", "img/Facebook_logo_blue_48_48.png");
//                }
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
        //time_div.textContent = social_feed[i].post_created_at;
        
        temp_span = document.createElement("span");
        
        temp_link = document.createElement("a");
        temp_link.setAttribute("href","#");
        switch(social_feed[i].post_type)
        {
            case "Twitter":
                temp_host = "http://twitter.com/rrc/status/";
                break;
            case "Facebook":
                temp_host = "http://facebook.com/";
                break;
            case "Blog":
                temp_host = "http://news.rrc.ca?p=";
                break;
        }
        temp_link.setAttribute("onclick","intel.xdk.device.launchExternal('" + temp_host + social_feed[i].post_site_id + "')");
        
//                temp_link.setAttribute("href",temp_host + social_feed[i].post_site_id);
//                temp_link.setAttribute("target","_blank")
//                
        temp_link.innerHTML = "Link";
        temp_span.appendChild(temp_link);
        time_div.appendChild(temp_span);
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
			
	
>>>>>>> 681308f876f0877f8e6a14ac92feae683c5ae66a
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




$('.social_main').live("swipe", function() {
    $('.menubar').hide();
   
        if($('.menubar').is(":hidden"))
        {
            $(this).css("margin-top", "0px");
        }
        if($('.menubar').is(":visible"))
        {
            $('.social_main').css("margin-top", "70px");
        }
        
});


$('.menubutton').live("tap", function() {

    $('.menubar').toggle();
    if($('.menubar').is(":hidden"))
        {
            $('.social_main').css("margin-top", "0px");
        }
       
            if ($('.menubar').is(":visible"))
        {
            $('.social_main').css("margin-top", "70px");
        }


});
function display_choosen_feeds(feed_type)
{
    $('.post').hide();
    if(feed_type == ".all" || feed_type == "Official")
    {
        console.log("In Official");
        $('.post').show();
        $('.unofficial').hide();
        $('#official_header').html( "Official");
    }
    else
    {
        if(feed_type.substr(0,1) != ".") { feed_type = "."+feed_type; }
        
        console.log("In Feed Type: "+feed_type);
        console.log($(feed_type));
        $(feed_type).show();
        
        $('#official_header').html(feed_type.substr(1));
    }
    $('.menubar').hide();
    $('.social_main').css("margin-top", "0px");
}

$('.menubar').live("tap", function(evt) {
    var show_type = "." + evt.target.id.substr(5);
    console.log("Tapped: " + show_type);
    display_choosen_feeds(show_type);
});
//
//$('.twitter').live("tap", function() {
//    $.mobile.changePage('#twitter_page');
//    $('.menubar').hide();
//    $('.social_main').css("margin-top", "0px");
//});
//
//$('.facebook').live("tap", function() {
//    $.mobile.changePage('#facebook_page');
//    $('.menubar').hide();
//    $('.social_main').css("margin-top", "0px");
//});
//
//$('.instagram').live("tap", function() {
//    $.mobile.changePage('#instagram_page');
//    $('.menubar').hide();
//    $('.social_main').css("margin-top", "0px");
//});
//
//$('.youtube').live("tap", function() {
//    $.mobile.changePage('#youtube_page');
//    $('.menubar').hide();
//    $('.social_main').css("margin-top", "0px");
//});
//
//$('.blog').live("tap", function() {
//    $.mobile.changePage('#blog_page');
//    $('.menubar').hide();
//    $('.social_main').css("margin-top", "0px");
//});
//
//$('.unofficial').live("tap", function() {
//    $.mobile.changePage('#unofficial_page');
//    $('.menubar').hide();
//    $('.social_main').css("margin-top", "0px");
//});



