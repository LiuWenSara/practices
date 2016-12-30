var leftBlock = $(".left-block");
var rightBlock = $(".right-block");
var z = 1;

var rightBlockLeft = rightBlock.offsetLeft;

init();


//排位置
function initPosition(block) {
  for (var i = 0; i < block.children.length; i++) {
    block.children[i].style.top = 60 * i + 1 + "px";
  }
}
//初始化位置
function init() {
  initPosition(leftBlock);
  initPosition(rightBlock);

  $.delegate(".left-block", "div", "mousedown", drag);
  $.delegate(".right-block", "div", "mousedown", drag);

}

//拖拽
function drag(e) {
  var ev = e || window.event;
  var target = ev.target || ev.srcElement;

  if (target.className.toLowerCase() != "move") {
    return;
  }
  //鼠标的位置
  var mouseX = ev.clientX;
  var mouseY = ev.clientY;
  //Block的位置
  var BlockX = target.offsetLeft;
  var BlockY = target.offsetTop;

  target.style.border = "1px solid #333";
  target.style.opacity = 0.5;

  target.style.zIndex = z++;

  var parent = target.parentNode;
  var firstmove = true;

  document.onmousemove = function(e) {
    if (firstmove) {
      parent.removeChild(target);
      $(".drag-block").appendChild(target);
    }
    firstmove = false;
    var ev = e || window.event;
    if (outScreen(ev.clientX, ev.clientY)) {
      target.parentNode.removeChild(target);
      parent.appendChild(target);
      if (parent.className.search("left-block") != -1) {
        target.style.left = 1 + "px";
      } else if (parent.className.search("right-block") != -1) {
        target.style.left = rightBlockLeft + 1 + "px";
      }
      initPosition(parent);
      document.onmousemove = null;
    } else {
      target.style.left = BlockX + ev.clientX - mouseX + "px";
      target.style.top = BlockY + ev.clientY - mouseY + "px";

      initPosition(parent);
    }
  };
  //鼠标松开事件
  document.onmouseup = function(e) {
    document.onmousemove = null;
    document.onmouseup = null;

    target.style.border = "none";
    target.style.borderBottom = "1px solid #333";
    target.style.opacity = 1;

    var ev = e || window.event;
    target.parentNode.removeChild(target);
    if (judgeInBlock(ev.clientX, ev.clientY, leftBlock)) {
      leftBlock.appendChild(target);
      target.style.left = 1 + "px";
      initPosition(leftBlock);
    } else if (judgeInBlock(ev.clientX, ev.clientY, rightBlock)) {
      rightBlock.appendChild(target);
      target.style.left = 1 + rightBlockLeft + "px";
      initPosition(rightBlock);
    } else {
      parent.appendChild(target);
      if (parent.className.search("left-block") != -1) {
        target.style.left = 1 + "px";
      } else if (parent.className.search("right-block" != -1)) {
        target.style.left = 1 + rightBlockLeft + "px";
      }
      initPosition(rightBlock);
    }
  };
  return false;
}


//是否出屏幕
function outScreen(x, y) {
  var screenWidth = document.documentElement.clientWidth;
  var screenHeight = document.documentElement.clientHeight;

  return x > screenWidth || y > screenHeight || x < 0 || y < 0;
}


//是否在right/left内
function judgeInBlock(x, y, block) {
  var x0 = getPosition(block).x;
  var x1 = getPosition(block).x + block.offsetWidth;
  var y0 = getPosition(block).y;
  var y1 = getPosition(block).y + block.offsetHeight;
  return x > x0 && x < x1 && y > y0 && y < y1;
}