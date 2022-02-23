window.onload = function () {

    if (getCookie("style_sheet") != "") {
        document.getElementById("pagestyle").setAttribute("href", getCookie("style_sheet"));
        if (document.getElementById("pagestyle").getAttribute("href") == "styles/dark-style.css")
            document.getElementById("drkMode").textContent = "Light Mode";
    } else {
        setCookie("style_sheet", "styles/style.css", 30);
        document.getElementById("drkMode").textContent = "Dark Mode";
    }
};