window.onload = function () {

    if (getCookie("style_sheet") != "") {
        //set style
        document.getElementById("pagestyle").setAttribute("href", getCookie("style_sheet"));

        //set text as Light mode:
        if (document.getElementById("pagestyle").getAttribute("href") == "styles/dark-style.css") {
            document.getElementById("drkMode").textContent = "Light Mode";
        } else {
            //set text as Dark mode:
            document.getElementById("drkMode").textContent = "Dark Mode";

        }
    } else {

        //if no cookies: do light mode
        setCookie("style_sheet", "styles/style.css", 30);
        document.getElementById("drkMode").textContent = "Dark Mode";
    }
};