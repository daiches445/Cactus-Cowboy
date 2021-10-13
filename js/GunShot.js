class GunShot{
    constructor(){
        this.x=55;
        this.y=103;
        this.speed = -13;
        
    }

    draw(){
        
        ctx.drawImage(gun_shot_pic,this.x+=speed,this.y,10,10);
    }
}