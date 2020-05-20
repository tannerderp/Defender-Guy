new p5();
let cam;
// since we are working in DEGREES now this is much higher
let mouseSensitivity = 0.40; //change this variable to change the sensitivity if i haven't added a settings menu yet...
function setup(){
    let canvas = createCanvas(windowWidth, windowHeight, WEBGL);
    pointerLockSetup();
    cam = createCamera();
    setCamera(cam);
    angleMode(DEGREES);
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
    for(var i in blocks){
        blocks[i].run(player);
    }
    player.run();
    pop();

    clicked = false;
}
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
  }