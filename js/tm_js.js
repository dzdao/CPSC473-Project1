function main() {
showlatestposts();

}


function showlatestposts(){
    console.log("in latest posts");
    $.get("/readpost", function(data){
            var tm_posts = JSON.parse(data);
			 for(i=0;i<tm_posts['questions'].length;i++)
			{
                var listitem = "<li class='list-group-item'><h4>" +tm_posts['questions'][i]['title']+"</h4><em><a href=" +tm_posts['questions'][i]['link'] +">" +tm_posts['questions'][i]['link']+"</a></em></li>";
				console.log(listitem);
				$(".tm_displayposts").append(listitem);
			}         
		 });
}



$(document).ready(main);