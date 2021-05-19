from pycipherRe import Cipher

class Atbash(Cipher):

    def __init__(self):
        self.key = 'ЯЮЭЬЫЪЩШЧЦХФУТСРПОНМЛКЙИЗЖЁЕДГВБА'

    def encipher(self,string,keep_punct=False):
        if not keep_punct: string = self.remove_punctuation(string)
        ret = ''
        for c in string.upper():
            if c.isalpha(): ret += self.key[self.a2i(c)]
            else: ret += c
        return ret    

    def decipher(self,string,keep_punct=False):
        return self.encipher(string,keep_punct)
        
if __name__ == '__main__': 
    print('use "import pycipher" to access functions')