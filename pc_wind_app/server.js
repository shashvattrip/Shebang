var express = require('express');
var app = express();
var shell = require('shelljs');
var fs = require('fs');
var busboy = require('connect-busboy');

app.use(busboy());

app.get('/', function (req, res) {
    res.send('Success!');
    
});

app.get('/files', function (req, res) {
    shell.cd("/");
    res.json(shell.ls());
});


app.get('/audio/:word', function (req, res) {
    
    exec("xdotool key XF86Audio"+req.params.word, puts);
    // Params = Play, Prev, Next, LowerVolume, RaiseVolume
    var json = { "status":200 };
    res.send(json);
});

app.get('/vlc/:word', function (req, res) {
    
    var vlc_shortcuts = {"Play":" ", "LowerVolume":"^{DOWN}", "RaiseVolume":"^{UP}", "Forward":"^{RIGHT}", "Rewine":"^{LEFT}", "Fulscreen":"f", "mute":"m"};
    console.log("wscript ./\vlc.vbs \""+vlc_shortcuts[req.params.word]+"\"");
    shell.exec("wscript ./\vlc.vbs \""+vlc_shortcuts[req.params.word]+"\"");
    var json = { "status":200 };
    res.send(json);
});

app.get('/wmp/:word', function (req, res) {
    
    //exec("wscript \"\program.vbs\"", puts);
    var wmp_shortcuts = {"Play":"^p", "LowerVolume":"{F8}", "RaiseVolume":"{F9}", "Forward":"^+f", "Restart":"^+b", "Fulscreen":"f", "mute":"{F7}"};
    console.log("wscript ./\wmp.vbs \""+wmp_shortcuts[req.params.word]+"\"");
    shell.exec("wscript ./\wmp.vbs \""+wmp_shortcuts[req.params.word]+"\"");
    var json = { "status":200 };
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

function makeid()
{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 5; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

app.post('/upload' , function(req,res){
    var fields = {};
    var fileStream;
    var saveTo;
    req.pipe(req.busboy);
    req.busboy.on('field', function(key, value){
        fields[key] = value;
        console.log(key +  ' ' + value);
    });
    req.busboy.on('file', function(fieldname, file, filename){
        saveTo = __dirname + '/' + makeid();
        console.log(saveTo);
        file.pipe(fs.createWriteStream(saveTo));
    });
    req.busboy.on('finish', function(){
        var datetime = new Date();
        var date = datetime.getDate().toString() + datetime.getMonth().toString() + datetime.getFullYear().toString();
        fs.mkdir(__dirname + '/files/' + date, function(err){
            var filePath = __dirname + '/files/' + date + '/' + fields['fileName'];
            if(err){
                if(err.code == 'EEXIST'){
                    stream = fs.createWriteStream(filePath);
                    fileStream = fs.createReadStream(saveTo);
                    fileStream.pipe(stream);
                    stream.on('close', function(){
                        fs.unlink(saveTo);
                        res.writeHead(200, {'Content-type': 'application/json'});
                        res.end(JSON.stringify({'message': 'File uploaded successfully', 'filePath': filePath}));
                    });
                }
                else{
                    res.writeHead(501, {'Content-type': 'application/json'});
                    res.end(JSON.stringify({'message': 'Internal server error occurred'}));
                }
            }
            else{
                stream = fs.createWriteStream(filePath);
                fileStream = fs.createReadStream(saveTo);
                fileStream.pipe(stream);
                stream.on('close', function(){
                    fs.unlink(saveTo);
                    res.writeHead(200, {'Content-type': 'application/json'});
                    res.end(JSON.stringify({'message': 'File uploaded successfully', 'filePath': filePath}));
                });
            }
        });
    });
});



var server = app.listen(8080, function () {

    var host = server.address().address;
    var port = server.address().port;
    console.log("Server hosted on " + host + " on port " + port);
});