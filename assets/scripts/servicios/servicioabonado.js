'use strict';

var app = angular.module('proyectoMenu');
app.service('ServicioAbonado', funcionServicioAbonado);

function funcionServicioAbonado($q, $http){
  //var ip = "192.168.1.4";
   var ip = "http://localhost:1337";
   //var ip="https://ac5ccb65.ngrok.io";
  this.ingresarAbonado = function(abonado){
    var defered = $q.defer();
    var promise = defered.promise;

   // $http.post('http://'+ip+':1337/abonado', abonado).then(function(data){
    $http.post(ip+'/abonado', abonado).then(function(data){
      defered.resolve(data);
    },function(err){
      defered.reject(err);
    });
    return promise;
  };

  this.actualizarAbonado = function(abonado){
    var defered = $q.defer();
    var promise = defered.promise;
    $http.put(ip+'/abonado/'+abonado.id, abonado).then(function(data){
      defered.resolve(data);
    },function(err){
      defered.reject(err);
    });
    return promise;
  };

  this.recuperarAbonados = function(){
    var defered = $q.defer();
    var promise = defered.promise;
    //$http.get('http://'+ip+':1337/abonado').then(function(data){
    $http.get(ip+'/abonado').then(function(data){
      defered.resolve(data);
    },function(err){
      defered.reject(err);
    });
    return promise;
  };

  this.buscarPorId = function(id){
    var defered = $q.defer();
    var promise = defered.promise;
    $http.get(ip+'/menu/'+id).then(function(data){
      defered.resolve(data);
    },function(err){
      defered.reject(err);
    });
    return promise;
  };


  this.eliminarAbonado = function(abonado){
    var defered = $q.defer();
    var promise = defered.promise;
    $http.delete(ip+'/abonado/'+abonado.id).then(function(data){
      defered.resolve(data);
    },function(err){
      defered.reject(err);
    });
    return promise;
  };


}

funcionServicioAbonado.inject = ['$q','$http'];
