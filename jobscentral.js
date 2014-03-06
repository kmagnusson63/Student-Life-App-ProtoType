function getJobList(data) {
        
    var xml = data;
    var job_table = document.getElementById("job_list");
    var items= xml.getElementsByTagName("item");
    
    for ( var i = 1; i < items.length; i++ ) {
        
        var maxLength = 23;
        var ndiv = document.createElement("div");
        var npar = document.createElement("h3");
        var nspan = document.createElement("span");
        
        var title = xml.getElementsByTagName("title")[i].textContent;
        var pubDate = xml.getElementsByTagName("pubDate")[i].textContent;
        
        npar.textContent = title.substring(0, maxLength)+"..";
        nspan.textContent = pubDate.substring(5, pubDate.length-7);

        var id = i;
        nspan.setAttribute("class", "right");
        npar.appendChild(nspan);
        ndiv.appendChild(npar);
        ndiv.setAttribute("class", "job");
        ndiv.setAttribute("key", id);
        
        job_table.appendChild(ndiv);
        displayJob(items[i-1], id);
    }
}                      

//pass a single hash to this method
function displayJob(jobs, id){
	
    var key = id;
    
    //create all of the elements
    var ndiv = document.createElement("div");
    var nh1 = document.createElement("h2");
    var nh3 = document.createElement("h3");
    
    //add the text to the elements
    nh1.textContent = jobs.getElementsByTagName("title")[0].textContent;
    nh3.textContent = "Description: " + jobs.getElementsByTagName("description")[0].textContent;
    
    //place all the elements in the div
    ndiv.appendChild(nh1);
    ndiv.appendChild(nh3);
    
    //set the attribute for the div
    ndiv.setAttribute("id", key);
    ndiv.setAttribute("class", "panel");
    ndiv.style.display="none";
    
    //place the div in the page
    var my_div = document.getElementById("panels");
    my_div.appendChild(ndiv);
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
    $("h3").live("swipe", function(e){
        //get the panel and id of the job desc
        var key = e.target.parentNode.getAttribute("key");
        var panelCon = document.getElementsByClassName("panel");

        //hide all the job desc
        for(var i=0; i<panelCon.length; i++){
            panelCon[i].style.display="none";
        }
        
        //show the hiden job desc and panel
        toggle(key);
        $("#panels").panel("open");
        
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