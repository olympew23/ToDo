(function() {
    'use strict';
    angular
        .module('toDoApp')
        .factory('Items', Items);

    Items.$inject = ['$resource', 'DateUtils'];

    function Items ($resource, DateUtils) {
        var resourceUrl =  'api/items/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    if (data) {
                        data = angular.fromJson(data);
                        data.effectiveStartDate = DateUtils.convertLocalDateFromServer(data.effectiveStartDate);
                    }
                    return data;
                }
            },
            'update': {
                method: 'PUT',
                transformRequest: function (data) {
                    var copy = angular.copy(data);
                    copy.effectiveStartDate = DateUtils.convertLocalDateToServer(copy.effectiveStartDate);
                    return angular.toJson(copy);
                }
            },
            'save': {
                method: 'POST',
                transformRequest: function (data) {
                    var copy = angular.copy(data);
                    copy.effectiveStartDate = DateUtils.convertLocalDateToServer(copy.effectiveStartDate);
                    return angular.toJson(copy);
                }
            }
        });
    }
})();
