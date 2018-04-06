// console.log(bible.find(findInDatabase));
var book;
var chap;
var verse;
var text = []
function findInDatabase(bk){
    return bk.name == book
}
for(var i in bible){
    $("<li><a href='#' book='"+bible[i].name+"'>"+bible[i].name+"</a></li>").appendTo("ul.books")
}
$(".sidenav").on('click','.books a',function(){
    $(".books li.active").removeClass("active")
    $(this).parent().addClass("active")
    var thisparent = $(this).parents(".text")
    book = $(this).attr("book");
    thisparent.find(".chapters li").remove();
    for(var i in bible.find(findInDatabase).chapters){
        var chapnum = Number(i) + 1;
      $("<li><a href='#' chapter='"+i+"'>"+chapnum+"</a></li>").appendTo(thisparent.find('.chapters'))
    }
    thisparent.find(".back").attr("location","2")
    thisparent.find(".title h3").html(bible.find(findInDatabase).name);
    thisparent.find(".instruction").html("Choose a chapter:")
    thisparent.find(".title").css("height","26px")
    setTimeout(function(){
        thisparent.find(".title h3").addClass("blue-glow")
    },400)
    thisparent.find(".back").css("opacity","1");
    
    thisparent.find(".items-con").css("height","10px")
    thisparent.find(".books").fadeOut();
    setTimeout(function(){
        thisparent.find(".chapters").show();
        thisparent.find(".items-con").css("height","500px")
    },300)
    
    
})
$(".sidenav").on('click','.chapters a',function(){
    $(".chapters li.active").removeClass("active")
    $(this).parent().addClass("active")
    var thisparent = $(this).parents(".text")
    chap = $(this).attr("chapter");
    var chapnum = Number(chap) + 1;
    thisparent.find(".verses li").remove();
    for(var i in bible.find(findInDatabase).chapters[chap]){
      var versenum = Number(i) + 1;
      $("<li><a href='#' verse='"+i+"'>"+versenum+"</a></li>").appendTo(thisparent.find('.verses'))
    }
    thisparent.find(".back").attr("location","3")
    thisparent.find(".instruction").html("Chapter "+chapnum +", Verse 1")
    var text = bible.find(findInDatabase).chapters[chap][0];
    console.log(text)
    thisparent.find(".verses li:first-child").addClass("active")
    thisparent.find(".title").css("height","26px")
    setTimeout(function(){
        thisparent.find(".title h3").addClass("blue-glow")
    },400)
    thisparent.find(".items-con").css("height","10px")
    thisparent.find(".chapters").fadeOut();
    setTimeout(function(){
        thisparent.find(".verses").show();
        thisparent.find(".items-con").css("height","500px")
    },300)
    
})
$(".sidenav").on('click','.verses a',function(){
    var thisparent = $(this).parents(".text")
    verse = $(this).attr("verse");
    var chapnum = Number(chap) + 1
    var vnum = Number(verse) + 1;
    var text = bible.find(findInDatabase).chapters[chap][verse];
    thisparent.find(".verses li.active").removeClass("active");
    thisparent.find(this).parent().addClass("active")

    thisparent.find(".text h1").html(text)
    thisparent.find(".instruction").html("Chapter "+chapnum +", Verse "+vnum)

    thisparent.find(".chapnav").fadeOut();
    thisparent.find(".versenav").fadeIn();
    console.log(text)
})
$(".tab-nums a").click(function(e){
    e.preventDefault();
    $(".tab-nums li.active").removeClass("active");
    $(this).parent().addClass("active");
    var target = $(this).prop("target");
    $(".text.active").removeClass("active").hide();
    $(target).addClass("active").show();
})
$(".back").click(function(e){
    e.preventDefault();
    console.log("ha")
    var location = $(this).attr("location")
    var thisparent = $(this).parents(".text")
    
    if(location == 3){
        thisparent.find(".instruction").html("Choose a chapter:")
        thisparent.find(".items-con").css("height","10px")
        thisparent.find(".verses").fadeOut();
        setTimeout(function(){
            thisparent.find(".chapters").show();
            thisparent.find(".items-con").css("height","500px")
        },300)
        $(this).attr("location","2")
    }    
    else if(location == 2){
        thisparent.find(".instruction").html("Choose a book:")
        thisparent.find(".items-con").css("height","10px")
        thisparent.find(".chapters").fadeOut();
        setTimeout(function(){
            thisparent.find(".books").show();
            thisparent.find(".items-con").css("height","500px")
        },300)
        $(this).attr("location","1");
        $(this).css("opacity","0")
    }
   
})


