'use strict';

var app = angular.module('proyectoMenu');
app.service('ServicioLectura', funcionServicioLectura);

function funcionServicioLectura($q, $http) {
  //var ip = "192.168.1.4";
     var ip = "http://localhost:1337";
     //var ip="https://2cbb4248.ngrok.io";

  
  this.ingresarLectura = function (lectura) {
    var defered = $q.defer();
    var promise = defered.promise;

    $http.post(ip + '/lectura', lectura).then(function (data) {
      defered.resolve(data);
    }, function (err) {
      defered.reject(err);
    });
    return promise;
  };

  this.actualizarLectura = function (lectura) {
    var defered = $q.defer();
    var promise = defered.promise;
    $http.put(ip + '/lectura/' + lectura.id, lectura).then(function (data) {
      defered.resolve(data);
    }, function (err) {
      defered.reject(err);
    });
    return promise;
  };

  this.recuperarLectura = function () {
    var defered = $q.defer();
    var promise = defered.promise;
    $http.get(ip + '/lectura').then(function (data) {
      defered.resolve(data);
    }, function (err) {
      defered.reject(err);
    });
    return promise;
  };

  this.buscarPorId = function (id) {
    var defered = $q.defer();
    var promise = defered.promise;
    $http.get(ip + '/menu/' + id).then(function (data) {
      defered.resolve(data);
    }, function (err) {
      defered.reject(err);
    });
    return promise;
  };

  this.buscarPorPeriodoIdCuenta = function (periodo, cuenta_id) {
    var defered = $q.defer();
    var promise = defered.promise;
    $http.get(ip + '/lectura?periodo=' + periodo + '&cuenta_id=' + cuenta_id).then(function (data) {
      defered.resolve(data);
    }, function (err) {
      defered.reject(err);
    });
    return promise;
  };

  this.buscarPorPeriodoIdUsuario = function (periodo, usuario_id) {
    var defered = $q.defer();
    var promise = defered.promise;
    $http.get(ip + '/lectura?periodo=' + periodo + '&usuario_id=' + usuario_id).then(function (data) {
      defered.resolve(data);
    }, function (err) {
      defered.reject(err);
    });
    return promise;
  };




  this.eliminarLectura = function (lectura) {
    var defered = $q.defer();
    var promise = defered.promise;
    $http.delete(ip + '/lectura/' + lectura.id).then(function (data) {
      defered.resolve(data);
    }, function (err) {
      defered.reject(err);
    });
    return promise;
  };

}

funcionServicioLectura.inject = ['$q', '$http'];
