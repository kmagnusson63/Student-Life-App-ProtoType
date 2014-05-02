function displayJobs(data)
{
      window.jobs = data;
    $.each(data, function(index, job){

      $("<div/>", {
            class : "job",
            job : index
      }).append(
            jQuery("<div/>", {
                  class : "job_title",
                  text: job.job_title
            })).append(
            jQuery("<div/>", {
                  class: "job_open_date",
                  text: job.job_open_date
            })).append(
            jQuery("<div/>", {
                  class: "job_desc",
                  text : job.job_description
            })
      )
            .appendTo("#job_list");

    });

    $(".job").on("swipeleft", function(){
            jobDetails(window.jobs[$(this).attr("job")]);
            $("#job_details").show();
            });

    $("#job_details").on("swiperight", function(){
                  $(this).toggle();
            });
}
            
function jobDetails(job)
{
      $("#job_details_title").text(job.job_title);
      $("#job_details_open_date").text(job.job_open_date);
      $("#job_details_desc").text(job.job_description);
}

function jobcentral_load()
{
    $.ajax({
        type: "GET",
        url: "http://www.gristlebone.com/School/User_2_Server/jobs.php",
        dataType: "json",
        
        success: function(data){
       
            try
            {
                displayJobs(data);
            }
            catch(err)
            {
                testing_display("ERROR!: " + err.message);   
            }
        },
        fail: function(data){
            testing_display("ERROR");
        }
    });
}