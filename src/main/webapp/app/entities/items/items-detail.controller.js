(function() {
    'use strict';

    angular
        .module('toDoApp')
        .controller('ItemsDetailController', ItemsDetailController);

    ItemsDetailController.$inject = ['$scope', '$rootScope', '$stateParams', 'previousState', 'entity', 'Items'];

    function ItemsDetailController($scope, $rootScope, $stateParams, previousState, entity, Items) {
        var vm = this;

        vm.items = entity;
        vm.previousState = previousState.name;

        var unsubscribe = $rootScope.$on('toDoApp:itemsUpdate', function(event, result) {
            vm.items = result;
        });
        $scope.$on('$destroy', unsubscribe);
    }
})();
