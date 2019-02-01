'use strict';

var app = angular.module('proyectoMenu');
app.controller('GestionCuentasCtrl', funcionGestionCuentasCtrl);

function funcionGestionCuentasCtrl ($scope, $rootScope, $location, ServicioCuentas){
  $scope.listaCuentas=[];
  $scope.cuentaseleccionada={};
  $rootScope.cuentaAactualizar={};
  $scope.cuentas={}
 

  var obtenerCuentas=function()
  {
    ServicioCuentas.recuperarCuentas().then(function(res){
       $scope.listaCuentas=res.data;
       console.log( $scope.listaCuentas)
   }, function(err){
        console.log(err)
   })

  };

  obtenerCuentas();




$scope.irNuevacuenta=function()
{
  $location.path('/Cuentas/NuevaCuenta');
}

$scope.Seleccionarcuentas=function(item)
{
  $scope.cuentaseleccionada=item;
  console.log(item);
}


$scope.actualizarcuentas=function(item)
  {
    $rootScope.cuentaAactualizar=item;
    $location.path('/Cuentas/ActualizarCuenta');
  };

  
  $scope.BorrarCuentas=function()
  {
    ServicioCuentas.eliminarCuentas($scope.cuentaseleccionada).then(function(res){
    alert("El registro se borró correctamente");
    obtenerCuentas();
    }, function(err){
         console.log(err)
         alert("No se pudo borrar el registro seleccionado");
         
    })
  };


}

funcionGestionCuentasCtrl.inject = ['$scope', '$rootScope', '$location','ServicioCuentas'];
