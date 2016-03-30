function main() {
    $.get("/checklogin", function(data){
       console.log(data);
        if(data === 'Not logged in'){
            $('#tm_logoutlink').hide();
            $('#tm_useremail').hide();
        }
        else{
            $('#tm_loginlink').hide();
            $('#tm_signuplink').hide();
            $('#tm_useremail').text(data);
        }
    });
    showlatestposts();

}

function showlatestposts(){
    $.get("/readpost", function(data){
            var tm_posts = JSON.parse(data);
			 for(i=0;i<tm_posts['questions'].length;i++)
			{
                var listitem = "<li class='list-group-item'><div class='row'><div class='col-xs-12 col-sm-2'><a class='btn' id='tm_voteup'><span class='glyphicon glyphicon-chevron-up fa-2x'></span></a>&nbsp;<span id='q" + tm_posts['questions'][i]['id']+ "'>" + tm_posts['questions'][i]['vote'] + "</span>&nbsp;<a class='btn' id='tm_votedown'><span class='glyphicon glyphicon-chevron-down fa-2x'></span></a></div><div class='col-xs-12 col-sm-8'><h4>" +tm_posts['questions'][i]['title']+"</h4><em><a href=" +tm_posts['questions'][i]['link'] +">" +tm_posts['questions'][i]['link']+"</a></em></div></div></li>";
				$(".tm_displayposts").append(listitem);
			}         
		 });
}

$("#tm_post").on('click', function(){
    $.get("/checklogin", function(data){
       console.log(data);
        if(data === 'Not logged in'){
            $("#tm_loginalert").show();
        }
        else{
            $("#tm_loginalert").hide();
            var title;
            var link;
            title = $("#tm_title").val().trim();
            link = $("#tm_link").val().trim();
            $.post("/addpost", {title:title,link:link}, function(data){  
                $("#tm_title").val("");
	            $("#tm_link").val("");
                $(".tm_displayposts").empty();
                showlatestposts();
          });
        }
    });
});

$("#tm_logoutlink").on('click',function(){
    $.post("/logout",function(data){
        location.reload();
    });
});


$(document).ready(main);