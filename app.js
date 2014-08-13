var express = require('express');
var http = require('http');
var path = require('path');
var fs = require('fs');
var multipart = require('connect-multiparty');
var MPill = require('mpill').MPill;
var app = express();

// all environments
app.set('port', process.env.PORT || 1344);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname, 'public')));
app.use(multipart());

//Models
var File = new MPill('files', require('./config.json').url);

app.get('/', function(req, res) {
	res.render('index');
});

app.post('/files', function(req, res) {
	//console.log(req.body, req.files);
	if (req.files){
		for (var f in req.files){
			File.Insert(req.files[f],function(){
				console.log('+')
			});
		}
	}

	res.render('success');

	/*fs.readFile(req.files.displayImage.path, function (err, data) {
	  var newPath = __dirname + "/uploads/" + new Date().getTime();
	  fs.writeFile(newPath, data, function (err) {
	    res.render('success');
	  });
	});*/
});

app.get('/files', function(req, res) {
	File.Find({},function(err, results){
		res.json(results);
	});
});


http.createServer(app).listen(app.get('port'), function() {
	console.log('Express server listening on port ' + app.get('port'));
});
