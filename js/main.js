// DISABLE/ENABLE SCROLLING FUNCTIONS///////////////////////////////////////////////
		var keys = {37: 1, 38: 1, 39: 1, 40: 1};

		function preventDefault(e) {
		  e = e || window.event;
		  if (e.preventDefault)
		      e.preventDefault();
		  e.returnValue = false;  
		}

		function preventDefaultForScrollKeys(e) {
		    if (keys[e.keyCode]) {
		        preventDefault(e);
		        return false;
		    }
		}

		function disableScroll() {
		  if (window.addEventListener) // older FF
		      window.addEventListener('DOMMouseScroll', preventDefault, false);
		  window.onwheel = preventDefault; // modern standard
		  window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
		  window.ontouchmove  = preventDefault; // mobile
		  document.onkeydown  = preventDefaultForScrollKeys;
		  
		}

		function enableScroll() {
		    if (window.removeEventListener)
		        window.removeEventListener('DOMMouseScroll', preventDefault, false);
		    window.onmousewheel = document.onmousewheel = null; 
		    window.onwheel = null; 
		    window.ontouchmove = null;  
		    document.onkeydown = null;  
		     
		}
// DISABLE/ENABLE SCROLLING FUNCTIONS///////////////////////////////////////////////
disableScroll();
$(window).load(function(){
	$(".item:eq(0)").show();
	$(".loading").fadeOut();
	enableScroll();
});

var scrollswitch=1;
var activeindx=0;
var dec=401;
var xdeg=0;
var nextdeg=90;
var where;
var checkswitch=1;
var fromend=0;
var fcpos,lcpos;
var whatevent;
var returnhome=0;
function xInvert(){
	
	if(activeindx<9)
	{
		
		if(fromend==1)
		{
			fromend=0;
			$(".Xmid").removeClass("active")
			$(".largeview").removeClass("black")
			$(".mynavmenu").removeClass("invert")
			setTimeout(function(){
				$(".Xmid").addClass("rotup")
			},450)
		}
		else
		{
			$(".Xmid").addClass("rotup")
		}
	}
	else
	{
		fromend=1;
		$(".largeview").addClass("black")
		$(".mynavmenu").addClass("invert")
		$(".item:eq("+activeindx+")").fadeIn(400);
		$(".Xmid").addClass("active")
	}
}
function checkIncOrDec()
{
		// disableScroll();

	if(checkswitch==1)
	{
		checkswitch=0;
		if(whatevent=="scroll")
		{
			if($(window).scrollTop()>400)
			{
				var msg="inc";
				// console.log("inc")
			}
			else if($(window).scrollTop()<400)
			{
				var msg="dec";
				// console.log("dec")
			}
			
			
		}
		else if(whatevent=="swipe")
		{
			if(fcpos<lcpos && fcpos+50<=lcpos)
			{
				var msg="dec";
			}
			else if(fcpos>lcpos && fcpos-50>=lcpos)
			{
				var msg="inc";
			}
		}


		if((msg=="dec" && activeindx==0) || (msg=="inc" && activeindx==9 ))
		{
			checkswitch=1;
			enableScroll();
			return false;
		}
		else
		{
			changePage(msg);
		}
		$("body").animate({
			scrollTop:400
		},300);
	}
}
function changePage(a)
{
		
		if(a=="inc")
		{
			$(".item:eq("+activeindx+")").fadeOut(400);
			activeindx++;
			xInvert();
		}
		else if(a=="dec")
		{

			$(".item:eq("+activeindx+")").fadeOut(400);
			if(returnhome==1)
			{
				activeindx=0;
				returnhome=0;
			}
			else{
				activeindx--;
			}
			
			xInvert();
			$(".Xmid").addClass("rotdown")
		}
		setTimeout(function(){
			$(".Xmid").removeClass("rotup")
			$(".Xmid").removeClass("rotdown")
			
			$(".item:eq("+activeindx+")").fadeIn(400,function(){
				enableScroll();
				checkswitch=1;
			});
		},1600)
}

$(window).on("scroll",function(e){
	if($(window).width()>768)
	{
		disableScroll();
		whatevent="scroll";
		where=checkIncOrDec();
	}
})
$(".desktop").on("mousedown",function(e){
	if($(window).width()>768)
	{
		fcpos=e.pageY;
		whatevent="swipe";
	}
})
$(".desktop").on("mouseup",function(e){
	if($(window).width()>768)
	{
		lcpos=e.pageY;
		checkIncOrDec();
		console.log("swiping")
	}
})


$("a").click(function(e){
	e.preventDefault();
	if($(this).attr("id")=="tohome" && activeindx>0 && checkswitch!=0)
	{
		
		disableScroll();
		checkswitch=0;
		returnhome=1;
		changePage("dec")
	}
	
})
$(".mynavmenu ul li").click(function(){
	$(".mynavmenu ul li.active").removeClass("active");
	$(this).addClass("active")
})