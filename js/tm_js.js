function main() {
showlatestposts();

}


function showlatestposts(){
    $.get("/readpost", function(data){
            var tm_posts = JSON.parse(data);
			 for(i=0;i<tm_posts['questions'].length;i++)
			{
                var listitem = "<li class='list-group-item'><div class='row'><div class='col-xs-12 col-sm-2'><span class='glyphicon glyphicon-chevron-up fa-2x'></span>&nbsp;<span id='q" + tm_posts['questions'][i]['id']+ "'>" + tm_posts['questions'][i]['vote'] + "</span>&nbsp;<span class='glyphicon glyphicon-chevron-down fa-2x'></div><div class='col-xs-12 col-sm-8'><h4>" +tm_posts['questions'][i]['title']+"</h4><em><a href=" +tm_posts['questions'][i]['link'] +">" +tm_posts['questions'][i]['link']+"</a></em></div></div></li>";
				console.log(listitem);
				$(".tm_displayposts").append(listitem);
			}         
		 });
}

$("#tm_post").on('click', function(){
    var title;
    var link;
     console.log("before post");
    title = $("#tm_title").val().trim();
    link = $("#tm_link").val().trim();
    console.log("before post1");
    $.post("/addpost", {title:title,link:link}, function(data){  
        console.log("after post");
        $("#tm_title").val("");
	       $("#tm_link").val("");
        $(".tm_displayposts").empty();
        showlatestposts();
          });
    
		});


$(document).ready(main);