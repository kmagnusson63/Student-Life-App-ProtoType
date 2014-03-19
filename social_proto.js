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
    postsHttp = new XMLHttpRequest();
    
    postsHttp.onreadystatechange = function(){
        
        if(postsHttp.readyState == 4 && postsHttp.status == 200)
        {
            social_feed = eval(postsHttp.responseText);
            
            /*      parse json to Social        */
            var main = document.getElementById("official");
            main.innerHTML="";
            // var header_div = document.getElementById("social_header");
            // var header_text = document.createElement("h1");
            var social_array = ['twitter','facebook','instagram','youtube','blog'];
            for(var k=0;k<social_array.length;k++)
            {
                //alert(social_array[k]+'_main');
                document.getElementById(social_array[k]+'_main').innerHTML = " ";
            }
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
//                  console.log(temp_span_trunc.getElementsByTagName("span")[0].innerHTML);
                    
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
                // temp_link.setAttribute("onclick","intel.xdk.device.launchExternal('" + temp_host + social_feed[i].post_site_id + "')");
                 // temp_link.setAttribute("onclick", "intel.xdk.device.showRemoteSiteExt('" + temp_host + social_feed[i].post_site_id + "', 280,0,50,50,50,50)");
                
                temp_link.setAttribute("onclick", "window.open('" + temp_host + social_feed[i].post_site_id + "', '_blank', 'location=yes')");
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

        
            var header_text = document.getElementById("social_header_text");
            switch(social_feed.post_type)
            {

                    case "Twitter":
                        header_text.innerHTML = "Twitter";
                        break;
                    case "Facebook":
                        header_text.innerHTML = "Facebook";
                        break;
                    case "Blog":
                        header_text.innerHTML = "Blog";
                        break;
                    default:
                        header_text.innerHTML = "Official";
                        break;
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


$('.menubutton').live("tap", function() {
    $('.menubar').toggle(); 
});




$('.all').live("tap", function() {
    $.mobile.changePage('#index');
    $('.menubar').toggle(); 
});

$('.twitter').live("tap", function() {
    $.mobile.changePage('#twitter_page');
    $('.menubar').toggle(); 
});

$('.facebook').live("tap", function() {
    $.mobile.changePage('#facebook_page');
    $('.menubar').toggle(); 
});

$('.instagram').live("tap", function() {
    $.mobile.changePage('#instagram_page');
    $('.menubar').toggle(); 
});

$('.youtube').live("tap", function() {
    $.mobile.changePage('#youtube_page');
    $('.menubar').toggle(); 
});

$('.blog').live("tap", function() {
    $.mobile.changePage('#blog_page');
    $('.menubar').toggle(); 
});

$('.unofficial').live("tap", function() {
    $.mobile.changePage('#unofficial_page');
    $('.menubar').toggle(); 
});



