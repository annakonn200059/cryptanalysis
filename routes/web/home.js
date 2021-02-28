var express = require("express");
const fs = require('fs');

var router = express.Router();

router.get("/", function(req, res){
    //console.log("Hello, it's ,main page");
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
 
router.get('/dictEng', function (req, res ) { // <-- response is 'res'
   let englishWords = fs.readFileSync('public/dictionaries/en.txt', "utf-8").toString().toUpperCase().split("\n");

res.send(JSON.stringify(englishWords)); // <-- res
});

router.get('/dictRus', function (req, res ) { // <-- response is 'res'
   let rusWords = fs.readFileSync('public/dictionaries/russian.txt', "utf-8").toString().toUpperCase().split("\n");

res.send(JSON.stringify(rusWords)); // <-- res
});

/*let englishWords = fs.readFileSync('public/dictionaries/en.txt').toString();
console.log(englishWords);*/

module.exports = router;