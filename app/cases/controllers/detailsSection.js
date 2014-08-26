'use strict';
 /*jshint camelcase: false */
angular.module('RedhatAccess.cases')
.controller('DetailsSection', [
  '$scope',
  'strataService',
  'CaseService',
  '$rootScope',
  'AUTH_EVENTS',
  'CASE_EVENTS',
  'AlertService',
  'RHAUtils',
  function(
      $scope,
      strataService,
      CaseService,
      $rootScope,
      AUTH_EVENTS,
      CASE_EVENTS,
      AlertService,
      RHAUtils) {

    $scope.CaseService = CaseService;

    $scope.init = function() {
      if (!$scope.compact) {

        strataService.values.cases.types().then(
            function(response) {
              $scope.caseTypes = response;
            },
            function(error) {
              AlertService.addStrataErrorMessage(error);
            }
        );

        strataService.groups.list(CaseService.kase.contact_sso_username).then(
            function(response) {
              $scope.groups = response;
            },
            function(error) {
              AlertService.addStrataErrorMessage(error);
            }
        );
      }

      strataService.values.cases.status().then(
          function(response) {
            $scope.statuses = response;
          },
          function(error) {
            AlertService.addStrataErrorMessage(error);
          }
      );

      strataService.values.cases.severity().then(
          function(response) {
            CaseService.severities = response;
          },
          function(error) {
            AlertService.addStrataErrorMessage(error);
          }
      );

      strataService.products.list().then(
          function(response) {
            $scope.products = response;
          },
          function(error) {
            AlertService.addStrataErrorMessage(error);
          }
      );
    };

    $scope.updatingDetails = false;
    $scope.updateCase = function() {
      $scope.updatingDetails = true;

      var caseJSON = {};
      if (CaseService.kase !== null) {
        if (CaseService.kase.type !== null) {
          caseJSON.type = CaseService.kase.type.name;
        }
        if (CaseService.kase.severity !== null) {
          caseJSON.severity = CaseService.kase.severity.name;
        }
        if (CaseService.kase.status !== null) {
          caseJSON.status = CaseService.kase.status.name;
        }
        if (CaseService.kase.alternate_id !== null) {
          caseJSON.alternateId = CaseService.kase.alternate_id;
        }
        if (CaseService.kase.product !== null) {
          caseJSON.product = CaseService.kase.product.name;
        }
        if (CaseService.kase.version !== null) {
          caseJSON.version = CaseService.kase.version;
        }
        if (CaseService.kase.summary !== null) {
          caseJSON.summary = CaseService.kase.summary;
        }
        if (CaseService.kase.group !== null) {
          caseJSON.folderNumber = CaseService.kase.group.number;
        }
        if (RHAUtils.isNotEmpty(CaseService.kase.fts)) {
          caseJSON.fts = CaseService.kase.fts;
          if (!CaseService.kase.fts) {
            caseJSON.contactInfo24X7 = '';
          }
        }
        if (CaseService.kase.fts && RHAUtils.isNotEmpty(CaseService.kase.contact_info24_x7)) {
          caseJSON.contactInfo24X7 = CaseService.kase.contact_info24_x7;
        }
        if (CaseService.kase.notes !== null) {
          caseJSON.notes = CaseService.kase.notes;
        }

        strataService.cases.put(CaseService.kase.case_number, caseJSON).then(
            function() {
              $scope.caseDetails.$setPristine();
              $scope.updatingDetails = false;
              if ($scope.$root.$$phase !== '$apply' && $scope.$root.$$phase !== '$digest') {
                $scope.$apply();
              }
            },
            function(error) {
              AlertService.addStrataErrorMessage(error);
              $scope.updatingDetails = false;
              $scope.$apply();
            }
        );
      }
    };

    $scope.getProductVersions = function() {
      CaseService.versions = [];

      strataService.products.versions(CaseService.kase.product.code).then(
          function(versions){
            CaseService.versions = versions;
          },
          function(error) {
            AlertService.addStrataErrorMessage(error);
          }
      );
    };

    $rootScope.$on(CASE_EVENTS.received, function() {
      $scope.init();
      AlertService.clearAlerts();
    });
  }
]);
