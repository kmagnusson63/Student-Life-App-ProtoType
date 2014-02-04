var jobList = new Array();


function getJobList()
{
    var jobHTTP = new XMLHttpRequest()

    jobHTTP.onreadystatechange = function(){
        if( jobHTTP.readyState == 4 && jobHTTP.status == 200)
        {
            jobList = eval(jobHTTP.responseText);

            var job_table = document.getElementById("job_list");

            for (var i=0; i<jobList.length; i++)
            {
                var ndiv = document.createElement("div");

                var npar = document.createElement("h3");
                npar.textContent = jobList[i].title;
                //job_title_td.setAttribute("onClick", "toggle("+jobList[i].id+")")
                var nspan = document.createElement("span");
                nspan.textContent = jobList[i].closeDate;

                var id = jobList[i].id;
                nspan.setAttribute("class", "right")
                npar.appendChild(nspan);
                ndiv.appendChild(npar);
                ndiv.setAttribute("class", "job");
                ndiv.setAttribute("key", "jobList[i].id");
                ndiv.setAttribute("key", jobList[i].id);
                //ndiv.addEventListener("click",function(e){ toggle(e.target.parentNode.nextSibling);}, false);

                var my_div = document.getElementById("job_list");
                job_table.appendChild(ndiv);

                // save job display elements to variable to add to table
                var job_display = displayJob(jobList[i]);
                //job_tr.addEventListener("click",toggle(jobList[i].id),false);

            }
        }
    }

    jobHTTP.open("GET","job_central.json", true);
    jobHTTP.send();
}

function displayJob(jobs){
	
    var ndiv = document.createElement("div");
    var nh1 = document.createElement("h1");
    var nh3 = document.createElement("h3");
    var np0 = document.createElement("p");
    var np1 = document.createElement("p");
    var np2 = document.createElement("p");
    var text0 = "Employer: " + jobs.employer;
    var text1 = jobs.openDate +" - "+ jobs.closeDate;
    var text2 = jobs.jobDesc;
    var tn0=document.createTextNode(jobs.title);
    var tn1=document.createTextNode("Available positions: " + jobs.avaPos);
    var tn2=document.createTextNode(text0);
    var tn3=document.createTextNode(text1);
    var tn4=document.createTextNode(text2);    
    
    nh1.appendChild(tn0);
    nh3.appendChild(tn1);
    np0.appendChild(tn2);
    np1.appendChild(tn3);
    np2.appendChild(tn4);
    
    ndiv.appendChild(nh1);
    ndiv.appendChild(nh3);
    ndiv.appendChild(np0);
    ndiv.appendChild(np1);
    ndiv.appendChild(np2);
    
    ndiv.setAttribute("id", jobs.id);
    ndiv.setAttribute("class", "panel");
    ndiv.style.display="none";
    
    var my_div = document.getElementById("panels");
    my_div.appendChild(ndiv);
}

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
    $("h3").live("swipe", function(e){
        var key = e.target.parentNode.getAttribute("key");
        var panelCon = document.getElementsByClassName("panel")

        for(var i=0; i<panelCon.length; i++){
            panelCon[i].style.display="none";
        }

        toggle(key);
        $("#panels").panel("open");
        $(".ui-panel-animate.ui-panel-open.ui-panel-position-right.ui-panel-display-overlay").css("width","100%");
    });
    getJobList();
}

