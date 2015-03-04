var proxy = angular.module('App', []);

proxy.factory('CRUD', function ($http, $q) {
    function ListarTodos() {
        var deferred = $q.defer();
        $http.get('API/entidades').then(function (result) {
            deferred.resolve(result.data);
        }, function (error) {
            deferred.resolve(error);
        });
        return deferred.promise;
    }
    function Adicionar(novo) {
        var deferred = $q.defer();
        $http.post('API/entidades', novo).then(function (result) {
            deferred.resolve(result.data.Entidade);
        }, function (error) {
            deferred.resolve(error);
        });
        return deferred.promise;
    }
    function Editar(novo) {
        var deferred = $q.defer();
        $http.put('API/entidades/' + novo._id, novo).then(function (result) {
            deferred.resolve(result.data.Entidade);
        }, function (error) {
            deferred.resolve(error);
        });
        return deferred.promise;
    }
    return {
        ListarTodos:ListarTodos,
        Editar:Editar,
        Adicionar:Adicionar
    };
});