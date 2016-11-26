$(function(){
	var context=['游戏已开始，加油！','加油！','你可以的哦！','你最棒了！','战胜自己','玩的开心哦','哈哈哈，相信自己能行的！','信滔哥得永生！'];
	$('#container').css('height',$('body').width());
	$('#cover').css('height',$('body').width());
	$('#cover').css('top',$('#container').offset().top);
	$(window).resize(function(){
		$('#container').css('height',$('body').width());
		$('#cover').css('height',$('body').width());
	})
	$('#cover').hide();
	$('#yuantu').on('click',function(){
		$('#cover').show();
		setTimeout(function(){
			$('#cover').hide();
		},2000)
	})
	var dsq,same=[],dq;//dsq:定时器same:正确的图片dq:空白图的(id)位置
	var $imgs=$('img');
	function init(){
		same=[];
		$('header').html(context[Math.floor(Math.random()*context.length)]);
		var x=new Array(1,9,7,4,5,6,3,8,2);
		x.sort(function(){ return 0.5 - Math.random() })
    	for (var i = 0; i < $imgs.length; i++) {
    		var k=x.pop();
    		$($imgs[i]).attr('src','imgs/'+k+'.png');
    		if(k-i==1&&k!=3){
    			same.push(parseInt($($imgs[i]).attr('id')));
    		}
    		if(k==3)dq=i+1;
    	}
    	console.log(same);
    	var ct=0;
    	clearInterval(dsq);
    	dsq=setInterval(function(){
			$('#runtime').text(++ct);
		},1000)
	}
	$('#play').on('click',function(){
		if($(this).text()=="开始游戏"){
			init();
			$(this).text("重新游戏");
		}else if($(this).text()=="重新游戏"){
			if(confirm("您已经拼对 "+same.length+" 块图！确定重新开始游戏吗？")){
				init();
				$(this).text("重新游戏");
			}
		}
	})
	$('img').on('click',function(){
		var $id=parseInt($(this).attr('id'));
		var $srci=parseInt($(this).attr('src')[5]);
		console.log($id+' '+dq+' '+$srci);
		if(panduan($id,dq)){
			swapAToB($id,dq,$srci);
			dq=$id;
		}
		if(same.length==8)gameover();
	})
	function swapAToB(id,dq,srci){
		$($imgs[id-1]).attr('src','imgs/3.png');
		$($imgs[dq-1]).attr('src','imgs/'+srci+'.png');
		console.log(same.indexOf(id));
		if(same.indexOf(id)>=0)same.splice(same.indexOf(id),1);
		if(dq==srci)same.push(dq);
		console.log(same);
	}
	function panduan(id,dq){
		switch(id){
			case 1:return ((dq==2||dq==4)?true:false);
			case 2:return ((dq==1||dq==5||dq==3)?true:false);
			case 3:return ((dq==2||dq==6)?true:false);
			case 4:return ((dq==1||dq==5||dq==7)?true:false);
			case 5:return ((dq==2||dq==4||dq==6||dq==8)?true:false);
			case 6:return ((dq==3||dq==5||dq==9)?true:false);
			case 7:return ((dq==4||dq==8)?true:false);
			case 8:return ((dq==5||dq==7||dq==9)?true:false);
			case 9:return ((dq==8||dq==6)?true:false);
		}
	}
	function gameover(){
		clearInterval(dsq);
		alert("恭喜您！成功拼成完整图，用时 "+$('#time').text()+" 秒，请点击按钮重新开始游戏！");
		$('header').html("成功完成拼图，用时 "+$('#time').text()+" 秒");
		$('#time').text(0);
		$('header').html('拼图游戏，不喜勿喷~~');
		$('#play').text("开始游戏");
	}
})
