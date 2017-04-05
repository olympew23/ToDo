(function() {
    'use strict';

    angular
        .module('toDoApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
        .state('items', {
            parent: 'entity',
            url: '/items',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'toDoApp.items.home.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/items/items.html',
                    controller: 'ItemsController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('items');
                    $translatePartialLoader.addPart('global');
                    return $translate.refresh();
                }]
            }
        })
        .state('items-detail', {
            parent: 'items',
            url: '/items/{id}',
            data: {
                authorities: ['ROLE_USER'],
                pageTitle: 'toDoApp.items.detail.title'
            },
            views: {
                'content@': {
                    templateUrl: 'app/entities/items/items-detail.html',
                    controller: 'ItemsDetailController',
                    controllerAs: 'vm'
                }
            },
            resolve: {
                translatePartialLoader: ['$translate', '$translatePartialLoader', function ($translate, $translatePartialLoader) {
                    $translatePartialLoader.addPart('items');
                    return $translate.refresh();
                }],
                entity: ['$stateParams', 'Items', function($stateParams, Items) {
                    return Items.get({id : $stateParams.id}).$promise;
                }],
                previousState: ["$state", function ($state) {
                    var currentStateData = {
                        name: $state.current.name || 'items',
                        params: $state.params,
                        url: $state.href($state.current.name, $state.params)
                    };
                    return currentStateData;
                }]
            }
        })
        .state('items-detail.edit', {
            parent: 'items-detail',
            url: '/detail/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/items/items-dialog.html',
                    controller: 'ItemsDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Items', function(Items) {
                            return Items.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('^', {}, { reload: false });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('items.new', {
            parent: 'items',
            url: '/new',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/items/items-dialog.html',
                    controller: 'ItemsDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: function () {
                            return {
                                type: null,
                                name: null,
                                effectiveStartDate: null,
                                id: null
                            };
                        }
                    }
                }).result.then(function() {
                    $state.go('items', null, { reload: 'items' });
                }, function() {
                    $state.go('items');
                });
            }]
        })
        .state('items.edit', {
            parent: 'items',
            url: '/{id}/edit',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/items/items-dialog.html',
                    controller: 'ItemsDialogController',
                    controllerAs: 'vm',
                    backdrop: 'static',
                    size: 'lg',
                    resolve: {
                        entity: ['Items', function(Items) {
                            return Items.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('items', null, { reload: 'items' });
                }, function() {
                    $state.go('^');
                });
            }]
        })
        .state('items.delete', {
            parent: 'items',
            url: '/{id}/delete',
            data: {
                authorities: ['ROLE_USER']
            },
            onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
                $uibModal.open({
                    templateUrl: 'app/entities/items/items-delete-dialog.html',
                    controller: 'ItemsDeleteController',
                    controllerAs: 'vm',
                    size: 'md',
                    resolve: {
                        entity: ['Items', function(Items) {
                            return Items.get({id : $stateParams.id}).$promise;
                        }]
                    }
                }).result.then(function() {
                    $state.go('items', null, { reload: 'items' });
                }, function() {
                    $state.go('^');
                });
            }]
        });
    }

})();
