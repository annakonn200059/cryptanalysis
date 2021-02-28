"use strict";

const alphabetRUS = "АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ",
      alphabetENG = "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
      engLettersAndSpace = alphabetENG + alphabetENG.toLowerCase() +' \t\n',
      rusLettersAndSpace = alphabetRUS + alphabetRUS.toLowerCase() +' \t\n';

let alphabet = "";
let al = "";

document.getElementById("decrypt-btn_wtf").addEventListener('click', FindEngDictionary); 

 function FindEngDictionary(){
    let sellang = document.getElementById("lang").value;
    let foreignAlp = '';
    if (sellang == "eng") {
        alphabet = alphabetENG;
        al = engLettersAndSpace;
        } 
    else {
        alphabet = alphabetRUS;
        al = rusLettersAndSpace;
        }

    if (sellang == "eng"){

        const response = fetch("/dictEng", {
            method: "GET",
            headers: { "Accept": "application/json" }
        }).then(function(response){
            response.json().then(function(data){
            cypherGuess(data);
            });
            
        });
    } 
    else {
        const response = fetch("/dictRus", {
            method: "GET",
            headers: {"Accept": "application/json"}
        }).then(function(response){
            response.json().then(function(data){
                cypherGuess(data);
            });
            
        });
    }
    
}  

function cypherGuess(data){
   
    let caesarAnsw = '';
    let element = document.createElement('div');
    let val = document.getElementById("cipher-text").value;
    if (val.length === 0){
        caesarAnsw = 'Вы не ввели сообщение';
    }
    else{
        let noname = data.pop();
        caesarAnsw = caesarFun(val, data);
}
    element.innerHTML = `
    <div class="guessedBlocks">${caesarAnsw}</div>
`;
let parentEl = document.getElementById("body1");
parentEl.append(element);
    
}

function caesarFun(val, dict){
    let ansCaesar = 'Шифр Цезаря <br/>';
    val = val.toUpperCase();
    if (val.length > 800){
        //let str = "Слишком длинная строка";
        ansCaesar += frequenceDecypher(val);

        return ansCaesar;
    }
    else {
        
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

            if(isEnglish(translated, dict)){
                ansCaesar += `Ключ: ${key} <br/> Сообщение: ${translated}` + '\n';
            }
           
        }
        
}
    return ansCaesar;

}


function isEnglish(mes, dict, wordPercentage = 50, letterPercentage = 85){
    let wordsMatch = getEnglishCount(mes, dict) * 100 >= wordPercentage;
    let numLetters = removeNonLetters(mes).length;
    let messageLetterPercentage = numLetters / mes.length * 100;
    let lettersMatch = messageLetterPercentage >= letterPercentage;
    return wordsMatch && lettersMatch;
}

function getEnglishCount(val, dict){
    let val2 = removeNonLetters(val);
    let possibleWords = val2.split(" ");
    if (possibleWords == []){
        return 0.0;
    }

    let matches = 0;
    for (let word of possibleWords){
        if (dict.indexOf(word) !== -1){
            matches += 1;
        }
    }
    return matches / possibleWords.length;
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

function frequenceDecypher(mes){
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
    console.log(key);

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
    return `Ключ: ${key} <br/> Сообщение: ${s}`;
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
    console.log(rec);
    return rec;
}