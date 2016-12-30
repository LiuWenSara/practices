var suggestData = ['a', 'abandon', 'abdomen', 'abide', 'ability', 'able', 'abnormal', 'aboard', 'abolish', 'abound', 'about', 'above', 'fiction', 'field', 'fierce', 'fight', 'test2', 'test3'];
var inputArea = $("input");
var ulArea = $("ul");

addInputListener(); //监听input
clickLi(); //鼠标点击li
keydownLi(); //键盘事件  

//监听input事件
function addInputListener() {
  if (inputArea.addEventListener) {
    inputArea.addEventListener("input", onInput);
  } else if (inputArea.attachEvent) {
    inputArea.attachEvent("onpropertychange", onPropChanged);
  }
}

function onInput(event) {
  var inputValue = event.target.value;
  handleInput(inputValue);
}

function onPropChanged(event) {
  var inputValue = " ";
  if (event.propertyName.toLowerCase() == "value") {
    inputValue = event.srcElement.value;
    handleInput(inputValue);
  }
}


function handleInput(inputValue) {
  var liString = "";
  var pattern = new RegExp("^" + inputValue, "i");
  if (inputValue === " ") {
    ulArea.style.display = "none";
  } else {
    for (var i = 0; i < suggestData.length; i++) {
      if (suggestData[i].match(pattern)) {
        liString += "<li><span>" + inputValue + "</span>" + suggestData[i].substr(inputValue.length) + "</li>";
      }
    }
    ulArea.innerHTML = liString;
    ulArea.style.display = "block";
  }
}

//点击事件

function clickLi() {
  delegateEvent("ulArea", "li", "mouseover", function() {
    addClass(this, "active");
  });
  delegateEvent("ulArea", "li", "mouseout", function() {

    removeClass(this, "active");
  });
  delegateEvent("ulArea", "li", "click", function() {
    inputArea.value = deleteSpan(this.innerHTML);
    ulArea.style.display = "none";
  });
}
//键盘事件
function keydownLi() {
  addEvent(inputArea, "keydown", function(event) {
    var highLightLi = $(".active");
    if (event.keyCode == 40) {
      if (highLightLi) {
        var nextLi = highLightLi.nextSibling;
        if (nextLi) {
          removeClass(highLightLi, "active");
          addClass(nextLi, "active");
        }
      } else {
        addClass($("li"), "active");
      }
    }
    if (event.keyCode == 38) {
      if (highLightLi) {
        var preLi = highLightLi.previousSibling;
        if (preLi) {
          removeClass(highLightLi, "active");
          addClass(preLi, "active");
        }
      } else {
        addClass($("li"), "active");
      }
    }
    if (event.keyCode == 13) {
      if (highLightLi) {
        inputArea.value = deleteSpan(highLightLi.innerHTML);
        ulArea.style.display = "none";
      }
    }
  });
}

//删除span标签，获取字符串
function deleteSpan(string) {
  var pattern = /^<span>(\w+)<\/span>(\w+)$/;
  var stringArr = string.match(pattern);
  return stringArr[1] + stringArr[2];
}