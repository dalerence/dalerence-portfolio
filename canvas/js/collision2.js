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

function rotate(velocity, angle) {
    const rotatedVelocities = {
        x: velocity.x * Math.cos(angle) - velocity.y * Math.sin(angle),
        y: velocity.x * Math.sin(angle) + velocity.y * Math.cos(angle)
    };

    return rotatedVelocities;
}

/**
 * Swaps out two colliding particles' x and y velocities after running through
 * an elastic collision reaction equation
 *
 * @param  Object | particle      | A particle object with x and y coordinates, plus velocity
 * @param  Object | otherParticle | A particle object with x and y coordinates, plus velocity
 * @return Null | Does not return a value
 */

function resolveCollision(particle, otherParticle) {
    const xVelocityDiff = particle.velocity.x - otherParticle.velocity.x;
    const yVelocityDiff = particle.velocity.y - otherParticle.velocity.y;

    const xDist = otherParticle.x - particle.x;
    const yDist = otherParticle.y - particle.y;

    // Prevent accidental overlap of particles
    if (xVelocityDiff * xDist + yVelocityDiff * yDist >= 0) {

        // Grab angle between the two colliding particles
        const angle = -Math.atan2(otherParticle.y - particle.y, otherParticle.x - particle.x);

        // Store mass in var for better readability in collision equation
        const m1 = particle.mass;
        const m2 = otherParticle.mass;

        // Velocity before equation
        const u1 = rotate(particle.velocity, angle);
        const u2 = rotate(otherParticle.velocity, angle);

        // Velocity after 1d collision equation
        const v1 = { x: u1.x * (m1 - m2) / (m1 + m2) + u2.x * 2 * m2 / (m1 + m2), y: u1.y };
        const v2 = { x: u2.x * (m1 - m2) / (m1 + m2) + u1.x * 2 * m2 / (m1 + m2), y: u2.y };

        // Final velocity after rotating axis back to original location
        const vFinal1 = rotate(v1, -angle);
        const vFinal2 = rotate(v2, -angle);

        // Swap particle velocities for realistic bounce effect
        particle.velocity.x = vFinal1.x;
        particle.velocity.y = vFinal1.y;

        otherParticle.velocity.x = vFinal2.x;
        otherParticle.velocity.y = vFinal2.y;
    }
}

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

function Particle(x, y, dx, dy, radius,color){
    this.x = x;
    this.y = y;
    this.mass = 1;
    this.velocity = {
        x: (Math.random() - 0.5) * 5,
        y: (Math.random() - 0.5) * 5
    }
    this.radius = radius;
    this.color = color;
    this.opacity = 0.2;
    // this.friction = friction;

    this.draw = function(){
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2,false);
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.restore();
        ctx.strokeStyle = this.color;
        ctx.stroke();
        
    }
    this.update = particles =>{

        this.draw();

        for(let i = 0; i < particles.length; i++){
            if(this === particles[i])continue;
            if(getDistance(this.x,this.y, particles[i].x, particles[i].y) - this.radius * 2 < 0){
               resolveCollision(this, particles[i]);
            }
        }

        if(this.x + this.radius >= innerWidth || this.x - this.radius <= 0){
            this.velocity.x = -this.velocity.x;
        }
        if(this.y + this.radius >= innerHeight || this.y - this.radius <= 0){
            this.velocity.y = -this.velocity.y;
        }
        
        if(getDistance(mouse.x,mouse.y, this.x ,this.y) <= 100 && this.opacity < 1){
            this.opacity += 0.05;
        }else if(this.opacity > 0.2){
            this.opacity -= 0.01;
            this.opacity = Math.max(0, this.opacity)
        }

        this.x += this.velocity.x;
        this.y += this.velocity.y;

    }
}
let particles;
function initiate(){
   particles = []
   for(let i = 0; i < 100; i++){
       const radius = randomIntFromRange(10,20);
       const color = randomColor();
       let x = randomIntFromRange(radius, canvas.width - radius);
       let y = randomIntFromRange(radius, canvas.height - radius);
       
       //NO OVERLAPPING
       if (i != 0) {
           for(let j = 0; j < particles.length; j++){
               if((getDistance(x,y, particles[j].x,particles[j].y)) - radius * 2 < 0){
                   x = randomIntFromRange(radius, canvas.width - radius);
                   y = randomIntFromRange(radius, canvas.height - radius);

                   j = -1;
               }
           }
       }

       particles.push(new Particle(x, y,0,0, radius, color));
   }
}


function animate(){
    requestAnimationFrame(animate);
    ctx.clearRect(0,0,innerWidth,innerHeight)
    particles.forEach(particle => {
        particle.update(particles);
    })

    
    // initiate();
}
initiate();
animate();
// animate();