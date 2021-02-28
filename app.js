 var express = require("express");
 var path = require("path");
 //var routes = require("./routes");
 var app = express();

 app.set("port", process.env.PORT || 3000);

 app.set("views", path.join(__dirname, "views"));
 app.set("view engine", "ejs");

 app.use("/", require("./routes/web"));
 app.use("/api", require("./routes/api"));

 app.listen(app.get("port"), function(){
     console.log("Server started on port" + app.get("port"));
 });

 app.use( express.static( "public" ));
 app.use( '/css', express.static( __dirname + "public/css" ));
 app.use( '/js', express.static( __dirname + "public/js" ));
 app.use( '/dictionaries', express.static( __dirname + "public/dictionaries" ));