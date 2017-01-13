/**
 * Created by wangsheng on 4/1/17.
 */
const fs = require('fs');
const grpc = require('grpc');
const pathModule = require('path');
const _ = require('lodash');
const protobuf = require("protobufjs");

const resourceFolderPath = `./resources`;

const namespaceClassName = 'Namespace';
const serviceClassName = 'Service';
const serviceMethodClassName = 'Service.RPCMethod';
const messageClassName = 'Message';
const messageFieldClassName = 'Message.Field';
const enumClassName = 'Enum';
const oneOfClassName = 'OneOf';
// const enumValueClassName = 'Enum.Value';

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
    userDefinedRet: string;
    folderPathOfUserDefinedRet: string;
}

interface Service extends ProtoASTNode {
    children: Method[]
}

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

let generateCode: (loadedProto: any, writeToPath: string, projectFolderPath: string, useDefaultImpl: boolean) => void = (function () {


    const typeString = 'string';
    const typeInt64 = 'int64';
    const typeInt32 = 'int32';
    const typeBoolean = 'bool';
    const typeDouble = 'double';
    const oneIndent = '    ';
    const twoIndents = oneIndent + oneIndent;

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

        let src: string[] = [];

        src.push(`${methodName}: function(call, callback){\n`);
        src.push(`${oneIndent}let userDefined = ${path}.__userDefinedResult__${methodName};\n`);
        src.push(`${oneIndent}let defaultImpl = ${method.resolvedResponseType._pathOfCreationMethod};\n`);
        src.push(`${oneIndent}let ret = userDefined ? userDefined() : defaultImpl();\n`);
        src.push(`${oneIndent}callback(null, ret);\n`);
        src.push(`}`);

        return src;

    }

    function gatherUserDefinedReturns(method: Method, path: string, projectFolderPath: string) {
        let methodName = _.camelCase(method.name);
        let folderPathOfUserDefinedInfo = `${projectFolderPath}/userDefinedRets/${path}.${methodName}`;
        let folderPathOfUserDefinedRet = folderPathOfUserDefinedInfo + '/userDefinedRet';

        let doesUserDefinedRetExist = fs.existsSync(folderPathOfUserDefinedRet);
        method.userDefinedRet = doesUserDefinedRetExist ? fs.readFileSync(folderPathOfUserDefinedRet, 'utf8') : null;
        method.folderPathOfUserDefinedRet = doesUserDefinedRetExist ? folderPathOfUserDefinedRet : null;
    }

    function generateUserDefinedReturns(method: Method): string[] {

        let methodName = _.camelCase(method.name);
        let src: string[] = [];
        src.push(`__userDefinedResult__${methodName}: function(){\n`);
        src.push(`${oneIndent}let ret = null;\n`);
        let us: string = fs.readFileSync(method.folderPathOfUserDefinedRet, 'utf8');
        us.split('\n').forEach(line => {
            src.push(`${oneIndent + line}\n`);
        });
        src.push(`${oneIndent}return ret;\n`);
        src.push(`}`);

        return src;
    }

    function generateService(service: Service, path: string, projectFolderPath: string, useDefaultImpl: boolean): string[] {

        let pathPrefix = `${path}.${service.name}`;
        let src: string[] = [];
        src.push(`${service.name} : {\n`);

        let propertySrcs: string[][] = [];

        let a = service.children
            .filter(m => m.className === serviceMethodClassName);

        a.forEach(m => gatherUserDefinedReturns(<Method>m, `${path}.${service.name}`, projectFolderPath));

        if(!useDefaultImpl) {
            a.filter(m => m.userDefinedRet !== null)
                .map(m => generateMethod(<Method>m, pathPrefix))
                .forEach(methodSrc => propertySrcs.push(methodSrc));
        } else {
            a.map(m => generateMethod(<Method>m, pathPrefix))
                .forEach(methodSrc => propertySrcs.push(methodSrc));
        }

        a.filter(m => m.userDefinedRet)
            .map(m => generateUserDefinedReturns(<Method>m))
            .forEach(userDefinedReturnSrc => propertySrcs.push(userDefinedReturnSrc));

        addSemicolumnAndReturnBetweenProperties(propertySrcs);

        propertySrcs.forEach(propSrc => moveSrcLinesTo(propSrc, src));

        src.push(`}`);
        return src;
    }

    function generateNameSpace(namespace: Namespace, path: string, projectFolderPath: string, useDefaultImpl: boolean): string[] {
        let src: string[] = [];
        src.push(`${namespace.name} : {\n`);
        let pathPrefix = `${path}.${namespace.name}`;

        let propertySrcs: string[][] = [];
        namespace.children
            .filter(node => node.className === namespaceClassName)
            .map(namespace => generateNameSpace(<Namespace>namespace, pathPrefix, projectFolderPath, useDefaultImpl))
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
            .map(service => generateService(<Service>service, pathPrefix, projectFolderPath, useDefaultImpl))
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

    return function (root: Namespace, writeToPath: string, projectFolderPath: string, useDefaultImpl: boolean) {
        root.children
            .forEach(node => assignPathOfCreationMethods(node, 'root'));

        let src: string[] = [];
        src.push('let root = {\n');
        let propertySrcs: string[][] = [];

        root.children
            .map(namespace => generateNameSpace(namespace, 'root', projectFolderPath, useDefaultImpl))
            .forEach(namespaceSrc => propertySrcs.push(namespaceSrc));

        addSemicolumnAndReturnBetweenProperties(propertySrcs);

        propertySrcs.forEach(propSrc => moveSrcLinesTo(propSrc, src));

        src.push('};\n');
        src.push(`module.exports = root;`);
        fs.writeFileSync(writeToPath, src.join(''));
    };

})();

function addProtoServiceToServer(server, builderNode, loadedProtoNode, mockImplNode) {
    if (builderNode.className === serviceClassName) {
        server.addProtoService(loadedProtoNode.service, mockImplNode);
    }

    if (builderNode.className === namespaceClassName && builderNode.children) {
        builderNode.children
            .forEach(builderNode =>
                addProtoServiceToServer(server, builderNode, loadedProtoNode[builderNode.name], mockImplNode[builderNode.name]));
    }
}

interface MethodInfos {
    path: string;
    methodName: string;
    userDefinedRet: string;
}

interface projectSetting {
    name: string;
    autoStart: boolean;
    useDefaultImpl: boolean;
    port: number
}

interface ProjectInfos {
    builderNS: Namespace;
    mockFilePath: string;
    projectFolderPath: string;
    methodInfosGroupedByPath: any;
    projectSetting: projectSetting;
}

export function initProject(projectFolderPath: string): ProjectInfos {
    const protoFilePaths: string[] = getProtoFilePaths(projectFolderPath);
    console.log(protoFilePaths);
    let builderNS = loadProtoBufBuilder(protoFilePaths);

    let projectSetting = require(`${projectFolderPath}/projectSetting`);

    const mockFilePath = `${projectFolderPath}/generatedMock/generatedMock.js`;
    generateCode(builderNS, mockFilePath, projectFolderPath, projectSetting.useDefaultImpl);

    let methodInfosGroupedByPath = groupMethodInfosByPath(builderNS);

    return {
        builderNS: builderNS,
        mockFilePath: mockFilePath,
        projectFolderPath: projectFolderPath,
        methodInfosGroupedByPath: methodInfosGroupedByPath,
        projectSetting: projectSetting
    };

    function groupMethodInfosByPath(builderNS: Namespace){

        let methodInfosGroupedByPath = {};

        helper(builderNS, null, methodInfosGroupedByPath);

        function helper(node: ProtoASTNode, path: string, methodInfosGroupedByPath: any) {

            if(node.className === serviceMethodClassName) {
                let method = <Method>node;
                let methodName = _.camelCase(method.name);

                let methodInfos: MethodInfos = {
                    path: path,
                    methodName: methodName,
                    userDefinedRet: method.userDefinedRet
                };

                let r = methodInfosGroupedByPath[path];
                if(r) {
                    r.push(methodInfos);
                } else {
                    methodInfosGroupedByPath[path] = [methodInfos];
                }

                return;
            }

            if(node.className === namespaceClassName || node.className === serviceClassName) {
                path = path ? `${path}.${node.name}` : node.name;
                node.children.forEach(n => helper(n, path, methodInfosGroupedByPath));
            }

        }

        return methodInfosGroupedByPath;
    }
}


export function start(projectInfos: ProjectInfos) {
    let server = new grpc.Server();
    let mockImpl = require(projectInfos.mockFilePath);
    let loadedProto = loadGrpcProtos(projectInfos.builderNS);
    addProtoServiceToServer(server, projectInfos.builderNS, loadedProto, mockImpl);

    // server.bind(`localhost:${projectInfos.projectSetting.port}`, grpc.ServerCredentials.createInsecure());
    // server.start();
}