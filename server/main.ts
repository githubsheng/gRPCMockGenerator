import * as m from "./mock";

/**
 * Created by wangsheng on 11/1/17.
 */
const express = require('express');
const app = express();
const fork = require('child_process').fork;
const fs = require('fs');
const mkdirp = require('mkdirp');

let runningServices = new Map();

app.get('/projects', function(req, res) {
    fs.readdirSync('./resources').forEach(projectFolder => {

    })
});

app.post('/start-project', function (req, res) {
    // res.send('forking...');
    let projectFolder = req.projectFolder;
    let s = runningServices.get(projectFolder);
    if(s) s.kill();
    s = fork('./runGrpcServer');
    runningServices.set(projectFolder, s);
    s.send('startProject', projectFolder);
    res.send('project running...');
});

app.post('/create-project', function(req, res) {
    let projectFolder = req.projectFolder;
    let p = `./resources/${projectFolder}`;
    if(!fs.existsSync(p)){
        fs.mkdirSync(p);
        fs.mkdirSync(p + '/generatedMock');
        fs.mkdirSync(p + '/originalProtos');
        fs.mkdirSync(p + '/userDefinedRets');
    }
    res.send('project created...');
});

app.post('/upload-proto', function(req, res) {
    let projectFolder = req.body.projectFolder;
    let parentPath = req.body.parentPath;
    let protoFileName = req.body.protoFileName;
    let protoContent = req.body.protoContent;
    let p = `./resources/${projectFolder}/originalProtos/${parentPath}`;
    if(!fs.existsSync(p)) mkdirp.sync(p);
    fs.writeFileSync(`${p}/${protoFileName}`, protoContent);
    res.send('uploaded proto file');
});

app.post('/define-user-return', function(req, res){
    let projectFolder = req.body.projectFolder;
    let path = req.body.path;
    let p = `./resources/${projectFolder}/userDefinedRets/${path}`;
    if(!fs.existsSync(p)) fs.mkdirSync(p);
    fs.writeFileSync(`${p}/userDefinedRet`, 'hello');
    res.send('updated custom return data');
});

app.post('/stop-project', function (req, res) {
    let projectFolder = req.projectFolder;
    let s = runningServices.get(projectFolder);
    if(s) s.kill();
    res.send('stopping...');
});

app.use(express.static(__dirname + '/../client/public'));

app.listen(3000, function () {
    console.log('app listening on port 3000!')
});
