// JavaScript Document

//判断大鱼与果实之间的距离，碰撞检测

function momFruitsCollision(){
   if(!data.gameOver){
	   for(var i=0;i<fruit.num;i++){
		   if(fruit.alive[i]){
			   var l=calLength2(fruit.x[i],fruit.y[i],mom.x,mom.y);
			   if(l<700){   //如果大鱼与果实的距离小于某一个值，则果实被吃掉
				  fruit.dead(i);
				  data.fruitNum++; //吃到的果实数量加1
				  mom.momBodyCount++; //记录身体颜色变化计数
				  if(mom.momBodyCount>7)
					 mom.momBodyCount=7;
				  if(fruit.fruitType[i]=='blue'){
					  data.double=2;
				  }
				  else
				     data.double=1;
				  wave.born(fruit.x[i],fruit.y[i]);
					   
			   }
		   }
	   }
   }
}


//检测大鱼和小鱼的碰撞（大鱼喂小鱼）

function momBabyCollision(){
  if(data.fruitNum>0 && !data.gameOver){
		
	  var l=calLength2(mom.x,mom.y,baby.x,baby.y);
	  if(l<900){  //小鱼吃到食物，身体颜色恢复初始状态
		 baby.babyBodyCount=0;
		 mom.momBodyCount=0; //给小鱼喂食后，大鱼序列帧恢复
		 
		 data.addScore(); //分数更新
		 feed.born(baby.x,baby.y);
	  }
  }
	  
}








































