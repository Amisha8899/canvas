const canvas = document.getElementById("canvas1")
canvas.height = window.innerHeight
canvas.width = window.innerWidth
const c = canvas.getContext("2d")
var mouse = {
    x:undefined,
    y:undefined,
    radius: 200
}
window.addEventListener("mousemove",function(event){
    mouse.x = event.x
    mouse.y = event.y
})
window.addEventListener("resize",function () {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
})
class Particle{
    constructor(x,y){
    this.x = x,
    this.y = y,
    this.radius = 5
    this.vx =  (Math.random()-0.5)*2
    this.vy = (Math.random()-0.5)*2
    this.baseX = this.x
    this.baseY = this.y
    this.density = (Math.random()*30)+1
    }
    draw(){
        c.beginPath();
        c.arc(this.x,this.y,this.radius,0,Math.PI*2,true);
        c.fillStyle = 'white'
        c.fill()
    }
    update(){
        let dx = mouse.x - this.x
        let dy = mouse.y - this.y
        let distance = Math.sqrt(dx*dx+dy*dy)
        let forceDirectionX = dx/distance
        let forceDirectionY = dy/distance
        let maxDistance = mouse.radius
        let force = (maxDistance - distance)/maxDistance
        let directionX = forceDirectionX*force*this.density
        let directionY = forceDirectionY*force*this.density
        if (distance<mouse.radius){
            this.x -= directionX;
            this.y -= directionY;
        }
        else{
            // if (this.x+this.radius>=innerWidth || this.x-this.radius<=0){
            //     this.vx = -this.vx
            // }
            // if (this.y+this.radius>=innerHeight || this.y-this.radius<=0){
            //     this.vy = -this.vy
            // }
            // this.x+=this.vx
            // this.y+=this.vx
            if(this.x !== this.baseX){
                let dx = this.x - this.baseX
                this.x -= dx/10
            }
            if(this.y !== this.baseY){
                let dy = this.y - this.baseY
                this.y -= dy/10
            }
        }

    }
}
let particleArray = []
function drawParticle(){
    particleArray = []
    for(let i = 0; i<400; i++){
    let x = Math.random()*canvas.width
    let y = Math.random()*canvas.height
    particleArray.push(new Particle(x,y))
}
}
drawParticle()
function connect(){
    for(let a = 0; a<particleArray.length; a++){
        for(let b= a; b<particleArray.length; b++){
            let dx = particleArray[a].x - particleArray[b].x
            let dy = particleArray[a].y - particleArray[b].y
            let distance = Math.sqrt(dx*dx+dy*dy)
            if (distance<100){
                let opacity = 1-distance/100
                c.strokeStyle = 'rgba(255,255,255,'+opacity+')'
                c.lineWidth = 1
                c.beginPath()
                c.moveTo(particleArray[a].x,particleArray[a].y)
                c.lineTo(particleArray[b].x,particleArray[b].y)
                c.stroke()
            }
        }
    }
}
function animate(){
    c.clearRect(0,0,innerWidth,innerHeight);
    for (let i = 0; i < particleArray.length; i++){
      particleArray[i].draw();
      particleArray[i].update();
    }
    connect()
    requestAnimationFrame(animate);
}
animate()