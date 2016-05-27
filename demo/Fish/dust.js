// JavaScript Document

function dustObj(){
  this.x=[];
  this.y=[];
  this.amp=[]; //振幅，摆动幅度
  this.NO=[];
  
  this.alpha;  //三角函数的角度
}

dustObj.prototype.num=30;

dustObj.prototype.init=function(){
   	for(var i=0;i<this.num;i++){
		this.x[i]=Math.random()*canWidth;
		this.y[i]=Math.random()*canHeight;
		this.amp[i]=25+Math.random()*16;
		this.NO[i]=Math.floor(Math.random()*7);
		this.alpha=0;
	}
}

dustObj.prototype.draw=function(){
	this.alpha+=deltaTime*0.0009;
	var l=Math.sin(this.alpha);
	for(var i=0;i<this.num;i++){
		var num=this.NO[i];
		//console.log(num);
		ctx1.drawImage(dustPic[num],this.x[i]+l*this.amp[i],this.y[i]);
	}
	
}