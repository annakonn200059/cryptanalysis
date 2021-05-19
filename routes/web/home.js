var express = require("express");
const fs = require('fs');

var router = express.Router();
const spawn = require('child_process').spawn;


router.get("/", function(req, res){
    res.render("home/index");
});

router.get("/home", function(req,res){
    res.render('home/home');
});

router.get("/about", function(req, res){
    res.render("home/about");
 });

router.get("/atbash", function(req, res){
    res.render("home/atbash");
 });

 router.get("/caesar", function(req, res){
    res.render("home/caesar");
 });

 router.get("/kepler", function(req, res){
    res.render("home/kepler");
 });

 router.get("/permutations", function(req, res){
    res.render("home/permutations");
 });

 router.get("/routeCipher", function(req, res){
    res.render("home/routeCipher");
 });

 router.get("/substitution", function(req, res){
    res.render("home/substitution");
 });

 router.get("/decypher", function(req, res, err){
   res.render("home/decypher");
   });
 
const rusWords = fs.readFileSync('public/dictionaries/russian.txt', "utf-8").toString().toUpperCase().split("\n");
const englishWords = fs.readFileSync('public/dictionaries/en.txt', "utf-8").toString().toUpperCase().split("\n");
router.use(express.json());


router.post('/dictEng', function (req, res ) {
let ans = 0;
for (let i = 0; i < req.body.length; i++){
   if (englishWords.indexOf(req.body[i]) !== -1){
      ans += 1;
   }
}

res.send(JSON.stringify(ans)); 
});



router.post('/dictRus', function (req, res ) { 
   let ans = 0;
   for (let i = 0; i < req.body.length; i++){
      if (rusWords.indexOf(req.body[i]) !== -1){
         ans += 1;
      }
   }
   
   res.send(JSON.stringify(ans)); 
});

   /*ВТЮЪ АОСЙЪИ — ЖЬШ ЛТН ВТЮЪЙ ЩШНЫЬЙЧШЛФТ, Л ФШЬШЪШЦ ФЙРНЕУ ЫТЦЛШХ Л ШЬФЪЕЬШЦ ЬОФЫЬО СЙЦОЧИОЬЫИ ЫТЦЛШХШЦ ЧЙЯШНИГТЦЫИ ЧЙ ЧОФШЬШЪШЦ ЩШЫЬШИЧЧШЦ БТЫХО ЩШСТАТУ ХОЛОО ТХТ ЩЪЙЛОО ЧОМШ Л ЙХЮЙЛТЬО. ЧЙЩЪТЦОЪ, Л ВТЮЪО ЫШ ЫНЛТМШЦ */
   /*WYW GKCRON GSXNYG GSDR ROB NKEQRDOB KXN SD GKC KWKJSXQ LED ROB PKDROB NSN K VYD YP DRSXQC DY ZBOFOXD SD LOKMKECO DROBO GKC XY PYYN SX DROSB RYECO*/
router.post('/EngSubst', function (req, res ) {
   const processEng = spawn('python', ['D:/sarcrypto/public/python/testEng.py', req.body]);
  
   processEng.on('close', (code) => {
      const rusSubsrArr = fs.readFileSync('D:/sarcrypto/public/js/bridgeBetweenPyhonaAndNode.txt', "utf-8").toString().
      split("\n");
      res.send(JSON.stringify(rusSubsrArr));
      });
});


router.post('/RusSubst', function (req, res ) {
   const processEng = spawn('python', ['D:/sarcrypto/public/python/testRus.py', req.body]);
  
   processEng.on('close', (code) => {
      const rusSubsrArr = fs.readFileSync('D:/sarcrypto/public/js/bridgeBetweenPyhonaAndNode.txt', "utf-8").toString().
      split("\n");
      res.send(JSON.stringify(rusSubsrArr));
      });
});


router.post('/CaesarAndAtbashWithoutSpaces', function (req, res ) {
   const processEng = spawn('python', ['D:/sarcrypto/public/python/caesarAndAtdashWithoutSpaces.py', req.body[0], req.body[1]]);
   processEng.on('close', (code) => {
      const rusSubsrArr = fs.readFileSync('D:/sarcrypto/public/js/bridgeBetweenPyhonaAndNode.txt', "utf-8").toString().
      split("\n");
      res.send(JSON.stringify(rusSubsrArr));
      });
});


module.exports = router;