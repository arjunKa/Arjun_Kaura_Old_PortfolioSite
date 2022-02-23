var sheet = "";
function myFunction() {
	//document.getElementById("aboutMe").p.innerHTML += getCookie("style_sheet") +"test";

	//if it is light rn
	if (document.getElementById("pagestyle").getAttribute("href") == "styles/style.css") {

		sheet = "dark-style.css";
		document.getElementById("pagestyle").setAttribute("href", "styles/dark-style.css");
		document.getElementById("drkMode").textContent = "Light Mode";

	} else {

		sheet = "style.css";
		document.getElementById("pagestyle").setAttribute("href", "styles/style.css");
		document.getElementById("drkMode").textContent = "Dark Mode";
	}


	setCookie("style_sheet", sheet, 30);
}