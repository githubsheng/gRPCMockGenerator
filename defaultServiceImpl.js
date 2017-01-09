"use strict";
/**
 * Created by wangsheng on 4/1/17.
 */
const fs = require('fs');
const grpc = require('grpc');
const protobuf = require("protobufjs");
const pathModule = require('path');
const _ = require('lodash');
const namespaceClassName = 'Namespace';
const serviceClassName = 'Service';
const serviceMethodClassName = 'Service.RPCMethod';
const messageClassName = 'Message';
const messageFieldClassName = 'Message.Field';
const enumClassName = 'Enum';
const oneOfClassName = 'OneOf';
// const enumValueClassName = 'Enum.Value';
//
function getProtoFilePaths(path) {
    let protoFileNames = [];
    let pathOfGoogleTypes = __dirname + '/protobuf_default_types';
    console.log(pathOfGoogleTypes);
    function helper(path, protoFileNames) {
        fs.readdirSync(path)
            .forEach(fileName => {
            let filePath = `${path}/${fileName}`;
            let isDirectory = fs.statSync(filePath).isDirectory();
            if (isDirectory) {
                helper(filePath, protoFileNames);
            }
            else {
                if (filePath.endsWith('.proto')) {
                    protoFileNames.push(filePath);
                    let fileContent = fs.readFileSync(filePath, 'utf8');
                    let relativePath = pathModule.relative(path, pathOfGoogleTypes);
                    fileContent = fileContent.replace(`import "google/protobuf/`, `import "${relativePath}/google/protobuf/`);
                    fs.writeFileSync(filePath, fileContent, { encoding: 'utf8' });
                }
            }
        });
    }
    helper(path, protoFileNames);
    return protoFileNames;
}
const resourcesFolderPath = './resources/';
const protoFilePaths = getProtoFilePaths(resourcesFolderPath);
function loadProtoBufBuilder(protoFilePaths) {
    let builder = null;
    protoFilePaths.forEach(protoFilePath => {
        if (builder === null)
            builder = protobuf.loadProtoFile(protoFilePath);
        if (builder !== null)
            builder = protobuf.loadProtoFile(protoFilePath, builder);
    });
    return builder.ns;
}
function loadGrpcProtos(builderNS) {
    return grpc.loadObject(builderNS);
}
let loadedProtoBufBuilderNS = loadProtoBufBuilder(protoFilePaths);
exports.loadedProto = loadGrpcProtos(loadedProtoBufBuilderNS);
let generateCode = (function () {
    const typeString = 'string';
    const typeInt64 = 'int64';
    const typeInt32 = 'int32';
    const typeBoolean = 'bool';
    const typeDouble = 'double';
    const oneIndent = '    ';
    const twoIndents = oneIndent + oneIndent;
    function changeLastElemInArray(array, elem) {
        let lastIndex = array.length - 1;
        array[lastIndex] = elem;
    }
    function getLastElemInArray(array) {
        let lastIndex = array.length - 1;
        return array[lastIndex];
    }
    function addSemicolumnAndReturnBetweenProperties(propertySrcs) {
        propertySrcs.forEach((propSrc, index) => {
            if (index !== propertySrcs.length - 1) {
                changeLastElemInArray(propSrc, getLastElemInArray(propSrc) + `,\n`);
            }
            else {
                changeLastElemInArray(propSrc, getLastElemInArray(propSrc) + `\n`);
            }
        });
    }
    function moveSrcLinesTo(fromSrc, toSrc) {
        fromSrc.forEach(line => {
            line = `${oneIndent}${line}`;
            toSrc.push(line);
        });
    }
    function generateEnum(enumNode, path) {
        let pathPrefix = `${path}.${enumNode.name}`;
        enumNode._pathOfCreationMethod = `${pathPrefix}._create`;
        let src = [];
        src.push(`${enumNode.name}: {\n`);
        //when creating an enum instance, we always returns the first enum value. Notice that the num index starts from 1.
        src.push(`${oneIndent}_create: function(){ return 1; }\n`);
        src.push(`}`);
        return src;
    }
    function generateMessageInstance(message) {
        let src = [];
        message.children
            .filter(node => node.className === messageFieldClassName && node.oneof === null)
            .forEach(node => src.push(generateFieldInstance(node)));
        message.children
            .filter(node => node.constructor.name === oneOfClassName)
            .forEach(node => src.push(generateOneOf(node)));
        return src.map((line, index) => index === src.length - 1 ? line + '\n' : line + ',\n');
        function generateOneOf(f) {
            return generateFieldInstance(f.fields[0]);
        }
        function generateFieldInstance(f) {
            if (f.resolvedType === null) {
                let val = null;
                switch (f.type.name) {
                    case typeString:
                        val = `'dummy_string'`;
                        break;
                    case typeInt32:
                        val = '32';
                        break;
                    case typeInt64:
                        val = '64';
                        break;
                    case typeBoolean:
                        val = 'true';
                        break;
                    case typeDouble:
                        val = '22';
                        break;
                    default:
                        console.error(`Unrecognized field type ${f.type.name}`);
                        throw Error(`Unrecognized field type ${f.type.name}`);
                }
                if (f.repeated) {
                    return `${f.name}: [${val}, ${val}]`;
                }
                else {
                    return `${f.name}: ${val}`;
                }
            }
            else {
                return `${f.name}: ${f.resolvedType._pathOfCreationMethod}()`;
            }
        }
    }
    function generateCreationMethod(message) {
        let src = [];
        src.push(`_create: function(){\n`);
        src.push(`${oneIndent}return {\n`);
        generateMessageInstance(message).forEach(line => src.push(`${twoIndents}${line}`));
        src.push(`${oneIndent}}\n`);
        src.push(`}`);
        return src;
    }
    function generateMessage(message, path) {
        let pathPrefix = `${path}.${message.name}`;
        message._pathOfCreationMethod = `${pathPrefix}._create`;
        let src = [];
        src.push(`${message.name}: {\n`);
        let propertySrcs = [];
        message.children
            .filter(m => m.className === messageClassName)
            .map(m => generateMessage(m, pathPrefix))
            .forEach(msgSrc => propertySrcs.push(msgSrc));
        propertySrcs.push(generateCreationMethod(message));
        addSemicolumnAndReturnBetweenProperties(propertySrcs);
        propertySrcs.forEach(propSrc => moveSrcLinesTo(propSrc, src));
        src.push(`}`);
        return src;
    }
    function generateMethod(method, path) {
        //gRPC implementation internally also use this same method to convert method names.
        let methodName = _.camelCase(method.name);
        let warningMessage = `You are using mock of(${path}.${method.name})`;
        let src = [];
        src.push(`${methodName}: function(call, callback){\n`);
        src.push(`${oneIndent}console.log('${warningMessage}');\n`);
        src.push(`${oneIndent}callback(null, ${method.resolvedResponseType._pathOfCreationMethod}());\n`);
        src.push(`}`);
        return src;
    }
    function generateService(service, path) {
        let pathPrefix = `${path}.${service.name}`;
        let src = [];
        src.push(`${service.name} : {\n`);
        let propertySrcs = [];
        service.children
            .filter(m => m.className === serviceMethodClassName)
            .map(m => generateMethod(m, pathPrefix))
            .forEach(methodSrc => propertySrcs.push(methodSrc));
        addSemicolumnAndReturnBetweenProperties(propertySrcs);
        propertySrcs.forEach(propSrc => moveSrcLinesTo(propSrc, src));
        src.push(`}`);
        return src;
    }
    function generateNameSpace(namespace, path) {
        let src = [];
        src.push(`${namespace.name} : {\n`);
        let pathPrefix = `${path}.${namespace.name}`;
        let propertySrcs = [];
        namespace.children
            .filter(node => node.className === namespaceClassName)
            .map(namespace => generateNameSpace(namespace, pathPrefix))
            .forEach(namespaceSrc => propertySrcs.push(namespaceSrc));
        namespace.children
            .filter(node => node.className === enumClassName)
            .map(enumNode => generateEnum(enumNode, pathPrefix))
            .forEach(enumNodeSrc => propertySrcs.push(enumNodeSrc));
        namespace.children
            .filter(node => node.className === messageClassName)
            .map(message => generateMessage(message, pathPrefix))
            .forEach(messageSrc => propertySrcs.push(messageSrc));
        namespace.children
            .filter(node => node.className === serviceClassName)
            .map(service => generateService(service, pathPrefix))
            .forEach(serviceSrc => propertySrcs.push(serviceSrc));
        addSemicolumnAndReturnBetweenProperties(propertySrcs);
        propertySrcs.forEach(propSrc => moveSrcLinesTo(propSrc, src));
        src.push(`}`);
        return src;
    }
    function assignPathOfCreationMethods(node, path) {
        let pathPrefix = `${path}.${node.name}`;
        if (node.className === messageClassName) {
            node._pathOfCreationMethod = `${pathPrefix}._create`;
        }
        if (node.className === enumClassName) {
            node._pathOfCreationMethod = `${pathPrefix}._create`;
        }
        node.children
            .filter(node => node.className === namespaceClassName)
            .forEach(namespace => assignPathOfCreationMethods(namespace, pathPrefix));
        node.children
            .filter(node => node.className === messageClassName)
            .forEach(message => assignPathOfCreationMethods(message, pathPrefix));
    }
    return function (root) {
        root.children
            .forEach(node => assignPathOfCreationMethods(node, 'root'));
        let src = [];
        src.push('let root = {\n');
        let propertySrcs = [];
        root.children
            .map(namespace => generateNameSpace(namespace, 'root'))
            .forEach(namespaceSrc => propertySrcs.push(namespaceSrc));
        addSemicolumnAndReturnBetweenProperties(propertySrcs);
        propertySrcs.forEach(propSrc => moveSrcLinesTo(propSrc, src));
        src.push('};\n');
        src.push(`module.exports = root;`);
        fs.writeFileSync('./generated_mocks/mock.js', src.join(''));
    };
})();
const mockFilePath = './generated_mocks/mock.js';
generateCode(loadedProtoBufBuilderNS);
let mockImpl = require(mockFilePath);
function addProtoServiceToServer(server, builderNode, loadedProtoNode, mockImplNode) {
    if (builderNode.className === serviceClassName) {
        console.log(`adding default implementation for service ${builderNode.name}`);
        mergeUserImplementationWithDefaultImplentation(loadedProtoNode.service._userImpl, mockImplNode);
        server.addProtoService(loadedProtoNode.service, mockImplNode);
        return;
    }
    if (builderNode.className === namespaceClassName && builderNode.children) {
        builderNode.children
            .forEach(builderNode => addProtoServiceToServer(server, builderNode, loadedProtoNode[builderNode.name], mockImplNode[builderNode.name]));
    }
    function mergeUserImplementationWithDefaultImplentation(userImplementation, defaultImplementation) {
        _.assign(defaultImplementation, userImplementation);
        return defaultImplementation;
    }
}
let server = new grpc.Server();
function addUserProtoService(service, implementation) {
    service._userImpl = implementation;
}
exports.addUserProtoService = addUserProtoService;
function start(url) {
    addProtoServiceToServer(server, loadedProtoBufBuilderNS, exports.loadedProto, mockImpl);
    server.bind(url, grpc.ServerCredentials.createInsecure());
    server.start();
}
exports.start = start;
//# sourceMappingURL=defaultServiceImpl.js.map