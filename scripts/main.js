//reference so i can get p5 documentation on vscode
///  <reference path="../libs/p5.global-mode.d.ts" /> 

new p5();
let cam, uiCam, ui, world;
let imgs = {};
function preload(){
    //load images
    imgs.player = {};
    imgs.player.gun = [];
    for(let i = 0; i<6; i++){
        imgs.player.gun[i] = loadImage("../sprites/player/"+i+".png");
    }
}
// since we are working in DEGREES now this is much higher
let mouseSensitivity = 0.40; //change this variable to change the sensitivity if i haven't added a settings menu yet...
function setup(){
    let canvas = createCanvas(windowWidth, windowHeight, WEBGL);
    pointerLockSetup();
    cam = createCamera();
    uiCam = createCamera();
    setCamera(uiCam);
    angleMode(DEGREES);
    imageMode(CENTER);
    //ui = createGraphics(windowWidth, windowHeight);
    world = createGraphics(windowWidth, windowHeight, WEBGL)
    //world.setCamera(cam);
}

let keys = {}, clicked;
keyPressed = function(){
	keys[key] = true;
	keys[keyCode] = true;
};
keyReleased = function(){
	keys[key] = false;
	keys[keyCode] = false;
};
mouseReleased = function(){
	clicked = true;
};
function pointerLockSetup(){
    var canvas = document.querySelector('canvas');
    canvas.onclick = function(){
        canvas.requestPointerLock();
        fullscreen(true);
    }
}
function draw(){
    background(0, 0, 255);
    push();
    uiCam.setPosition(0, 0, -700);
    uiCam.lookAt(0, 0, 100);
    push();
    world.push();
    world.background(0, 0, 255);
    player.setCamera();
    for(var i in blocks){
        blocks[i].run(player);
    }
    player.run();
    world.pop();
    pop();
    pop();
    push();
    translate(0, 0, 100);
    image(world, 0, 0);
    pop();
    /*push();
    image(imgs.player.gun[0], 0, 0);
    pop();*/
    clicked = false;
}
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
  }