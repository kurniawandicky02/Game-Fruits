var play=1;
var end=0;
var gameState=play;
var sword,swordImage;
var fruit,f1Image,f2Image,f3Image,f4Image,fruitGroup;
var enemy,enemyImage,enemy2Image,enemyGroup;
var gameOverImage;
var score;
var sound,sound2;
var s2Image,s3Image;


function preload(){
  swordImage=loadImage("sword2.png");
  f1Image=loadImage("fruit1.png");
  f2Image=loadImage("fruit2.png");
  f3Image=loadImage("fruit3.png");
  f4Image=loadImage("fruit4.png");
  enemyImage=loadImage("alien1.png");
  enemy2Image=loadImage("alien2.png");
  gameOverImage=loadImage("gameover.png");
  sound=loadSound("Knife.mp3");
  sound2=loadSound("gameOver.wav");
  s2Image=loadImage("sword.png");
  s3Image=loadImage("sword3.png");
}

function setup(){
  createCanvas(600,600);
  
 
sword=createSprite(300,300,20,20);
  sword.addImage(swordImage);
  sword.scale=0.25;
  
     //making groups
  fruitGroup=new Group();
  enemyGroup=new Group();
  
  score=0;

  
}

function draw(){
  

  
  background("#00fff3");
 
  
    //creating game states
  if(gameState===play){
  //moving sword with mouse
  sword.x=World.mouseX;
  sword.y=World.mouseY;
  fruits();
  enemies();
  if(fruitGroup.isTouching(sword))
   {
     sound.play();
     
    if(sword.isTouching(fruit)){
    score=score+2;
    }
    fruitGroup.destroyEach();
   }
    
    if(score===10){
      sword.addImage(s2Image);
    }
    
     if(score===20){
      sword.addImage(s3Image);
    }
  
  if(enemyGroup.isTouching(sword))
   {
     sound2.play();
    enemyGroup.destroyEach();
    gameState=end;
   }
  }
  
  if(gameState===end){
    fruit.velocityX=0;
    fruit.visible=false;
    enemy.velocityX=0;
    sword.addImage(gameOverImage);
    sword.scale=1.5;
    sword.x=300;
    sword.y=300;
  }
    



    
  
  
  drawSprites();
   text("Score:"+score,250,20);
}

function fruits(){
  if(World.frameCount%80===0){
     fruit=createSprite(600,200,20,20);
    var position=Math.round(random(1,2));
    if(position==1)
      {
        fruit.x=600;
        fruit.velocityX= -(7+(score/4));
      }
    else
      {
        if(position==2){
        fruit.x=0;
        fruit.velocityX=(7+(score/4));
      }
    }
    
    fruit.scale=0.2;
    var r=Math.round(random(1,4));
    if(r==1){
      fruit.addImage(f1Image);
    }
    else if(r==2){
      fruit.addImage(f2Image);
    }
      else if(r==3){
      fruit.addImage(f3Image);
    }
    else{
      fruit.addImage(f4Image);
    }
    
    
    
    fruit.y=Math.round(random(50,340));
    fruit.setLifetime=100;
    
    fruitGroup.add(fruit);
  }
}

  function enemies(){
  if(World.frameCount%300===0){
    enemy=createSprite(600,200,20,20);
    enemy.scale=1;
    var e=Math.round(random(1,2));
    if(e==1){
      enemy.addImage(enemyImage);
    }
    else if(e==2){
      enemy.addImage(enemy2Image);
    }
    enemy.y=Math.round(random(50,340));
    
    enemy.velocityX=-(8+(score/10));
    enemy.setLifetime=100;
    
    enemyGroup.add(enemy);
  }
}


