function showPic(getpicture) {
	var source = getpicture.getAttribute("href");
	var placeholder = document.getElementById("placeholder");
	placeholder.setAttribute("src", source);
	var text = getpicture.getAttribute("title");
	var description = document.getElementById("description");
	description.firstChild.nodeValue = text;

}