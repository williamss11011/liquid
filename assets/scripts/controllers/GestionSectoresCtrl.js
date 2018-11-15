'use strict';

var app = angular.module('proyectoMenu');
app.controller('GestionSectoresCtrl', funcionGestionSectoresCtrl);

function funcionGestionSectoresCtrl ($scope, $rootScope, $location, ServicioSector){
  $scope.listaSectores=[];
  $scope.sectorseleccionado={};
  $rootScope.sectorAactualizar={};
  $scope.sector={}
 

  var obtenerSectores=function()
  {
    ServicioSector.recuperarSector().then(function(res){
       $scope.listaSectores=res.data;
       console.log( $scope.listaSectores)
   }, function(err){
        console.log(err)
   })

  };

  obtenerSectores();


$scope.irNuevosector=function()
{
  $location.path('/Sector/nuevo');
}

$scope.Seleccionarsector=function(item)
{
  $scope.sectorseleccionado=item;
  console.log(item);
}


$scope.actualizarsector=function(item)
  {
    $rootScope.sectorAactualizar=item;
    $location.path('/Sector/ActualizarSectores');
  };

  
  $scope.BorrarSector=function()
  {
    ServicioSector.eliminarSector($scope.sectorseleccionado).then(function(res){
    alert("El registro se Borro correctamente");
    obtenerSectores();
    }, function(err){
         console.log(err)
         alert("No se pudo borrar el registro seleccionado");
         
    })
  };


}

funcionGestionSectoresCtrl.inject = ['$scope', '$rootScope', '$location','ServicioSector'];
