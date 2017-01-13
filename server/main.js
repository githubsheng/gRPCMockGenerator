"use strict";
const m = require("./mock");
/**
 * Created by wangsheng on 11/1/17.
 */
const express = require('express');
const app = express();
const fork = require('child_process').fork;
const fs = require('fs');
const mkdirp = require('mkdirp');
const bodyParser = require('body-parser');
let runningServices = new Map();
let projectInfos = new Map();
app.use(bodyParser.json());
app.use('/bower_components', express.static(__dirname + '/../bower_components'));
app.use('/dist', express.static(__dirname + '/../client/dist'));
app.use('/', express.static(__dirname + '/../client/public'));
app.get('/projects', function (req, res) {
    let ret = fs.readdirSync(__dirname + '/resources').map(projectFolderName => {
        let r = m.initProject(__dirname + '/resources/' + projectFolderName);
        projectInfos.set(projectFolderName, r);
        return {
            methodInfosGroupedByPath: r.methodInfosGroupedByPath,
            projectSetting: r.projectSetting
        };
    });
    res.send(ret);
});
app.post('/start-project', function (req, res) {
    let projectFolderName = req.projectFolderName;
    let s = runningServices.get(projectFolderName);
    if (s)
        s.kill();
    s = fork('./runGrpcServer');
    runningServices.set(projectFolderName, s);
    s.send('startProject', projectFolderName);
    res.send('project running...');
});
app.post('/create-project', function (req, res) {
    let projectFolderName = req.projectFolderName;
    let p = `./resources/${projectFolderName}`;
    if (!fs.existsSync(p)) {
        fs.mkdirSync(p);
        fs.mkdirSync(p + '/generatedMock');
        fs.mkdirSync(p + '/originalProtos');
        fs.mkdirSync(p + '/userDefinedRets');
    }
    res.send('project created...');
});
app.post('/upload-proto', function (req, res) {
    let projectFolderName = req.body.projectFolderName;
    let parentPath = req.body.parentPath;
    let protoFileName = req.body.protoFileName;
    let protoContent = req.body.protoContent;
    let p = `./resources/${projectFolderName}/originalProtos/${parentPath}`;
    if (!fs.existsSync(p))
        mkdirp.sync(p);
    fs.writeFileSync(`${p}/${protoFileName}`, protoContent);
    res.send('uploaded proto file');
});
app.post('/define-user-return', function (req, res) {
    let projectFolderName = req.body.projectFolderName;
    let path = req.body.path;
    let p = `./resources/${projectFolderName}/userDefinedRets/${path}`;
    if (!fs.existsSync(p))
        fs.mkdirSync(p);
    fs.writeFileSync(`${p}/userDefinedRet`, 'hello');
    res.send('updated custom return data');
});
app.post('/stop-project', function (req, res) {
    let projectFolderName = req.projectFolderName;
    let s = runningServices.get(projectFolderName);
    if (s)
        s.kill();
    res.send('stopping...');
});
app.listen(3000, function () {
    console.log('app listening on port 3000!');
});
//# sourceMappingURL=main.js.map