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

// var gravity = 1;
// var friction = 0.7;

window.addEventListener('mousemove',function(e){
    mouse.x = e.x;
    mouse.y = e.y;
})
window.addEventListener('resize',function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initiate();
})
window.addEventListener('click',function(){
    initiate();
})
function getDistance(x1,y1,x2,y2){
    let xDistance = x2 - x1;
    let yDistance = y2 - y1;

    return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
}

function randomIntFromRange(min,max){
    return Math.floor(Math.random() * (max - min + 1) + min);
}
var colorArray = ['#80a3ff','#3554a7','#1d2b4e']
function randomColor(colors){
    return colorArray[Math.floor(Math.random() * colorArray.length)];
}

function Circle(x, y, dx, dy, radius,color,friction){
    this.x = x;
    this.y = y;
    this.dy = dy;
    this.dx = dx;
    this.radius = radius;
    this.color = color;
    this.friction = friction;

    this.draw = function(){
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2,false);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
    this.update = function(){

        this.draw();
    }
}
var circle;
var mouseball;
var radius = 30;
function initiate(){
    circle = new Circle(innerWidth / 2, innerHeight / 2, 0 , 0, 80, 'black', 0);
    mouseball = new Circle(undefined, undefined, 0, 0, radius, 'red', 0);
}



function animate(){
    requestAnimationFrame(animate);
    ctx.clearRect(0,0,innerWidth,innerHeight)
    circle.update();

    mouseball.x = mouse.x;
    mouseball.y = mouse.y;
    mouseball.update();

    if(getDistance(circle.x,circle.y,mouseball.x,mouseball.y) < mouseball.radius + circle.radius){
           circle.color = 'red';
    }
    else{
        circle.color = 'black'
    }

    console.log(getDistance(circle.x,circle.y,mouseball.x,mouseball.y))
    // initiate();
}
initiate();
animate();
// animate();