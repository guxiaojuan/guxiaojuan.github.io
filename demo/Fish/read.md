                                                canvas小游戏之爱心鱼总结

    Demo链接：http://guxiaojuan.github.io/demo/Fish/game.htm
    
    这款游戏主要是涉及到对HTML5的canvas中的一些API的学习，同时还涉及到了轮播序列帧，碰撞检测，贝塞尔曲线以及游戏中的
    一些基本操作，如一个值向另一个值的趋近等
    
    过程：
    1.首先就是搭建主页面。把画布分为两层，其中上层的canvas1绘制大小鱼，漂浮物以及基本的UI，下层即里层的canvas1绘制背景，
    海葵和海葵产生的果实

    2.由于是游戏，就要让其中的海葵啊，大鱼小鱼之类的像动画一样动起来。怎么能够让动起来，此时就需要定义一个变量来将当前
    状态与下一个状态联系起来，即控制两个动画帧之间的时间间隔。代码中我们用了deltaTime来表示两帧之间的间隔。同时不能让
    deltaTime这个值无限变大。

     var now=Date.now();
     deltaTime=now-lastTime;
     if(deltaTime>50)
         deltaTime=50;
     lastTime=now;

    3.海葵的绘制
      
      首先需要用drawImage()函数来引入背景图片.接下来就要准备画海葵了，对于海葵，我们得定义它的位置坐标，由于海葵是在不断
      运动的，所以我们要定义它的头部坐标和根部坐标，即headx,heady,rootx,rooty.但是由于根部并不需要运动，所以rooty其实并
      不需要，所以我们不用定义，由于不止一个海葵，所以这些参数都应该定义为数组。同时海葵是需要左右摇摆的，所以在绘制海葵
      时我们就需要用到贝塞尔二次曲线的概念了，画该二次曲线用到的API函数时quadraticCurveTo(),该函数接受4个参数，起始点的坐
      标，控制点的坐标。其中起始点的坐标就是海葵的根部坐标了，由于根部我们并没有定义y坐标，但是我们可以给它一个固定值，代
      码中用了canHeight-100,其中canHeight是画布的高度；控制点则就是海葵的头部坐标了。可是海葵的头部坐标怎么计算呢。头部的
      纵坐标可以用随机函数得到，横坐标用到了正弦函数。这里的数据处理老师真是用的非常好，用deltaTime得到一个角度，然后得到
      它的正弦值L。由于各个海葵的摆动幅度不同，所以我们需要用一个数组amp来控制各个海葵摆动的振幅。amp数组用也用random函数
      来得到。
          this.alpha+=deltaTime*0.0009;   //角度
          var L=Math.sin(this.alpha);    //正弦值
          this.amp[i]=Math.random()*50+50;  //摆动的幅度
          
      头部坐标
          this.head[x]=this.root[x]+L*this.amp[i];

      二次曲线绘制
          quadraticCurveTo(this.rootx[i],canHeight-100,this.headx[i],this.heady[i]);


    4.绘制果实
    
      首先，果实是由海葵产生的，所以果实的产生位置与海葵的头部坐标有关。同时，海葵有两种，橙色和蓝色，可以使用随机数来确定
      产生什么颜色。果实在产生过程中，会慢慢长大，但是不能一直长大，此时就需要设置一个临界值来限制果实的大小。果实也不是一直
      存在，等它漂浮出页面之后，我们就可以认为它已经死了，所以要为果实设置一个alive属性来保证果实是否活着。大鱼只能吃活着的
      果实。

      在构造函数中，需要设置果实的位置坐标，果实的alive状态，果实的半径（需要长大），果实的上升速度，果实的类型（橙色和蓝色）。
      需要保证在画面中的果实不能太多，也不能太少，所以fruitMonitor函数就是用来监视每个时刻留在画面中的果实，如果果实太少，就
      使用sendFruit函数，该函数内部调用了果实生成函数born。
      在画果实时，主要还是对果实长大过程的控制。这里，我们用this.l[i]+=this.spd[i]*deltaTime来决定果实的半径。spd数组保存每
      个果实长大的速度，随机函数得到。代码中限制了如果果实半径大于15则开始让果实往上飘，即改变y坐标 this.y[i]-=this.spd[i]*
      deltaTime;(强调，canvas画布是从上往下为正方向~）


    5.绘制大鱼和小鱼
      
      鱼分为head,body,tail三部分，因为画布上的覆盖问题，所以我们需要先画尾巴，接着身体，最后眼睛。大鱼和小鱼的绘制是相似的，
      搞懂其中一个，另一个直接模仿即可。
     
      需要搞清楚，大鱼是随着鼠标移动，而小鱼是随着大鱼移动。在这里我们就要考虑下怎么来得到大鱼的坐标。设定鼠标的坐标为mx,
      my,那么原点与鼠标这条直线的斜率就是tan(Angle)=my/mx,现在大鱼要跟随鼠标，所以大鱼的坐标点也应该尽可能的在这条直线上，
      即this.angle要尽可能趋于arctan(Angle)，这个角度就可以让我们的大鱼来跟着鼠标旋转运动
             大鱼坐标获得：
               this.x=lerpDistance(mx,this.x,0.9);
               this.y=lerpDistance(my,this.y,0.9);
             角度获得：
               var deltaX=mx-this.x;
               var deltaY=my-this.y;
               var beta=Math.atan2(deltaY,delataX)+Math.PI;
               this.angle=lerpAngle(beta,this.angle,0.6)
             转化原点：
               ctx1.translate(this.x,this.y);
             跟随鼠标旋转
               ctx1.rotete(this.angle);
                    
      接下来就需要介绍下lerpDistance和lerpAngle这两个函数了，这两个函数是让一个值趋于某个目标值。即大鱼的横纵坐标尽量趋于鼠标
      坐标，而大鱼的斜率也鼠标的斜率。这两个函数的定义如下：
          function lerpAngle(a, b, t) {
	    var d = b - a;
	    if (d > Math.PI) d = d - 2 * Math.PI;
	    if (d < -Math.PI) d = d + 2 * Math.PI;
	    return a + d * t;
         }

        function lerpDistance(aim, cur, ratio) {
	   var delta = cur - aim;
	   return aim + delta * ratio;
        }

      

      同时，需要做大鱼和小鱼的动画，即眨眼睛啊，摇尾巴这种，吃到食物身体需要变色。其实这个大鱼小鱼的动画是很简单的，就是几张图
      片的轮播，我们需要时间间隔，比如在设置眼睛时，眨眼睛和闭眼睛的间隔是不一样的。在设置这些值时，还是要用到一个很重要的变量
      deltaTime来设置每张图片轮播的间隔时间。大鱼的绘制和动画与大鱼的类似。

      眼睛的动画效果代码：
      this.babyEyeTimer+=deltaTime;
	if(this.babyEyeTimer>this.babyEyeInterval){
		this.babyEyeCount=(this.babyEyeCount+1)%2;
	    this.babyEyeTimer%=this.babyEyeInterval;
		
		//每个状态所持续的时间
		if(this.babyEyeCount==0){  //眼睛眯起来的状态
			this.babyEyeInterval=Math.random()*1500+2000;
		}
		else{  //眼睛睁开的状态
			this.babyEyeInterval=200;
		}
	}
	

  6.碰撞检测

    游戏中，我们的大鱼需要碰到食物，然后大鱼还需要碰到小鱼来喂它，所以就需要进行碰撞检测。
    在检测碰撞时，需要计算两个点的距离，就需要用到两点间的距离公式，不过不需要计算的那么精确，所以就不需要开根号了。计算距离
    函数
     function calLength2(x1, y1, x2, y2) {
	return Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2);
     }

  7.分数计算

    吃到一个蓝色果实20分，吃到一个橙色果实10分，当小鱼在一定时间限制内还没有吃到果实，则生命值结束，游戏中以小鱼身体变白为游戏
    结束的标志。

    if(this.babyBodyTimer > 250) {
    this.babyBodyCount = this.babyBodyCount + 1;   //身体逐帧变白
    //身体变白的时间
    this.babyBodyTimer %= 250;    //身体变化的时间
    if(this.babyBodyCount > 19) {
      this.babyBodyCount = 19;    //完全变白
      //gameover
      data.gameOver = true;


   8.分数显示
    
     在游戏界面显示分数或者gameover字样时，用到了一些用于美化的API
     shadowBlur:设置阴影的模糊级数
     shadowColor:设置阴影的颜色

     比较突出的一个地方是字体透明度的设置，为了不让文字突然出现在画布上，我们用了rgba来勾画。

     
   if(this.gameOver){
	 this.alpha+=deltaTime*0.0002;
	 if(this.alpha>1)
	    this.alpha=1;
	 ctx1.fillStyle="rgba(255,255,255,"+this.alpha+")";
	 //ctx1.fillStyle="white";
	 ctx1.fillText("Game Over",w*0.5,h*0.5);   
   }
   


PS:这个小游戏练习中的素材来自于慕课网，自己做的项目太少，对于有些数值具体取多少不能直接可以给出~努力努力
      
      




































