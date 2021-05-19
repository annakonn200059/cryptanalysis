"use strict";

$(".typeOfCipher").click(function() {    
    $('.typeOfCipher.active').removeClass('active');
    $(this).addClass('active');   
  });



const alphabetRUS = "АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ",
      alphabetENG = "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
      engLettersAndSpace = alphabetENG + alphabetENG.toLowerCase() +' \t\n',
      rusLettersAndSpace = alphabetRUS + alphabetRUS.toLowerCase() +' \t\n';

let alphabet = "";
let al = "";

const el1 = document.getElementById("CaesarAndAtbash");
const el2 = document.getElementById("SimpleSubst");

let parentElForLoader = document.getElementById("actionsId");
let loader = document.createElement('div');
loader.id = 'loader';
loader.classList.add("hide");
document.getElementById("decrypt-btn_wtf").addEventListener('click', chooseFunc);
loader.innerHTML = `<img src="/svg/spinne.svg">`;
parentElForLoader.append(loader);


function chooseFunc(){
     loader.classList.remove('hide');

     let mes = document.getElementById("cipher-text").value;

    if (el1.classList.contains('active')){
        if (mes.split(' ').length-1 !== 0)
            {FindEngDictionary();}
        else{
            CipherWithNoSpaces();}
        }
    else{
        SimpleSubst();
    }
}



 function FindEngDictionary(){
    let sellang = document.getElementById("lang").value;
    if (sellang == "eng") {
        alphabet = alphabetENG;
        al = engLettersAndSpace;
        } 
    else {
        alphabet = alphabetRUS;
        al = rusLettersAndSpace;
        }
    let val = document.getElementById("cipher-text").value;
    val = val.toUpperCase();

    caesarFun(val);
    atbash(val);

}  

function atbashDecypher(val){

    let translated = '';
            let reversedAlph = alphabet.split('').reverse().join('');
            for (let character of val){
                if(alphabet.indexOf(character) != -1){
                    let symbolIndexInReversedAlph = reversedAlph.indexOf(character);
                    translated += alphabet[symbolIndexInReversedAlph];
                }
                else{
                    translated += character;
                }
            }
    return translated;
}

async function atbash(val){
    let isTooLong = false;
    let checkForAtbashCypher;
        if (val.length > 200){
            checkForAtbashCypher = val;
            val = val.split(' ')[0]+' ' + val.split(' ')[1] + ' ' + val.split(' ')[2] + 
                                    ' ' + val.split(' ')[3];
            isTooLong = true;
        }

        let translated = atbashDecypher(val);

        let isEng = await getEnglishCount(translated);

        if(isEng){
            let ansAtbash = 'Шифр Атбаш <br/>';
            let element = document.createElement('div');
            element.classList.add("guessedBlocks");
            element.addEventListener('click', (e) => {
                if (e.target.getAttribute('data-delete') == "") {
                    element.classList.add('hide');
                }
            });
            let parentEl = document.getElementById("body1");

            if (isTooLong){
                ansAtbash += atbashDecypher(checkForAtbashCypher);
                element.innerHTML = `<div class='blockDelete' data-delete>×</div>Шифротекст:<br/> ${checkForAtbashCypher}<br/>Сообщение: <br/>${ansAtbash}`;
                parentEl.append(element);
            }

            else{
                ansAtbash += `Шифротекст:<br/> ${val}<br/>Сообщение: ${translated}` + '\n';
                element.innerHTML = `<div class='blockDelete' data-delete>×</div>${ansAtbash}`;
                parentEl.append(element);
            }
        }
}

function caesarDecypherWithKey(val, key){
    let translated = '';
    for (let character of val){
        if(alphabet.indexOf(character) != -1){
            let symbolIndex = alphabet.indexOf(character);
            let translatedIndex = symbolIndex - key;

            if (translatedIndex < 0){
                translatedIndex += alphabet.length;
            }

            translated += alphabet[translatedIndex];

        }
        else{
            translated += character;
        }
    }
    return translated;
}

async function caesarFun(val){
        let isTooLong = false;
        let isNotTooLong = false;
        let checkForCaesarCypher;
        if (val.length > 800){
            checkForCaesarCypher = val;
            val = val.split(' ')[0]+' ' + val.split(' ')[1] + ' ' + val.split(' ')[2] + 
                                    ' ' + val.split(' ')[3];
            isTooLong = true;
            }
        else if (val.length > 120 && val.length < 800){
            checkForCaesarCypher = val;
            val = val.split(' ')[0]+' ' + val.split(' ')[1] + ' ' + val.split(' ')[2] + 
                                    ' ' + val.split(' ')[3];
            isNotTooLong = true;
        }
        
        for (let key = 0; key < alphabet.length; key++){
            let translated = '';
            for (let character of val){
                if(alphabet.indexOf(character) != -1){
                    let symbolIndex = alphabet.indexOf(character);
                    let translatedIndex = symbolIndex - key;

                    if (translatedIndex < 0){
                        translatedIndex += alphabet.length;
                    }

                    translated += alphabet[translatedIndex];

                }
                else{
                    translated += character;
                }
            }
            let isEng = await getEnglishCount(translated);

            if(isEng){
                let ansCaesar = 'Шифр Цезаря <br/>';
                let element = document.createElement('div');
                element.classList.add("guessedBlocks");
                element.addEventListener('click', (e) => {
                    if (e.target.getAttribute('data-delete') == "") {
                        element.classList.add('hide');
                    }
                });
                let parentEl = document.getElementById("body1");

                if (isTooLong){
                    ansCaesar += frequenceCaesarDecypher(checkForCaesarCypher);
                    element.innerHTML = `<div class='blockDelete' data-delete>×</div>${ansCaesar}`;
                    parentEl.append(element);
                }
                else if (isNotTooLong){
                    ansCaesar += `Ключ: ${key} <br/> Шифротекст: ${checkForCaesarCypher}<br/>Сообщение: <br/>` + caesarDecypherWithKey(checkForCaesarCypher,key);
                    element.innerHTML = `<div class='blockDelete' data-delete>×</div>${ansCaesar}`;
                    parentEl.append(element);
                }
                else{
                    ansCaesar += `Ключ: ${key} <br/> Шифротекст: ${val}<br/>Сообщение: ${translated}` + '\n';
                    element.innerHTML = `<div class='blockDelete' data-delete>×</div>${ansCaesar}`;
                    parentEl.append(element);
                }
            }
        }
}

async function getEnglishCount(val, wordPercentage = 75, letterPercentage = 85){
    let val2 = removeNonLetters(val);
    let possibleWords = val2.split(" ").filter(String);


    console.log(possibleWords);
    if (possibleWords == []){
        return 0.0;
    }

    let numLetters = removeNonLetters(val).length;
    let messageLetterPercentage = numLetters / val.length * 100;
    let lettersMatch = messageLetterPercentage >= letterPercentage;
    let url ='';
    if (alphabet == alphabetENG){
        url = '/dictEng';
    }
    else{
        url = '/dictRus';
    }

    const options = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(possibleWords)
    };

    let matches;
    let response = await fetch(url, options).then(response=>
        response.json()).then(data=>{
            matches = +data;
            return matches;
        }).then(data=>{
            let wordsMatch = data/possibleWords.length * 100 >= wordPercentage;
            return wordsMatch;
        }
        ).then(res=>{
            return getEnglishCountRes(res,lettersMatch);
        });

        let result = await response;
        loader.classList.add('hide');
        return result;
}


function getEnglishCountRes(res,lettersMatch){
    return res && lettersMatch;
}

function removeNonLetters(mes){
    let lettersOnly = [];
    for (let character of mes){
        if(al.indexOf(character) != -1){
            lettersOnly.push(character);
        }
    }
    return lettersOnly.join('');
}

function frequenceCaesarDecypher(mes){
    let indxOfMostFreqLetter = 0;
    if (alphabet == alphabetENG){
        indxOfMostFreqLetter = 4;
    }
    else{
        indxOfMostFreqLetter = 15;
    }
    let freqList = Calculate(mes);

    let maxFreqInAlph = alphabet.indexOf(freqList[0][0]);
    let key = maxFreqInAlph -indxOfMostFreqLetter;


    let s = "";
    let a ="";
    for (let i = 0; i < mes.length; i++){
        if (alphabet.indexOf(mes[i]) >-1 ){
            if (alphabet.indexOf(mes[i].toUpperCase()) - key >= 0) {
                a = alphabet[(alphabet.indexOf(mes[i].toUpperCase()) - key) % alphabet.length];
            }
            else {
                a = alphabet[alphabet.length - (key - alphabet.indexOf(mes[i].toUpperCase()))];
            }
            
            let o = alphabet.indexOf((a).toUpperCase());
            let letter = ""+alphabet[o];
            s+=letter.toUpperCase();
    }
        else {
            s += mes[i].toString();
        }
}
    return `Ключ: ${key} <br/> Шифротекст: ${mes}  <br/> Сообщение: ${s}`;
}



function Calculate(mes){
    let total=0;
    let freqarr= [];
    let alpfreq=[];
    let text = mes;
    for(let i=0;i<text.length;++i){
      let letter=text.charAt(i).toUpperCase();
      let letters = "";
      if (alphabet == alphabetENG){
      letters = /[ABCDEFGHIJKLMNOPQRSTUVWXYZ]/;}
      else {
        letters = /[АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ]/;
      }
      if (!letters.test(letter))
        {continue;}
      if (undefined === freqarr[letter])
              {freqarr[letter]=1;}
      else
        {freqarr[letter]=freqarr[letter]+1;}
      total++;
      alpfreq[i]=letter;
    }
    
    let tuples = [];
    for (let key in freqarr) 
        {tuples.push([key, freqarr[key]]);}
    
    tuples.sort(function(a, b) {
      a = a[1];
      b = b[1];
      return a < b ? 1 : (a > b ? -1 : 0);
    });
    
    let rec=[];
    for (let i = 0; i<tuples.length;i++)
    { let key = tuples[i][0];
      let value = tuples[i][1];
     let s =value/total;
     rec[i]=[key,s];
    }
    return rec;
}

async function SimpleSubst(){

    let parentEl = document.getElementById("body1");
    let element = document.createElement('div');
    element.classList.add("guessedBlocks");
    element.addEventListener('click', (e) => {
        if (e.target.getAttribute('data-delete') == "") {
            element.classList.add('hide');
        }
    });
    let sellang = document.getElementById("lang").value;

    let val = document.getElementById("cipher-text").value;
        val = val.toString().toUpperCase();
        val = val.split();

        const options = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(val)
        };


    if (sellang == "eng") {
        alphabet = alphabetENG;
        al = engLettersAndSpace;

        let response = await fetch("/EngSubst", options).then(response=>
            response.json()).then(res=>{
                return res;
            });

            let result = await response;

            loader.classList.add('hide');

        element.innerHTML = `<div class='blockDelete' data-delete>×</div>"Шифр простой замены "<br/> ${result[0]}<br/>${result[1]}`;
        parentEl.append(element);
        } 
    else {
        alphabet = alphabetRUS;
        al = rusLettersAndSpace;

        let response = await fetch("/RusSubst", options).then(response=>
            response.json()).then(res=>{
                return res;
            });
            let result = await response;

            loader.classList.add('hide');

        element.innerHTML = `<div class='blockDelete' data-delete>×</div>"Шифр простой замены "<br/> ${result[0]}<br/>${result[1]}`;
        parentEl.append(element);
        }
}

function CipherWithNoSpaces(){
    let sellang = document.getElementById("lang").value;
    let lang = '';
    if (sellang == "eng") {
        lang = 'eng';
        } 
    else {
        lang = 'rus';
        }
    let val = document.getElementById("cipher-text").value;
    val = val.toUpperCase();

    fetchData(lang, val);
}

async function fetchData(lang,val){
    let parentEl = document.getElementById("body1");
    let element = document.createElement('div');
    element.classList.add("guessedBlocks");
    element.addEventListener('click', (e) => {
        if (e.target.getAttribute('data-delete') == "") {
            element.classList.add('hide');
        }
    });
    let arrToSend = [];
    arrToSend.push(val);
    arrToSend.push(lang);

    const options = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(arrToSend)
    };


    let response = await fetch("/CaesarAndAtbashWithoutSpaces", options).then(response=>
        response.json()).then(res=>{
            return res;
        });
        let result = await response;
        loader.classList.add('hide');

    element.innerHTML = `<div class='blockDelete' data-delete>×</div> ${result[0]}${result[1]}Шифротекст: ${val}</br>${result[2]}`;
    parentEl.append(element);
}