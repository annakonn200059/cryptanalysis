from pycipherRe import Cipher

class SimpleSubstitution(Cipher):
    def __init__(self,key='АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ'):
        assert len(key) == 33
        self.key = [k.upper() for k in key]
        self.invkey = ''

    def encipher(self,string,keep_punct=False):
        if not keep_punct: string = self.remove_punctuation(string)
        ret = ''
        for c in string.upper():
            if c.isalpha(): ret += self.key[self.a2i(c)]
            else: ret += c
        return ret    

    def decipher(self,string,keep_punct=False):
        if self.invkey == '':
            for i in 'АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ': 
                self.invkey += self.i2a(self.key.index(i))
        if not keep_punct: string = self.remove_punctuation(string)
        ret = ''      
        for c in string.upper():
            if c.isalpha(): ret += self.invkey[self.a2i(c)]
            else: ret += c
        return ret
        
if __name__ == '__main__': 
    print('use "import pycipher" to access functions')