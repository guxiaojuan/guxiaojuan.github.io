// JavaScript Document

function dataObj(){
	this.fruitNum=0;
	this.double=1;//果实颜色的标志，吃到蓝色果实，分值翻倍
	this.score=0;
	this.gameOver=false; //游戏状态
	
	this.alpha=0; //game over显示时的透明度控制
}


dataObj.prototype.draw=function(){
   var w=can1.width;
   var h=can1.height;
   
   ctx1.save();
   
   ctx1.shadowBlur=10;
   ctx1.shadowColor="white";
   ctx1.fillStyle="white";
   ctx1.fillText("Score "+this.score,w*0.5,h-50);
   
   if(this.gameOver){
	 this.alpha+=deltaTime*0.0002;
	 if(this.alpha>1)
	    this.alpha=1;
	 ctx1.fillStyle="rgba(255,255,255,"+this.alpha+")";
	 //ctx1.fillStyle="white";
	 ctx1.fillText("Game Over",w*0.5,h*0.5);   
   }
   
  ctx1.restore();
}

dataObj.prototype.addScore=function(){
  this.score+=this.fruitNum*100*this.double;
  this.fruitNum=0;
  this.double=1;
}