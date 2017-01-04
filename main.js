"use strict";
/**
 * Created by wangsheng on 4/1/17.
 */
const protobuf = require("protobufjs");
const fs = require('fs');
const grpc = require('grpc');
function getProtoFilePaths(path, protoFileNames) {
    fs.readdirSync(path).forEach(fileName => {
        let filePath = `${path}/${fileName}`;
        let isDirectory = fs.statSync(filePath).isDirectory();
        if (isDirectory) {
            getProtoFilePaths(filePath, protoFileNames);
        }
        else {
            protoFileNames.push(filePath);
        }
    });
}
const resourcesFolderPath = './resources/';
const protoFilePaths = [];
getProtoFilePaths(resourcesFolderPath, protoFilePaths);
let ast = protobuf.loadSync(protoFilePaths);
// ast.resolveAll();
let hello_proto = grpc.loadObject(ast);
// let hello_proto = grpc.load(`${resourcesFolderPath}/helloworld.proto`).helloworld;
// let morning_proto = grpc.load(`${resourcesFolderPath}/morningworld.proto`).helloworld;
function say(call, callback) {
    callback(null, { message: 'Hey ' + call.request.name });
}
function main() {
    var server = new grpc.Server();
    server.addProtoService(hello_proto.Greeter.service, { sayHello: say });
    server.addProtoService(hello_proto.MorningGreeter.service, { sayHello: say });
    server.bind('0.0.0.0:50051', grpc.ServerCredentials.createInsecure());
    server.start();
}
main();
//# sourceMappingURL=main.js.map