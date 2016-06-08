angular.module('DrexelSearcher.services', []).
factory('classes', function($timeout,$http) {
    var classes = {
        fetch: function() {
            return $timeout(function() {
                return $http.get('resources/class.json').then(function(response) {
                    return response.data;
                });
            }, 30);
        }
    }

    return classes;
}).
service('classService', function() {
    var planList = [];
    var planListList = [];

    var loadPlan = function(idx) {
        planList = angular.copy(planListList[idx].list);
    };

    var recievePlan = function(p) {
        planList.length = 0;
        for(var i=0;i<p.length;i++){
            planList.push({name: p[i].name, crn: p[i].crn });
        }
    };

    var savePlan = function(n,p) {
        var found = false;
        for(var i=0;i<planListList.length;i++){
            if(angular.equals(planListList[i].name,n)){
                planListList[i].list = angular.copy(p);
                found = true;
            }
        }
        if(!found){
            planListList.push({name: angular.copy(n), list: angular.copy(p) });
        }
    };

    var addClass = function(c) {
        var found = false;
        for(var i=0;i<planList.length;i++){
            if(angular.equals(planList[i].name, c.title) && planList[i].crn == c.crn){
                found = true;
                break;
            }
        }
        if(!found){
            planList.push({name: c.title, crn: c.crn });
        }
    };

    var removeClass = function(idx) {
        planList.splice(idx, 1);
    };
    var removePlan = function(idx) {
        planListList.splice(idx, 1);
    };
    var getClasses = function(){
        return planList;
    };
    var getPlans = function(){
        return planListList;
    };
    var resetClasses = function() {
        planList.length = 0;
    };

    return {
        recievePlan: recievePlan,
        addClass: addClass,
        savePlan: savePlan,
        getClasses: getClasses,
        getPlans: getPlans,
        removePlan: removePlan,
        removeClass: removeClass,
        resetClasses: resetClasses,
        loadPlan: loadPlan
    };

});