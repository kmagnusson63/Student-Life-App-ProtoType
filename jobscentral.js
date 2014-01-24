
var jobList = new Array();


function getJobList()
{
var jobHTTP = new XMLHttpRequest()

jobHTTP.onreadystatechange = function(){
   if( jobHTTP.readyState == 4 && jobHTTP.status == 200)
   {
      jobList = eval(jobHTTP.responseText);
      
      var job_table = document.getElementById("jobs_list");
      
      for (var i=0; i<jobList.length; i++)
      {
	   var job_tr = document.createElement("tr");
	 
	   var job_title_td = document.createElement("button");
	   job_title_td.textContent = jobList[i].title;
	   job_title_td.setAttribute("onClick", "toggle("+jobList[i].id+")")
	 
	   var job_closes_td = document.createElement("td");
	   job_closes_td.textContent = jobList[i].closeDate;
	  
	   job_tr.appendChild(job_title_td);
	   job_tr.appendChild(job_closes_td);
	   job_tr.setAttribute("id", "D" + jobList[i].id);
	   
	   job_table.appendChild(job_tr);
      
	   // save job display elements to variable to add to table
	   var job_display = displayJob(jobList[i]);
	   //job_tr.addEventListener("click",show(jobList[i].id),false);
      
	}
    }
}
jobHTTP.open("GET","job_central.json", true);
jobHTTP.send();
}

function displayJob(jobs)
{
    var ntr = document.createElement("tr")
    var nh1 = document.createElement("h1");
    var nh3 = document.createElement("h3");
    var np0 = document.createElement("p");
    var np1 = document.createElement("p");
    var np2 = document.createElement("p");
    var text0 = "Employer: " + jobs.employer;
    var text1 = jobs.openDate +" - "+ jobs.closeDate
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
    
    ntr.appendChild(nh1);
    ntr.appendChild(nh3);
    ntr.appendChild(np0);
    ntr.appendChild(np1);
    ntr.appendChild(np2);
    ntr.setAttribute("id", jobs.id)
    ntr.setAttribute("colspan", "2")
    ntr.style.display="none"
    
    var my_tr = document.getElementById("D"+jobs.id);
    my_tr.parentNode.insertBefore(ntr, my_tr.nextSibling)
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

function load()
{
	getJobList();
}

document.addEventListener("DOMContentLoaded",load,false);