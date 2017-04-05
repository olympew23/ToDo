(function() {
    'use strict';

    angular
        .module('toDoApp')
        .controller('ItemsDialogController', ItemsDialogController);

    ItemsDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'Items'];

    function ItemsDialogController ($timeout, $scope, $stateParams, $uibModalInstance, entity, Items) {
        var vm = this;

        vm.items = entity;
        vm.clear = clear;
        vm.datePickerOpenStatus = {};
        vm.openCalendar = openCalendar;
        vm.save = save;

        $timeout(function (){
            angular.element('.form-group:eq(1)>input').focus();
        });

        function clear () {
            $uibModalInstance.dismiss('cancel');
        }

        function save () {
            vm.isSaving = true;
            if (vm.items.id !== null) {
                Items.update(vm.items, onSaveSuccess, onSaveError);
            } else {
                Items.save(vm.items, onSaveSuccess, onSaveError);
            }
        }

        function onSaveSuccess (result) {
            $scope.$emit('toDoApp:itemsUpdate', result);
            $uibModalInstance.close(result);
            vm.isSaving = false;
        }

        function onSaveError () {
            vm.isSaving = false;
        }

        vm.datePickerOpenStatus.effectiveStartDate = false;

        function openCalendar (date) {
            vm.datePickerOpenStatus[date] = true;
        }
    }
})();
