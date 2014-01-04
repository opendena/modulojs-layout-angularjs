
 
/**  
 * Module dependencies.  
 */  
 
var express = require('express');  
var http = require('http');  
var path = require('path');  
var moduloJS = require('modulojs');  
 

var myMod = function(server){
	return this;
}

// Initialisz needed variables and routes for the mod..
// As module or standalone..
myMod.initMod = function(server) {
        var mod = express();

	var mypath = __dirname;

        mod.conf = server.conf;

        mod.set('views', path.join(__dirname, 'views'));
        mod.set('view engine', 'jade');

        mod.use(express.cookieParser());
        mod.use(express.session({
                secret: 'secret'
        }));
        mod.use(express.urlencoded());
        mod.use(express.methodOverride());

        // Loading alls routes and middlewares  
        moduloJS.configure(mod,mypath);
        moduloJS.beforeRouting(mod,mypath);
        moduloJS.routing(mod,mypath);
        moduloJS.afterRouting(mod,mypath);

        server.use(mod);
} 
 

// we test if we are in standalone mod as main module

if (require.main === module) { 
        console.log("I'm a main mod... start listening");  
  
	var mod = express();  
        mod.conf = moduloJS.conf; 
	 
	mod.set('port', process.env.PORT || 3000);  

        myMod.initMod(mod);

        mod.get("/",function(req,res) {
                res.send("<h1><font face='arial'>Welcome</font></h1>");
        });

	http.createServer(mod).listen(mod.get('port'), function(){  
	  console.log('Express server listening on port ' + mod.get('port'));  
	});  
}

//adding line so this mod can be himself a module for another mod
module.exports = myMod;
