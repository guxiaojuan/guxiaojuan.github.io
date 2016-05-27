// JavaScript Document

function feedObj(){
	this.x=[];
	this.y=[];
	this.alive=[];
    this.r=[];	
}

feedObj.prototype.num=5;

feedObj.prototype.init=function(){
	for(var i=0;i<this.num;i++){
		this.x[i]=0;
		this.y[i]=0;
		this.alive[i]=false;
		this.r[i]=0;
	}
}

feedObj.prototype.draw=function(){
	ctx1.lineWidth=2;
	ctx1.shadowBlur=10;
	ctx1.shadowColor="rgba(154,154,63,1)";
	
	for(var i=0;i<this.num;i++){
		if(this.alive[i]){
			this.r[i]+=deltaTime*0.05;
			if(this.r[i]>60){
				this.alive[i]=false;
				break;
			}
			var alpha=1-this.r[i]/60;
			ctx1.beginPath();
			ctx1.arc(this.x[i],this.y[i],this.r[i],0,Math.PI*2);
			ctx1.closePath();
			ctx1.strokeStyle="rgba(154,154,63,"+alpha+")";
			ctx1.stroke();
			
		}
	}
}
	
feedObj.prototype.born=function(x,y){
	for(var i=0;i<this.num;i++){
		if(!this.alive[i]){
			this.alive[i]=true;
			this.x[i]=x;
			this.y[i]=y;
			this.r[i]=10;
			
			//return;
		}
	}
}
	