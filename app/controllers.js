angular.module('DrexelSearcher.controllers', []).
controller('classesController', function($scope, classes, classService) {
    $scope.search = {
        title: "",
        number: "",
        subject: "",
        professor: ""
    };

    $scope.classList = [];
    $scope.home = true;
    $scope.loading = true;
    $scope.finished = false;

    classes.fetch().then(function(data) {
        $scope.classList = data;
    }).finally(function() {
        $scope.loading = false;
        $scope.finished = true;
    });

    $scope.resetSearch = function ()
    {
        $scope.search = {
            title: "",
            number: "",
            subject: "",
            professor: ""
        };
    };

    $scope.addClass = function (c) {
        classService.addClass(c);
    };

    $scope.checkCRN = function (crn) {
        var plan = classService.getClasses();
        for(var i=0;i<plan.length;i++){
            if(plan[i].crn = crn){
                return true;
            }
        }
        return false;
    };

}).
controller('class_detailsController',function($scope, $routeParams, classes, $filter, classService) {
    $scope.home = true;
    $scope.crn = $routeParams.crn;
    $scope.Class= null;

    $scope.classList = [];

    classes.fetch().then(function(data) {
        $scope.Class = $filter('filter')(data, {crn:$routeParams.crn})[0];
    });

    $scope.addClass = function (c) {
        classService.addClass(c);
    };
}).
controller('profileController', function($scope, $routeParams) {

}).
controller('loginController', function($scope, $routeParams) {

}).
controller('planController', function($scope, classService) {
    $scope.planHome = true;
    $scope.loadedPlan = false;
    $scope.savePlanScreen = false;
    $scope.sharePlan = false;
    $scope.loadPlan = false;

    $scope.planList = classService.getClasses();
    $scope.planListList = classService.getPlans();
    $scope.pName = "Unsaved Plan";
    $scope.NewplanList = null;

    $scope.shareListUser = [];
    $scope.shareListEmail = [];

    $scope.addShareListUser = function (name) {
        $scope.shareListUser.push(name);
    };

    $scope.addShareListEmail = function (email) {
        $scope.shareListEmail.push(email);
    };

    $scope.removeShareListUser = function (idx) {
        $scope.shareListUser.splice(idx, 1);
    };

    $scope.removeShareListEmail = function (idx) {
        $scope.shareListEmail.splice(idx, 1);
    };

    $scope.deleteRow = function (idx) {
        classService.removeClass(idx);
    };

    $scope.deletePlan = function (idx) {
        classService.removePlan(idx);
    };

    $scope.reset = function() {
        classService.resetClasses();
        $scope.pName = "Unsaved Plan";
    };

    $scope.savePlan = function(name) {
        $scope.pName = name;
        $scope.post.name = null;
        classService.savePlan(name,classService.getClasses());
    };

    $scope.loadPlan = function(idx) {
        classService.loadPlan(idx);
        $scope.planList = classService.getClasses();
        $scope.pName = $scope.planListList[idx].name;
        $scope.loadedPlan = true;
        $scope.loadPlans = false;

    };

    $scope.sendPlan = function() {
        $scope.recievePlan(angular.copy($scope.planList));
        $scope.shareListUser.length = 0;
        $scope.shareListEmail.length = 0;
    };

    $scope.recievePlan = function(plan) {
        $scope.NewplanList = {name: $scope.pName, plan: plan};
    };

    $scope.loadrecievedPlan = function() {
        classService.recievePlan($scope.NewplanList.plan);
        $scope.pName = $scope.NewplanList.name+" (Shared)";
        $scope.planHome = false;
        $scope.loadedPlan = true;
        $scope.savePlanScreen = false;
        $scope.sharePlan = false;
        $scope.loadPlans = false;
        $scope.NewplanList = null;
    };


});