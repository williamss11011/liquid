'use strict';
var app = angular.module('proyectoMenu');
app.service('ServicioCuentas', funcionServicioCuentas);

function funcionServicioCuentas($q, $http) {
 // var ip = "192.168.1.4";
   var ip = "localhost";
  this.ingresarCuentas = function (cuenta) {
    var defered = $q.defer();
    var promise = defered.promise;

    $http.post('http://'+ip+':1337/cuenta', cuenta).then(function (data) {
      defered.resolve(data);
    }, function (err) {
      defered.reject(err);
    });
    return promise;
  };

  this.actualizarCuentas = function (cuenta) {
    var defered = $q.defer();
    var promise = defered.promise;
    $http.put('http://'+ip+':1337/cuenta/' + cuenta.id, cuenta).then(function (data) {
      defered.resolve(data);
    }, function (err) {
      defered.reject(err);
    });
    return promise;
  };

  this.recuperarCuentas = function () {
    var defered = $q.defer();
    var promise = defered.promise;
    $http.get('http://'+ip+':1337/cuenta').then(function (data) {
      defered.resolve(data);
    }, function (err) {
      defered.reject(err);
    });
    return promise;
  };

  this.buscarPorSectorId = function (id) {
    var defered = $q.defer();
    var promise = defered.promise;
    $http.get('http://'+ip+':1337/cuenta?sector_id=' + id).then(function (data) {
      defered.resolve(data);
    }, function (err) {
      defered.reject(err);
    });
    return promise;
  };

  this.buscarPorId = function (id) {
    var defered = $q.defer();
    var promise = defered.promise;
    $http.get('http://'+ip+':1337/cuenta/' + id).then(function (data) {
      defered.resolve(data);
    }, function (err) {
      defered.reject(err);
    });
    return promise;
  };


  this.eliminarCuentas = function (cuenta) {
    var defered = $q.defer();
    var promise = defered.promise;
    $http.delete('http://'+ip+':1337/cuenta/' + cuenta.id).then(function (data) {
      defered.resolve(data);
    }, function (err) {
      defered.reject(err);
    });
    return promise;
  };

}
funcionServicioCuentas.inject = ['$q', '$http'];
