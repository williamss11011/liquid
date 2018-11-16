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
  .when('/Cuentas/NuevaCuenta', {
    templateUrl: 'views/ListaCuentas.html',
    controller: 'ListaCuentasCtrl',
    controllerAs: 'ListaCuentasCtrl'
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
  
  .otherwise({
    redirectTo: '/'
  });
})
