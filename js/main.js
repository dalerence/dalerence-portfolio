
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
$(".menuList a").click(function(e){
	e.preventDefault();
	toggle();
	$(".desc-modal").fadeOut(500);
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
			$(".menuList li.active").removeClass("active");
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
// $(".proj-list").owlCarousel({
// 	loop:false,
// 	dots:false,
// 	responsive:{
// 		0:{
// 			items:2
// 		},
// 		480:{
// 			items:3
// 		},
// 		1366:{
// 			items:5
// 		},
// 		1500:{
// 			items:6
// 		},
// 		1900:{
// 			items:7
// 		}
// 	}
// })
$(".proj-nav .left").click(function(){
	$(".proj-list").trigger("prev")
});
$(".proj-nav .right").click(function(){
	$(".proj-list").trigger("next")
});

$(".proj-menu li").click(function(){
	$(".proj-menu li.active").removeClass("active");
	$(this).addClass("active");
})


$(window).load(function(){
	$("#all").click(function(){
		items.isotope({
			filter:".proj-item"
		})
	})

	$("#graphics").click(function(){
		items.isotope({
			filter:".graphics"
		})
	})

	$("#web").click(function(){
		items.isotope({
			filter:".web"
		})
	})

	$("#others").click(function(){
		items.isotope({
			filter:".others"
		})
	})

	var itemwidth=$("#portfolio .proj-item .proj-img").width();
	itemwidth = itemwidth * 0.875;
	$("#portfolio .proj-item .proj-img").height(itemwidth);
	var items = $(".proj-list")
	items.isotope({
	  itemSelector: '.proj-item'
	});

});
$(window).resize(function(){
	var itemwidth=$("#portfolio .proj-item .proj-img").width();
	itemwidth = itemwidth * 0.875;
	$("#portfolio .proj-item .proj-img").height(itemwidth);
})

var randArray=projects.slice();
var loops=0;
var rand;
$("head").append("<style id='bgimgs'></style>");

function giveRandom(){
   rand = Math.floor(Math.random() * projects.length);
}


for(i=projects.length;i>0;i--){
	giveRandom();
	if(randArray[rand]!="done")
	{
		loadProject(rand)
		randArray[rand]="done";
	}
	else
	{
		i+=1;
	}
}


function loadProject(i)
{
		var bgimg = (i+1)+".png";
		$(".proj-list").append(`
				<div class="proj-item `+projects[i].category+`" target=`+i+`>
                    <div class="proj-img bgimg`+i+`">
        			    <div class="details">
                       		<h3 class="title">`+projects[i].title+`</h3>
                            <p class="category">`+projects[i].type+`</p>
                        </div>
                    </div>
                </div>
		`);
		$("style#bgimgs").append(`
			.bgimg`+i+`:before
			{
				background-image:url(img/portfolio/`+bgimg+`);
			}
		`)
}

$(".proj-item").click(function(){
	var targetID = $(this).attr("target");
	var targetImg = parseInt(targetID)+1;
	$(".desc-modal .heading").html(projects[targetID].title);
	$(".desc-modal #txtdesc").html(projects[targetID].desc);
	$(".desc-modal #txtmethod").html(projects[targetID].method);
	$(".desc-modal #txttools").html(projects[targetID].tools);
	$(".desc-modal #txtresponsive").html(projects[targetID].responsive);
	$(".desc-modal a#url").attr("web-target",projects[targetID].link);
	$(".desc-modal img").attr("src","img/portfolio/"+targetImg+".png");
	
	if(projects[targetID].category=="graphics")
	{
		$(".desc-modal a#url,.desc-modal .forweb").hide();
		$("#weborgraphics").html("Tools/Software Used")
	}
	else
	{
		$(".desc-modal a#url,.desc-modal .forweb").show()
		$("#weborgraphics").html("Languages Used")
	}


	$(".desc-modal").fadeIn();
});
$(".desc-modal a#url").click(function(){
	var link = window.open($(this).attr("web-target"));
	link.focus();
})
$(".desc-modal a#cancel").click(function(){
	$(".desc-modal").fadeOut();
})
// function writeToFile()
// {
// 	var fso=new ActiveXObject("Scripting.FileSystemObject");
// 	var fh=fso.CreateTextFile("haha.txt",true);
// 	fh.WriteLine("gumana ka pls");
// 	fh.Close();

// }
// writeToFile();
var goodInput=0;
$("#submit").click(function(){
	$("#contact input,#contact textarea").each(function(){
		if($(this)[0].checkValidity())
		{
			goodInput+=1;
			
			console.log(goodInput)
		}
		else
		{
			$("button[type=submit]").click();
		}
	});
	if(goodInput==4)
	{
		console.log("pasok")
		// var data=$("#inputs").serialize();
		// $.ajax({
		//     url:'https://darencedesigns.000webhostapp.com/this.php',
		//     type:'post',
		//     data:data,
		//     // dataType: 'jsonp', // use JSONP
		//     success: function(result){
		//         // $('.abcClass').html(result);
		//         console.log("SENT")
		//         },
		//     error:function(exception){console.log(exception);}
		//     })
		var templateParams = {
			name:$("#txtname-contact").val(),
			reply_to:$("#txtemail").val(),
			message_html:$("#txtmsg").val(), 
			contact_number:String($("#txtnumber").val())
		}  
		console.log(templateParams)  
		var serviceID = 'gmail';
		var templateID = 'template_dtcsmxv8';
		var userID = 'user_agyb3ECTLwESEJMzaQ1E1'; 
		emailjs.send(serviceID, templateID, templateParams, userID);
		goodInput=0;
		$("#inputs").fadeOut();
		$("#confirmation").fadeIn();
	}
	else
	{
		goodInput=0;
	}
})

var dswitch = false;
$(".menuToggler").click(function(){
	toggle();
})
function toggle(){
	$(".menuToggler").toggleClass("active");
	if(!dswitch){
		$(".menuList").stop().addClass("active").fadeIn();
	}
	else
	{
		$(".menuList").stop().removeClass("active").fadeOut();
	}
	
	dswitch = !dswitch
}
$(window).ready(function(){
	$(".loading").fadeOut()
})