var clock;
$.click('button',function(){
    clearInterval(clock);
    var pattern=/^\d{4}-((0[1-9])|(1[0-2]))-((0[1-9])|([1-2]\d)|(3[0-1]))$/;// 判断时间格式
    var showDiv=$(".show");
    var inputValue=$("input").value;

    if(pattern.test(inputValue)){
       var futureTime=new Date(inputValue.replace('-','/'));
       var futureTimeArr=inputValue.split("-");

       clock=setInterval(count,1000);

       function count() {
       	var crrTime=new Date();
       var gap=futureTime-crrTime;
       	  if(gap<0){
       	  	clearInterval(clock);
       	  	showDiv.innerHTML="请输入未来的时间";
       	  	return;
       	  }else if(gap===0){
       	  	clearInterval(clock);
       	  	showDiv.innerHTML="距离"+futureTimeArr[0]+"年"+futureTimeArr[1]+"月"+futureTimeArr[2]+"日还有0天0小时0分0秒";
       	  	return;
       	  }else{//得到的时间是以毫秒为单位的时间
       	  	var day=Math.floor(gap/1000/3600/24);
       	  	var hour=Math.floor(gap%(1000*3600*24)/(1000*3600));
       	  	var minute=Math.floor(gap%(1000*3600*24)%(1000*3600)/(1000*60));
       	  	var second=Math.floor(gap%(1000*3600*24)%(1000*3600)%(1000*60)/1000);
            showDiv.innerHTML="距离"+futureTimeArr[0]+"年"+futureTimeArr[1]+"月"+futureTimeArr[2]+"日还有"+day+"天"+hour+"小时"+minute+"分钟"+second+"秒";
       	  }
       }
    }else{
    	showDiv.innerHTML="请检查您的输入格式";
    }
});