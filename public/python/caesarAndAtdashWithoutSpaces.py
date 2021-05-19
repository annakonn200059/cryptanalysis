from pycipher import Caesar
from caesarLibForRus import Caesar as CaesarRus
from pycipher import Atbash
from atbashLibForRus import Atbash as AtbashRus
from calculateScoreEng import ScoreOfNgram as calculateScoreEng
from calculateScoreRus import ScoreOfNgram as calculateScoreRus
from pycipher import Affine
from affineLibForRus import AffineRus

import sys

ctext=sys.argv[1]
lang=sys.argv[2]

if lang =='eng':
    fitness = calculateScoreEng('D:/sarcrypto/public/dictionaries/english_quadgrams.txt')
else:
    fitness = calculateScoreRus('D:/sarcrypto/public/dictionaries/russian_quadgrams.txt')

def break_caesarEng(ctext):
    ctext = ctext.upper()
    scores = []
    for i in range(26):
        scores.append((fitness.score(Caesar(i).decipher(ctext)),i))
    return max(scores)

def break_caesarRus(ctext):
    ctext = ctext.upper()
    scores = []
    for i in range(33):
        scores.append((fitness.score(CaesarRus(i).decipher(ctext)),i))
    return max(scores)

def breakAtbashEng(ctext):
    ctext = ctext.upper()
    arrForAtbash = []
    mes = Atbash().decipher(ctext)
    arrForAtbash.append([fitness.score(mes), mes])
    return arrForAtbash

def breakAtbashRus(ctext):
    ctext = ctext.upper()
    arrForAtbash = []
    mes = AtbashRus().decipher(ctext)
    arrForAtbash.append([fitness.score(mes), mes])
    return arrForAtbash

def breakAffineCipherRus(ctext):
     # make sure ciphertext has all spacing/punc removed and is uppercase
    ctext = re.sub('[^A-Z]','',ctext.upper())
    # try all posiible keys, return the one with the highest fitness
    scores = []
    for i in [1,3,5,7,9,11,15,17,19,21,23,25]:
        scores.extend([(fitness.score(Affine(i,j).decipher(ctext)),(i,j)) for j in range(0,25)])
    return max(scores)

def breakAffineCipherEng(ctext):
     # make sure ciphertext has all spacing/punc removed and is uppercase
    ctext = re.sub('[^A-Z]','',ctext.upper())
    # try all posiible keys, return the one with the highest fitness
    scores = []
    for i in [1,3,5,7,9,11,15,17,19,21,23,25]:
        scores.extend([(fitness.score(AffineRus(i,j).decipher(ctext)),(i,j)) for j in range(0,25)])
    return max(scores)

    
file = open('D:/sarcrypto/public/js/bridgeBetweenPyhonaAndNode.txt', "w", encoding="utf-8")    
with open('D:/sarcrypto/public/js/bridgeBetweenPyhonaAndNode.txt', "wt", encoding="utf-8"):
    if lang =='eng':
        keyAtbash = breakAtbashEng(ctext)
        maxKeyCaesar = break_caesarEng(ctext)
        if keyAtbash[0][0] > maxKeyCaesar[0]:
            file.write('шифр Атбаш ' + '\n')
            file.write(' \n')
            file.write(keyAtbash[0][1])
        else:
            file.write('шифр Цезаря ' + '\n')
            file.write('Ключ'+ str(maxKeyCaesar[1]) + '\n')
            file.write(Caesar(maxKeyCaesar[1]).decipher(ctext))
    else:
        keyAtbash = breakAtbashRus(ctext)
        maxKeyCaesar = break_caesarRus(ctext)
        if keyAtbash[0][0] > maxKeyCaesar[0]:
            file.write('шифр Атбаш ' + '\n')
            file.write(' \n')
            file.write(keyAtbash[0][1])
        else:
            file.write('шифр Цезаря ' + '\n')
            file.write('Ключ'+str(maxKeyCaesar[1]) + '\n')
            file.write(CaesarRus(maxKeyCaesar[1]).decipher(ctext))
sys.stdout.flush()


