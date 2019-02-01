'use strict';

var app = angular.module('proyectoMenu');
app.controller('UsuariosCtrl', funcionUsuariosCtrl);

function funcionUsuariosCtrl ($scope, $rootScope, $location, ServicioUsuario,ServicioSector){
  $scope.listausuarios=[];
  $scope.usuarioseleccionado={};
  $scope.ListaSectores=[];
  $scope.usuario={}
  $scope.guardarUsuario=function()
  {
    ServicioUsuario.ingresarUsuario($scope.usuario).then(function(res){
    alert("Ingreso Correcto");
    obtenerUsuarios();
    }, function(err){
         console.log(err)
         alert("Ingreso Fallido");
    
    })
  };

  var obtenerUsuarios=function()
  {
    ServicioUsuario.recuperarUsuario().then(function(res){
       $scope.listausuarios=res.data;
       console.log( $scope.listausuarios)
   }, function(err){
        console.log(err)
   })

  };

  obtenerUsuarios();


$scope.irNuevoUsuario=function()
{
    $('#myModal').on('shown.bs.modal', function () {
        $('#myInput').trigger('focus')
      })
}

$scope.SeleccionarUsuario=function(item)
{
  $scope.usuarioseleccionado=item;
  console.log(item);
}

$scope.regresar=function()
{
  $location.path('/usuarios');

}


$scope.actualizarUsuario=function()
  {
    ServicioUsuario.actualizarUsuario($scope.usuarioseleccionado).then(function(res){
    alert("El registro se actualizó correctamente");
    obtenerUsuarios();
    }, function(err){
         console.log(err)
         alert("Actualización Fallida");
    
    })
  };

  
  $scope.BorrarUsuario=function()
  {
    ServicioUsuario.eliminarUsuario($scope.usuarioseleccionado).then(function(res){
    alert("El registro se borró correctamente");
    obtenerUsuarios();
    }, function(err){
         console.log(err)
         alert("No se pudo borrar el registro seleccionado");
         
    })
  };

  var obtenerSectores = function () {
    ServicioSector.recuperarSector().then(function (res) {
      $scope.ListaSectores = res.data;
      console.log($scope.ListaSectores)
    }, function (err) {
      console.log(err)
    })

  };
  obtenerSectores();


}

funcionUsuariosCtrl.inject = ['$scope', '$rootScope', '$location','ServicioUsuario','ServicioSector'];
