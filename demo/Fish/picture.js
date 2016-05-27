
// JavaScript Document

//���Ʊ���
function drawBackground(){
  ctx2.drawImage(bgPic,0,0,canWidth,canHeight);
	
}

//���ƺ���,��Ҫ�ڶ������α���������
function aniObj(){
	this.rootx=[];
	this.headx=[];
	this.heady=[];
	this.alpha=0;  //���Һ����ĽǶ�
	this.amp=[]; //�����ڶ������
}

aniObj.prototype.num=50;
aniObj.prototype.init=function(){
	for(var i=0;i<this.num;i++){
	   this.rootx[i]=i*16+Math.random()*20;
	   this.headx[i]=this.rootx[i]; //��ʼ��ʱͷ���͸�����һ��ֱ����
	   this.heady[i]=canHeight-260+Math.random()*50;
	   this.amp[i]=Math.random()*50+50;
	}
}
aniObj.prototype.draw=function(){
	this.alpha+=deltaTime*0.0009;
	var l=Math.sin(this.alpha);
	
	ctx2.save();
	
	ctx2.globalAlpha=0.6;//͸����
	ctx2.lineWidth=20;
	ctx2.lineCap="round";
	ctx2.strokeStyle="#3b154e";
	for(var i=0;i<this.num;i++){
	    ctx2.beginPath();
		ctx2.moveTo(this.rootx[i],canHeight);  //��ʼ��
		this.headx[i]=this.rootx[i]+l*this.amp[i];
		//console.log(this.headx[i]);
		ctx2.quadraticCurveTo(this.rootx[i],canHeight-100,this.headx[i],this.heady[i]);
	//alert(this.x[i]);
		ctx2.stroke();
		
	}
	
	ctx2.restore();   //����ֻ��save��restore֮��������
}