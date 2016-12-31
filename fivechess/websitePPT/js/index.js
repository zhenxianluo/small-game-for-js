$(function(){
	console.log('haha');
	var chess=$('#fivechess').get(0);
	var context=chess.getContext('2d');
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
	var onestep=[
		{x:5,y:5,z:0},
		{x:5,y:6,z:1},
		{x:5,y:7,z:0},
		{x:5,y:8,z:1},
		{x:5,y:9,z:0},
		{x:6,y:9,z:1},
		{x:7,y:9,z:0},
		{x:8,y:9,z:1},
		{x:9,y:9,z:0},
		{x:9,y:10,z:1},
		{x:9,y:11,z:0},
		{x:9,y:12,z:1},
		{x:9,y:13,z:0},
		{x:8,y:13,z:1},
		{x:7,y:13,z:0},
		{x:6,y:13,z:1},
		{x:5,y:13,z:0},
		{x:6,y:6,z:0},
		{x:7,y:6,z:1},
		{x:8,y:6,z:0},
		{x:9,y:6,z:1}
	]
	var dsq,len=0;
	dsq=setInterval(function(){
		step(onestep[len].x,onestep[len].y,onestep[len].z);
		if(++len==onestep.length){
			clearInterval(dsq);
		}
		if(len==6)showlogo();
	},300);
	
	var bz=0,tpbz,imgwidth;
	
	$(window).on('resize',function(){
		imgwidth=tpbz*$('html').height();
		$('#imgshow').css('width',imgwidth);
		$('#bigimg').css('padding-left',($('html').width()-imgwidth)/2+'px');
	})
	$('#bigimg').hide();
	$('body').on('click',function(e){
		var target=e.target;
		if(bz==1){
			$('#bigimg').hide();
			bz=0;
			return;
		}
		if(target.id=='img'){
                        tpbz=$(target).width()/$(target).height();
                        imgwidth=tpbz*$('html').height();
	                $('#imgshow').css('width',imgwidth);
	                $('#bigimg').css('padding-left',($('html').width()-imgwidth)/2+'px');
			$('#imgshow').attr('src',target.src);
			$('#bigimg').show();
			bz=1;
		}
	})
	function showlogo(){
		context.fillStyle='white';
		context.fillRect(75,45,300,90);
		context.font="60px 黑体";
		context.fillStyle="blue";
		context.textAlign="center";
		var txt='单机五子棋';
		context.strokeStyle="blue";
		context.strokeText(txt,225,110);
	}
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
})
