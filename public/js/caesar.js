"use strict";

function transformKey(key, alphabet) {
    let arr= Array.from(key);
    let arr2 = arr.map(el => alphabet.indexOf(el.toUpperCase()));
    return arr2;
  }
  
function transform(text, alphabet, oldalphabet, key){
    let s ="";
    for (let i = 0; i < text.length; i++){
        if (alphabet.indexOf(text[i].toUpperCase())>-1 || oldalphabet.indexOf(text[i].toUpperCase())>-1){
            let k = oldalphabet.indexOf(text[i].toUpperCase());
            s+=alphabet[(k+key)%alphabet.length];
        }
        else {s+=text[i].toString();}
    }
    return s;
}

function duplicate(key){
    let s=[...new Set(key)].join('');
    return s;
}

function removeChar(value, char){
    let result = "";
    for (let c of value){
        if (c!=char)
        {result+=c;}
    }
    return result;
}

function deletelettersfromalphabet(alp, key1, key2){
    let k = alp;
    for (let i = 0; i<key1.length;i++){
        let h = alp[key1[i]];
        k = removeChar(k,h);
    }
        return k;
}

function wordwithoutkey(text, oldalph, alph, key){
    let s = "";
    let a ="";
    for (let i = 0; i < text.length; i++){
        if (alph.indexOf(text[i].toUpperCase())>-1 || oldalph.indexOf(text[i].toUpperCase())>-1 ){
            let k = oldalph.indexOf(text[i].toUpperCase());
            if (k - key >= 0) {
                a = oldalph[(k - key) % oldalph.length];
            }
            else {
                a = oldalph[oldalph.length - (key - k)];
            }
            
            let o = oldalph.indexOf((a).toUpperCase());
            let letter = ""+alph[o];
            s+=letter.toUpperCase();
    }
        else {
            s += text[i].toString();
        }
}
    return s;
}

function swapElements(obj1, obj2){
    let temp = document.createElement("div");
    if (obj1 !== null){
        if (obj1.parentNode !== null){
            obj1.parentNode.insertBefore(temp, obj1);}
    }
    if (obj1 !== null) {
        if (obj2 !== null) {
            if (obj2.parentNode !== null )
                 {obj2.parentNode.insertBefore(obj1, obj2);}
        }
    }
    if (obj2 !== null) {
        if (temp.parentNode !== null )
            {temp.parentNode.insertBefore(obj2, temp);}
    }
    if (temp.parentNode !== null)
    {temp.parentNode.removeChild(temp);}
}

function doSwap(){
    swapElements(document.getElementById("open-text"), document.getElementById("cipher-text"));
    swapElements(document.getElementById("header1"), document.getElementById("header2"));
    swapElements(document.getElementById("encrpt-btn_wtf"),document.getElementById("decrpt-btn_wtf"));
    let k1 = document.getElementById("open-text"); //as HTMLTextAreaElement
    let k2 = document.getElementById("cipher-text"); //as HTMLTextAreaElement
    k1.value = "";
    k2.value = "";
}

let wordK = document.getElementById("wordK"),
      numberkeYElement = document.getElementById("numberK"),
      openTextElement = document.getElementById("open-text"),
      cipherTextElement = document.getElementById("cipher-text");
const alphabetRUS = "АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ",
      alphabetENG = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

let alphRussmall = "";

for (let char of alphabetRUS){
    alphRussmall += char.toLowerCase();
}

let alphEngsmall = "";
for (let char of alphabetENG) {
    alphEngsmall += char.toLowerCase();
}
    function encryptMsg(e){
        let pushedel = document.getElementById("lang");
        let sellang = pushedel.value;
        let alphabet = "";
        let foreignAlp = '';
        if (sellang == "eng") {
            alphabet = alphabetENG;
            foreignAlp = alphabetRUS;
        } 
        else {
            alphabet = alphabetRUS;
            foreignAlp = alphabetENG;
        }

        let alphsmall = "";
        for (let char of alphabet){
            alphsmall += char.toLowerCase();
        }
        let foreignAlpSmall = '';
        for (let char of foreignAlp){
            foreignAlpSmall += char.toLowerCase();
        }

        let word = openTextElement.value;
        let kSymbols = 0;
        let kLetters = 0;
        let kLettersFormOtherLang = 0;
        for (let char of word){
            if ((alphabetRUS.indexOf(char)===-1) && (alphabetENG.indexOf(char)===-1) && 
            (alphRussmall.indexOf(char)===-1) && (alphEngsmall.indexOf(char)===-1))
                {kSymbols += 1;}
            if ((alphabet.indexOf(char)>-1) || (alphsmall.indexOf(char)>-1))
                {kLetters += 1;}
            if ((foreignAlp.indexOf(char)>-1) || (foreignAlpSmall.indexOf(char)>-1))
                {kLettersFormOtherLang += 1;}
        }
        if (((kLetters + kSymbols + kLettersFormOtherLang) != word.length) || 
            Math.ceil(kLettersFormOtherLang / word.length) > 0.8) 
        {cipherTextElement.value = "Введите данные на выбранном языке";}
        else {
          
            let number = numberkeYElement.value;
            let word = wordK.value;
            let newKeyWord = duplicate(word).toUpperCase();
            let newalp = newKeyWord + 
                         deletelettersfromalphabet(alphabet, transformKey(newKeyWord, alphabet), newKeyWord);
            cipherTextElement.value = transform(openTextElement.value, newalp, alphabet, Number(number));
        }
    }

    function decryptMsg(e){
        let pushedel = document.getElementById("lang");
        let sellang = pushedel.value;
        let alphabet = "";
        let foreignAlp = '';
        if (sellang == "eng") {
            alphabet = alphabetENG;
            foreignAlp = alphabetRUS;
        } 
        else {
            alphabet = alphabetRUS;
            foreignAlp = alphabetENG;
        }

        let alphsmall = "";
        for (let char of alphabet){
            alphsmall += char.toLowerCase();
        }
        let foreignAlpSmall = '';
        for (let char of foreignAlp){
            foreignAlpSmall += char.toLowerCase();
        }

        let word = cipherTextElement.value;
        let kSymbols = 0;
        let kLetters = 0;
        let kLettersFormOtherLang = 0;
        for (let char of word){
            if ((alphabetRUS.indexOf(char)===-1) && (alphabetENG.indexOf(char)===-1) && 
            (alphRussmall.indexOf(char)===-1) && (alphEngsmall.indexOf(char)===-1))
                {kSymbols += 1;}
            if ((alphabet.indexOf(char)>-1) || (alphsmall.indexOf(char)>-1))
                {kLetters += 1;}
            if ((foreignAlp.indexOf(char)>-1) || (foreignAlpSmall.indexOf(char)>-1))
                {kLettersFormOtherLang += 1;}
        }
        if (((kLetters + kSymbols + kLettersFormOtherLang) != word.length) || 
            Math.ceil(kLettersFormOtherLang / word.length) > 0.8) 
        {openTextElement.value = "Введите данные на выбранном языке";}
        else {
            let number = numberkeYElement.value;
            let word = wordK.value;
            let newKeyWord = duplicate(word).toUpperCase();
            let newalp = newKeyWord + 
                         deletelettersfromalphabet(alphabet, transformKey(newKeyWord, alphabet), newKeyWord);
            openTextElement.value = wordwithoutkey(cipherTextElement.value, newalp, alphabet, Number(number));
        }

        
        //openTextElement.value+=kLetters.toString()+" "+kSymbols.toString()+alphEngsmall;

    }

    document.getElementById("encrpt-btn_wtf").addEventListener('click', (event)=>encryptMsg(event));
    document.getElementById("decrpt-btn_wtf").addEventListener('click', (event)=>decryptMsg(event));
        
    document.querySelector('#swap-wrap').addEventListener('click', doSwap);  
     
