$.click("button", function() {
	var content = $('textarea').value;
	content = trim(content);
	var arr1 = content.split(/\n|\s+|;|；|,|，|、/);
	var arr2 = deleteBlank(uniqArray(arr1));
	var warnDiv = $('.warn');
	var showDiv = $('.show');
	if (arr2.length > 10 || arr2.length === 0) {
		warnDiv.style.display = "block";
		showDiv.style.display = "none";
	} else {
		warnDiv.style.display = "none";
		var checkBoxStr = "";
		for (var i = 0; i < arr2.length; i++) {
			checkBoxStr += '<input type="checkbox" /><lable>' + arr2[i] + '</lable><br>';
		}
		showDiv.innerHTML = checkBoxStr.substr(0);
		showDiv.style.display = "block";
	}
});