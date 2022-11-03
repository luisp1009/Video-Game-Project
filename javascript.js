const canvas = document.querySelector("#game");
const ctx = canvas.getContext("2d");


document.getElementById('mission').onclick = () => {
  showDirections();
};


function welcome(){
  ctx.clearRect(0,0,canvas.width,canvas.height)
  if (canvas.getContext) {
    ctx.fillStyle = 'GREEN';
    ctx.font = '70px fantasy';
    ctx.fillText('ALIEN INVASI👽N ', 220, 350);
    ctx.shadowBlur = 0;  
    

  }}
welcome()


function showDirections(){
  ctx.clearRect(0,0,canvas.width,canvas.height)
  if (canvas.getContext) {
    ctx.fillStyle = 'white';
    ctx.font = '30px fantasy';
    ctx.fillText('YOUR MISSION:', 300, 200);
    ctx.shadowBlur = 0;  

  }
  
  if (canvas.getContext) {
    ctx.fillStyle = 'white';
    ctx.font = '30px fantasy';
    ctx.fillText('Kill 25 🛸 to save the planet.', 300, 250);
    ctx.shadowBlur = 0;  
  }
  if (canvas.getContext) {
    ctx.fillStyle = 'white';
    ctx.font = '30px fantasy';
    ctx.fillText('⬆️  ➡️  ⬇️  ⬅️ to control your 🚀', 300, 300);
    ctx.shadowBlur = 0;  
  }
  if (canvas.getContext) {
    ctx.fillStyle = 'white';
    ctx.font = '30px fantasy';
    ctx.fillText('SPACEBAR to shoot', 300, 350);
    ctx.shadowBlur = 0;  
  }
  
  if (canvas.getContext) {
    ctx.fillStyle = 'white';
    ctx.font = '50px fantasy';
    ctx.fillText('👽 ☠️', 300, 420);
    ctx.shadowBlur = 0;  
  }
}
// showDirections()

function winner(){
  if (canvas.getContext) {
    ctx.fillStyle = 'white';
    ctx.font = '50px fantasy';
    ctx.fillText('YOU DID IT!', 330, 300);
    ctx.shadowBlur = 0;   
  }
  //winner()
}

function loser(){
  if (canvas.getContext) {
    ctx.fillStyle = 'white';
    ctx.font = '400px Verdana, Geneva, Tahoma, sans-serif';
    ctx.fillText('☠️', 280, 450);
    ctx.shadowBlur = 0;   
  }
  //loser()
}



let img = new Image();
img.src = "./images/rocket.gif";
let aliens = new Image();
aliens.src = './images/ufo-297549.png'
let explosion = new Image();
explosion.src = './images/ufo.png';


// Player constructor
class Player {
  constructor(x, y, width, height, bulletController, velocity) {
    this.velocity = {
      x:0,
      y:1
    }
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.bulletController = bulletController;
   
  }

  //player move keys 
  moveUp() {
    if (this.y > 0){
        this.y -= 30;
    }
  }
  moveDown() {
    if (this.y + this.height < canvas.height) {
        this.y += 30;
        vy = 5;
  }
  }
  moveLeft() {
    if (this.x > 0){
        this.x -= 30;
        
    }
  }
  moveRight() {
    if (this.x + this.width < canvas.width) {
        this.x += 30;
  }
  }


// shooting bullets
  shoot(){
    if(this.shoot);
    let speed = 5;
    let delay = 10;
    let damage = 1;
    let bulletX = this.x + this.width/2;
    let bulletY = this.y;
    this.bulletController.shoot(bulletX, bulletY, speed, delay);
    
  }

  collision(Enemy){
    if (
        this.x < Enemy.x + Enemy.width &&
        this.x + this.width > Enemy.x &&
        this.y < Enemy.y + Enemy.height &&
        this.height + this.y > Enemy.y
      ) {
        return true;
        
      } else {
        return false;
        
      }
}



// drawign the player
  draw() {

    ctx.drawImage(img, this.x , this.y, this.width, this.height);
     
    }
  
  };

  
  class Enemy{
    constructor(x,y,color,width,height){
        this.x = x;
        this.y = y;
        this.color = color;
        this.width = 100;
        this.height = 50;
    }
    moveDown() {
        this.y += 5;
      }
    draw(ctx){
        ctx.drawImage(aliens, this.x , this.y, this.width, this.height);
  
        }
    }

// bullet class controller constructor space key
class BulletController{
   
    constructor(canvas, bullets, timerTillNextBullet){
       this.bullets = [];
        this.timerTillNextBullet = 0;
        this.canvas = canvas;
    }
    shoot(x,y,speed,damage,delay){
        
        if(this.timerTillNextBullet <= 0){
            this.bullets.push(new Bullet(x,y,speed,damage));
            console.log(this.bullets)
           
        }
        this.timerTillNextBullet --;
    }
    
    draw(ctx){
this.bullets.forEach((bullet) => 
bullet.draw(ctx));
    }
}



//bullets class constructor
class Bullet{
    constructor (x,y,speed,damage){
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.damage = damage;
        this.width = 10;
        this.height = 10;
        this.color = 'red';
    }

    collisionEnemy(Enemy){
        if (
            this.x < Enemy.x + Enemy.width &&
            this.x + this.width > Enemy.x &&
            this.y < Enemy.y + Enemy.height &&
            this.height + this.y > Enemy.y
          ) {
            return true;
            
          } else {
            return false;
           
          }
    }


    // drawing the bullet
    draw(ctx) {
        ctx.fillStyle = this.color;
        this.y -= this.speed;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.strokeStyle ="hsl(" + Math.random() * 360 + ", 100%, 50%)";
        ctx.lineWidth  = 2;
        ctx.strokeRect(this.x, this.y, this.width, this.height);
      
    }
    
}


//moving keys fucntion
window.addEventListener("keydown", function (event) {
    event.preventDefault()
  switch (event.code) {
    case "ArrowUp":
      player.moveUp();
      break;
    case "ArrowDown":
      player.moveDown();
      break;
    case "ArrowLeft":
      player.moveLeft();
      break;
    case "ArrowRight":
      player.moveRight();
      break;
    case "Space":
    player.shoot();
    document.getElementById('audio').play();
    break;
  }
});

let alienArray = [];
let bulletsArray =[];
let frameCount = 0;
let myInterval;
let score = 0;
let scoreElement = document.querySelector('.score');
let enemy = 0
let test= document.querySelector('.test')
let lostGame = false


const animationLoop = () => {
  setCommonStyle();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  
      
  
    frameCount++
      if (frameCount % 30 == 0){
  
          let myNewAlien = new Enemy(canvas.width * Math.random(), 0, "hsl(" + Math.random() * 360 + ", 100%, 50%)", 0);
          alienArray.push(myNewAlien);
      }
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for(let i = 0; i < alienArray.length; i++){
          alienArray[i].moveDown();
          if(player.collision(alienArray[i])){
            
              lostGame = true
              
          }        
          alienArray[i].draw(ctx);
          
    }
  
    for(let i = 0; i < bulletController.bullets.length; i++) {
  
      for(let j =0 ; j < alienArray.length; j++){  
      
      if (bulletController.bullets[i].collisionEnemy(alienArray[j])){
          alienArray.splice(j, 1);
          score +=1;
          document.getElementById('audio3').play();
          scoreElement.innerHTML = `Score: ${score}`;
          j--;
          bulletController.bullets.splice(i, 1)
          i--;
          
      }    
    }
    }

    bulletController.draw(ctx);
    player.draw(ctx);
    if(score >= 25){
      clearInterval(myInterval);
      score = 0;
      winner()
      bulletController.bullets = []
      alienArray = []
      //scoreElement.innerHTML = `Score: ${score}`;
    } else if(lostGame){
        clearInterval(myInterval)
        score = 0;
        loser()
        lostGame = false
        bulletController.bullets = []
        alienArray = []
        document.getElementById('audio1').play();
        //scoreElement.innerHTML = `Score: ${score}`;
    }
  }

let loseElement = document.querySelector('#loser')
let bulletController = new BulletController(canvas);
let bullet = new Bullet(canvas);
let player = new Player(canvas.width/ 2.2, canvas.height / 1.3, 140, 140, bulletController);

//image player background
function setCommonStyle(){
    ctx.shadowColor = "hsl(" + Math.random() * 360 + ", 100%, 50%)";
    ctx.shadowBlur = 30;    
};

window.onload = () => {
    document.getElementById('start-button').onclick = () => {
      startGame();
      
     
    };
 function startGame (){
    myInterval = setInterval(animationLoop, 16);
    scoreElement.innerHTML = `Score: ${score}`;
    let audioElement = document.getElementById("audio4");
    audioElement.play();
    setTimeout(function() {
      audioElement.volume = 0.5;
    },);
 }

 };
 
