'use strict';

var app = angular.module('proyectoMenu');
app.service('ServicioAbonado', funcionServicioAbonado);

function funcionServicioAbonado($q, $http){

  this.ingresarAbonado = function(abonado){
    var defered = $q.defer();
    var promise = defered.promise;

    $http.post('http://localhost:1337/abonado', abonado).then(function(data){
      defered.resolve(data);
    },function(err){
      defered.reject(err);
    });
    return promise;
  };

  this.actualizarAbonado = function(abonado){
    var defered = $q.defer();
    var promise = defered.promise;
    $http.put('http://localhost:1337/abonado/'+abonado.id, abonado).then(function(data){
      defered.resolve(data);
    },function(err){
      defered.reject(err);
    });
    return promise;
  };

  this.recuperarAbonados = function(){
    var defered = $q.defer();
    var promise = defered.promise;
    $http.get('http://localhost:1337/abonado').then(function(data){
      defered.resolve(data);
    },function(err){
      defered.reject(err);
    });
    return promise;
  };

  this.buscarPorId = function(id){
    var defered = $q.defer();
    var promise = defered.promise;
    $http.get('http://localhost:1337/menu/'+id).then(function(data){
      defered.resolve(data);
    },function(err){
      defered.reject(err);
    });
    return promise;
  };


  this.eliminarAbonado = function(abonado){
    var defered = $q.defer();
    var promise = defered.promise;
    $http.delete('http://localhost:1337/abonado/'+abonado.id).then(function(data){
      defered.resolve(data);
    },function(err){
      defered.reject(err);
    });
    return promise;
  };


}

funcionServicioAbonado.inject = ['$q','$http'];
