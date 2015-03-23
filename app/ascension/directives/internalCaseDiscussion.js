'use strict';
/*jshint unused:vars */
angular.module('RedhatAccess.cases').directive('rhaInternalcasediscussion', ['$location','$anchorScroll' ,function ($location, $anchorScroll) {
    return {
        templateUrl: 'ascension/views/internalCaseDiscussion.html',
        controller: 'InternalCaseDiscussion',
        scope: { loading: '=' },
        restrict: 'A',
        link: function postLink(scope, element, attrs) {
            scope.$on('$destroy', function () {
                element.remove();
            });
        }
    };
}]);
