var imgListDiv = $(".img-list");
var timerInner = null;
var timer = null;
var activeId = 1;
var nextId = 0;
var imgWidth = $("img").offsetWidth;
var circleArr = $(".circle").getElementsByTagName('a');
var intervalTime = 3000;
for (var i = 0; i < circleArr.length; i++) {
	circleArr[i].index = i + 1;
}


function startmove(target) {
	clearInterval(timerInner);
	timerInner = setInterval(function() {
		var speed = (target - imgListDiv.offsetLeft) / 6;
		speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
		imgListDiv.style.left = imgListDiv.offsetLeft + speed + "px";
	}, 30);
}


function rotate(clickId) {
	if (clickId) {
		nextId = clickId;
	} else {
		nextId = activeId <= 4 ? activeId + 1 : 1;
	}
	removeClass(circleArr[activeId - 1], "active");
	addClass(circleArr[nextId - 1], "active");

	startmove("-" + imgWidth * (nextId - 1));
	activeId = nextId;
}

timer = setInterval(rotate, intervalTime);


$.delegate(".circle", "a", "click", function() {
	clearInterval(timer);
	var clickId = this.index;
	rotate(clickId);
	timer = setInterval(rotate, intervalTime);
});