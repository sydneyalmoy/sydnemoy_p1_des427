let pellets = [];
let gameOver = false;
let gameStarted = false;
let buttonX = 200;
let buttonY = 250;
let buttonR = 40;
let bgImage;

function preload() {
  bgImage = loadImage("blueclouds.jpg"); //i sourced background image on a free script website. 
}

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(bgImage);

  //INTRODUCTION
  if (!gameStarted && !gameOver) {
    fill(0);
    textSize(20);
    textAlign(CENTER);
    text("Green Blob Game", 200, 150);
    textSize(14);
    text("Click on green pellets. Avoid black pellets!", 200, 180);
    text("Be quick as they will get faster.", 200, 200);
    

   //buttons
    fill(0, 200, 0); 
    ellipse(buttonX, buttonY, buttonR * 2);
    fill(0);   
    textSize(16);
    text("START", buttonX, buttonY + 5);
  }


  if (gameStarted && !gameOver) {
  if (frameCount % 40 === 0) {
  let pellet = {
        x: random(20, 380),
        y: 0,
        r: 15,
        color: random() < 0.7 ? "green" : "black",
        speed: random(2, 4)
      };
      pellets.push(pellet);
    }

    
    for (let i = 0; i < pellets.length; i++) {
      let p = pellets[i];
      fill(p.color);
      circle(p.x, p.y, p.r * 2);
      p.y = p.y + p.speed;
    }
  }

  //GAME OVER
  if (gameOver) {
    fill(255, 0, 0);
    textSize(24);
    textAlign(CENTER);
    text("Game Over!", 200, 200);
    textSize(16);
    text("START OVER", 200, 230);
  }
}

function mousePressed() {
  // Start button
  if (!gameStarted && !gameOver) {
    let d = dist(mouseX, mouseY, buttonX, buttonY);
    if (d < buttonR) {
      gameStarted = true;
      gameOver = false;
      pellets = [];
    }
    return;
  }

  //restart
  if (gameOver) {
    gameOver = false;
    gameStarted = false;
    pellets = [];
    return;
  }

  //pellet mouse clicks. for this part i used chatgpt as reference as i was having bugs.
  if (gameStarted && !gameOver) {
    for (let i = 0; i < pellets.length; i++) {
      let p = pellets[i];
      let d = dist(mouseX, mouseY, p.x, p.y);
      if (d < p.r + 5) { // extra 5 pixels buffer for easier clicking
        if (p.color === "black") {
          gameOver = true;
        } else {
          p.y = 999; // move clicked green pellet off-screen
        }
      }
    }
  }
}
