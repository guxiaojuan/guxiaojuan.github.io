
// JavaScript Document

//绘制背景
function drawBackground(){
  ctx2.drawImage(bgPic,0,0,canWidth,canHeight);
	
}

//绘制海葵,需要摆动，二次贝塞尔曲线
function aniObj(){
	this.rootx=[];
	this.headx=[];
	this.heady=[];
	this.alpha=0;  //正弦函数的角度
	this.amp=[]; //海葵摆动的振幅
}

aniObj.prototype.num=50;
aniObj.prototype.init=function(){
	for(var i=0;i<this.num;i++){
	   this.rootx[i]=i*16+Math.random()*20;
	   this.headx[i]=this.rootx[i]; //初始化时头部和根部在一条直线上
	   this.heady[i]=canHeight-260+Math.random()*50;
	   this.amp[i]=Math.random()*50+50;
	}
}
aniObj.prototype.draw=function(){
	this.alpha+=deltaTime*0.0009;
	var l=Math.sin(this.alpha);
	
	ctx2.save();
	
	ctx2.globalAlpha=0.6;//透明度
	ctx2.lineWidth=20;
	ctx2.lineCap="round";
	ctx2.strokeStyle="#3b154e";
	for(var i=0;i<this.num;i++){
	    ctx2.beginPath();
		ctx2.moveTo(this.rootx[i],canHeight);  //起始点
		this.headx[i]=this.rootx[i]+l*this.amp[i];
		//console.log(this.headx[i]);
		ctx2.quadraticCurveTo(this.rootx[i],canHeight-100,this.headx[i],this.heady[i]);
	//alert(this.x[i]);
		ctx2.stroke();
		
	}
	
	ctx2.restore();   //画笔只在save和restore之间起作用
}