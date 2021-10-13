const canvas1 = document.getElementById('canvas');
const ctx = canvas1.getContext('2d');



ctx.font = "15px Ewert";

const gunShotSound = new Audio()
gunShotSound.src = document.getElementById('gun_shot_sound').src
gunShotSound.playbackRate = 3;

//תמונות
const playerImg = document.getElementById('character');
const playerImg_left = document.getElementById('character_left');
const backroundImg = document.getElementById('backround');
const cactusImg = document.getElementById('cactus');
const enemyImg_1= document.getElementById('enemy_1');
const gun_shot_pic = document.getElementById('gun_shot');
const enterKey_pic = document.getElementById('enter_key');


const playerSize=35;
const vertical_pos = canvas1.height-playerSize-13;
// var drawCactus = true;
var timer  = 0;
var passObs = false;
var cactusCount = 0;
 
//אובייקט-"רקע" backround
const BG={
    x1: 0,//מיקום ראשון
    x2: canvas1.width,//ציור רקע שני
    y: 0,
    BG_speed:2,

}


var c=new Character(canvas1.height);
var obs = [new Obstacle(-39),new Obstacle(Math.floor(Math.random()*50)+50)];
var enemy = [new Enemy()]
var gun_shot=new GunShot();


function drawBG(){

  if(BG.x2<=0){
    BG.x1=0;
    BG.x2=canvas1.width;
  }
  ctx.drawImage(backroundImg,BG.x1,BG.y,canvas1.width,canvas1.height)
  ctx.drawImage(backroundImg,BG.x2,BG.y,canvas1.width,canvas1.height)

  BG.x1-=BG.BG_speed;
  BG.x2-=BG.BG_speed;

}


var key_up = false;
var key_enter = false;
const speed =10;



let frame_x=0;


function AddKeyDOWN(){

  if(event.code == "ArrowUp")key_up = true;
  if(event.keyCode==13)key_enter = true;
  console.log(event.keyCode)
}

addEventListener('keydown',AddKeyDOWN)

addEventListener('keyup',(e)=>{

    if(e.code == "ArrowUp")key_up = false;

})

var AnimFrame;//משתנה זה יאפשר את עצירת המשחק

//משתנים לפתיח - אנטר מרצד
var enterKey_s=100;
var growth = 0.6;

debugger;

function main() {//פונקצייה ראשית שחוזרת על עצמה

  ctx.clearRect(0,0,canvas1.width,canvas1.height);//ניקוי הקאנווס מהתמונה הקודמת

  if(key_enter){//המשחק או סימן 'האנטר' לפני
    drawBG();//ציור הרקע

    ctx.fillText('Cactus:'+cactusCount,12,12);//כתיבת התוצאה בחלק השמאלי עליון

    c.update();//שינוי ערכי השחקן
    c.draw();//ציור השחקן על המסך
  
    if(cactusCount%10==0){//כל 10 קקטסוים שהחשקן עבר תופיע דמות קטנה רצה
      enemy.shift();
      enemy.push(new Enemy());
    }
    enemy[0].draw();
  
    obs[0].draw();//ציור הקקטוסים
    obs[1].draw();
  }
  else{
    ctx.drawImage(enterKey_pic,canvas1.width/2-50+growth,canvas1.height/2-55+growth,enterKey_s+=growth,enterKey_s+=growth)

    if(enterKey_s>107)growth=-0.25;
    if(enterKey_s<93)growth =0.25;
  }
 
  AnimFrame = requestAnimationFrame(main);

  CheckCollision();//

  if(passObs){//השמת קקטוסים חדשים לאחר מעבר קקטוס
    obs.shift();
    obs.push(new Obstacle(Math.floor(Math.random()*50)+60))
    passObs =false;
  }
}

main();




function CheckCollision()
{
  if(((c.posOnCavsY+playerSize-10>obs[0].posY)&&//בדיקת ערכי ה -איקס וה-וואי של השחקן כנגד ערכי הקקטוסים והדמויות הרצות  ,במידה וחופפים יעצר המשחק
  ((c.posOnCavsX+10>=obs[0].posX)&&(c.posOnCavsX-5<=obs[0].posX+obs[0].width-20)))||((c.posOnCavsY+playerSize-10>enemy[0].posOnCavsY)&&
  ((c.posOnCavsX+10>=enemy[0].posOnCavsX)&&(c.posOnCavsX-5<=enemy[0].posOnCavsX+enemy[0].width-10))))
  {
    cancelAnimationFrame(AnimFrame);
    var u = sessionStorage.getItem('user')//השמת התוצאה הגבוהה ביותר
    u = JSON.parse(u)
    if(u.high_score<cactusCount){
      alert("New High Score! :"+cactusCount );
      u.high_score = cactusCount;
      localStorage.setItem(u.user_name,JSON.stringify(u));
      sessionStorage.setItem('user',JSON.stringify(u)); 
    }
    else{
      alert('Better luck next time!');
      
    }
    window.location.reload();
  }

  if(obs[0].posX+obs[0].width<c.posOnCavsX){passObs = true;cactusCount++;}//העלאת הסופר
     
}







