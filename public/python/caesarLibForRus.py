from pycipherRe import Cipher

class Caesar(Cipher):
    
    def __init__(self,key=0):
        self.key = key % 33
        
    def encipher(self,string,keep_punct=False): 
        if not keep_punct: string = self.remove_punctuation(string)
        ret = ''
        for c in string:
            if c.isalpha(): ret += self.i2a( self.a2i(c) + self.key )
            else: ret += c
        return ret    

    def decipher(self,string,keep_punct=False):
        if not keep_punct: string = self.remove_punctuation(string)    
        ret = ''
        for c in string:
            if c.isalpha(): ret += self.i2a( self.a2i(c) - self.key )
            else: ret += c
        return ret
                
if __name__ == '__main__': 
    print('use "import pycipher" to access functions')