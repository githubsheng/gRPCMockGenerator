/**
 * Created by wangsheng on 12/1/17.
 */
"use strict";
/// <reference path="../../../typings/tsd.d.ts"/>
function MainController($scope, $http) {
    $http.get('/projects').then((res) => {
        $scope.projectInfos = res.data;
    });
    $scope.selectProject = function (pi) {
        $scope.selectedProjectInfo = pi;
        $scope.serviceNames = Object.keys(pi.methodInfosGroupedByPath);
        $scope.commandPanelMode = 'project';
    };
    $scope.selectMethod = function (mi) {
        $scope.selectedMethodInfo = mi;
        $scope.commandPanelMode = 'method';
    };
    //todo: modify
    function traverseFileTree(item, path) {
        path = path || "";
        if (item.isFile) {
            // Get file
            item.file(function (file) {
                console.log("File:", path + file.name);
            });
        }
        else if (item.isDirectory) {
            // Get folder contents
            let dirReader = item.createReader();
            dirReader.readEntries(function (entries) {
                for (let i = 0; i < entries.length; i++) {
                    traverseFileTree(entries[i], path + item.name + "/");
                }
            });
        }
    }
    //todo: review
    document.querySelector('#dropArea').addEventListener("drop", function (event) {
        event.preventDefault();
        let items = event.dataTransfer.items;
        for (let i = 0; i < items.length; i++) {
            // webkitGetAsEntry is where the magic happens
            let item = items[i].webkitGetAsEntry();
            if (item) {
                traverseFileTree(item);
            }
        }
    }, false);
    $scope.uploadProtos = function () {
        //todo
    };
    $scope.useDefaultImpl = function () {
        //todo
    };
    $scope.doNotUseDefaultImpl = function () {
        //todo
    };
    $scope.startServer = function () {
        //todo
    };
    $scope.stopServer = function () {
        //todo
    };
    $scope.useUserDefinedReturn = function () {
        //todo
    };
    $scope.useDefaultImplReturnForSelectedMethod = function () {
        //todo
    };
    $scope.startAllProjects = function () {
        //todo
    };
    $scope.stopAllProjects = function () {
        //todo
    };
    $scope.startToCreateNewProject = function () {
        //todo
    };
    $scope.requireNewProjectName = function () {
        //todo
    };
    $scope.createNewProject = function () {
        //todo
    };
}
exports.MainController = MainController;
//# sourceMappingURL=MainController.js.map