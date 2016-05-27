// JavaScript Document

function babyObj(){
   	this.x;
	this.y;
	//this.babyBody=new Image();
	this.angle;
	
	this.babyTailTimer=0;  //С��β�ͼ�ʱ��
	this.babyTailCount=0;  //��¼�����ֲ�����һ֡�ˣ�����һ��ͼƬ

    this.babyEyeTimer=0;
	this.babyEyeCount=0;
	this.babyEyeInterval=1000;//����ʱ����
	
	this.babyBodyTimer=0;
	this.babyBodyCount=0;
}

babyObj.prototype.init=function(){
	this.x=canWidth*0.5-50;
	this.y=canHeight*0.5+50;   //��ʼ��ʱ���������΢���ֵ����
	//this.babyBody.src="src/babyFade0.png";
	
	this.angle=0;
}

babyObj.prototype.draw=function(){
	//��С������������ڴ��������
	this.x=lerpDistance(mom.x+30,this.x,0.98);
	this.y=lerpDistance(mom.y+35,this.y,0.98);
	
	//С�������֮��ĽǶ�
	var deltaY=mom.y-this.y;
	var deltaX=mom.x-this.x;
	var beta=Math.atan2(deltaY,deltaX)+Math.PI;
	this.angle=lerpAngle(beta,this.angle,0.6);
	
	this.babyTailTimer+=deltaTime; //deltaTime��������֮֡��ļ��
	if(this.babyTailTimer>50){
	   this.babyTailCount=(this.babyTailCount+1)%8;
	   this.babyTailTimer%=50;
	}
	
	this.babyEyeTimer+=deltaTime;
	if(this.babyEyeTimer>this.babyEyeInterval){
		this.babyEyeCount=(this.babyEyeCount+1)%2;
	    this.babyEyeTimer%=this.babyEyeInterval;
		
		//ÿ��״̬��������ʱ��
		if(this.babyEyeCount==0){  //�۾���������״̬
			this.babyEyeInterval=Math.random()*1500+2000;
		}
		else{  //�۾�������״̬
			this.babyEyeInterval=200;
		}
	}
	
	this.babyBodyTimer+=deltaTime;
	if(this.babyBodyTimer>300){
		this.babyBodyCount++;
		this.babyBodyTimer%=300;
		if(this.babyBodyCount>19){
			this.babyBodyCount=19;
		   //��ʱ��Ҫ��ʾgame over
		   data.gameOver=true;
		}
	}
		
	ctx1.save();
	
	ctx1.translate(this.x,this.y); //ת�ƻ���ԭ��
	ctx1.rotate(this.angle);
	
	var Tailnum=this.babyTailCount;
	ctx1.drawImage(babyTail[Tailnum],-babyTail[Tailnum].width*0.5+23,-babyTail[Tailnum].height*0.5);
	var BodyNum=this.babyBodyCount
	ctx1.drawImage(babyBody[BodyNum],-babyBody[BodyNum].width*0.5,-babyBody[BodyNum].height*0.5);
	var eyeNum=this.babyEyeCount;
	ctx1.drawImage(babyEye[eyeNum],-babyEye[eyeNum].width*0.5,-babyEye[eyeNum].height*0.5);
	
	ctx1.restore();
}