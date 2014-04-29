function getLinks()
{
	var get_links_url = "http://www.gristlebone.com/School/User_2_Server/unofficial.php";
	$.ajax({
		type: "GET",
		url: get_links_url,
		dataType: "json",
		success: function(data){
testing_display("Success: Links pull");
			displayLinks(data);
		},
		fail: function(){
			alert("ERROR PULLING LINKS");
		}
	});
}

function displayLinks(data)
{

	$("<div/>",{
		id : "unofficial",
		class : "post"
	}).appendTo("#official");
	$.each(data, function(category, value){
		$("<h2/>",{
			text: category
		}).appendTo("#unofficial");
		$.each(value, function(link, value){
			$("<p/>",{
				text: value['link']
			}).appendTo("#unofficial");
		});
	});
}