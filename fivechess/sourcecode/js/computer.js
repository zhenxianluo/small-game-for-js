var manComputer=function(){
	var player=prompt('黑棋棋手？默认：','福尔康');
	if(player==null)player='福尔康';
	$('button').text(player+' 加油！');
	$($('header div')[1]).html('黑手<br>'+player);
	$($('header div')[3]).html('红手<br>阿尔法猫');
	var computer='阿尔法猫';
	var wins=[];
	for(var i=0;i<15;i++){
		wins[i]=[];
		for(var j=0;j<15;j++){
			wins[i][j]=[];
		}
	}
	$('#chesspanl').css('height',$('#chesspanl').width()+'px');
	var chess=$('#chesspanl').get(0);
	var context=chess.getContext('2d');
	var bizhi=450/chess.offsetWidth;
	var count,mywin=[],computerwin=[],chessBox,yxs,dsq,time,num,bz;
	var initcomputer=function(){
		count=0;
		for(var i=0;i<15;i++){
			for(var j=0;j<11;j++){
				for (var k=0;k<5;k++) {
					wins[i][j+k][count]=true;
				}
				count++;
			}
		}
		for(var i=0;i<15;i++){
			for(var j=0;j<11;j++){
				for (var k=0;k<5;k++) {
					wins[j+k][i][count]=true;
				}
				count++;
			}
		}
		for(var i=0;i<11;i++){
			for(var j=0;j<11;j++){
				for (var k=0;k<5;k++) {
					wins[i+k][j+k][count]=true;
				}
				count++;
			}
		}
		for(var i=0;i<11;i++){
			for(var j=14;j>3;j--){
				for (var k=0;k<5;k++) {
					wins[i+k][j-k][count]=true;
				}
				count++;
			}
		}
		for(var i=0;i<count;i++){
			mywin[i]=0;
			computerwin[i]=0;
		}
		chessBox=[],yxs=0,dsq,time=0,num=0,bz=true;
		for(var i=0;i<15;++i){
			chessBox[i]=[];
			for(var j=0;j<15;++j){
				chessBox[i][j]=0;
			}
		}
		$('button').text(player+' 加油！');
		$('#time').text('0');
		$('#num').text('0');
		clearInterval(dsq);
		context.fillStyle='white';
		context.fillRect(0,0,450,450);
		context.beginPath();
		for(var i=0;i<15;i++){
			context.moveTo(15+i*30,15);
			context.lineTo(15+i*30,435);
			context.moveTo(15,15+i*30);
			context.lineTo(435,15+i*30);
			context.stroke();
		}
		adot(3,3);
		adot(3,11);
		adot(7,7);
		adot(11,3);
		adot(11,11);
	}
	initcomputer();
	$('button').on('click',function(){
		if(num!=0&&confirm("确定重新开始游戏？")){
			 initcomputer();
		}
	})
	$('#chesspanl').on('click',function(e){
		if($('button').text().indexOf('胜')>-1)return;
		if(!bz)return;
		var x=Math.floor(e.offsetX*bizhi/30);
		var y=Math.floor(e.offsetY*bizhi/30);
		if(!chessBox[x][y]){
			if(!yxs){
				dsq=setInterval(function(){
					$('#time').text(++time);
				},1000);
				yxs=1;
			}
			step(x,y,1);
			chessBox[x][y]=1;
			$('#num').text(++num);
			for(var k=0;k<count;k++){
				if(wins[x][y][k]){
					mywin[k]++;
					computerwin[k]=6;
					if(mywin[k]==5){
						$('button').text(player+'胜');
						$('#show').append('<div><div id="show2">'+player+'</div><div id="show1">win</div><div id="show3">'+computer+'</div><div id="show4">'+$('#time').text()+'</div><div id="show5">'+$('#num').text()+'</div></div>');
						clearInterval(dsq);
						return;
					}
				}
			}
			bz=!bz;
			computerAI();
		}
	});
	function step(i,j,me){
		context.beginPath();
		context.arc(15+i*30,15+j*30,13,0,2*Math.PI);
		context.closePath();
		var gradient=context.createRadialGradient(15+i*30+2,15+j*30-2,13,15+i*30+2,15+j*30-2,0);
		if(me){
			gradient.addColorStop(0,'#0a0a0a');
			gradient.addColorStop(1,'#676767');
		}else{
			gradient.addColorStop(0,'#ff0000');
			gradient.addColorStop(1,'#f9f9f9');
		}
		context.fillStyle=gradient;
		context.fill();
	}
	function adot(i,j){
		context.beginPath();
		context.arc(15+i*30,15+j*30,5,0,2*Math.PI);
		context.closePath();
		context.fillStyle='black';
		context.fill();
	}
	function computerAI(){
		var myscore=[];
		var computerscore=[];
		var max=0;
		var u=0,v=0;
		for(var i=0;i<15;i++){
			myscore[i]=[];
			computerscore[i]=[];
			for(var j=0;j<15;j++){
				myscore[i][j]=0;
				computerscore[i][j]=0;
			}
		}
		for(var i=0;i<15;i++){
			for(var j=0;j<15;j++){
				if(chessBox[i][j]==0){
					for(var k=0;k<count;k++){
						if(wins[i][j][k]){
							if(mywin[k]==1){
								myscore[i][j]+=200;
							}else if(mywin[k]==2){
								myscore[i][j]+=400;
							}else if(mywin[k]==3){
								myscore[i][j]+=2000;
							}else if(mywin[k]==4){
								myscore[i][j]+=10000;
							}
							if(computerwin[k]==1){
								computerscore[i][j]+=220;
							}else if(computerwin[k]==2){
								computerscore[i][j]+=420;
							}else if(computerwin[k]==3){
								computerscore[i][j]+=2200;
							}else if(computerwin[k]==4){
								computerscore[i][j]+=20000;
							}
						}
					}
					if(myscore[i][j]>max){
						max=myscore[i][j];
						u=i;
						v=j;
					}else if(myscore[i][j]==max){
						if(computerscore[i][j]>computerscore[u][v]){
							u=i;
							v=j;
						}
					}
					if(computerscore[i][j]>max){
						max=computerscore[i][j];
						u=i;
						v=j;
					}else if(computerscore[i][j]==max){
						if(myscore[i][j]>myscore[u][v]){
							u=i;
							v=j;
						}
					}
				}
			}
		}
		step(u,v,false);
		chessBox[u][v]=2;
		for(var k=0;k<count;k++){
			if(wins[u][v][k]){
				computerwin[k]++;
				mywin[k]=6;
				if(computerwin[k]==5){
					$('button').text(computer+'胜');
					$('#show').append('<div style="color:darkred;"><div id="show2">'+player+'</div><div id="show1">not win</div><div id="show3">'+computer+'</div><div id="show4">'+$('#time').text()+'</div><div id="show5">'+$('#num').text()+'</div></div>');
					clearInterval(dsq);
					return;
				}
			}
		}
		bz=!bz;
	}
}