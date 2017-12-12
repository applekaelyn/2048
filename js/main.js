//运行游戏
var game={
	score:0,
	data:[],
}
	//初始化游戏
	function start(){
		score=0;
		data=[
		[0,0,0,0],
		[0,0,0,0],
		[0,0,0,0],
		[0,0,0,0],];
 		randomNum();
		randomNum();
		updateView();
	}
	//判断16宫格是否满了
	function isFull(){
		for(var i=0;i<4;i++)
			for(var j=0;j<4;j++)
				if(data[i][j]==0) return false;
		return true;
	}
	//在随机位置生成2或4
	function randomNum(){
		if(isFull()){return;}
		while(true){
			var row=Math.floor(Math.random()*(3-0+1)+0);
			var col=Math.floor(Math.random()*(3-0+1)+0);
			if(data[row][col]==0){
				data[row][col]=Math.random()<0.5?2:4;
				break;
			}			
		}
	}
	//判断能不能向左移动
	function canLeft(){
		for(var i=0;i<4;i++){
			for(var j=1;j<4;j++){
				if(data[i][j]!=0){
					if(data[i][j-1]==0||data[i][j]==data[i][j-1]){
						return true;
					}
				}
			}
		}
		return false;
	}
	//实现左移
	function moveLeft(){
		if(canLeft()){
			for(var i=0;i<4;i++){
				for(var z=0;z<3;z++){
						if(data[i][z]==0) {followLeft(i,z);}
					}
				for(var z=0;z<3;z++){
						if(data[i][z]==0) {followLeft(i,z);}
					}
				for(var j=0;j<3;j++){
					if(data[i][j]==data[i][j+1]) {score+=(data[i][j]*2);data[i][j]*=2;followLeft(i,j+1);}
					//if(data[i][j]==0) {data[i][j]=data[i][j+1];followRight(i,j+1);
				}
			}	
		}
	}
	//合并后,后面的元素左移
	function followLeft(i,j){
		for(;j<3;j++){
			data[i][j]=data[i][j+1];
		}
		data[i][3]=0;
	}
	//判断能不能向右移动
	function canRight(){
		for(var i=0;i<4;i++){
			for(var j=2;j>=0;j--){
				if(data[i][j]!=0){
					if(data[i][j+1]==0||data[i][j]==data[i][j+1]){
						return true;
					}
				}
			}
		}
		return false;
	}
	//实现右移
	function moveRight(){
		if(canRight()){
			for(var i=0;i<4;i++){
				for(var z=3;z>0;z--){
						if(data[i][z]==0) {followRight(i,z);}
					}
				for(var z=3;z>0;z--){
						if(data[i][z]==0) {followRight(i,z);}
					}
				for(var j=3;j>0;j--){
					if(data[i][j]==data[i][j-1]) {score+=(data[i][j]*2);data[i][j]*=2;followRight(i,j-1);}
					//if(data[i][j]==0) {data[i][j]=data[i][j-1];followRight(i,j-1);}
				}
			}
		}
	}
	//合并后后面的元素右移
	function followRight(i,j){
		for(;j>0;j--){
			data[i][j]=data[i][j-1];
		}
		data[i][0]=0;
	}
	//判断能不能向上移动
	function canUp(){
		for(var i=1;i<4;i++){
			for(var j=0;j<4;j++){
				if(data[i][j]!=0){
					if(data[i-1][j]==0||data[i][j]==data[i-1][j]){
						return true;
					}
				}
			}
		}
		return false;
	}
	//实现上移
	function moveUp(){
		if(canUp()){
			for(var j=0;j<4;j++){
				for(var z=0;z<3;z++){
						if(data[z][j]==0) {followUp(z,j);}
					}
				for(var z=0;z<3;z++){
						if(data[z][j]==0) {followUp(z,j);}
					}
				for(var i=0;i<3;i++){
					if(data[i][j]==data[i+1][j]) {score+=(data[i][j]*2);data[i][j]*=2;followUp(i+1,j);}
					//if(data[i][j]==0) {data[i][j]=data[i+1][j];followUp(i+1,j);}
				}
			}	
		}
	}
	//合并后后面的元素上移
	function followUp(i,j){
		for(;i<3;i++){
			data[i][j]=data[i+1][j];
		}
		data[3][j]=0;
	}
	//判断能不能向下移动
	function canDown(){
		for(var i=0;i<3;i++){
			for(var j=0;j<4;j++){
				if(data[i][j]!=0){
					if(data[i+1][j]==0||data[i][j]==data[i+1][j]){
						return true;
					}
				}
			}
		}
		return false;
	}
	//实现下移
	function moveDown(){
		if(canDown()){
			for(var j=0;j<4;j++){
				for(var z=3;z>0;z--){
						if(data[z][j]==0) {followDown(z,j);}
					}
				for(var z=3;z>0;z--){
						if(data[z][j]==0) {followDown(z,j);}
					}
				for(var i=3;i>0;i--){
					if(data[i][j]==data[i-1][j]) {score+=(data[i][j]*2);data[i][j]*=2;followDown(i-1,j);}
					//if(data[i][j]==0) {data[i][j]=data[i-1][j];followDown(i-1,j);}
				}
			}	
		}
	}
	//合并后后面的元素下移
	function followDown(i,j){
		for(;i>0;i--){
			data[i][j]=data[i-1][j];
		}
		data[0][j]=0;
	}
	//把游戏数据更新到界面上
	function updateView(){
		"use strict";
		for(var i=0;i<4;i++)
			for(var j=0;j<4;j++)
				{
					var li=$(".g"+i+""+j);
					var className=li.attr("class");
					console.log(className.substring(3,className.length));
					switch(data[i][j]){
						case 0:li.removeClass(className.substring(3,className.length)).addClass("zero");break;
						case 2:li.removeClass(className.substring(3,className.length)).addClass("two");break;
						case 4:li.removeClass(className.substring(3,className.length)).addClass("four");break;
						case 8:li.removeClass(className.substring(3,className.length)).addClass("eight");break;
						case 16:li.removeClass(className.substring(3,className.length)).addClass("sixteen");break;
						case 32:li.removeClass(className.substring(3,className.length)).addClass("thirty_two");break;
						case 64:li.removeClass(className.substring(3,className.length)).addClass("sixty_four");break;
						case 128:li.removeClass(className.substring(3,className.length)).addClass("oneTwoEight");break;
						case 256:li.removeClass(className.substring(3,className.length)).addClass("twoFiveSix");break;
						case 512:li.removeClass(className.substring(3,className.length)).addClass("fiveOneTwo");break;
						case 1024:li.removeClass(className.substring(3,className.length)).addClass("oneZeroTwoFour");break;
						case 2048:li.removeClass(className.substring(3,className.length)).addClass("twoZeroFourEight");break;
					}
				}
		$(".score").text(score);
	}
	//判断是否结束游戏
	function isGameOver(){
		if(!isFull()){return false;}
		for(var row=0;row<4;row++){
			for(var col=0;col<4;col++){
				if(col<3){
					if(data[row][col]==data[row][col+1]){
						return false;
					}
				}
				if(row<3){
					if(data[row][col]==data[row+1][col]){
						return false;
					}
				}
			}
		}
		return true;
	}
	//判断是否游戏通关
	function isWin(){
		for(var i=0;i<3;i++)
			for(var j=0;j<3;j++)
				if(data[i][j]==2048) return true;
		return false;
	}
	
var GAME = (function(w){
	function game(){
		this.start = function(){
			console.log("start");
		}
		this.version = "1.0";
		
	}
	game.prototype = {
		gameOver:function(){
			console.log("over!")
	
		}
	}
	return game;
})(window);
var game1 = new GAME();
var game2 = new GAME();
//加载游戏
$(document).ready(function(){
	start();
	$(".reset1").on("click",function(){
		start();
	});
	$(".reset2").bind("click",function(){
		$(".gameover").hide();
		start();
	});
	$(".reset3").bind("click",function(){
		$(".win").hide();
		start();
	});
	$(document).keydown(function(event){ 
		if(event.keyCode==37){
			moveLeft();	
			randomNum();
			updateView();
			if(isGameOver()){
				$(".gameover").show();
			}
			if(isWin()){
				$(".win").show();
			}
		}else if(event.keyCode==39){
			moveRight();
			randomNum();
			updateView();
			if(isGameOver()){
				$(".gameover").show();
			}
			if(isWin()){
				$(".win").show();
			}
		}
		else if(event.keyCode==38){
			moveUp();
			randomNum();
			updateView();
			if(isGameOver()){
				$(".gameover").show();
			}
			if(isWin()){
				$(".win").show();
			}
		}
		else if(event.keyCode==40){
			moveDown();	
			randomNum();
			updateView();
			if(isGameOver()){
				$(".gameover").show();
			}
			if(isWin()){
				$(".win").show();
			}
		}
	});
});
