class Obstacle{
    constructor(x){
        this.width=30;
        this.height = 30;
        this.posX = canvas1.width-30+x;
        this.posY = vertical_pos;
        this.speed = BG.BG_speed;
    }
    draw(){
        ctx.drawImage(cactusImg,this.posX-=this.speed,this.posY,this.width,this.height);
    }
}