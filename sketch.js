var player, gameState, score, lives;
var bad = [];
var good = [];
var oneImg,twoImg,threeImg,fourImg,fiveImg,sixImg,sevenImg,eightImg,nineImg,tenImg;
var goodImg,badImg,failImg,playerImg;
var spawnFlag;
var posG =[]
var posB = []
var top,bottom,left,right;


 function preload(){
    oneImg = loadImage("assets/1.png")
    twoImg = loadImage("assets/2.png")
    threeImg = loadImage("assets/3.png")
    fourImg = loadImage("assets/4.png")
    fiveImg = loadImage("assets/5.png")
    sixImg = loadImage("assets/6.png")
    sevenImg = loadImage("assets/7.png")
    eightImg = loadImage("assets/8.png")
    nineImg = loadImage("assets/9.png")
    tenImg = loadImage("assets/10.png")
    goodImg = loadImage("assets/good.png")
    badImg = loadImage("assets/bad.png")
    failImg = loadImage("assets/fail.png")
    playerImg = loadImage("assets/player.png")

 }

 function setup(){
    createCanvas (windowWidth, windowHeight)

    gameState = 0
    
    player = createSprite(30,height/2,20,20)
    player.addImage("player",playerImg)
    player.scale= 0.03
    player.visible=false

    fail = createSprite(width/2,height/2,20,20)
    fail.addImage("fail",failImg)
    fail.scale= 0.3
    fail.visible=false

    score = 0
    lives = 3
    spawnFlag = 0;

    img = [oneImg,twoImg,threeImg,fourImg,fiveImg,sixImg,sevenImg,eightImg,nineImg,tenImg]
    posG=[[640,234],[284,80],[626,407],[210,202],[862,424],[201,468],[850,222],[552,100],[620,600],[323,434]]
    posB=[[201,572],[697,274],[198,411],[123,472],[696,132],[729,608],[450,250],[418,575],[428,439],[284, 171]]
    
 }
  function draw(){

    

    if(gameState == 0){
        background(0)
        stroke(209, 23, 66);
        fill(209, 23, 66);
        textSize(30);
        textAlign(CENTER)
        text("Use arrow keys to navigate yourself", width/2,250)
        text("Collect hearts to be the perfect man and marry your girl",width/2,300)
        text("Avoid poop :P", width/2,350)
        text("Press space to continue", width/2, 400)
        text(" I love you ",width/2,450)

    }

    else if(gameState == 1){
        
        background("white")
        
        
        if (spawnFlag == 1 ){
            spawn()
        }

        drawSprites()
        for(i=0;i<10;i++){
            fill("white")
            textAlign(CENTER)
            textSize(32)
            text(i+1,posG[i][0],posG[i][1])
        }
        fill("black")
        text("Lives: "+lives,80,50)
        
        play();
    }

    else if(gameState == 2){
        background("black")
        end();
        drawSprites()

    }

   


  }

  function keyPressed(){
    if(keyCode === 32 && gameState== 0){
        gameState = 1;
        spawnFlag = 1;
    }
  }

  function play(){

    player.visible = true

    if(keyDown("up")&&!player.isTouching(top1)){
        player.y -= 10
    }

    if(keyDown("down")&&!player.isTouching(bottom)){
        player.y += 10
    }

    if(keyDown("left")&&!player.isTouching(left)){
        player.x -= 10
    }

    if(keyDown("right")&&!player.isTouching(right)){
        player.x += 10
    }

    for (i=0;i<10;i++){
        if(player.isTouching(bad[i])){
            bad[i].destroy()
            lives -=1;
            console.log(lives)
            if(lives == 0){
                gameState = 2;
            }
        }

        if(player.isTouching(good[i])){
            good[i].changeAnimation("second")
            good[i].x = width-200;
            good[i].y = height/2;
            good[i].scale = 0.3
            good[i].lifetime = 100;
            score += 1

            if(score == 10){
                win();
            }
            
        }
    }


  }

  function spawn(){
    left = createSprite(5,height/2,10,height)
    right = createSprite(width-450,height/2,10,height)
    top1 = createSprite((width-450)/2,5,width-450,10)
    bottom = createSprite((width-450)/2,height-5,width-450,10)
    left.shapeColor = "black"
    right.shapeColor = "black"
    top1.shapeColor = "black"
    bottom.shapeColor = "black"

    for (i=0; i<10;i++){
        
        bad[i] = createSprite(posB[i][0],posB[i][1],20,20)
        bad[i].addImage("bad",badImg)
        bad[i].scale=0.03
        

    }
    for (i=0; i<10;i++){
        
        good[i] = createSprite(posG[i][0],posG[i][1],20,20)
        good[i].addAnimation("good",goodImg)
        good[i].addAnimation("second",img[i])
        good[i].scale=0.05
        
    }
    

    spawnFlag = 2
  }

  function end(){

    for(i=0;i<10;i++){
        bad[i].destroy();
        good[i].destroy();
    }
    player.visible = false
    player.x = 30
    player.y = height/2

    fail.visible = true
  

  }
  
  function win(){

    gameState = 3
    player.visible=false
    for(i=0;i<10;i++){
        bad[i].destroy();
    }

    background(0)
        stroke(209, 23, 66);
        fill(209, 23, 66);
        textSize(30);
        textAlign(CENTER)
        text("Happy Birthday Kundi", (width-450)/2,200)
        text("You make me want to be a better person.", (width-450)/2,250)
        text("To be a wife like in Proverbs 31", (width-450)/2,300)
        text("You are a true blessing in my life and those around you", (width-450)/2,350)
        text("I can't wait to bite you", (width-450)/2,400)
        
    drawSprites()

  }



  