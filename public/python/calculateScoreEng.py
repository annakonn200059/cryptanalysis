from math import log10

class ScoreOfNgram(object):
    def __init__(self,ngramfile,sep=' '):
        self.ngrams = {}
        for line in open(ngramfile):
            key,count = line.split(sep) 
            self.ngrams[key] = int(count)
        self.Len = len(key)
        self.Total = sum(self.ngrams.values())
        #calculate log probabilities
        for key in self.ngrams.keys():
            self.ngrams[key] = log10(float(self.ngrams[key])/self.Total)
        self.floor = log10(0.01/self.Total)

    def score(self,text):
        ''' compute the score of text '''
        score = 0
        ngrams = self.ngrams.__getitem__
        for i in range(len(text)-self.Len+1):
            if text[i:i+self.Len] in self.ngrams: score += ngrams(text[i:i+self.Len])
            else: score += self.floor          
        return score
       