proxy.controller('entidadeController', function ($scope, CRUD) {
    function init() {
        CRUD.ListarTodos().then(function (entidades) {
            $scope.entidades = entidades;
            $scope.exibirEdicao = false;
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
    
    $scope.ExibirEdicao = function (entidade) {
        $scope.exibirEdicao = true;
        $scope.editadoText = entidade.Name;
        $scope.idText = entidade._id;
    }
    
    $scope.Editar = function () {
        CRUD.Editar({ _id:$scope.idText, Name: $scope.editadoText }).then(function (newEntidade) {
            $scope.entidades.push(newEntidade);
            $scope.exibirEdicao = false;
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