proxy.controller('entidadeController', function ($scope, CRUD) {
    function init() {
        CRUD.ListarTodos().then(function (entidades) {
            $scope.entidades = entidades;
        }, function (error) {
            console.log(error);
        });
    }
    
    $scope.Adicionar = function () {
        CRUD.Adicionar({ Name: $scope.novoText }).then(function (newEntidade) {
            $scope.entidades.push(newEntidade);
            $scope.novoText = "";
            CRUD.ListarTodos().then(function (entidades) {
                $scope.entidades = entidades;
            }, function (error) {
                console.log(error);
            });
        }, function (error) {
            console.log(error);
        });
    };
    
    init();
});