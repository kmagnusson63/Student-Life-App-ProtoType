function displayUnofficial(data)
{
    alert(data);
    var container = document.getElementById("official");
    var unofficial = document.createElement("div");
    
    for(var i = 0; data.length < i; i++){
        
        var title = document.createElement("h3");
        var link = document.createElement("a");
        
        title.textContent = data[i][official_link_title];
        alert(data[i][official_link_title]);
        link.textContent = data[i][official_url_link];
        alert(data[i][official_url_link]);
        
        unofficial.appendChild(title);
        unofficial.appendChild(link);
    }
    
    container.appendChild(unofficial);
    
}

function unofficial_load()
{
    $.ajax({
        url: "http://localhost:31337/php/Student-Life-App-ProtoType/unofficial.php",
        dataType: "json",
        
        success: function(data){
            try
            {
                displayUnofficial(data);
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