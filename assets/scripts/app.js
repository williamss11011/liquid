'use strict';

/**
* @ngdoc overview
* @name proyectoMenu
* @description
* # proyectoMenu
*
* Main module of the application.
*/
angular.module('proyectoMenu', [
  'ngAnimate',
  'ngAria',
  'ngCookies',
  'ngMessages',
  'ngResource',
  'ngRoute',
  'ngSanitize',
  'ngTouch',
  'ui.bootstrap.datetimepicker'
]).config(function ($routeProvider) {
  $routeProvider
  // .when('/', {
  //   templateUrl: 'views/main.html',
  //   controller: 'MainCtrl',
  //   controllerAs: 'main'
  // })
  .when('/', {
    templateUrl: 'views/UploadMenu.html',
    controller: 'UploadMenuCtrl',
    controllerAs: 'UploadMenuCtrl'
  })
  .when('/menu/', {
    templateUrl: 'views/GenerateMenu.html',
    controller: 'generarMenuCtrl',
    controllerAs: 'generarMenuCtrl'
  })
  .when('/abonados/', {
    templateUrl: 'views/ListaAbonados.html',
    controller: 'AbonadosCtrl',
    controllerAs: 'AbonadosCtrl'
  })
  .when('/usuarios/', {
   templateUrl: 'views/ListaUsuarios.html',
   controller: 'UsuariosCtrl',
   controllerAs: 'UsuariosCtrl'
   })
  .when('/Sector/nuevo', {
    templateUrl: 'views/nuevosSector.html',
    controller: 'NuevoSectorCtrl',
    controllerAs: 'NuevoSectorCtrl'
  })
  .when('/Sector/verSector', {
    templateUrl: 'views/verSectores.html',
    controller: 'VerSectoresCtrl',
    controllerAs: 'VerSectoresCtrl'
  })
  .when('/Cuentas/GestionCuentas', {
    templateUrl: 'views/GestionCuentas.html',
    controller: 'GestionCuentasCtrl',
    controllerAs: 'GestionCuentasCtrl'
  })
  .when('/Sector/GestionSectores', {
    templateUrl: 'views/GestionSectores.html',
    controller: 'GestionSectoresCtrl',
    controllerAs: 'GestionSectoresCtrl'
  })
  .when('/Sector/ActualizarSectores', {
    templateUrl: 'views/ActualizarSector.html',
    controller: 'ActualizarSectoresCtrl',
    controllerAs: 'ActualizarSectoresCtrl'
  })
  
  .when('/PaginaPrincipal/', {
    templateUrl: 'views/PaginaPrincipal.html',
    controller: 'PaginaPrincipalCtrl',
    controllerAs: 'PaginaPrincipalCtrl'
  })
  
  .when('/Cuentas/NuevaCuenta', {
    templateUrl: 'views/NuevaCuenta.html',
    controller: 'NuevaCuentaCtrl',
    controllerAs: 'NuevaCuentaCtrl'
   
  })
  .when('/Cuentas/ActualizarCuenta', {
    templateUrl: 'views/ActualizarCuenta.html',
    controller: 'ActualizarCuentaCtrl',
    controllerAs: 'ActualizarCuentaCtrl'
   
  })
  
  .otherwise({
    redirectTo: '/'
  });
})
