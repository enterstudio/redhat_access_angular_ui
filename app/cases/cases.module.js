'use strict';
angular.module('RedhatAccess.cases', [
  'ui.router',
  'ui.bootstrap',
  'ngTable',
  'RedhatAccess.template',
  'RedhatAccess.security',
  'RedhatAccess.search',
  'RedhatAccess.ui-utils',
  'RedhatAccess.header',
  'gettext'
])
  .constant('STATUS', {
    open: 'open',
    closed: 'closed',
    both: 'both'
  })
  .value('NEW_DEFAULTS', {
    'product': '',
    'version': ''
  })
  .config([
    '$stateProvider',
    function ($stateProvider) {

      $stateProvider.state('compact', {
        url: '/case/compact?sessionId',
        templateUrl: 'cases/views/compact.html'
      });

      $stateProvider.state('compact.edit', {
        url: '/{id:[0-9]{1,8}}',
        templateUrl: 'cases/views/compactEdit.html',
        controller: 'CompactEdit'
      });

      $stateProvider.state('edit', {
        url: '/case/{id:[0-9]{1,8}}',
        templateUrl: 'cases/views/edit.html',
        controller: 'Edit'
      });

      $stateProvider.state('new', {
        url: '/case/new',
        templateUrl: 'cases/views/new.html',
        controller: 'New'
      });

      $stateProvider.state('list', {
        url: '/case/list',
        templateUrl: 'cases/views/list.html',
        controller: 'List'
      });
    }
  ]);