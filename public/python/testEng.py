from pycipher import SimpleSubstitution as SimpleSub
import random
import re
import sys
from math import log10
import time
from calculateScoreEng import ScoreOfNgram

fitness = ScoreOfNgram('D:/sarcrypto/public/dictionaries/english_quadgrams.txt')

ctext=sys.argv[1]
maxkey = list('ABCDEFGHIJKLMNOPQRSTUVWXYZ')
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
        a = random.randint(0,25)
        b = random.randint(0,25)
        child = parentkey[:]
        # меняем два символа в дочернем алфавите
        child[a],child[b] = child[b],child[a]
        deciphered = SimpleSub(child).decipher(ctext)
        score = fitness.score(deciphered)
        # если дочерний алфавит дает лучший результат, меняем родителя на него
        if score > parentscore:
            parentscore = score
            parentkey = child[:]
            count = 0
        count = count+1
    # продолжаем прослеживать лучший результат
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
file = open('D:/sarcrypto/public/js/bridgeBetweenPyhonaAndNode.txt', "w")
with open('D:/sarcrypto/public/js/bridgeBetweenPyhonaAndNode.txt', "wt"):
    file.write("Key: " + listOfAns[len(listOfAns)-1][0] + '\n')
    file.write("Deciphered text: " + listOfAns[len(listOfAns)-1][1])
sys.stdout.flush()


