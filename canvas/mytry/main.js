var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
var ctx = canvas.getContext('2d');

var mouse = {
    x : undefined,
    y : undefined
}

window.addEventListener('mousemove',function(e){
    mouse.x = e.x;
    mouse.y = e.y;
})
window.addEventListener('resize',function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
})
window.addEventListener('click',function(){
    init();
})

function randomIntFromRange(min,max){
    return Math.floor(Math.random() * (max - min + 1) + min);
}
function getDistance(x1,y1,x2,y2){
    let xDistance = x2 - x1;
    let yDistance = y2 - y1;

    return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
}
function Text(x,y,text,textalign){
    this.text = text;
    this.x = x;
    this.y = y;
    this.textalign = textalign;
    this.draw = function(){
        ctx.font = "bold 80px Arial";
        ctx.fillStyle = "black";
        ctx.textAlign = this.textalign
        ctx.globalAlpha = 1;
        ctx.fillText(this.text, this.x, this.y)
    }
    this.update = function(){
        this.draw()
    }
}
function Ball(x, y, dx, dy, radius, color){
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.color = color;
    this.opacity = 00
    this.distance = randomIntFromRange(40,100)

    this.draw = function() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, Math.PI * 2,false)
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    this.update = function(balls){
        this.draw();
        for(var i = 0; i < balls.length; i++){
            // if(this === ballArray[i])continue;
            
            if(getDistance(this.x + this.radius,this.y +this.radius,balls[i].x + balls[i].radius,ballArray[i].y + ballArray[i].radius) < this.distance){
                ctx.beginPath();
                ctx.moveTo(this.x,this.y);
                ctx.lineTo(balls[i].x,balls[i].y);
                ctx.strokeStyle = this.color;
                ctx.stroke();

            }

        }


        if(getDistance(mouse.x,mouse.y, this.x ,this.y) <= 150 && this.opacity < 1){
            this.opacity = 0.1;
        }else if(this.opacity > 0){
            this.opacity -= 0.003;
            this.opacity = Math.max(0, this.opacity)
        }

        if(this.x - this.radius <= 0 || this.x + this.radius >= window.innerWidth){
            this.dx = -this.dx;
        }
        if(this.y - this.radius < 0 || this.y + this.radius > window.innerHeight){
            this.dy = -this.dy;
        }
        this.x += this.dx;
        this.y += this.dy;
        
    }
}


var ball;
var ballArray;
var text;
function init(){
    ballArray = [];
    for(var i = 0; i < 800; i++){
        var radius =5;
        var x = randomIntFromRange(radius , window.innerWidth - radius)
        var y = randomIntFromRange(radius , window.innerHeight - radius)
        var dx = randomIntFromRange(-2,2);
        var dy = randomIntFromRange(-2,2);
        ballArray.push(new Ball(x, y, dx, dy, radius, 'black'));
    }
    text = new Text(innerWidth / 2, innerHeight / 2 - 50, "March 23, 2018","center")

    
}

function animate(){
    requestAnimationFrame(animate);
    ctx.fillStyle = 'rgba(255,255,255,0.3)';
    ctx.fillRect(0,0,innerWidth,innerHeight)
    // ctx.clearRect(0, 0, innerWidth, innerHeight);
    
    for(var i = 0; i < ballArray.length; i++){
        ballArray[i].update(ballArray);
    }
    text.update();
}

init()
animate();