(function() {
    'use strict';

    angular
        .module('toDoApp')
        .controller('ItemsDeleteController',ItemsDeleteController);

    ItemsDeleteController.$inject = ['$uibModalInstance', 'entity', 'Items'];

    function ItemsDeleteController($uibModalInstance, entity, Items) {
        var vm = this;

        vm.items = entity;
        vm.clear = clear;
        vm.confirmDelete = confirmDelete;

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function confirmDelete (id) {
            Items.delete({id: id},
                function () {
                    $uibModalInstance.close(true);
                });
        }
    }
})();
