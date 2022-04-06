

var indexRow = 0;
var indexCol = -1;
var gameEnd = false;

function getElementByTextContent(text) {
    var spanList = document.getElementsByTagName("button");

    for (var i = 0, len = spanList.length; i < len; i++) {
        if (spanList[i].textContent.toLowerCase() == text.toLowerCase()) // use .innerHTML if you need IE compatibility
            return spanList[i]
    }
}
var val;
function keyboardCheck(keyInput) {

    if (!gameEnd) {

        if (typeof keyInput == "string") {
            keyInput = keyInput.charCodeAt(0);

        }

        if (/^[a-zA-Z]*$/g.test(String.fromCharCode(keyInput))) {

            if (indexCol < 4) {

                indexCol++;
                document.getElementsByTagName("table")[0].getElementsByTagName("tr")[indexRow].
                    getElementsByTagName("th")[indexCol].innerHTML = String.fromCharCode(keyInput);

            }

        } else if (keyInput == 8 || keyInput == 46) {//delete

            if (indexCol > -1) {

                document.getElementsByTagName("table")[0].getElementsByTagName("tr")[indexRow].
                    getElementsByTagName("th")[indexCol].innerHTML = "";
                indexCol--;

            }

        } else if (keyInput == 13) {//enter
            //check_if_word_exists(getFullWord());
            if (indexCol == 4 && arr_of_words.includes(getFullWord())) {

                if (getFullWord() == word) {


                    modalForWin();

                } else if (indexRow + 1 > 5 && getFullWord() != word) {
                    gameEnd = true;
                    modalForLoss();
                }

                checkWord();
                indexRow++;
                indexCol = -1;


            } else {
                //console.log(check_if_word_exists(getFullWord()));
                var popup = document.getElementById("myPopup");
                popup.classList.toggle("show");

                //("#popUp").show();
                setTimeout(function () {
                    (popup.classList.toggle("hide"))
                }, 1990);



            }

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

    keyboardCheck(keynum);

});



var word;

launch();

function launch() {

    var obj;


    fetch('./wordle-answers.txt') // fetch text file
        .then((resp) => resp.text())
        .then(data => obj = data.split("\n"))
        .then(() => chooseWord(obj))

    fetch('./word-list.txt') // fetch text file
        .then((resp) => resp.text())
        .then(data => obj = data.split("\n"))
        .then(() => setWordList(obj))

}
var arr_of_words;
function chooseWord(arr) {
    //setArr(test)
    var index = Math.floor(Math.random() * arr.length);

    word = arr[index];

    // arr_of_words = arr;
    setCookie("wordle_answer", + arr[index], 0.1);

    for (let i = 0; i < 5; i++) {
        if (map1.has(word.charAt(i))) {
            map1.set(word.charAt(i), map1.get(word.charAt(i)) + 1);
        } else {
            map1.set(word.charAt(i), 1);
        }
    }



}

function setWordList(arr) {

    arr_of_words = arr;

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



        if (your_char == ans_char) {

            document.getElementsByTagName("table")[0].getElementsByTagName("tr")[indexRow].
                getElementsByTagName("th")[i].style.backgroundColor = "green";
            map2.set(your_char, map2.get(your_char) - 1);
            getElementByTextContent(your_char).style.backgroundColor = "green";

        }
    }


    for (let i = 0; i < 5; i++) {

        your_char = user_answer.charAt(i);

        ans_char = word.charAt(i);

        if (your_char != ans_char && word.includes(your_char) && map2.get(your_char) > 0) {

            document.getElementsByTagName("table")[0].getElementsByTagName("tr")[indexRow].
                getElementsByTagName("th")[i].style.backgroundColor = "DarkOrange";
            getElementByTextContent(your_char).style.backgroundColor = "DarkOrange";
            map2.set(your_char, map2.get(your_char) - 1);

        } else if (!word.includes(your_char)) {
            getElementByTextContent(your_char).style.backgroundColor = "gray"
            document.getElementsByTagName("table")[0].getElementsByTagName("tr")[indexRow].
                getElementsByTagName("th")[i].style.backgroundColor = "rgb(20, 20, 20)";

        }
    }



}


function getFullWord() {
    var result = "";

    for (let i = 0; i < 5; i++) {
        result += document.getElementsByTagName("table")[0].getElementsByTagName("tr")[indexRow].
            getElementsByTagName("th")[i].innerHTML;
    }

    return result.toLowerCase();

}

var modal;
function modalForWin() {
    gameEnd = true;
    modal = document.getElementById("myModal");
    document.getElementById("modal-text").innerText = "You won!\nThe word was " + word + ".";
    var span = document.getElementsByClassName("close")[0];
    modal.style.display = "block";
    span.onclick = function () {
        modal.style.display = "none";
    }

}

function modalForLoss() {
    gameEnd = true;
    modal = document.getElementById("myModal");
    document.getElementById("modal-text").innerText = "You were unable to find the word.\n"
        + "The word was " + word + ".";
    var span = document.getElementsByClassName("close")[0];
    modal.style.display = "block";
    span.onclick = function () {
        modal.style.display = "none";
    }

}
modal = document.getElementById("myModal");
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

function modalForIntro() {

    modal = document.getElementById("myModal");
    document.getElementById("modal-text").innerText = "Guess the WORDLE in six tries." +
        "\n\nAfter each guess, the color of the tiles will change to show how close your guess was to the word.\n" +
        "\nGREEN means the letter is in the word and in correct spot." +
        "\nORANGE means the letter is in the word but in wrong spot.\nGRAY means the letter is not in any spot."
        ;
    var span = document.getElementsByClassName("close")[0];
    modal.style.display = "block";
    span.onclick = function () {
        modal.style.display = "none";
    }

    window.onload = function () {
        modalForIntro();

    }

}
const url = "https://api.dictionaryapi.dev/api/v2/entries/en/"

const word_data = {};
function check_if_word_exists(words) {

    fetch(url + words)
        .then(response => {
            if (response.ok) {
                val = true;
                console.log("ok")
                return response.json()

            } else if (response.status === 404) {
                val = false;
                return Promise.reject('error 404')
            } else {
                val = false;
                return Promise.reject('some other error: ' + response.status)
            }
        })
        .then(data => console.log('data is', data))
        .then(() => setVal(true))
        .catch(error => console.log('error is', error));


}

function setVal(val2) {

    val = val2

}

window.mobileCheck = function () {
    let check = false;
    (function (a) { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true; })(navigator.userAgent || navigator.vendor || window.opera);
    return check;
};
// if (window.mobileCheck()) {

//     document.getElementById("pagestyle").getAttribute("href") == "styles/mobile.css"
// }

