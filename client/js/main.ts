/**
 * Created by wangsheng on 12/1/17.
 */

import {MainController} from "./controllers/MainController";

angular.module('Main', [])
    .controller("mainController", ["$scope", "$http", MainController]);