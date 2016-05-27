// JavaScript Document

var fruitObj=function(){
	this.alive=[]; //��ʵ�Ƿ����
	this.x=[];
	this.y=[];
	this.l=[]; //��ʵ����İ뾶
	this.spd=[];//Ϊÿ����ʵ���һ�������ٶ�
	this.aniNum=[];
	this.fruitType=[]; //��ʵ������
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
	   
	 //  this.born(i);  ��ʼ��ʱ��Ӧ�������еĹ�ʵ������
   }
   this.orange.src="src/fruit.png";
   this.blue.src="src/blue.png";
}

fruitObj.prototype.draw=function(){
	for(var i=0;i<this.num;i++){
		//��ʵ���ȵ��ҵ�һ��������Ȼ����ϱ߿���Ʈ����,��Ϊ��ʵ�ǳ��ں����ϵ�
	
		if(this.alive[i]){
			var pic;
			if(this.fruitType[i]=="orange")
				pic=this.orange;
			else
			    pic=this.blue;
		   //console.log(this.fruitType[i]);
		    
			if(this.l[i]<=15){     //�ù�ʵ��������
			    var num=this.aniNum[i];
			
			    this.x[i]=ani.headx[num];
				this.y[i]=ani.heady[num];
				this.l[i]+=this.spd[i]*deltaTime;
				ctx2.drawImage(pic,this.x[i]-this.l[i]*0.5,this.y[i]-this.l[i]*0.5);
			}
			else{     //��ʵ����Ʈ
				this.y[i]-=this.spd[i]*deltaTime;
				ctx2.drawImage(pic,this.x[i]-this.l[i]*0.5,this.y[i]-this.l[i]*0.5);
			}
		
			if(this.y[i]<10)
				 this.alive[i]=false;   
		}
	}
}

fruitObj.prototype.born=function(i){
   	//�ҵ���ʵ��λ��,Ȼ���¼
	this.aniNum[i]=Math.floor(Math.random()*ani.num);
	this.l[i]=0;
	//��ʵ��ɫ�����
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

//����ʵ��Ӽ��ӹ��ܣ���֤ÿ��ʱ����Ļ�ϴ��Ĺ�ʵ��
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

//�ж�һ�¹�ʵ״��
function sendFruit(){
	for(var i=0;i<fruit.num;i++){
		if(!fruit.alive[i]){
   	          fruit.born(i);
	          return ;
		}
	}
}





































