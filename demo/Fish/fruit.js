// JavaScript Document

var fruitObj=function(){
	this.alive=[]; //果实是否活着
	this.x=[];
	this.y=[];
	this.l=[]; //果实长大的半径
	this.spd=[];//为每个果实添加一个上升速度
	this.aniNum=[];
	this.fruitType=[]; //果实有两种
	this.orange=new Image();
	this.blue=new Image();
}

fruitObj.prototype.num=30;
fruitObj.prototype.init=function(){
   for(var i=0;i<this.num;i++){
	   this.alive[i]=false;
	   this.x[i]=0;
	   this.y[i]=0;
	   this.l[i]=0;
	   this.spd[i]=Math.random()*0.017+0.03;
	   this.aniNum[i]=0;
	   
	 //  this.born(i);  初始化时不应该让所有的果实都出生
   }
   this.orange.src="src/fruit.png";
   this.blue.src="src/blue.png";
}

fruitObj.prototype.draw=function(){
	for(var i=0;i<this.num;i++){
		//果实首先得找到一个海葵，然后从上边可以飘出来,因为果实是长在海葵上的
	
		if(this.alive[i]){
			var pic;
			if(this.fruitType[i]=="orange")
				pic=this.orange;
			else
			    pic=this.blue;
		   //console.log(this.fruitType[i]);
		    
			if(this.l[i]<=15){     //让果实慢慢长大
			    var num=this.aniNum[i];
			
			    this.x[i]=ani.headx[num];
				this.y[i]=ani.heady[num];
				this.l[i]+=this.spd[i]*deltaTime;
				ctx2.drawImage(pic,this.x[i]-this.l[i]*0.5,this.y[i]-this.l[i]*0.5);
			}
			else{     //果实往上飘
				this.y[i]-=this.spd[i]*deltaTime;
				ctx2.drawImage(pic,this.x[i]-this.l[i]*0.5,this.y[i]-this.l[i]*0.5);
			}
		
			if(this.y[i]<10)
				 this.alive[i]=false;   
		}
	}
}

fruitObj.prototype.born=function(i){
   	//找到果实的位置,然后记录
	this.aniNum[i]=Math.floor(Math.random()*ani.num);
	this.l[i]=0;
	//果实颜色的随机
	var ran=Math.random();
	//console.log(ran);
	if(ran<0.5)
	   this.fruitType[i]="orange";
	else
	    this.fruitType[i]="blue";
	//console.log(ran);
	//console.log(this.fruitType[i]);
		
	this.alive[i]=true;
	
}

fruitObj.prototype.dead=function(i){
    this.alive[i]=false;   	
}

//给果实添加监视功能，保证每个时刻屏幕上存活的果实数
function fruitMonitor(){
   var num=0;
   for(var i=0;i<fruit.num;i++){
	   if(fruit.alive[i])
	       num++;
   }
   if(num<10){
	   sendFruit();
	  return ; 
   }
		   
}

//判断一下果实状况
function sendFruit(){
	for(var i=0;i<fruit.num;i++){
		if(!fruit.alive[i]){
   	          fruit.born(i);
	          return ;
		}
	}
}





































