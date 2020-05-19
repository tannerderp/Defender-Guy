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
    this.rotateX = this.x;
    this.rotateY = this.y;
}
Player.prototype.run = function(){
    cam.setPosition(this.x, this.y, this.z+this.depth);
    cam.pan(-this.rotateX*mouseSensitivity);
    cam.tilt(this.rotateY*mouseSensitivity);
    //cam.lookAt(this.rotateX, this.rotateY);
    this.display();
    this.update();
    this.control();
    this.grounded = false;
}
Player.prototype.display = function(){
    /*
    push(); //temporary player model, this will be first person once i get collisions done
    translate(this.x, this.y, this.z);
    fill(255, 0, 0);
    box(this.width, this.height, this.depth);
    pop();*/
    push();
    translate(this.x, -49, this.z); //shadow, this is not temporary
    fill(0, 0, 0);
    box(this.width, 2, this.depth);
    pop();
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
    this.rotateX = movedX;
    this.rotateY = movedY;
}
Player.prototype.control = function(){
    if(keys[UP_ARROW] || keys.w){
        this.zvel -= this.speed;
    }
    if(keys[DOWN_ARROW] || keys.s){
        this.zvel += this.speed;
    }
    if(keys[RIGHT_ARROW] || keys.d){
        this.xvel += this.speed;
    }
    if(keys[LEFT_ARROW] || keys.a){
        this.xvel -= this.speed;
    }
    if(keys[32] && this.grounded){
        this.yvel = -5;
    }
}
let player = new Player(0, -200, 150);