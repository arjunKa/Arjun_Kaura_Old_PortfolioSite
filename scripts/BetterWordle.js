var words = [
    "weary",
    "thorn",
    "those"
];

// document.addEventListener('keydown', function(event) {
//     if(event.keyCode == 37) {
//         alert('Left was pressed');
//     }
//     else if(event.keyCode == 39) {
//         alert('Right was pressed');
//     }
// });

var indexRow = 0;
var indexCol = -1;

document.addEventListener('keydown', function (e) {
    var keynum;

    if (window.event.keyCode) { // IE                  
        keynum = e.keyCode;
    } else if (e.which) { // Netscape/Firefox/Opera                 
        keynum = e.which;
    }
    //alert(keynum+' was pressed');



    if (/^[a-zA-Z]*$/g.test(String.fromCharCode(keynum))) {

        if (indexCol >= 4) {
            indexCol = -1;
            indexRow++;

        }

        indexCol++;
        document.getElementsByTagName("table")[0].getElementsByTagName("tr")[indexRow].
            getElementsByTagName("th")[indexCol].innerHTML = String.fromCharCode(keynum);

    } else if (keynum == 8 || keynum == 46) {

        if (indexCol > -1) {

            document.getElementsByTagName("table")[0].getElementsByTagName("tr")[indexRow].
                getElementsByTagName("th")[indexCol].innerHTML = "";
            indexCol--;

        }

    }

});
