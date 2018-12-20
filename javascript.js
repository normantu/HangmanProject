var word = '';
var easyWords = ['hello', 'hi', 'cow', 'house'];
var mediumWords = ['system', 'computer', 'lynx', 'pineapple',];
var hardWords = ['turkey', 'megalomaniac', 'trombone', 'australopithecus',];
var guesses = 0;
var wrongLetters = [];
var letterList = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
var dash = '';

function letterBox(){
    var letterList = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    document.getElementById("letterBox").innerHTML = '';
    for(var i = 0; i <= 25; i++){
        document.getElementById("letterBox").innerHTML += "<option value=" + "'" + letterList[i] + "'" + ">" + letterList[i] + "</option>";
    }
}

function startGame(){
    guesses = 0;
    wrongLetters = [];
    document.getElementById("wrongLetters").innerHTML = '';
    document.getElementById("message").innerHTML = '';
    getWord();
    document.getElementById("output").innerHTML = wordDisplay();
    document.getElementById("image").innerHTML = "<img src= " + "'" + hangmanImage() + "'" + "/>";
    document.getElementById("letterMenu").innerHTML = "<select id = 'letterBox'>\n" +
        "        </select>";
    letterBox();
    document.getElementById("makeGuessButton").innerHTML = "<button onclick=\"handleGuess()\" >Make guess!</button>";
}

function getWord(){
    var words = [];
    if(document.getElementById("modeBox").value == 1){
        words = easyWords;
    }
    if(document.getElementById("modeBox").value == 2){
        words = mediumWords;
    }
    if(document.getElementById("modeBox").value == 3){
        words = hardWords;
    }
    word = words[Math.floor(Math.random() * words.length)];
    return word;
}

function hangmanImage(){
    return "images/" + guesses + ".jpg";
}

function wordDisplay(){
    dash = '';
    for(var i = 0; i < word.length; i++){
        dash += '-';
    }
    return dash;
}

function handleGuess(){
    console.log(guesses);
    document.getElementById("message").innerHTML = '';
    if(wrongLetters.includes(document.getElementById("letterBox").value)){
        document.getElementById("message").innerHTML = 'You have already guessed this letter! You need to pick another letter.';
    }else if(word.includes(document.getElementById("letterBox").value)){
        for(var i = 0; i < word.length; i++){
            if(word[i] == document.getElementById("letterBox").value){
                dash = dash.substring(0,i) + document.getElementById("letterBox").value + dash.substring(i + 1, word.length);
            }
        }
        document.getElementById("output").innerHTML = dash;
        if(dash.includes('-') != true){
            document.getElementById("message").innerHTML = 'You win! Good Job! Press the button to restart.';
            document.getElementById("makeGuessButton").innerHTML = '';
            document.getElementById("letterMenu").innerHTML = '';
        }
    }else{
        guesses += 1;
        wrongLetters.push(document.getElementById("letterBox").value);
    }
    document.getElementById("wrongLetters").innerHTML = 'Guessed Letter: ' + wrongLetters;
    hangmanImage();
    document.getElementById("image").innerHTML = "<img src= " + "'" + hangmanImage() + "'" + "/>";

    if(guesses == 10){
        document.getElementById("message").innerHTML = 'You lost! You Suck! Press the button to restart.';
        document.getElementById("makeGuessButton").innerHTML = '';
        document.getElementById("letterMenu").innerHTML = '';
    }
}
