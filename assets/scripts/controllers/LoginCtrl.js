'use strict';

var app = angular.module('proyectoMenu');
app.controller('LoginCtrl', funcionLoginCtrl);


function funcionLoginCtrl($scope, $rootScope, $location, ServicioUsuario) {
  $scope.login = {};
  $scope.buscarUsuario = function () {
    console.log($scope.login.correo);
    console.log($scope.login.password);
    ServicioUsuario.login($scope.login.correo, $scope.login.password).then(function (res) {
        var usuario = res.data;
        if (usuario.length > 0) {
          alert("Bienvenido");
          // Store
          localStorage.setItem("usuario_id", usuario[0].id);
          localStorage.setItem("usuario_rol", usuario[0].rol);
          localStorage.setItem("usuario_nombre", usuario[0].nombre + ' ' + usuario[0].apellido);
          localStorage.setItem("usuario_sector_id", usuario[0].sector_id.id);
          // Retrieve
          //   localStorage.getItem("lastname");
          if ( usuario[0].rol==0) {
            $location.path('/');
          }
          else
          {
            $location.path('/Lectura/Iniciolectura');
          }

        } else {
          alert("Correo o contraseña incorrectos");
        }
      },
      function (error) {
        console.log(error)
      })
  };



}

funcionLoginCtrl.inject = ['$scope', '$rootScope', '$location', 'ServicioUsuario'];
