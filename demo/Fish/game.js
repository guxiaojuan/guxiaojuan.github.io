// JavaScript Document

var can1,can2,ctx1,ctx2;
var lastTime;//上一个帧的执行时间
var deltaTime;//两帧之间的时间间隔
var bgPic=new Image();//背景图片

var momTail=[];//大鱼摇尾巴
var momEye=[];//大鱼眨眼睛
var momBodyOrange=[];//吃到橙色果实身体变化
var momBodyBlue=[];
var babyTail=[];//小鱼摇尾巴
var babyEye=[];//小鱼眨眼睛
var babyBody=[]; //小鱼身体的变色数组

document.onload=function(){
   init();
   lastTime=Date.now();
   deltaTime=0;
   gameloop();
	
}

var canWidth,canHeight;//背景的宽度和高度
var ani;//海葵对象
var fruit;
var mom,baby;
var mx,my;//鼠标的坐标
var data; //分值计算
var wave; //大鱼和食物碰撞之后的涟漪特效
var feed; //大鱼喂小鱼后的涟漪特效
var dust; //漂浮物
var dustPic=[];
function init(){
  	can1=document.getElementById("canvas1");
	ctx1=can1.getContext("2d"); 
	can2=document.getElementById("canvas2");
	ctx2=can2.getContext("2d");
	bgPic.src="src/background.jpg";
	
	data=new dataObj();
	
	//绑定鼠标事件
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
	
   //画布上的字体样式
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
  window.requestAnimFrame(gameloop); //做动画时requestAnimationFrame相较于定时器更好用，该函数帧与帧之间间隔不稳定，各家浏览器支持度不同，所以需要进行重写
  var now=Date.now();
  deltaTime=now-lastTime;
  
  if(deltaTime>50) //防止因为deltaTime太大造成果实太大
     deltaTime=50;
  lastTime=now;
  //console.log(deltaTime);
  drawBackground();
  ani.draw();
  fruitMonitor();
  fruit.draw();
  
  ctx1.clearRect(0,0,canWidth,canHeight);  //一定要把前一帧的内容清空，否则会出现很大的问题，各种涟漪
  mom.draw();
  baby.draw();
  
  momFruitsCollision();
  momBabyCollision();
  
  data.draw();
  wave.draw();
  feed.draw();
  dust.draw();
}

//跨浏览器绑定事件
function addEvent(elem,type,fun){
	if(elem.addEventLisener)
	   elem.addEventListener(type,fun,flase);
	else if(elem.attachEvent)
	   elem.attachEvent("on"+type,fun);
	else
	   elem['on'+type]=fun;
	   
}
