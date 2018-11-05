// 
//  flow.js
//  <主要逻辑>
//
const data = [1,2,3,4]

var steps = [];
var canvas = document.getElementById("myCanvas");
var cxt = canvas.getContext('2d');

var start = new Start(600,25);//新建开始对象

data.forEach((item,index)=>{
	var step = new Step(600,25+100*(index+1))
	steps.push(step)
})

steps.forEach((step,index)=>{
	if(index===0){start.drawBottomToTop(step)}
	if(index<steps.length-1){
		step.drawBottomToTop(steps[index+1])
	}
	if(index === 1){
		step.drawRoundLine(steps[index+2])
	}
})

canvas.onclick = function(e) { //给canvas添加点击事件
	e = e || event; //获取事件对象
	//获取事件在canvas中发生的位置
	var x = e.clientX - canvas.offsetLeft;
	var y = e.clientY - canvas.offsetTop;
	//如果事件位置在矩形区域中
	steps.forEach((step)=>{
		if(x>=step.x-step.w/2 && x<=step.x+step.w/2 && y>=step.y-step.h/2 && y<=step.y+step.h/2){
			console.log(step,)
		}
	})
}