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

var gravity = 1;
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
function randomIntFromRange(min,max){
    return Math.floor(Math.random() * (max - min + 1) + min);
}
var colorArray = ['#80a3ff','#3554a7','#1d2b4e']
function randomColor(colors){
    return colorArray[Math.floor(Math.random() * colorArray.length)];
}

function Ball(x, y, dx, dy, radius,color,friction){
    this.x = x;
    this.y = y;
    this.dy = dy;
    this.dx = dx;
    this.radius = radius;
    this.color = color;
    this.friction = friction
    this.draw = function(){
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2,false);
        ctx.fillStyle = this.color;
        ctx.fill();
    }
    this.update = function(){
        if((this.y + this.radius + this.dy) > canvas.height){
             this.dy = -this.dy * this.friction;
        }else{
            this.dy += gravity;
        }

        if((this.x + this.radius + this.dx) > canvas.width || this.x - this.radius <= 0){
             this.dx = -this.dx * this.friction;
        }

        this.x += this.dx;
        this.y += this.dy;
        this.draw();
    }
}

var ballArray = [];
var ball;
function initiate(){
    ballArray = [];
    for(var i = 0; i < 200;i++){
        var radius = randomIntFromRange(20, 50);
        var x = randomIntFromRange(radius, canvas.width - radius);
        var y = randomIntFromRange(0 , canvas.height - radius);
        var dx = randomIntFromRange(-2, 2);
        var dy = randomIntFromRange(-2, 2);
        var color = randomColor();
        var friction = randomIntFromRange(0.8,0.9)
        ballArray.push(new Ball(x, y, dx, dy, radius, randomColor(), friction))
    }
    // ball = new Ball(innerWidth / 2, innerHeight / 2, 0 , 2, 30, 1, friction);
}



function animate(){
    requestAnimationFrame(animate);
    ctx.clearRect(0,0,innerWidth,innerHeight)
    // ball.update();
    for(var i = 0; i < ballArray.length;i++){
        ballArray[i].update();
    }
}
initiate();
animate();
// animate();