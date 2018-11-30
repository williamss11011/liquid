'use strict';

var app = angular.module('proyectoMenu');
app.service('ServicioUsuario', funcionServicioUsuario);
// app.service('ServicioAbonado', funcionServicioAbonado);

function funcionServicioUsuario($q, $http){
  //var ip = "192.168.1.4";
  var ip = "localhost";
  this.ingresarUsuario = function(usuario){
    var defered = $q.defer();
    var promise = defered.promise;

    $http.post('http://'+ip+':1337/usuario', usuario).then(function(data){
      defered.resolve(data);
    },function(err){
      defered.reject(err);
    });
    return promise;
  };

  this.actualizarUsuario = function(usuario){
    var defered = $q.defer();
    var promise = defered.promise;
    $http.put('http://'+ip+':1337/usuario/'+usuario.id, usuario).then(function(data){
      defered.resolve(data);
    },function(err){
      defered.reject(err);
    });
    return promise;
  };

  this.recuperarUsuario = function(){
    var defered = $q.defer();
    var promise = defered.promise;
    $http.get('http://'+ip+':1337/usuario').then(function(data){
      defered.resolve(data);
    },function(err){
      defered.reject(err);
    });
    return promise;
  };

  this.buscarPorId = function(id){
    var defered = $q.defer();
    var promise = defered.promise;
    $http.get('http://'+ip+':1337/menu/'+id).then(function(data){
      defered.resolve(data);
    },function(err){
      defered.reject(err);
    });
    return promise;
  };

  this.login = function(correo,password){
    var defered = $q.defer();
    var promise = defered.promise;
    $http.get('http://'+ip+':1337/usuario?correo='+correo+'&password='+password).then(function(data){
      defered.resolve(data);
    },function(err){
      defered.reject(err);
    });
    return promise;
  };

  this.eliminarUsuario = function(usuario){
    var defered = $q.defer();
    var promise = defered.promise;
    $http.delete('http://'+ip+':1337/usuario/'+usuario.id).then(function(data){
      defered.resolve(data);
    },function(err){
      defered.reject(err);
    });
    return promise;
  };


}

funcionServicioUsuario.inject = ['$q','$http'];
