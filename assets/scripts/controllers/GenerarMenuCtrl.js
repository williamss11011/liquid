'use strict';

var app = angular.module('proyectoMenu');
app.controller('generarMenuCtrl', funcionGenerarMenuCtrl);

function funcionGenerarMenuCtrl ($scope, $rootScope, ServicioMenu){
  $scope.menuObject = $rootScope.menu;
  var menu = $scope.menuObject;

  var actualizarMenu = function(menu){
    ServicioMenu.actualizarMenu(menu).then(function(res){
        console.log("Se actualizo el menu");
        console.log(res.data)
    },function(err){
      console.log(err);
    });
  };

  $scope.increaseItem = function (item) {
    if(!item.counter) {
      item.counter = 0;
    }
    item.counter = item.counter+1;
    var menu = {}
    menu.id = 6;
    menu.menu = JSON.stringify($scope.menuObject);
    menu.masUsados = $scope.menuObject.masUsados;
    menu.ultimoUsado = $scope.menuObject.ultimoUsado;
    actualizarMenu(menu);
    var currentdate = new Date();
    console.log(currentdate);
  };

}

funcionGenerarMenuCtrl.inject = ['$scope', '$rootScope', 'ServicioMenu'];
