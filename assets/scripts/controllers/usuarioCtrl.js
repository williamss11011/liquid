'use strict';

var app = angular.module('proyectoMenu');
app.controller('UsuariosCtrl', funcionUsuariosCtrl);

function funcionUsuariosCtrl ($scope, $rootScope, $location, ServicioUsuario){
  $scope.listausuarios=[];
  $scope.usuarioseleccionado={};

  $scope.usuario={}
  $scope.guardarUsuario=function()
  {
    ServicioUsuario.ingresarUsuario($scope.usuario).then(function(res){
    alert("ingreso Correcto");
    obtenerUsuarios();
    }, function(err){
         console.log(err)
         alert("ingreso fallido");
    
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


$scope.actualizarUsuario=function()
  {
    ServicioUsuario.actualizarUsuario($scope.usuarioseleccionado).then(function(res){
    alert("El registro se ha actualizo correctamente");
    obtenerUsuarios();
    }, function(err){
         console.log(err)
         alert("actualizacion fallida");
    
    })
  };

  
  $scope.BorrarUsuario=function()
  {
    ServicioUsuario.eliminarUsuario($scope.usuarioseleccionado).then(function(res){
    alert("El registro se Borro correctamente");
    obtenerUsuarios();
    }, function(err){
         console.log(err)
         alert("No se pudo borrar el registro seleccionado");
         
    })
  };


}

funcionUsuariosCtrl.inject = ['$scope', '$rootScope', '$location','ServicioUsuario'];