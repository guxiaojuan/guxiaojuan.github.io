// JavaScript Document

//跨浏览器获取页面（可视窗口）的大小

function getInner(){
  if(typeof window.innerWidth!='undefined'){    //为了去掉Firefox浏览器的滚动条宽度
	return{
		width:window.innerWidth,    
		height:window.innerHeight
    }    
  }	
  else{
	  return{
		 width:document.documentElement.clientWidth,
		 height:document.documentElement.clientHeight
	  }
  }
}

//跨浏览器事件绑定函数
function addEvent(elem,type,fun){
   if(elem.addEventListener)
      elem.addEventListener(type,fun,false);
   else if(elem.attachEvent)
      elem.attachEvent('on'+type,fun);
   else
      elem['on'+type]=fun;
	
}

//跨浏览器移除函数
function removeEvent(elem,type,fun){
	if(elem.removeEventListener)
	   elem.removeEventListener(type,fun,false);
	else if(elem.detachEvent)
	   elem.detachEvent('on'+typ,fun);
	else
	   elem['on'+type]=null;
						
}
//自动居中
function Center(elem){
   var screenWidth=getInner().width;
   var screenHeight=getInner().height;
   //alert(screenWidth);
   //alert(document.body.clientWidth);
   var elemWidth=elem.offsetWidth;
   var elemHeight=elem.offsetHeight;
   
   elem.style.left=(screenWidth-elemWidth)/2+"px";
   elem.style.top=(screenHeight-elemHeight)/2+"px";
}

var login=document.getElementById("login");
var floatDiv=document.getElementById("Div");
var sec=document.getElementById("sec");
var btn=document.getElementById("btn");
var Screen=document.getElementById("screen");

window.onload=function(){
	Screen.style.width=getInner().width+"px";
	Screen.style.height=getInner().height+"px";
	
	//锁频
   	addEvent(login,'click',function(){
	   //e=e || window.event;
	  floatDiv.style.display="block";
	  Center(floatDiv);
	  login.className="loginLock";
	  Screen.style.display="block";
	});
	
	
	//解除锁频
	addEvent(Screen,'click',function(){
		floatDiv.style.display="none";
		Screen.style.display="none";
		login.className="login";
	});
	
	addEvent(btn,'click',function(){
		floatDiv.style.display="none";
        Screen.style.display="none";
		login.className="login";
	});
	
	//浏览器缩放时会话框位于正中央
	addEvent(window,"resize",function(){
	   Center(floatDiv);
	   //alert("浏览器改变大小了");
	});
	
	var diffX=0,diffY=0;
	
	//拖动功能,鼠标在点下去再拖动，所以mousemove放在mousedown里边
	
	floatDiv.onmousedown=function(e){
		e=e || window.event;
		diffX=e.clientX-floatDiv.offsetLeft;
		diffY=e.clientY-floatDiv.offsetTop;
		
		document.onmousemove=function(e){
		   e=e || window.event;
		   var left=e.clientX-diffX;   //设置left和top是防止拖出去
		   var top=e.clientY-diffY;
		   if(left<0)  left=0;
		   if(left>getInner().width-floatDiv.offsetWidth)  
		        left=getInner().width-floatDiv.offsetWidth;
			  
		   if(top<0)  top=0;
		   if(top>getInner().height-floatDiv.offsetHeight)
		      top=getInner().height-floatDiv.offsetHeight;
		   floatDiv.style.left=left+"px";
		   floatDiv.style.top=top+"px";
		}
		
		document.onmouseup=function(){
		   document.onmousemove=null;
		   document.onmouseup=null;
		}
		
	}
	 
	 /*不明白下面的代码在mouseup那里为什么会出错，没办法，只好改成上班那部分了，会继续回来修改的
	
	addEvent(floatDiv,"mousedown",function(e){
	    e=e || window.event;
		e.preventDefault();
		diffX=e.clientX-floatDiv.offsetLeft;
	    diffY=e.clientY-floatDiv.offsetTop;
		
		addEvent(document,"mousemove",function(e){
			e=e || window.event;
			floatDiv.style.left=e.clientX-diffX+"px";
			floatDiv.style.top=e.clientY-diffY+"px";
	   });
		
		//鼠标松开时要停止移动
		addEvent(document,"mouseup",function(){
		    alert("鼠标已松开");
	       removeEvent(document,"mousemove",null);
		   removeEvent(document,"mouseup",null);
		
		});
		document.onmouseup=function(){
		  document.onmousemove=null;
		  document.onmouseup=null;
	   }
		
	});
	*/
	
}