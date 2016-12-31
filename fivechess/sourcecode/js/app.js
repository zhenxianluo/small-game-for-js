var twoMan=function(){
	// 双人玩家游戏js代码
	var playerA=prompt('黑棋棋手？默认：','龙傲天');
	var playerB=prompt('红棋棋手？默认：','赵日天');
	if(playerA==null)playerA='龙傲天';
	if(playerB==null)playerB='赵日天';
	$($('header div')[1]).html('黑手<br>'+playerA);
	$($('header div')[3]).html('红手<br>'+playerB);
	$('#chesspanl').css('height',$('#chesspanl').width()+'px');
	var chessBox=[],yxs=0,dsq,time=0,num=0,bz=true,bizhi;
	var chess=$('#chesspanl').get(0);
	var context=chess.getContext('2d');
	// 初始化画棋盘
	var init=function(){
		chessBox=[],yxs=0,dsq,time=0,num=0,bz=true;
		for(var i=0;i<15;++i){
			chessBox[i]=[];
			for(var j=0;j<15;++j){
				chessBox[i][j]=0;
			}
		}
		$('button').text(playerA);
		$('#time').text('0');
		$('#num').text('0');
		clearInterval(dsq);
		context.fillStyle='white';
		context.fillRect(0,0,450,450);
		bizhi=450/chess.offsetWidth;
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
	init();
	$('button').on('click',function(){
		if(num!=0&&confirm("确定重新开始游戏？")){
			 init();
		}
	})
	$('#chesspanl').on('click',function(e){
		if($('button').text().indexOf('胜')>-1)return;
		var x=Math.floor(e.offsetX*bizhi/30);
		var y=Math.floor(e.offsetY*bizhi/30);
		if(!chessBox[x][y]){
			if(!yxs){
				dsq=setInterval(function(){
					$('#time').text(++time);
				},1000);
				yxs=1;
			}
			if(bz){
				step(x,y,1);
				chessBox[x][y]=1;
				$('#num').text(++num);
				$('button').text(playerB);
			}else{
				step(x,y,0);
				chessBox[x][y]=2;
				$('#num').text(++num);
				$('button').text(playerA);
			}
			var win=panduan(x,y);
			if(win==1){
				$('button').text(playerA+'黑子胜');
				$('#show').append('<div><div id="show2">'+playerA+'</div><div id="show1">win</div><div id="show3">'+playerB+'</div><div id="show4">'+$('#time').text()+'</div><div id="show5">'+$('#num').text()+'</div></div>');
				clearInterval(dsq);
			}else if(win==2){
				$('button').text(playerB+'红子胜');
				$('#show').append('<div style="color:darkred;"><div id="show2">'+playerA+'</div><div id="show1">not win</div><div id="show3">'+playerB+'</div><div id="show4">'+$('#time').text()+'</div><div id="show5">'+$('#num').text()+'</div></div>');
				clearInterval(dsq);
			}
			bz=!bz;
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
	function panduan(x,y){
		var ct=chessBox[x][y];
		var c=0,t=0,i,j,m,n;
		for(i=1;i<15;i++){
			if(chessBox[i][y]==chessBox[i-1][y]&&chessBox[i][y]==ct){
				++c;
				if(c==4)return ct;
			}else{
				c=0;
			}
			if(chessBox[x][i]==chessBox[x][i-1]&&chessBox[x][i]==ct){
				++t;
				if(t==4)return ct;
			}else{
				t=0;
			}
		}
		c=0,t=0;
		if(x>y){
			i=x-y+1;
			j=1;
		}else{
			i=1;
			j=y-x+1;
		}
		for(;i<15&&j<15;++i,++j){
			if(chessBox[i][j]==chessBox[i-1][j-1]&&chessBox[i][j]==ct){
				++t;
				if(t==4)return ct;
			}else{
				t=0;
			}
		}
		c=0,t=0;
		var s=x+y;
		for(i=x-1;i>=0&&s-i>=0&&i<15&&s-i<15;--i){
			if(chessBox[i][s-i]==ct){
				++t;
				if(t==4)return ct;
			}else break;
		}
		for(i=x+1;i>=0&&s-i>=0&&i<15&&s-i<15;++i){
			if(chessBox[i][s-i]==ct){
				++c;
				if(c==4)return ct;
			}else break;
		}
		if(c+t==4){
			return ct;
		}
		return 0;
	}
}