new p5();
function setup(){
    let canvas = createCanvas(windowWidth, windowHeight, WEBGL);
    pointerLockSetup();
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
    //translate(-player.x, -player.y, -player.z);
    camera(player.x, player.y, player.z, 0, 0, 0, 0, 1, 0);
    //rotateX(50);
    for(var i in blocks){
        blocks[i].run(player);
    }
    player.run();
    pop();

    clicked = false;
}