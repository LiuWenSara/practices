//添加样式名
function addClass(element, newClassName) {
	var oldClassName = element.className; //获取旧样式名
	element.className = oldClassName == "" ? newClassName : oldClassName + "" + newClassName;
}
//移除样式名
function removeClass(element, oldClassName) {
	var originClassName = element.className;
	var pattern = new RegExp("\\b" + oldClassName + "\\b");
	element.className = trim(originClassName.replace(pattern, ""));
}
// 获取element相对于浏览器窗口的位置，返回一个对象{x, y}
function getPosition(element) {
	var pos = {};
	pos.x = element.getBoundingClientRect().left + Math.max(document.documentElement.scrollLeft, document.body.scrollLeft);
	pos.y = element.getBoundingClientRect().top + Math.max(document.documentElement.scrollTop, document.body.scrollTop);
	return pos;
}



//定义myQuery来区分定义id；TagName；属性
function myQuery(selector, root) {
	var signal = selector[0];
	var allChildren = null;
	var content = selector.substr(1);
	var crrArrt = null;
	var result = [];
	var root = root || document;

	switch (signal) {
		case '#':
			result.push(root.getElementById(content));
			break;
		case '.':
			var allChildren = root.getElementsByTagName('*');
			for (var i = 0; i < allChildren.length; i++) {
				crrArrt = allChildren[i].getAttribute('class');
				if (crrArrt !== null) {
					var crrArrtArr = crrArrt.split(/\s+/);
					for (var j = 0; j < crrArrtArr.length; j++) {
						if (content === crrArrtArr[j]) {
							result.push(allChildren[i]);
						}
					}
				}
			}
			break;
		case '[': //有属性无值
			var allChildren = root.getElementsByTagName('*');
			if (content.search('=') == -1) {
				for (var i = 0; i < allChildren.length; i++) {
					if (allChildren[i].getAttribute(selector.slice(1, -1)) != null) {
						result.push(allChildren[i]);
					}
				}
			} //有属性有值
			else {
				var pattern = /\[(\w+)\s*\=\s*(\w+)\]/; //为了分离等号前后的内容
				var cut = selector.match(pattern);
				var key = cut[1];
				var value = cut[2];
				for (var i = 0; i < allChildren.length; i++) {
					if (allChildren[i].getAttribute(key) == value) {
						result.push(allChildren[i]);
					}
				}
			}
			break;
		default: //tag
			result = root.getElementsByTagName(selector);
			break;
	}
	return result;
}


//定义选择器$
function $(selector) {
	if (!selector) {
		return null;
	}
	if (selector === document) {
		return document;
	}
	if (selector.indexOf(' ') === -1) {
		return myQuery(selector, document)[0];
	}
}

/*定义事件*/
//添加
function addEvent(element, event, listener) {
	if (element.addEventListener) {
		element.addEventListener(event, listener);
	} else if (element.attachEvent) {
		element.attachEvent('on' + event, listener);
	}
}
//移除
function removeEvent(element, event, listener) {
	if (element.removeEventListener) {
		element.removeEventListener(event, listener);
	} else if (element.detachEvent) {
		element.detachEvent('on' + event, listener);
	}
}



function addClickEvent(element, listener) {
	addEvent(element, 'click', listener);
}

function addEnterEvent(element, listener) {
	addEvent(element, 'keydown', function() {
		if (event.keycode === 13) {
			listener();
		}
	})
}
//事件代理
function delegateEvent(element, tag, eventName, listener) {
	addEvent(element, eventName, function(event) {
		var target = event.target || event.srcElement; //target为执行事件的元素IE不支持用srcElement；
		if (target.tagName.toLowerCase() === tag.toLowerCase()) {
			listener.call(target, event);
		}
	})
}



$.click = function(selector, listener) {
	addClickEvent($(selector), listener);
}
$.delegate = function(selector, tag, event, listener) {
	delegateEvent($(selector), tag, event, listener);
}


/*输入兴趣爱好*/
//匹配首尾的空白
function trim(str) {
	if (str.length != -1) {
		return str.replace(/^\s+|\s+$/g, '');
	}
}
//去重
function uniqArray(arr) {
	var newArr = [];
	for (var i in arr) {
		if (newArr.indexOf(arr[i] === -1)) {
			newArr.push(arr[i]);
		}
	}
	return newArr;
}
//去除数组中的空白
function deleteBlank(arr) {
	var arr2 = [];
	for (var i in arr) {
		if (arr[i].match(/\s+/) || arr[i] === '') {
			continue;
		} else {
			arr2.push(arr[i]);
		}
	}
	return arr2;
}