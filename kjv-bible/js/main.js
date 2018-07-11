$(document).ready(function(){
// console.clear();
    var book=[];
    var chap=[];
    var verse=[];
    // var text=[];
    var activeTab = 0;
    var thisparent = $(".nav-container .text:nth-of-type("+(activeTab+1)+")");
    for(var i in biblebooks){
        $("<li><a href='#' book='"+biblebooks[i]+"'>"+biblebooks[i]+"</a></li>").appendTo("ul.books")
    }
    var text = [
        {
            book:"",
            chapter:"",
            verse:"",
        },{
            book:"",
            chapter:"",
            verse:"",
        },{
            book:"",
            chapter:"",
            verse:"",
        }
    ]
    if(JSON.parse(window.localStorage.getItem("dalerence-kjv-text"))){
        text = JSON.parse(window.localStorage.getItem("dalerence-kjv-text"))
        // console.log(text)
        setActiveText();
        loadDatas();
    }


    $(".sidenav").on('click','.books a',function(){
        // console.log(thisparent)
        if(!$(this).parent().hasClass("active") || !thisparent.find(".chapters li").length){
            thisparent.find(".books li.active").removeClass("active");
            $(this).parent().addClass("active")
            text[activeTab].book = $(this).attr("book");
            text[activeTab].chapter = "";
            text[activeTab].verse = "";
            thisparent.find(".chapters li").remove();
            var chapCount = countChapters(text[activeTab].book);
            for(var i = 0; i < chapCount; i++){
             var chapnum = Number(i) + 1;
              $("<li><a href='#' chapter='"+chapnum+"'>"+chapnum+"</a></li>").appendTo(thisparent.find('.chapters'))
            }
            saveDatas();
        };
        
        thisparent.find(".back").attr("location","2")
        thisparent.find(".title h3").html($(this).attr("book"));
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
            thisparent.find(".items-con").css("height","473px")
        },300)
        
        
    })
    $(".sidenav").on('click','.chapters a',function(){
        // var thisparent = $(this).parents(".text")
        text[activeTab].chapter = $(this).attr("chapter");
        var chapnum = Number(text[activeTab].chapter);
        if(!$(this).parent().hasClass("active")){
            $(this).parents(".chapters").find("li.active").removeClass("active")
            $(this).parent().addClass("active")
            thisparent.find(".verses li").remove();
            var verseCount = countVerses(text[activeTab].book,text[activeTab].chapter);
            for(var i = 0; i < verseCount; i++){
              var versenum = Number(i) + 1;
              $("<li><a href='#' verse='"+versenum+"'>"+versenum+"</a></li>").appendTo(thisparent.find('.verses'))
            }
            // console.log("clear");
            text[activeTab].verse = 1;
        };
        
        thisparent.find(".back").attr("location","3")
        thisparent.find(".instruction").html("Chapter "+chapnum +", Verse "+text[activeTab].verse)
        setActiveText();
        thisparent.find(".verses li:nth-child("+text[activeTab].verse+")").addClass("active")
        thisparent.find(".title").css("height","26px")
        setTimeout(function(){
            thisparent.find(".title h3").addClass("blue-glow")
        },400)
        thisparent.find(".items-con").css("height","10px")
        thisparent.find(".chapters").fadeOut();
        setTimeout(function(){
            thisparent.find(".verses").show();
            thisparent.find(".items-con").css("height","473px")
        },300)
        saveDatas();
    })
    $(".sidenav").on('click','.verses a',function(){
        // var thisparent = $(this).parents(".text")
        text[activeTab].verse = $(this).attr("verse");
        var chapnum = Number(text[activeTab].chapter)
        var vnum = text[activeTab].verse;
        thisparent.find(".verses li.active").removeClass("active");
        setActiveText();
        thisparent.find(".instruction").html("Chapter "+chapnum +", Verse "+vnum)
        thisparent.find(".chapnav").fadeOut();
        thisparent.find(".versenav").fadeIn();
        $(this).parent().addClass("active");
        saveDatas();
    })
    $(".tab-nums a").click(function(e){
        activeTab = Number($(this).html())-1;
        thisparent = $(".nav-container .text:nth-of-type("+(activeTab+1)+")");
        e.preventDefault();
        $(".tab-nums li.active").removeClass("active");
        $(this).parent().addClass("active");
        var target = $(this).prop("target");
        $(".text.active").removeClass("active").hide();
        $(target).addClass("active").show();
        $(".text-preview .content h3").html(getText(text[activeTab].book,text[activeTab].chapter,text[activeTab].verse))
        $(".projection h3").html(getText(text[activeTab].book,text[activeTab].chapter,text[activeTab].verse))
        $(".projection p").html(text[activeTab].book+" "+text[activeTab].chapter+" : "+text[activeTab].verse);
        saveDatas();
    })
    $(".back").click(function(e){
        e.preventDefault();
        var location = $(this).attr("location")
        // var thisparent = $(this).parents(".text")
        
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
    $(".button-con a").click(function(){
        screenfull.request();
        $(".projection p").html(text[activeTab].book+" "+text[activeTab].chapter+" : "+text[activeTab].verse);
        $(".projection").fadeIn();
    })

    $(document).keyup(function(e) {
         if (e.keyCode == 27) {
            $(".projection").hide();
        }
         if (e.keyCode == 38 || e.keyCode == 37) {
            prevVerse()
        }
         if (e.keyCode == 40 || e.keyCode == 39) {
            nextVerse();
        }
        if(e.keyCode == 49){
            $(".tab-nums li:nth-child(1) a").click();
        }
        if(e.keyCode == 50){
            $(".tab-nums li:nth-child(2) a").click();
        }
        if(e.keyCode == 51){
            $(".tab-nums li:nth-child(3) a").click();
        }
    });
    $(".projection").on("contextmenu",function(e){
        e.preventDefault();
        prevVerse();
    })
    $(".projection").click(function(){
        nextVerse();
    })
            function nextVerse(){
                text[activeTab].verse = Number(text[activeTab].verse) + 1;
                if(getText(text[activeTab].book,text[activeTab].chapter,text[activeTab].verse)){
                    setActiveText();
                    saveDatas();
                }else{
                    text[activeTab].verse = Number(text[activeTab].verse) - 1;
                }
            }
            function prevVerse(){
                text[activeTab].verse = text[activeTab].verse - 1;
                if(getText(text[activeTab].book,text[activeTab].chapter,text[activeTab].verse)){
                    setActiveText();
                    saveDatas();

                }else{
                    text[activeTab].verse = Number(text[activeTab].verse) + 1;
                }
                return false;
            }
            function setActiveText(){
                thisparent.find(".verses li.active").removeClass("active");
                thisparent.find(".verses li a[verse='"+text[activeTab].verse+"']").parent().addClass("active");
                $(".text-preview .content h3").html(getText(text[activeTab].book,text[activeTab].chapter,text[activeTab].verse));
                $(".projection h3").html(getText(text[activeTab].book,text[activeTab].chapter,text[activeTab].verse))
                $(".projection p").html(text[activeTab].book+" "+text[activeTab].chapter+" : "+text[activeTab].verse);
            }
            function saveDatas(){
                window.localStorage.setItem("dalerence-kjv-text",JSON.stringify(text));
                window.localStorage.setItem("dalerence-kjv-tab",activeTab)
            }
            function loadDatas(){
                // active tab load
                var lastTab = Number(window.localStorage.getItem("dalerence-kjv-tab"));
                activeTab = lastTab;
                $(".tab-nums li:nth-of-type("+(lastTab+1)+")").addClass("active");
                $(".sidenav .text:nth-of-type("+(lastTab+1)+")").addClass("active");
                // active book load

                for(var j in text){
                    thisparent = $(".nav-container .text:nth-of-type("+(Number(j)+1)+")");
                    var bookIndex = Number(biblebooks.indexOf(text[j].book)) + 1;
                    if(text[j].book != ""){
                        thisparent.find(".books > li:nth-child("+bookIndex+")").addClass("active");
                        // active book to header
                        thisparent.find(".title h3").html(text[j].book);
                        thisparent.find(".title").css("height","26px")
                        thisparent.find(".title h3").addClass("blue-glow")
                    }
                    // console.log(text[j].book,text[j].chapter,text[j].verse)

                   // active chapter load
                    if(text[j].chapter != ""){
                        text[j].chapter = Number(text[j].chapter)
                        var chapCount = countChapters(text[j].book);
                        for(var i = 0; i < chapCount; i++){
                         var chapnum = Number(i) + 1;
                          $("<li><a href='#' chapter='"+chapnum+"'>"+chapnum+"</a></li>").appendTo(thisparent.find('.chapters'))
                        }
                        thisparent.find(".back").attr("location","2")
                        thisparent.find(".chapters > li:nth-child("+text[j].chapter+")").addClass("active")
                        thisparent.find(".back").css("opacity","1");
                        thisparent.find(".books").hide();
                        thisparent.find(".chapters").show();
                        thisparent.find(".items-con").css("height","473px")
                        thisparent.find(".instruction").html("Choose a chapter:");
                        // active verse load
                        if(text[j].verse != undefined){
                            text[j].verse = Number(text[j].verse)
                        }else{
                            text[j].verse = 1;
                        }   
                        var verseCount = countVerses(text[j].book,text[j].chapter);
                        for(var i = 0; i < verseCount; i++){
                        var versenum = Number(i) + 1;
                          $("<li><a href='#' verse='"+versenum+"'>"+versenum+"</a></li>").appendTo(thisparent.find('.verses'))
                        }
                        thisparent.find(".back").attr("location","3")
                        thisparent.find(".verses > li:nth-child("+text[j].verse+")").addClass("active")
                        thisparent.find(".chapters").hide();
                        thisparent.find(".verses").show();
                        thisparent.find(".instruction").html("Chapter "+text[j].chapter +", Verse "+text[j].verse);
                        $(".text-preview .content h3").html(getText(text[j].book,text[j].chapter,text[j].verse))
                        $(".projection h3").html(getText(text[activeTab].book,text[activeTab].chapter,text[activeTab].verse))
                    }
                }
                thisparent = $(".nav-container .text:nth-of-type("+(Number(lastTab)+1)+")");
                

                
            }
            function cancelFullScreen(el) {
                var requestMethod = el.cancelFullScreen||el.webkitCancelFullScreen||el.mozCancelFullScreen||el.exitFullscreen;
                if (requestMethod) { // cancel full screen.
                    requestMethod.call(el);
                } else if (typeof window.ActiveXObject !== "undefined") { // Older IE.
                    var wscript = new ActiveXObject("WScript.Shell");
                    if (wscript !== null) {
                        wscript.SendKeys("{F11}");
                    }
                }
            }

            function requestFullScreen(el) {
                // Supports most browsers and their versions.
                var requestMethod = el.requestFullScreen || el.webkitRequestFullScreen || el.mozRequestFullScreen || el.msRequestFullscreen;

                if (requestMethod) { // Native full screen.
                    requestMethod.call(el);
                } else if (typeof window.ActiveXObject !== "undefined") { // Older IE.
                    var wscript = new ActiveXObject("WScript.Shell");
                    if (wscript !== null) {
                        wscript.SendKeys("{F11}");
                    }
                }
                return false
            }

            function toggleFull() {
                var elem = document.body; // Make the body go full screen.
                var isInFullScreen = (document.fullScreenElement && document.fullScreenElement !== null) ||  (document.mozFullScreen || document.webkitIsFullScreen);

                if (isInFullScreen) {
                    cancelFullScreen(document);
                } else {
                    requestFullScreen(elem);
                }
                return false;
            }

            
            var signature = $(".signature").html().split("");
            console.log(signature.length)
            $("span.signature").html("");
            var sIndex = 0;
            function addText(){
            console.log(signature.length)

                var tempText = $(".signature").html();
                $(".signature").html(tempText + signature[sIndex])
                sIndex++;
                setTimeout(function(){
                    if(sIndex == signature.length){
                        var a = setTimeout(removeText,10000)
                        // console.log("bn")
                    }else{
                        addText();
                        // console.log('s')
                    }
                },100)
            }
            addText();
            function removeText(){
                var tempText = $(".signature").html().split("");
                tempText = tempText.slice(0,tempText.length-1)
                console.log(tempText)
                $(".signature").html(tempText)
                setTimeout(function(){
                    if(tempText.length == 0){
                        sIndex = 0;
                        setTimeout(addText,5000)
                    }else{
                        removeText();
                    }
                },100)
            }
});