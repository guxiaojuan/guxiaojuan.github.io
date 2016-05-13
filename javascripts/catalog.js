var arr=new Array();

arr=[
    /*['单页面',
              ['IFE/ife6/ife6.htm','模拟报纸排版']
    ],*/
    ['网页部件',
              //['IFE/ife17/ife17.html','DOM生成柱状图图表'],
              //['IFE/ife19/ife19.htm','选择排序可视化'],
              ['http://htmlpreview.github.io/?https://github.com/guxiaojuan/IFE/blob/master/ife21/ife21.html','Tag模拟']
    ]
    ]

var list='';

for(var i=0;i<arr.length;i++){
    for(var j=0;j<arr[i].length;j++){
        if(j==0){
            list+='<div class="myMenu"><dt class="fMenu">'+arr[i][0]+'</dt><div class="sMenu">';
        }
        else{
            list+='<dd><a href=" '+arr[i][j][0]+' "target="_blank"--'+j+")"+arr[i][j][1]+'</a></dd>';
        }
  
     list+='</div></div>';
}

list='<div class="menu"><dl>'+list+'</dl></div>';
document.write(list);