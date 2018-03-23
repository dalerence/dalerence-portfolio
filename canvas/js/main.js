var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var ctx = canvas.getContext('2d');


//Rectangle
// ctx.fillRect(100, 100, 200, 200);
// ctx.fillRect(250, 160, 200, 200);
// ctx.fillStyle = 'red'
// ctx.fillRect(350, 120, 200, 200);

// //Line
// ctx.beginPath();
// ctx.moveTo(500,300);
// ctx.lineTo(1000,800);
// ctx.strokeStyle = "#f50";
// ctx.stroke()

//Arc
//  ctx.beginPath();
// ctx.arc(800, 800, 30, 0, Math.PI*2,false);
// ctx.stroke();

// var colors = ['blue','red','green'];
// var colornum = 0;
// for (var i = 0; i < 100; i++) {
//     if(colornum<3){
//         ctx.fillStyle = colors[colornum];
//         colornum++;
//     }
//     else{
//         ctx.fillStyle = colors[colornum];
//         colornum=0;
//     }
//     var x = Math.random() * window.innerWidth;
//     var y = Math.random() * window.innerHeight;
//     ctx.beginPath();
//     ctx.arc(x, y, 50, 0, Math.PI*2,false);
//     ctx.fill();
// }
//    
var mouse = {
    x : undefined,
    y : undefined
}
var maxRad = 100;
var minRad = 20;
var distance = 80;
var scaleSpeed = 5;
window.addEventListener('mousemove',function(e){
    mouse.x = e.x;
    mouse.y = e.y;
})
window.addEventListener('resize',function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initiate();
})

function Circle(x, y, dx, dy, radius,colornum){
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.oldrad = radius;
    this.colornum = colornum;
    this.draw = function(){
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2,false);
        ctx.fillStyle = colorArray[this.colornum];
        ctx.fill();
    }
    this.update = function(){
        if(this.x+this.radius > window.innerWidth || this.x - this.radius < 0){
            this.dx = -this.dx;
        }
        if(this.y+this.radius > window.innerHeight || this.y - this.radius < 0){
            this.dy = -this.dy;
        }
        this.x+=this.dx;
        this.y+=this.dy;

        //interactivity
        
        if(mouse.x - this.x < distance && mouse.x - this.x > -distance && mouse.y - this.y < distance && mouse.y - this.y > -distance){
            if( this.radius < maxRad){
                this.radius += scaleSpeed;
            }
            
        }
        else if(this.radius > this.oldrad){
            this.radius -= scaleSpeed;
        }

        this.draw();
    }
}
var colorArray = ['#80a3ff','#3554a7','#1d2b4e']
var circleArray = [];
var circles=200;
function initiate(){
     circleArray = [];
    for(var i = 0; i<circles;i++){
        var radius = Math.floor((Math.random() * 10)+10);
        var colornum = Math.floor((Math.random() * 3));
        var x = Math.random() * (innerWidth - radius * 2) + radius;
        var y = Math.random() * (innerHeight - radius * 2) + radius;
        var dx = (Math.random() - 0.5)*10;
        var dy = (Math.random() - 0.5)*10;
        circleArray.push(new Circle(x,y,dx,dy,radius,colornum));
    }
}



function animate(){
    requestAnimationFrame(animate);
    ctx.clearRect(0,0,innerWidth,innerHeight)

    for(var i = 0; i<circleArray.length; i++){
        circleArray[i].update();
    }
    
}
initiate();
animate();
// animate();