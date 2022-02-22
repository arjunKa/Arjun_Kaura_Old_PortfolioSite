var sheet = "";
	function myFunction() {
		//document.getElementById("aboutMe").p.innerHTML += getCookie("style_sheet") +"test";

		//if it is light rn
		if (document.getElementById("pagestyle").getAttribute("href")=="style.css"){

		sheet = "dark-style.css";
		document.getElementById("pagestyle").setAttribute("href", "dark-style.css");
		document.getElementById("drkMode").textContent="Light Mode";

		}else{

		sheet = "style.css";
		document.getElementById("pagestyle").setAttribute("href", "style.css");
		document.getElementById("drkMode").textContent="Dark Mode";
		}

	
	setCookie("style_sheet",sheet,30);
	}