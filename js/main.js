
// window.localStorage.setItem("var","value"));
var usr = window.localStorage.getItem("darenceUsername");
if(!usr){
	$("#fillModal").show();
}
else
{
	$("#fillModal").hide();
	$("#name").html(usr);
	$("#home,.menubar").addClass("active")
}

var clicked=false;
$("#menuList a").click(function(e){
	e.preventDefault();
	var idlink=$(this).parent();
	var link=$(this).html();
	if(!clicked){
		clicked=true;
		var target = $(this).attr("data-target");
		console.log(target)
		$("section.active").addClass("exit");
		setTimeout(function(){
			$("section.exit").removeClass("exit")
			$("section.active").removeClass("active")
			$(target).addClass("active")
			$("#menuList li.active").removeClass("active");
			idlink.addClass("active")
			$("title").html("Darence Designs | "+ link)
		},3000)
		setTimeout(function(){
			clicked=false;
		},6000)
	}
})

$("#acceptName").click(function(){
	var usr = $("#txtname").val();
	if(usr=="")
	{
		$("#txtname").focus();
		$(".req").fadeIn();
		return false;
	}
	$("#name").html(usr);
	window.localStorage.setItem("darenceUsername",usr);
	$("#fillModal").fadeOut(1000);
	setTimeout(function(){
		$("#home,.menubar").addClass("active");
	},1500)
})
$(".proj-list").owlCarousel({
	loop:false,
	dots:false,
	responsive:{
		0:{
			items:2
		},
		480:{
			items:3
		},
		1366:{
			items:5
		},
		1500:{
			items:6
		},
		1900:{
			items:7
		}
	}
})
$(".proj-nav .left").click(function(){
	$(".proj-list").trigger("prev")
});
$(".proj-nav .right").click(function(){
	$(".proj-list").trigger("next")
});






// function writeToFile()
// {
// 	var fso=new ActiveXObject("Scripting.FileSystemObject");
// 	var fh=fso.CreateTextFile("haha.txt",true);
// 	fh.WriteLine("gumana ka pls");
// 	fh.Close();

// }
// writeToFile();