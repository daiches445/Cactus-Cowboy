
class Character {
    constructor(canvas_height) {
        this.width = 128;
        this.height = 127;
        this.playerSize = 35;
        this.posOnCavsX = 0;
        this.ground = canvas_height - this.playerSize - 16;
        this.posOnCavsY = this.ground;
        this.pose = 0;
        this.cycle = 0;
        this.temp = 0;
        this.jump_speed = 2.5;
    }

    update() {

        if (key_up) this.Jump();
        else if (this.posOnCavsY >= this.ground) {
            this.jump_speed = 2.5;
            this.posOnCavsX = 0;
            addEventListener('keydown', AddKeyDOWN);

            this.pose = 1;

            this.temp++;
            if (this.temp >= 9) {
                this.cycle = 0;
                this.temp = 0;
            }
            if (this.temp % 3 === 0) this.cycle++;
        }
        else {
            if (this.posOnCavsY <= this.ground) this.posOnCavsY += 3;
        }

    }
    draw() {
        ctx.drawImage(playerImg, this.width * this.cycle, this.height * c.pose, this.width, this.height, this.posOnCavsX, this.posOnCavsY, this.playerSize, this.playerSize);
    }
    shoot() {
        this.pose = 3;
        gun_shot.draw()

    }
    Jump() {
        removeEventListener('keydown', AddKeyDOWN);
        this.pose = 4;
        this.cycle = 0;

        if (this.posOnCavsY >= this.ground - 40 && this.jump_speed > 0) {
            const decrease_val = 0.08;
            this.posOnCavsY -= this.jump_speed;
            this.posOnCavsX -= decrease_val
            this.jump_speed -= decrease_val
        } else {
            key_up = false;
        }
    }


}

