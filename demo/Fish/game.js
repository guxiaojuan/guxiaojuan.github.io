// JavaScript Document

var can1,can2,ctx1,ctx2;
var lastTime;//��һ��֡��ִ��ʱ��
var deltaTime;//��֮֡���ʱ����
var bgPic=new Image();//����ͼƬ

var momTail=[];//����ҡβ��
var momEye=[];//����գ�۾�
var momBodyOrange=[];//�Ե���ɫ��ʵ����仯
var momBodyBlue=[];
var babyTail=[];//С��ҡβ��
var babyEye=[];//С��գ�۾�
var babyBody=[]; //С������ı�ɫ����

document.body.onload=function(){
   init();
   lastTime=Date.now();
   deltaTime=0;
   gameloop();
	
}

var canWidth,canHeight;//�����Ŀ�Ⱥ͸߶�
var ani;//��������
var fruit;
var mom,baby;
var mx,my;//��������
var data; //��ֵ����
var wave; //�����ʳ����ײ֮���������Ч
var feed; //����ιС����������Ч
var dust; //Ư����
var dustPic=[];
function init(){
  	can1=document.getElementById("canvas1");
	ctx1=can1.getContext("2d"); 
	can2=document.getElementById("canvas2");
	ctx2=can2.getContext("2d");
	bgPic.src="src/background.jpg";
	
	data=new dataObj();
	
	//������¼�
	addEvent(can1,"mousemove",function(e){
	   if(!data.gameOver){
		   e=e || window.event;
		   if(e.offsetX || e.layerX){
			  mx=e.offsetX==undefined?e.layerX:e.offsetX;
			  my=e.offsetY==undefined?e.layerY:e.offsetY;
		   }
	   }
	});
	
	canWidth=can1.width;
	canHeight=can1.height;
	
	ani=new aniObj();
	ani.init();
	
	fruit=new fruitObj();
	fruit.init();
	
	for(var i=0;i<8;i++){
		momTail[i]=new Image();
		momTail[i].src="src/bigTail"+i+".png";
	}
	for(var i=0;i<2;i++){
		momEye[i]=new Image();
		momEye[i].src="src/bigEye"+i+".png";
	}
    for(var i=0;i<8;i++){
		momBodyOrange[i]=new Image();
		momBodyBlue[i]=new Image();
		momBodyOrange[i].src="src/bigSwim"+i+".png";
		momBodyBlue[i].src="src/bigSwimBlue"+i+".png";
	}

	mom=new momObj();
	mom.init();
	
	for(var i=0;i<8;i++){
		babyTail[i]=new Image();
		babyTail[i].src="src/babyTail"+i+".png";
	}
	
	for(var i=0;i<2;i++){
		babyEye[i]=new Image();
		babyEye[i].src="src/babyEye"+i+".png";
	}
	
	for(var i=0;i<20;i++){
		babyBody[i]=new Image();
		babyBody[i].src="src/babyFade"+i+".png";
	}
	
	baby=new babyObj();
	baby.init();
	
	mx=canWidth*0.5;
	my=canHeight*0.5;
	
	wave=new waveObj();
    wave.init();
	
	feed=new feedObj();
	feed.init();
	
   //�����ϵ�������ʽ
   ctx1.font="30px Verdana";
   ctx1.textAlign="center";
	
	for(var i=0;i<7;i++){
		dustPic[i]=new Image();
		dustPic[i].src="src/dust"+i+".png";
	}
	
   dust=new dustObj();
   dust.init();
}

function gameloop(){
  window.requestAnimFrame(gameloop); //������ʱrequestAnimationFrame����ڶ�ʱ�������ã��ú���֡��֮֡�������ȶ������������֧�ֶȲ�ͬ��������Ҫ������д
  var now=Date.now();
  deltaTime=now-lastTime;
  
  if(deltaTime>50) //��ֹ��ΪdeltaTime̫����ɹ�ʵ̫��
     deltaTime=50;
  lastTime=now;
  //console.log(deltaTime);
  drawBackground();
  ani.draw();
  fruitMonitor();
  fruit.draw();
  
  ctx1.clearRect(0,0,canWidth,canHeight);  //һ��Ҫ��ǰһ֡��������գ��������ֺܴ�����⣬��������
  mom.draw();
  baby.draw();
  
  momFruitsCollision();
  momBabyCollision();
  
  data.draw();
  wave.draw();
  feed.draw();
  dust.draw();
}

//����������¼�
function addEvent(elem,type,fun){
	if(elem.addEventLisener)
	   elem.addEventListener(type,fun,flase);
	else if(elem.attachEvent)
	   elem.attachEvent("on"+type,fun);
	else
	   elem['on'+type]=fun;
	   
}