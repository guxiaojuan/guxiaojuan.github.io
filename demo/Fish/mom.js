// JavaScript Document

//绘制大鱼

function momObj(){
    this.x;
	this.y;
	this.angle; //利用到极坐标
	
	this.momTailTimer=0;
	this.momTailCount=0;
	
	this.momEyeTimer=0;
	this.momEyeCount=0;
	this.momEyeInterval=1000;
	
	this.momBodyCount=0;
}

momObj.prototype.init=function(){
   this.x=canWidth*0.5;
   this.y=canHeight*0.5;
   this.angle=0;
}

momObj.prototype.draw=function(){
	this.x=lerpDistance(mx,this.x,0.9);
	this.y=lerpDistance(my,this.y,0.9);
	
	//鼠标移动到的坐标位置和大鱼形成了一个三角形，tan(angle)=y/x;
	//angle=arctan(y/x);
	var deltaY=my-this.y;
	var deltaX=mx-this.x;
	var beta=Math.atan2(deltaY,deltaX)+Math.PI;  //结果在-PI~PI之间
	//该角度要不断的趋向于beta
	this.angle=lerpAngle(beta,this.angle,0.6);
	
	this.momTailTimer+=deltaTime;
	if(this.momTailTimer>50){
		this.momTailCount=(this.momTailCount+1)%8;
		this.momTailTimer%=50;
	}
	
	this.momEyeTimer+=deltaTime;
	if(this.momEyeTimer>this.momEyeInterval){
		this.momEyeCount=(this.momEyeCount+1)%2;
		this.momEyeTimer%=this.momEyeInterval;
		if(this.momEyeCount==0){
			this.momEyeInterval=Math.random()*1500+2000;
		}
		else
		   this.momEyeInterval=200;
	}
	
	ctx1.save();
	
	ctx1.translate(this.x,this.y);   //相对的移动原点
	ctx1.rotate(this.angle);   //大鱼可以跟着鼠标进行旋转了
	
	var TailNum=this.momTailCount;
	ctx1.drawImage(momTail[TailNum],-momTail[TailNum].width*0.5+30,-momTail[TailNum].height*0.5);
	
	var BodyNum=this.momBodyCount;
	if(data.double==1){  //橙色
	    ctx1.drawImage(momBodyOrange[BodyNum],-momBodyOrange[BodyNum].width*0.5,-momBodyOrange[BodyNum].height*0.5);	
	}
	else{ //蓝色
	   ctx1.drawImage(momBodyBlue[BodyNum],-momBodyBlue[BodyNum].width*0.5,-momBodyBlue[BodyNum].height*0.5);
	}
	
	var EyeNum=this.momEyeCount;
	ctx1.drawImage(momEye[EyeNum],-momEye[EyeNum].width*0.5,-momEye[EyeNum].height*0.5);
	
	ctx1.restore();
}

