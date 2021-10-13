class Enemy{
    constructor(){
        this.width = 16;
        this.height = 24;
        this.posOnCavsX=canvas1.width+2;
        this.posOnCavsY=vertical_pos+10;
        this.cycle = 6;
        this.temp = 15;
        this.speed = BG.BG_speed-2;
        this.life=25;

    }

    draw(){
        this.temp--;
        if(this.temp<=0){
            this.cycle = 6;
            this.temp =15;
        }
        if(this.temp%3===0)this.cycle--;

        ctx.drawImage(enemyImg_1,this.width*this.cycle,this.height*3,this.width,this.height,this.posOnCavsX-=3,this.posOnCavsY,20,20)
    }
}