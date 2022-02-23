

var indexRow = 0;
var indexCol = -1;



function keyboardCheck(keyInput) {

    if (/^[a-zA-Z]*$/g.test(keyInput)) {

        if (indexCol < 4) {

            indexCol++;
            document.getElementsByTagName("table")[0].getElementsByTagName("tr")[indexRow].
                getElementsByTagName("th")[indexCol].innerHTML = keyInput;

        }

    } else if (keyInput == 8 || keyInput == 46) {//delete

        if (indexCol > -1) {

            document.getElementsByTagName("table")[0].getElementsByTagName("tr")[indexRow].
                getElementsByTagName("th")[indexCol].innerHTML = "";
            indexCol--;

        }

    } else if (keyInput == 13) {//enter

        if (indexCol == 4 && arr_of_words.includes(getFullWord())) {

            checkWord();
            indexRow++;
            indexCol = -1;

        } else {
            var popup = document.getElementById("myPopup");
            popup.classList.toggle("show");

            //("#popUp").show();
            setTimeout(function () {
                (popup.classList.toggle("hide"))
            }, 1990);

            console.log("Not in word list.");

        }

    }


}


document.addEventListener('keydown', function (e) {
    var keynum;

    if (window.event.keyCode) { // IE                  
        keynum = e.keyCode;
    } else if (e.which) { // Netscape/Firefox/Opera                 
        keynum = e.which;
    }
    //alert(keynum+' was pressed');


    if (/^[a-zA-Z]*$/g.test(String.fromCharCode(keynum))) {

        if (indexCol < 4) {

            indexCol++;
            document.getElementsByTagName("table")[0].getElementsByTagName("tr")[indexRow].
                getElementsByTagName("th")[indexCol].innerHTML = String.fromCharCode(keynum);

        }

        //backspace is pressed
    } else if (keynum == 8 || keynum == 46) {

        if (indexCol > -1) {

            document.getElementsByTagName("table")[0].getElementsByTagName("tr")[indexRow].
                getElementsByTagName("th")[indexCol].innerHTML = "";
            indexCol--;

        }

    } else if (keynum == 13) {

        if (indexCol == 4 && arr_of_words.includes(getFullWord())) {
            //&& arr_of_words.includes(getFullWord())
            checkWord();
            indexRow++;
            indexCol = -1;

        } else {
            var popup = document.getElementById("myPopup");
            popup.classList.toggle("show");

            //("#popUp").show();
            setTimeout(function () {
                (popup.classList.toggle("hide"))
            }, 1990);

            console.log("Not in word list.");

        }

    }

});



var word;

launch();

function launch() {

    var obj;

    fetch('./sgb-words.txt') // fetch text file
        .then((resp) => resp.text())
        .then(data => obj = data.split("\n"))
        .then(() => chooseWord(obj))

}
var arr_of_words;
function chooseWord(arr) {
    //setArr(test)
    var index = Math.floor(Math.random() * arr.length);
    console.log(arr[index]);
    word = arr[index];
    arr_of_words = arr;
    setCookie("wordle_answer", + arr[index], 0.1);

    for (let i = 0; i < 5; i++) {
        if (map1.has(arr[i])) {
            map1.set(word.charAt(i), map1.get(word.charAt(i)) + 1);
        } else {
            map1.set(word.charAt(i), 1);
            //console.log(word.charAt(i) + ", " + map1.get(word.charAt(i)));


        }
    }

}

const map1 = new Map();
var map2;



function checkWord() {

    map2 = new Map(map1);
    var user_answer = "";
    var your_char;
    var ans_char;
    var table = document.getElementById('mytable');


    user_answer = getFullWord();

    for (let i = 0; i < 5; i++) {

        your_char = user_answer.charAt(i);

        ans_char = word.charAt(i);

        //console.log("userCh: " + your_char);
        //console.log("ansCh: " + ans_char);

        if (your_char == ans_char) {

            document.getElementsByTagName("table")[0].getElementsByTagName("tr")[indexRow].
                getElementsByTagName("th")[i].style.backgroundColor = "green";
            map2.set(your_char, map2.get(your_char) - 1);
            //console.log("ansCh: " + map2.get(your_char));
            //console.log("ansCh: " + map1.get(your_char));
        }
    }


    for (let i = 0; i < 5; i++) {

        your_char = user_answer.charAt(i);

        ans_char = word.charAt(i);
        console.log(your_char + " map: " + map1.get(your_char));
        if (your_char != ans_char && word.includes(your_char) && map2.get(your_char) > 0) {

            document.getElementsByTagName("table")[0].getElementsByTagName("tr")[indexRow].
                getElementsByTagName("th")[i].style.backgroundColor = "yellow";
            map2.set(your_char, map2.get(your_char) - 1);
            console.log(your_char + " map: " + map2.get(your_char));
        }
    }
    //console.log("user: " + user_answer);


}


function getFullWord() {
    var result = "";

    for (let i = 0; i < 5; i++) {
        result += document.getElementsByTagName("table")[0].getElementsByTagName("tr")[indexRow].
            getElementsByTagName("th")[i].innerHTML;
    }

    return result.toLowerCase();

}







