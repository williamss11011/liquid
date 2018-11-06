'use strict';

var app = angular.module('proyectoMenu');
app.service('ServicioUsuario', funcionServicioUsuario);
// app.service('ServicioAbonado', funcionServicioAbonado);

function funcionServicioUsuario($q, $http){

  this.ingresarUsuario = function(usuario){
    var defered = $q.defer();
    var promise = defered.promise;

    $http.post('http://localhost:1337/usuario', usuario).then(function(data){
      defered.resolve(data);
    },function(err){
      defered.reject(err);
    });
    return promise;
  };

  this.actualizarUsuario = function(usuario){
    var defered = $q.defer();
    var promise = defered.promise;
    $http.put('http://localhost:1337/usuario/'+usuario.id, usuario).then(function(data){
      defered.resolve(data);
    },function(err){
      defered.reject(err);
    });
    return promise;
  };

  this.recuperarUsuario = function(){
    var defered = $q.defer();
    var promise = defered.promise;
    $http.get('http://localhost:1337/usuario').then(function(data){
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


  this.eliminarUsuario = function(usuario){
    var defered = $q.defer();
    var promise = defered.promise;
    $http.delete('http://localhost:1337/usuario/'+usuario.id).then(function(data){
      defered.resolve(data);
    },function(err){
      defered.reject(err);
    });
    return promise;
  };


}

funcionServicioUsuario.inject = ['$q','$http'];
