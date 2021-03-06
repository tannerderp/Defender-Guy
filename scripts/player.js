function Player(x, y, z){
    this.x = x;
    this.y = y;
    this.z = z;
    this.width = 50;
    this.height = 100;
    this.depth = 30;
    this.xvel = 0;
    this.yvel = 0;
    this.zvel = 0;
    this.grounded = false;
    this.speed = 0.5;
    this.rotateX = 0;
    this.rotateY = 0;
}
// Math function
Player.prototype.getCameraDirection = function(useY) {
    let z = cos(this.rotateY) * (useY ? cos(this.rotateX) : 1);
    let x = sin(this.rotateY) * (useY ? cos(this.rotateX) : 1);
    let y = useY ? sin(this.rotateX) : 1;
    return { x: x, y: y, z: z };
}
Player.prototype.run = function(){
    world.push();
    /*let z = this.z + this.depth;
    cam.setPosition(this.x, this.y, z);
    let dir = this.getCameraDirection(true);
    cam.lookAt(dir.x + this.x, dir.y + this.y, dir.z + z);*/
    this.display();
    this.update();
    this.control();
    this.grounded = false;
    world.pop();
}
Player.prototype.display = function(){
    /*push();
    translate(this.gayer, this.gayest, this.gay);
    rotateX(this.rotateX);
    rotateY(this.rotateY);
    image(imgs.player.gun[0], 0, 0);
    pop();*/
}
Player.prototype.update = function(){
    this.x += this.xvel;
    this.y += this.yvel;
    this.z += this.zvel;
    this.xvel *= 0.9;
    this.zvel *= 0.9;
    if(!this.grounded){ 
        this.yvel += 0.1;
    } else{
        this.yvel = 0;
    }
    // rotateX is rotation around the x-axis
    this.rotateX = constrain(this.rotateX + movedY * mouseSensitivity, -180, 180);
    // rotateY is rotation around the y-axis
    this.rotateY -= movedX * mouseSensitivity;
    this.rotateX = constrain(this.rotateX, -50, 50);
}
Player.prototype.control = function(){
    // we don't want to slow down while looking up
    var dir = this.getCameraDirection(false);
    if(keys[UP_ARROW] || keys.w){
        this.zvel += dir.z;
        this.xvel += dir.x;
    }
    if(keys[DOWN_ARROW] || keys.s){
        this.zvel -= dir.z;
        this.xvel -= dir.x;
    }
    if (keys[RIGHT_ARROW] || keys.d) {
        // notice how dir.x and dir.z are switched
        this.zvel += dir.x;
        this.xvel -= dir.z;
    }
    if (keys[LEFT_ARROW] || keys.a) {
        this.zvel -= dir.x;
        this.xvel += dir.z;
    }
    if(keys[32] && this.grounded){
        this.yvel -= 5;
    }
}
Player.prototype.setCamera = function(){ //since cameras don't appear to work in create graphics webgl, i'll move all the blocks around the camera
world.rotateX(-this.rotateX*mouseSensitivity);
    world.rotateY(-this.rotateY*mouseSensitivity);
    translate(-this.x+this.width/2, -this.y+this.height/2, -(this.z-this.depth));
}
let player = new Player(0, -200, 150);