function Block(x, y, z, width, height, depth, color){
    this.x = x;
    this.y = y;
    this.z = z;
    this.width = width;
    this.height = height;
    this.depth = depth;
    this.color = color;
    this.gay = 5;
}
Block.prototype.run = function(p){
    this.display();
    this.collide(p);
    this.color = color(255, 0, 0);
}
Block.prototype.display = function(){
    world.push();
    world.translate(this.x-player.x, this.y-player.y, this.z+player.z+player.depth);
    fill(this.color);
    world.box(this.width, this.height, this.depth);
    world.pop();
}
Block.prototype.collide = function(p){
    let xvel = abs(p.xvel);
    let yvel = abs(p.yvel);
    let zvel = abs(p.xvel);
    if(p.y+p.height/2>this.y-this.height/2&&p.y-p.height/2<this.y+this.height/2&&p.x+p.width/2>this.x-this.width/2&&p.x-p.width/2<this.x+this.width/2&&p.z+p.depth/2>this.z-this.depth/2&&p.z-p.depth/2<this.z+this.depth/2){
        if(p.y+p.height/2-1-yvel>this.y-this.height/2&&p.y-p.height/2+1+yvel<this.y+this.height/2){
            if(p.y+p.height/2-1-yvel>this.y-this.height/2&&p.y-p.height/2+1+yvel<this.y+this.height/2){
                if(p.z+p.depth/2>this.z-this.depth+1/2&&p.z-p.depth/2<this.z+this.depth/2-1){
                    if(p.x-p.width/2<this.x-this.width/2){
                        p.x = this.x-this.width/2-p.width/2;
                        p.xvel = min(p.xvel, 0);
                    } else if(p.x+p.width/2>this.x+this.width/2){
                        p.x = this.x+this.width/2+p.width/2;
                        p.xvel = max(p.xvel, 0);
                    }
                } 
                if(p.x+p.width/2>this.x-this.width/2+1+xvel&&p.x-p.width/2<this.x+this.width/2-1-xvel){
                    if(p.z-p.depth/2<this.z-this.depth/2+1){
                        p.z = this.z-this.depth/2-p.depth/2;
                        p.zvel = min(p.zvel, 0);
                    }else if(p.z+p.depth/2>this.x+this.depth/2-1){
                        p.z = this.z+this.depth/2+p.depth/2;
                        p.zvel = max(p.zvel, 0);
                    }
                }
            }
        }
        if(p.x+p.width/2>this.x-this.width/2&&p.x-p.width/2<this.x+this.width/2&&p.z+p.depth/2>this.z-this.depth/2&&p.z-p.depth/2<this.z+this.depth/2){
            if(p.y-p.height/2<this.y-this.height/2){
                p.y = this.y-this.height/2-p.height/2;
                p.grounded = true;
                p.yvel = 0;
            }
        }
    }
}
let blocks = [];
let testBlock = new Block(0, 0, 200, 1000, 50, 1000, color(255, 255,255));
blocks.push(testBlock);
blocks.push(new Block(-200, -50, 300, 100, 200, 100, color(0, 0, 255)));