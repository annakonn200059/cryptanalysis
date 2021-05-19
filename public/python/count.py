import re
import random
import string

sim = 0

with open('D:/sarcrypto/public/python/count1.txt','r',encoding='utf-8') as f1:
    read_A = f1.read()

with open('D:/sarcrypto/public/python/count2.txt','r',encoding='utf-8') as f2:
    read_B = f2.read()


read_A1 = re.sub('[^A-zА-я]', '',read_A)
read_B1 = re.sub('[^A-zА-я]', '',read_B)

for char_a, char_b in zip(read_A1, read_B1):
    if char_a == char_b:
        sim = sim + 1
        print(char_a)
        print(char_b)
        print('\n')

print ("Одинаковые символы ",sim)