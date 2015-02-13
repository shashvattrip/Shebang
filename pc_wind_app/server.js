var express = require('express');
var app = express()
var shell = require('shelljs');

app.get('/', function (req, res) {
    res.send('Success!');
    
});

app.get('/files', function (req, res) {
    shell.cd("/");
    res.json(shell.ls());
});


app.get('/upload/:word', function (req, res) {
    // Word will be the absolute path of the file to be uploaded
    res.send("Will be Updated Soon");
});

app.get('/audio/:word', function (req, res) {
    
    exec("xdotool key XF86Audio"+req.params.word, puts);
    // Params = Play, Prev, Next, LowerVolume, RaiseVolume
    var json = { "status":200 }
	res.send(json);
});

app.get('/vlc/:word', function (req, res) {
    
	var vlc_shortcuts = {"Play":" ", "LowerVolume":"^{DOWN}", "RaiseVolume":"^{UP}", "Forward":"^{RIGHT}", "Rewine":"^{LEFT}", "Fulscreen":"f", "mute":"m"};
	console.log("wscript ./\vlc.vbs \""+vlc_shortcuts[req.params.word]+"\"");
	shell.exec("wscript ./\vlc.vbs \""+vlc_shortcuts[req.params.word]+"\"");
    var json = { "status":200 }
	res.send(json);
});

app.get('/wmp/:word', function (req, res) {
    
    //exec("wscript \"\program.vbs\"", puts);
	var wmp_shortcuts = {"Play":"^p", "LowerVolume":"{F8}", "RaiseVolume":"{F9}", "Forward":"^+f", "Restart":"^+b", "Fulscreen":"f", "mute":"{F7}"};
	console.log("wscript ./\wmp.vbs \""+wmp_shortcuts[req.params.word]+"\"");
	shell.exec("wscript ./\wmp.vbs \""+wmp_shortcuts[req.params.word]+"\"");
    var json = { "status":200 }
	res.send(json);
});

app.get('/mouse/:word', function (req, res) {
    
    //Should constantly hit this url at a specific time interval with the relative position of x and y
    shell.exec("nircmd sendmouse "+req.params.word);
	//params "right/left/move"  "click/dblclick/x y"
    var json = { "status":200 }
	res.send(json);
});

app.get('/volume/:id', function (req, res) {
    // params a number between 0 to 65535
    shell.exec("nircmd.exe setsysvolume "+req.params.id);
    var json = { "status":200 }
	res.send(json);
});

app.get('/files/:word', function (req, res, next) {

     
     if (shell.test('-d', "/"+req.params.word)) { 
		var contents = shell.ls();
		var contents_json=[];
		for(i=0; i<contents.length;i++){
			var json={ 
			"absoluteUrl" : req.params.word+"/"+contents[i], 
			"title" : contents[i] 
			};
			contents_json.push(json);
		}
		
		var json_final = { 
			"currentPath" : req.params.word, 
			"contents" : contents_json, 
		};
		console.log(shell.ls());
		console.log(json);
        shell.cd("/"+req.params.word);
		res.send(json_final);
    } 
     else { 
		shell.exec("/"+req.params.word);
		var json = { "status":200 }
		res.send(json);
	}; 
		
});



var server = app.listen(8080, function () {

    var host = server.address().address
    var port = server.address().port

})