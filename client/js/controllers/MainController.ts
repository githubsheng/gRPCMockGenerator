/**
 * Created by wangsheng on 12/1/17.
 */

/// <reference path="../../../typings/tsd.d.ts"/>

interface projectSetting {
    name: string;
    autoStart: boolean;
    useDefaultImpl: boolean;
    port: number
}

interface MethodInfo {
    path: string;
    methodName: string;
    userDefinedRet: string;
}

interface ProjectInfo {
    methodInfosGroupedByPath: any;
    projectSetting: projectSetting;
}

interface MainControllerScope extends ng.IScope {
    projectInfos: ProjectInfo[];
    selectedProjectInfo: ProjectInfo;
    selectProject: (pi: ProjectInfo) => void;
    serviceNames: string[];

    selectedMethodInfo: MethodInfo;
    selectMethod: (mi: MethodInfo) => void;

    commandPanelMode: string;

    useDefaultImpl: () => void;
    doNotUseDefaultImpl: () => void;
    uploadProtos: () => void;
    startServer: () => void;
    stopServer: () => void;

    useUserDefinedReturn: () => void;
    useDefaultImplReturnForSelectedMethod: () => void;

    startAllProjects: () => void;
    stopAllProjects: () => void;
    startToCreateNewProject: () => void;
    requireNewProjectName: () => void;
    createNewProject: () => void;
}

export function MainController($scope: MainControllerScope, $http: ng.IHttpService){

    $http.get('/projects').then((res) => {
        $scope.projectInfos = <ProjectInfo[]>res.data;
    });

    $scope.selectProject = function(pi: ProjectInfo){
        $scope.selectedProjectInfo = pi;
        $scope.serviceNames = Object.keys(pi.methodInfosGroupedByPath);
        $scope.commandPanelMode = 'project';
    };

    $scope.selectMethod = function(mi: MethodInfo) {
        $scope.selectedMethodInfo = mi;
        $scope.commandPanelMode = 'method';
    };

    //todo: modify
    function traverseFileTree(item, path?) {
        path = path || "";
        if (item.isFile) {
            // Get file
            item.file(function(file) {
                console.log("File:", path + file.name);
            });
        } else if (item.isDirectory) {
            // Get folder contents
            let dirReader = item.createReader();
            dirReader.readEntries(function(entries) {
                for (let i=0; i<entries.length; i++) {
                    traverseFileTree(entries[i], path + item.name + "/");
                }
            });
        }
    }

    //todo: review
    document.querySelector('#dropArea').addEventListener("drop", function(event: any) {
        event.preventDefault();

        let items = event.dataTransfer.items;
        for (let i=0; i<items.length; i++) {
            // webkitGetAsEntry is where the magic happens
            let item = items[i].webkitGetAsEntry();
            if (item) {
                traverseFileTree(item);
            }
        }
    }, false);

    $scope.uploadProtos = function(){
        //todo
    };

    $scope.useDefaultImpl = function(){
        //todo
    };

    $scope.doNotUseDefaultImpl = function(){
        //todo
    };

    $scope.startServer = function(){
        //todo
    };

    $scope.stopServer = function(){
        //todo
    };

    $scope.useUserDefinedReturn = function(){
        //todo
    };

    $scope.useDefaultImplReturnForSelectedMethod = function(){
        //todo
    };

    $scope.startAllProjects = function(){
        //todo
    };

    $scope.stopAllProjects = function(){
        //todo
    };

    $scope.startToCreateNewProject = function(){
        //todo
    };

    $scope.requireNewProjectName = function(){
        //todo
    };

    $scope.createNewProject = function(){
        //todo
    };

}