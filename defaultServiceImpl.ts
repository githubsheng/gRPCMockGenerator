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
function getProtoFilePaths(path: string) {

    let protoFileNames: string[] = [];
    let pathOfGoogleTypes = __dirname + '/protobuf_default_types';
    console.log(pathOfGoogleTypes);

    function helper(path: string, protoFileNames: string[]) {
        fs.readdirSync(path)
            .forEach(fileName => {
                let filePath = `${path}/${fileName}`;
                let isDirectory = fs.statSync(filePath).isDirectory();
                if (isDirectory) {
                    helper(filePath, protoFileNames);
                } else {
                    if (filePath.endsWith('.proto')) {
                        protoFileNames.push(filePath);
                        let fileContent = fs.readFileSync(filePath, 'utf8');
                        let relativePath = pathModule.relative(path, pathOfGoogleTypes);
                        fileContent = fileContent.replace(`import "google/protobuf/`, `import "${relativePath}/google/protobuf/`);
                        fs.writeFileSync(filePath, fileContent, {encoding: 'utf8'});
                    }
                }
            });
    }

    helper(path, protoFileNames);

    return protoFileNames;
}

const resourcesFolderPath = './resources/';
const protoFilePaths: string[] = getProtoFilePaths(resourcesFolderPath);

function loadProtoBufBuilder(protoFilePaths: string[]) {
    let builder = null;
    protoFilePaths.forEach(protoFilePath => {
        if (builder === null) builder = protobuf.loadProtoFile(protoFilePath);
        if (builder !== null) builder = protobuf.loadProtoFile(protoFilePath, builder);
    });
    return builder.ns;
}

function loadGrpcProtos(builderNS) {
    return grpc.loadObject(builderNS)
}

let loadedProtoBufBuilderNS = loadProtoBufBuilder(protoFilePaths);
export let loadedProto = loadGrpcProtos(loadedProtoBufBuilderNS);

let generateCode: (loadedProto: any) => void = (function () {


    const typeString = 'string';
    const typeInt64 = 'int64';
    const typeInt32 = 'int32';
    const typeBoolean = 'bool';
    const typeDouble = 'double';
    const oneIndent = '    ';
    const twoIndents = oneIndent + oneIndent;

    interface ProtoASTNode {
        className?: string;
        name: string;
        children?: ProtoASTNode[];
    }

    interface Namespace extends ProtoASTNode {
    }

    interface Enum extends ProtoASTNode {
        children: EnumValue[];
        _pathOfCreationMethod: string;
    }

    interface EnumValue extends ProtoASTNode {
    }

    interface Message extends Namespace {
        _pathOfCreationMethod: string;
    }

    interface Field extends ProtoASTNode {
        originalName: string;
        repeated: boolean;
        required: boolean;
        type: {name: string};
        resolvedType: Message;
        oneof: ProtoASTNode;
    }

    interface Method extends ProtoASTNode {
        resolvedRequestType: Message;
        resolvedResponseType: Message;
        requestStream: boolean;
        responseStream: boolean;
    }

    interface Service extends ProtoASTNode {
    }

    function changeLastElemInArray<T>(array: T[], elem: T) {
        let lastIndex = array.length - 1;
        array[lastIndex] = elem;
    }

    function getLastElemInArray<T>(array: T[]) {
        let lastIndex = array.length - 1;
        return array[lastIndex];
    }

    function addSemicolumnAndReturnBetweenProperties(propertySrcs: string[][]) {
        propertySrcs.forEach((propSrc, index) => {
            if (index !== propertySrcs.length - 1) {
                changeLastElemInArray<string>(propSrc, getLastElemInArray<string>(propSrc) + `,\n`);
            } else {
                changeLastElemInArray<string>(propSrc, getLastElemInArray<string>(propSrc) + `\n`);
            }
        });
    }

    function moveSrcLinesTo(fromSrc: string[], toSrc: string[]) {
        fromSrc.forEach(line => {
            line = `${oneIndent}${line}`;
            toSrc.push(line);
        });
    }

    function generateEnum(enumNode: Enum, path: string): string[] {
        let pathPrefix = `${path}.${enumNode.name}`;
        enumNode._pathOfCreationMethod = `${pathPrefix}._create`;
        let src = [];
        src.push(`${enumNode.name}: {\n`);
        //when creating an enum instance, we always returns the first enum value. Notice that the num index starts from 1.
        src.push(`${oneIndent}_create: function(){ return 1; }\n`);
        src.push(`}`);
        return src;
    }

    function generateMessageInstance(message: Message): string[] {

        let src: string[] = [];

        message.children
            .filter(node => node.className === messageFieldClassName && (<Field>node).oneof === null)
            .forEach(node => src.push(generateFieldInstance(<Field>node)));

        message.children
            .filter(node => node.constructor.name === oneOfClassName)
            .forEach(node => src.push(generateOneOf(<OneOf>node)));

        return src.map((line, index) => index === src.length - 1 ? line + '\n' : line + ',\n');

        interface OneOf extends ProtoASTNode{
            name: string;
            fields: Field[];
        }

        function generateOneOf(f: OneOf): string {
            return generateFieldInstance(f.fields[0]);
        }

        function generateFieldInstance(f: Field): string {
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
                if(f.repeated) {
                    return `${f.name}: [${val}, ${val}]`;
                } else {
                    return `${f.name}: ${val}`;
                }
            } else {
                return `${f.name}: ${f.resolvedType._pathOfCreationMethod}()`;
            }
        }
    }

    function generateCreationMethod(message: Message) {
        let src: string[] = [];
        src.push(`_create: function(){\n`);
        src.push(`${oneIndent}return {\n`);

        generateMessageInstance(message).forEach(line =>
            src.push(`${twoIndents}${line}`)
        );

        src.push(`${oneIndent}}\n`);
        src.push(`}`);
        return src;
    }

    function generateMessage(message: Message, path: string): string[] {
        let pathPrefix = `${path}.${message.name}`;
        message._pathOfCreationMethod = `${pathPrefix}._create`;
        let src = [];
        src.push(`${message.name}: {\n`);

        let propertySrcs: string[][] = [];
        message.children
            .filter(m => m.className === messageClassName)
            .map(m => generateMessage(<Message>m, pathPrefix))
            .forEach(msgSrc => propertySrcs.push(msgSrc));

        propertySrcs.push(generateCreationMethod(message));

        addSemicolumnAndReturnBetweenProperties(propertySrcs);

        propertySrcs.forEach(propSrc => moveSrcLinesTo(propSrc, src));

        src.push(`}`);
        return src;
    }

    function generateMethod(method: Method, path: string): string[] {

        //gRPC implementation internally also use this same method to convert method names.
        let methodName = _.camelCase(method.name);

        let warningMessage = `You are using mock of(${path}.${method.name})`;
        let src: string[] = [];

        src.push(`${methodName}: function(call, callback){\n`);
        src.push(`${oneIndent}console.log('${warningMessage}');\n`);
        src.push(`${oneIndent}callback(null, ${method.resolvedResponseType._pathOfCreationMethod}());\n`);
        src.push(`}`);

        return src;

    }

    function generateService(service: Service, path: string): string[] {

        let pathPrefix = `${path}.${service.name}`;
        let src: string[] = [];
        src.push(`${service.name} : {\n`);

        let propertySrcs: string[][] = [];

        service.children
            .filter(m => m.className === serviceMethodClassName)
            .map(m => generateMethod(<Method>m, pathPrefix))
            .forEach(methodSrc => propertySrcs.push(methodSrc));

        addSemicolumnAndReturnBetweenProperties(propertySrcs);

        propertySrcs.forEach(propSrc => moveSrcLinesTo(propSrc, src));

        src.push(`}`);
        return src;
    }

    function generateNameSpace(namespace: Namespace, path: string): string[] {
        let src: string[] = [];
        src.push(`${namespace.name} : {\n`);
        let pathPrefix = `${path}.${namespace.name}`;

        let propertySrcs: string[][] = [];
        namespace.children
            .filter(node => node.className === namespaceClassName)
            .map(namespace => generateNameSpace(<Namespace>namespace, pathPrefix))
            .forEach(namespaceSrc => propertySrcs.push(namespaceSrc));

        namespace.children
            .filter(node => node.className === enumClassName)
            .map(enumNode => generateEnum(<Enum>enumNode, pathPrefix))
            .forEach(enumNodeSrc => propertySrcs.push(enumNodeSrc));

        namespace.children
            .filter(node => node.className === messageClassName)
            .map(message => generateMessage(<Message>message, pathPrefix))
            .forEach(messageSrc => propertySrcs.push(messageSrc));

        namespace.children
            .filter(node => node.className === serviceClassName)
            .map(service => generateService(<Service>service, pathPrefix))
            .forEach(serviceSrc => propertySrcs.push(serviceSrc));

        addSemicolumnAndReturnBetweenProperties(propertySrcs);

        propertySrcs.forEach(propSrc => moveSrcLinesTo(propSrc, src));

        src.push(`}`);
        return src;
    }

    function assignPathOfCreationMethods(node: ProtoASTNode, path: string) {
        let pathPrefix = `${path}.${node.name}`;

        if (node.className === messageClassName) {
            (<Message>node)._pathOfCreationMethod = `${pathPrefix}._create`;
        }

        if (node.className === enumClassName) {
            (<Enum>node)._pathOfCreationMethod = `${pathPrefix}._create`;
        }

        node.children
            .filter(node => node.className === namespaceClassName)
            .forEach(namespace => assignPathOfCreationMethods(namespace, pathPrefix));

        node.children
            .filter(node => node.className === messageClassName)
            .forEach(message => assignPathOfCreationMethods(message, pathPrefix));
    }

    return function (root: Namespace) {
        root.children
            .forEach(node => assignPathOfCreationMethods(node, 'root'));

        let src: string[] = [];
        src.push('let root = {\n');
        let propertySrcs: string[][] = [];

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
            .forEach(builderNode =>
                addProtoServiceToServer(server, builderNode, loadedProtoNode[builderNode.name], mockImplNode[builderNode.name]));
    }

    function mergeUserImplementationWithDefaultImplentation(userImplementation, defaultImplementation) {
        _.assign(defaultImplementation, userImplementation);
        return defaultImplementation;
    }

}

let server = new grpc.Server();

export function addUserProtoService(service, implementation) {
    service._userImpl = implementation;
}

export function start(url: string) {
    addProtoServiceToServer(server, loadedProtoBufBuilderNS, loadedProto, mockImpl);
    server.bind(url, grpc.ServerCredentials.createInsecure());
    server.start();
}