var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 512;
canvas.height = 480;
canvas.style.bacgroundColor = 'red'
document.body.appendChild(canvas);

console.log("we are conected")

// Background image
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
	bgReady = true;
};
bgImage.src = "images/backgound.jpeg";
// Hero image
var heroReady = false;
var heroImage = new Image();
heroImage.onload = function () {
	heroReady = true;
};
heroImage.src = "images/hero.png";
// Monster image
var monsterReady = false;
var monsterImage = new Image();
monsterImage.onload = function () {
	monsterReady = true;
};
monsterImage.src = "images/monster.png";
// create 3 letters
var letter1Ready = false;
var letter1Image = new Image();
letter1Image.onload = function () {
	letter1Ready = true;
};
var random1Letter = 'A'
letter1Image.src = "images/letters/"+random1Letter+".png"

var letter2Ready = false;
var letter2Image = new Image();
letter2Image.onload = function () {
	letter2Ready = true;
};
var random2Letter = 'B'
letter2Image.src = "images/letters/"+random2Letter+".png"
monsterImage.src = "images/monster.png";
// create 3 letters
var letter3Ready = false;
var letter3Image = new Image();
letter3Image.onload = function () {
	letter3Ready = true;
};
var random3Letter = 'C'
letter3Image.src = "images/letters/"+random3Letter+".png"
// Game objects
var hero = {
	speed: 256, // movement in pixels per second
	x: 0,
	y: 0
};
var monster = {
  speed: 150,
  x: 0,
	y: 0
};
var letter1 = {
	x: 0,
	y: 0
};
var letter2 = {
	x: 0,
	y: 0
};
var letter3 = {
	x: 0,
	y: 0
};
var monstersCaught = 0;
var any = 0;
var monsterAlive = true;
var letter1Alive = true;
var letter2Alive = true;
var letter3Alive = true;
// Handle keyboard controls
var keysDown = {};

addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode];
}, false);

// Reset the game when the player catches a monster
var reset = function () {

// for(var i = 0; i < 100; i++){
//   if(i%0){
//     bgImage.src = "images/background1.png";
//     ctx.drawImage(bgImage, 0, 0);
//   }else{
//     bgImage.src = "images/background1.png";
//     ctx.drawImage(bgImage, 0, 0);
//   }
// }
  monsterAlive = true;
  letter1Alive = true;
  letter2Alive = true;
  letter3Alive = true;
  var alphabetArray = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"]
  randomNum = (Math.floor(Math.random()*26))
  randomLetter = alphabetArray[randomNum];
  console.log( randomLetter);
  letter1Image.src = "images/letters/"+randomLetter+".png"
  var audio = document.createElement("audio");
  audio.src = "audio-alphabet/"+randomLetter+".wav";
  audio.autoplay = "true";
  document.body.appendChild(audio);
  alphabetArray.splice(randomNum, 1)

  randomNum = (Math.floor(Math.random()*25))
  randomLetter = alphabetArray[randomNum];
  console.log( randomLetter);
  letter2Image.src = "images/letters/"+randomLetter+".png"
  alphabetArray.splice(randomNum, 1)

  randomNum = (Math.floor(Math.random()*24))
  randomLetter = alphabetArray[randomNum];
  console.log( randomLetter);
  letter3Image.src = "images/letters/"+randomLetter+".png"


  hero.x = canvas.width / 2;
	hero.y = canvas.height / 2;

	// Throw the monster somewhere on the screen randomly

  letter1.x = 32 + (Math.random() * (canvas.width - 96));
  letter1.y = 32 + (Math.random() * (canvas.height - 96));
  letter2.x = 32 + (Math.random() * (canvas.width - 96));
  while((Math.abs(letter2.x - letter1.x)) < 50){
    letter2.x = 32 + (Math.random() * (canvas.width - 96));
  }
  letter2.y = 32 + (Math.random() * (canvas.height - 96));
  while((Math.abs(letter2.y - letter1.y)) < 50){
    letter2.y = 32 + (Math.random() * (canvas.width - 96));
  }
  letter3.x = 32 + (Math.random() * (canvas.width - 96));
  while((Math.abs(letter3.x - letter2.x)) < 50 || (Math.abs(letter3.x - letter1.x)) < 50){
  letter3.x = 32 + (Math.random() * (canvas.width - 96));
  }
  letter3.y = 32 + (Math.random() * (canvas.height - 96));
  while((Math.abs(letter3.x - letter2.x)) < 50 || (Math.abs(letter3.x - letter1.x)) < 50){
    letter3.y = 32 + (Math.random() * (canvas.height - 69));
  }
  monster.x = 32 + (Math.random() * (canvas.width - 96));
  while((Math.abs(monster.x - letter1.x)) < 150){
    monster.x = 32 + (Math.random() * (canvas.width - 96))
  }
  monster.y = 32 + (Math.random() * (canvas.height - 96));
  while((Math.abs(monster.y - letter1.y)) < 150){
    monster.y = 32 + (Math.random() * (canvas.width - 96))
  }
};
// Update game objects
var update = function (modifier) {
  if (38 in keysDown) { // Player holding up
		if(hero.y > 0){
      hero.y -= hero.speed * modifier;}
    if(Math.abs(monster.x - letter1.x)>15){
        if(monster.x < letter1.x){
          monster.x += monster.speed * modifier;
        }else {monster.x -= monster.speed * modifier;}
	  }else{
    if(monster.y < letter1.y){
      monster.y += monster.speed * modifier;
    }else {monster.y -= monster.speed * modifier;}
  }
}
	if (40 in keysDown) { // Player holding down
    if(hero.y < 450){
    hero.y += hero.speed * modifier;}
    if(Math.abs(monster.x - letter1.x)>15){
        if(monster.x < letter1.x){
          monster.x += monster.speed * modifier;
        }else {monster.x -= monster.speed * modifier;}
        }else{
          if(monster.y < letter1.y){
            monster.y += monster.speed * modifier;
          }else {monster.y -= monster.speed * modifier;}
        }
}

	if (37 in keysDown) { // Player holding left
    if(hero.x > 0){
  	hero.x -= hero.speed * modifier;}
    if(Math.abs(monster.x - letter1.x)>15){
        if(monster.x < letter1.x){
          monster.x += monster.speed * modifier;
        }else {monster.x -= monster.speed * modifier;}
	}else{
    if(monster.y < letter1.y){
      monster.y += monster.speed * modifier;
    }else {monster.y -= monster.speed * modifier;}
  }
}

	if (39 in keysDown) { // Player holding right
    if(hero.x < canvas.height){
    hero.x += hero.speed * modifier;}
    if(Math.abs(monster.x - letter1.x)>15){
        if(monster.x < letter1.x){
          monster.x += monster.speed * modifier;
        }else {monster.x -= monster.speed * modifier;}
	}else{
    if(monster.y < letter1.y){
      monster.y += monster.speed * modifier;
    }else {monster.y -= monster.speed * modifier;}
  }
}



	// Are they touching?

	if (
		hero.x <= (letter1.x + 32)
		&& letter1.x <= (hero.x + 32)
		&& hero.y <= (letter1.y + 32)
		&& letter1.y <= (hero.y + 32)
	) {
		++monstersCaught;
    ++any;
}
  if (
    monster.x <= (letter1.x + 15)
    && letter1.x <= (monster.x + 15)
    && monster.y <= (letter1.y + 15)
    && letter1.y <= (monster.y + 15)
  ) {
    ++any;
    monstersCaught = 0

  }
  if(
    hero.x <= (letter2.x + 32)
    && letter2.x <= (hero.x + 32)
    && hero.y <= (letter2.y + 32)
    && letter2.y <= (hero.y + 32)
  ) {

    letter2Alive = false
    letter2.x = -500
  }
  if(
    hero.x <= (letter3.x + 32)
    && letter3.x <= (hero.x + 32)
    && hero.y <= (letter3.y + 32)
    && letter3.y <= (hero.y + 32)
  ) {

    letter3Alive = false
    letter3.x = -500
  }
if(any >= 1){
    any = 0;
    reset();
	}
};

// Draw everything
var render = function () {
	if (bgReady) {
		ctx.drawImage(bgImage, 0, 0);
	}

	if (heroReady) {
		ctx.drawImage(heroImage, hero.x, hero.y);
	}

	if (monsterReady && monsterAlive) {
		ctx.drawImage(monsterImage, monster.x, monster.y);
	}

  if (letter1Ready && letter1Alive) {
    ctx.drawImage(letter1Image, letter1.x, letter1.y);
  }

  if (letter2Ready && letter2Alive) {
      ctx.drawImage(letter2Image, letter2.x, letter2.y);
  }

  if (letter3Ready && letter3Alive) {
      ctx.drawImage(letter3Image, letter3.x, letter3.y);
    }
	// Score
	ctx.fillStyle = "rgb(250, 250, 250)";
	ctx.font = "24px Helvetica";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	ctx.fillText("Letters Right: " + monstersCaught, 32, 32);
};

// The main game loop
var main = function () {
	var now = Date.now();
	var delta = now - then;

	update(delta / 1000);
	render();

	then = now;

	// Request to do this again ASAP
	requestAnimationFrame(main);
};
// Cross-browser support for requestAnimationFrame
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

// Let's play this game!
var then = Date.now();
reset();
main();
