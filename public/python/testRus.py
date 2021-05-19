from simplesubstitution import SimpleSubstitution as SimpleSub
import random
import re
import sys
from math import log10
import time
from calculateScoreRus import ScoreOfNgram

fitness = ScoreOfNgram('D:/sarcrypto/public/dictionaries/russian_quadgrams.txt')

ctext=sys.argv[1]
maxkey = list('АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ')
maxscore = -99e9
parentscore,parentkey = maxscore,maxkey[:]
listOfAns=[]
i = 0
deadline = time.monotonic() + 120
while time.monotonic() < deadline:
    i = i+1
    random.shuffle(parentkey)
    deciphered = SimpleSub(parentkey).decipher(ctext)
    parentscore = fitness.score(deciphered)
    count = 0
    while count < 1000:
        a = random.randint(0,32)
        b = random.randint(0,32)
        child = parentkey[:]
        # swap two characters in the child
        child[a],child[b] = child[b],child[a]
        deciphered = SimpleSub(child).decipher(ctext)
        score = fitness.score(deciphered)
        # if the child was better, replace the parent with it
        if score > parentscore:
            parentscore = score
            parentkey = child[:]
            count = 0
        count = count+1
    # keep track of best score seen so far
    if parentscore>maxscore:
        tmpArr = []
        maxscore,maxkey = parentscore,parentkey[:]
        ss = SimpleSub(maxkey)
        bestKey = ''.join(maxkey)
        plaintext = ss.decipher(ctext,True)
        tmpArr.append(bestKey)
        tmpArr.append(plaintext)
    listOfAns.append(tmpArr)
    time.sleep(1)
file = open('D:/sarcrypto/public/js/bridgeBetweenPyhonaAndNode.txt', "w",encoding="utf-8")
with open('D:/sarcrypto/public/js/bridgeBetweenPyhonaAndNode.txt', "wt",encoding="utf-8"):
    file.write("Key: " + listOfAns[len(listOfAns)-1][0] + '\n')
    file.write("Deciphered text: " + listOfAns[len(listOfAns)-1][1])
sys.stdout.flush()

