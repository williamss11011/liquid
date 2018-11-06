'use strict';

var app = angular.module('proyectoMenu');
app.controller('AbonadosCtrl', funcionAbonadosCtrl);

function funcionAbonadosCtrl ($scope, $rootScope, $location, ServicioAbonado){
  $scope.listaabonados=[];
  $scope.abonadoseleccionado={};

  $scope.abonado={}
  $scope.guardarAbonado=function()
  {
    ServicioAbonado.ingresarAbonado($scope.abonado).then(function(res){
    alert("ingreso Correcto");
    obtenerAbonados();
    }, function(err){
         console.log(err)
         alert("ingreso fallido");
    
    })
  };

  var obtenerAbonados=function()
  {
   ServicioAbonado.recuperarAbonados().then(function(res){
       $scope.listaabonados=res.data;
       console.log( $scope.listaabonados)
   }, function(err){
        console.log(err)
   })

  };

  obtenerAbonados();


$scope.irNuevoAbonado=function()
{
    $('#myModal').on('shown.bs.modal', function () {
        $('#myInput').trigger('focus')
        
      })
}

$scope.SeleccionarAbonado=function(item)
{
  $scope.abonadoseleccionado=item;
  console.log(item);
}


$scope.actualizarAbonado=function()
  {
    ServicioAbonado.actualizarAbonado($scope.abonadoseleccionado).then(function(res){
    alert("El registro se ha actualizo correctamente");
    obtenerAbonados();
    }, function(err){
         console.log(err)
         alert("actualizacion fallida");
    
    })
  };

  
  $scope.BorrarAbonado=function()
  {
    ServicioAbonado.eliminarAbonado($scope.abonadoseleccionado).then(function(res){
    alert("El registro se Borro correctamente");
    obtenerAbonados();
    }, function(err){
         console.log(err)
         alert("No se pudo borrar el registro seleccionado");
         
    })
  };


}

funcionAbonadosCtrl.inject = ['$scope', '$rootScope', '$location','ServicioAbonado'];
