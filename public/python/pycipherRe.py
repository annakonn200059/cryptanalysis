import re

class Cipher(object):
    def encipher(self,string):
        return string
        
    def decipher(self,string):
        return string
        
    def a2i(self,ch):
        ch = ch.upper()
        arr = {'А':0,'Б':1,'В':2,'Г':3,'Д':4,'Е':5,'Ё':6,'Ж':7,'З':8,'И':9,'Й':10,
           'К':11,'Л':12,'М':13,'Н':14,'О':15,'П':16,'Р':17,'С':18,'Т':19,'У':20,
           'Ф':21,'Х':22,'Ц':23,'Ч':24,'Ш':25,'Щ':26,'Ъ':27, 'Ы':28,'Ь':29,'Э':30,'Ю':31,'Я':32}
        return arr[ch]

    def i2a(self,i):
        i = i%33
        arr = ('А','Б','В','Г','Д','Е','Ё','Ж','З','И','Й','К','Л','М','Н','О','П','Р','С','Т','У','Ф','Х','Ц','Ч','Ш','Щ','Ъ','Ы','Ь','Э','Ю','Я')
        return arr[i]
        
    def remove_punctuation(self,text,filter='[^А-Я]'):
        return re.sub(filter,'',text.upper())