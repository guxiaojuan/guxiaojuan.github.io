// JavaScript Document

//�жϴ������ʵ֮��ľ��룬��ײ���

function momFruitsCollision(){
   if(!data.gameOver){
	   for(var i=0;i<fruit.num;i++){
		   if(fruit.alive[i]){
			   var l=calLength2(fruit.x[i],fruit.y[i],mom.x,mom.y);
			   if(l<700){   //����������ʵ�ľ���С��ĳһ��ֵ�����ʵ���Ե�
				  fruit.dead(i);
				  data.fruitNum++; //�Ե��Ĺ�ʵ������1
				  mom.momBodyCount++; //��¼������ɫ�仯����
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


//�������С�����ײ������ιС�㣩

function momBabyCollision(){
  if(data.fruitNum>0 && !data.gameOver){
		
	  var l=calLength2(mom.x,mom.y,baby.x,baby.y);
	  if(l<900){  //С��Ե�ʳ�������ɫ�ָ���ʼ״̬
		 baby.babyBodyCount=0;
		 mom.momBodyCount=0; //��С��ιʳ�󣬴�������֡�ָ�
		 
		 data.addScore(); //��������
		 feed.born(baby.x,baby.y);
	  }
  }
	  
}








































