function getJobList(data) {
        
    var xml = data;
    var job_table = document.getElementById("job_list");
    var items= xml.getElementsByTagName("item");
    
    for ( var i = 1; i < items.length; i++ ) {
        
        // var maxLength = 23;
        var job_div = document.createElement("div");
        var job_p =  document.createElement("p");
        var open_p = document.createElement("p");
        var open_span = document.createElement("span");
        var job_title_span = document.createElement("span");
        
        var title = xml.getElementsByTagName("title")[i].textContent;
        var pubDate = xml.getElementsByTagName("pubDate")[i].textContent;
        

        var position_title_first = title.indexOf(" -");
        var position_title_second = title.substring(position_title_first, title.length);
        job_p.textContent = title.substring(0, position_title_first);
        job_title_span.innerHTML = position_title_second;
        job_title_span.setAttribute("class", "normalfont");
        job_title_span.setAttribute("class", "blue");


        open_p.textContent = "Opened: ";
        open_span.textContent = pubDate.substring(5, pubDate.length-10);
        open_span.setAttribute("class", "normalfont");


        var id = i;



        open_p.appendChild(open_span);
        open_p.setAttribute("class", "open");
        job_p.setAttribute("class", "job_title");
        job_p.appendChild(job_title_span);
        job_div.appendChild(job_p);
        job_div.appendChild(open_p);
        job_div.setAttribute("class", "job");
        job_div.setAttribute("key", id);
        
        job_table.appendChild(job_div);
        displayJob(items[i-1], id);
    }
}                      

//pass a single hash to this method
function displayJob(jobs, id){
    
    var key = id;
    
    //create all of the elements
    var job_div = document.createElement("div");
    var nh1 = document.createElement("h2");
    var nh3 = document.createElement("h3");
    
    //add the text to the elements
    nh1.textContent = jobs.getElementsByTagName("title")[0].textContent;
    nh3.textContent = "Description: " + jobs.getElementsByTagName("description")[0].textContent;
    
    //place all the elements in the div
    job_div.appendChild(nh1);
    job_div.appendChild(nh3);
    
    //set the attribute for the div
    job_div.setAttribute("id", key);
    job_div.setAttribute("class", "job_details_div");
    job_div.style.display="none";
    
    //place the div in the page
    var my_div = document.getElementById("job_details");
    my_div.appendChild(job_div);
}

//toggle the passed element id and hide it or show it
function toggle(id){
    var x = document.getElementById(id);
       if(x.style.display == 'block'){
          x.style.display = 'none';
       }
       else{
          x.style.display = 'block';
       }
}

function jobcentral_load()
{
    //on the event of a swipe open the job desc panel
    $(".job").live("swipeleft", function(e){
    //     //get the panel and id of the job desc
        var key = e.target.parentNode.getAttribute("key");
        var panelCon = document.getElementsByClassName("job_details_div");

    //     //hide all the job desc
        for(var i=0; i<panelCon.length; i++){
            panelCon[i].style.display="none";
        }
        
    //     //show the hiden job desc and panel
        toggle(key);
        // $("#panels").panel("open");
        var nextpage = $('.jobcentralpage').next('.jobcentralpage');
        if (nextpage.length > 0) {
        $.mobile.changePage(nextpage, {transition: "slide", reverse: false}, false, true);
        }
            
        });


    
    $('div.jobcentralpage').live("swiperight", function(){
        var prevpage = $(this).prev('.jobcentralpage');
        if (prevpage.length > 0) {
        $.mobile.changePage(prevpage, {transition: "slide",
        reverse: true}, true, true);
        }
    });


    
    var xml;
    $(document).ready(function(){
        $.ajax({
            type: "GET",
            url: "https://jobcentral.rrc.ca/rss.ashx",
            dataType: "xml",
            success: getJobList
        });
    });


}

