window.onload = function() {
    imgLocation('container', 'box');
    var dateInt = { 'date': [{ 'src': '1.jpg' }, { 'src': '2.jpg' }, { 'src': '3.jpg' }, { 'src': '4.jpg' }, { 'src': '5.jpg' }, { 'src': '6.jpg' }] };


    window.onscroll = function() {
        if (checkC()) {
            var cparent = document.getElementById('container');
            for (var i = 0; i < dateInt.date.length; i++) {
                var cbox = document.createElement('div');
                cbox.className = 'box';
                cparent.appendChild(cbox);
                var cimg = document.createElement('img');
                cimg.src = 'img/' + dateInt.date[i].src;
                cbox.appendChild(cimg);
            }
            imgLocation('container', 'box');
        };
    }
}

function imgLocation(parent, content) {
    var cparent = document.getElementById(parent);
    var ccontent = getChildElement(cparent, content);
    var imgWidth = ccontent[0].offsetWidth;
    var num = Math.floor(document.documentElement.clientWidth / imgWidth);
    cparent.style.cssText = 'width:' + num * imgWidth + 'px;margin:0 auto;';
    var boxHeightArr = [];
    for (var i = 0; i < ccontent.length; i++) {
        if (i < num) {
            boxHeightArr[i] = ccontent[i].offsetHeight;
        } else {
            var minheight = Math.min.apply(null, boxHeightArr);
            var minIndex = getminheightLocation(boxHeightArr, minheight);
            ccontent[i].style.position = 'absolute';
            ccontent[i].style.top = minheight + 'px';
            ccontent[i].style.left = ccontent[minIndex].offsetLeft + 'px';
            boxHeightArr[minIndex] = boxHeightArr[minIndex] + ccontent[i].offsetHeight;
        }
    }
} //锁定屏幕宽度。
function getminheightLocation(boxHeightArr, minheight) {
    for (var i in boxHeightArr) {
        if (boxHeightArr[i] == minheight) {
            return i;
        }
    }
}

function getChildElement(parent, content) {
    var contentArr = [];
    var allContent = parent.getElementsByTagName('*');
    for (var i = 0; i < allContent.length; i++) {
        if (allContent[i].className == content) {
            contentArr.push(allContent[i]);
        }
    }
    return contentArr;
} //获取所有子元素。
function checkC() {
    var cparent = document.getElementById('container');
    var allC = getChildElement(cparent, 'box');
    var lastH = allC[allC.length - 1].offsetTop + Math.floor(allC[allC.length - 1].offsetHeight / 2);
    var scrollH = document.documentElement.scrollTop || document.body.scrollTop;
    var documentH = document.documentElement.clientHeight;
    return (lastH < documentH + scrollH) ? true : false;
}
