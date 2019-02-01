'use strict';
var app = angular.module('proyectoMenu');
app.service('ServicioCuentas', funcionServicioCuentas);

function funcionServicioCuentas($q, $http) {
  //var ip = "192.168.1.4";
     var ip = "http://localhost:1337";
     //var ip="https://ac5ccb65.ngrok.io"; 

   
  this.ingresarCuentas = function (cuenta) {
    var defered = $q.defer();
    var promise = defered.promise;

    $http.post(ip+'/cuenta', cuenta).then(function (data) {
      defered.resolve(data);
    }, function (err) {
      defered.reject(err);
    });
    return promise;
  };

  this.actualizarCuentas = function (cuenta) {
    var defered = $q.defer();
    var promise = defered.promise;
    $http.put(ip+'/cuenta/' + cuenta.id, cuenta).then(function (data) {
      defered.resolve(data);
    }, function (err) {
      defered.reject(err);
    });
    return promise;
  };

  this.recuperarCuentas = function () {
    var defered = $q.defer();
    var promise = defered.promise;
    $http.get(ip+'/cuenta').then(function (data) {
      defered.resolve(data);
    }, function (err) {
      defered.reject(err);
    });
    return promise;
  };

  this.buscarPorSectorId = function (id) {
    var defered = $q.defer();
    var promise = defered.promise;
    $http.get(ip+'/cuenta?sector_id=' + id).then(function (data) {
      defered.resolve(data);
    }, function (err) {
      defered.reject(err);
    });
    return promise;
  };

  this.buscarPorId = function (id) {
    var defered = $q.defer();
    var promise = defered.promise;
    $http.get(ip+'/cuenta/' + id).then(function (data) {
      defered.resolve(data);
    }, function (err) {
      defered.reject(err);
    });
    return promise;
  };


  this.eliminarCuentas = function (cuenta) {
    var defered = $q.defer();
    var promise = defered.promise;
    $http.delete(ip+'/cuenta/' + cuenta.id).then(function (data) {
      defered.resolve(data);
    }, function (err) {
      defered.reject(err);
    });
    return promise;
  };

}
funcionServicioCuentas.inject = ['$q', '$http'];
