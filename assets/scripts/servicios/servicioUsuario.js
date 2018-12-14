'use strict';

var app = angular.module('proyectoMenu');
app.service('ServicioUsuario', funcionServicioUsuario);
// app.service('ServicioAbonado', funcionServicioAbonado);

function funcionServicioUsuario($q, $http){
  //var ip = "192.168.1.4";
   var ip = "http://localhost:1337";
   //var ip="https://eb83084b.ngrok.io";
  
  this.ingresarUsuario = function(usuario){
    var defered = $q.defer();
    var promise = defered.promise;

    $http.post(ip+'/usuario', usuario).then(function(data){
   // $http.post('https://7b1b773f.ngrok.io/usuario', usuario).then(function(data){
      defered.resolve(data);
    },function(err){
      defered.reject(err);
    });
    return promise;
  };

  this.actualizarUsuario = function(usuario){
    var defered = $q.defer();
    var promise = defered.promise;
    $http.put(ip+'/usuario/'+usuario.id, usuario).then(function(data){
   // $http.put('https://7b1b773f.ngrok.io/usuario'+usuario.id, usuario).then(function(data){
      defered.resolve(data);
    },function(err){
      defered.reject(err);
    });
    return promise;
  };

  this.recuperarUsuario = function(){
    var defered = $q.defer();
    var promise = defered.promise;
    $http.get(ip+'/usuario').then(function(data){
    //$http.get('https://7b1b773f.ngrok.io/usuario').then(function(data){
      defered.resolve(data);
    },function(err){
      defered.reject(err);
    });
    return promise;
  };

  this.buscarPorId = function(id){
    var defered = $q.defer();
    var promise = defered.promise;
    //$http.get('http://'+ip+':1337/menu/'+id).then(function(data){
    $http.get(ip+'/menu/'+id).then(function(data){
      defered.resolve(data);
    },function(err){
      defered.reject(err);
    });
    return promise;
  };

  this.login = function(correo,password){
    var defered = $q.defer();
    var promise = defered.promise;
    $http.get(ip+'/usuario?correo='+correo+'&password='+password).then(function(data){
    //$http.get('https://7b1b773f.ngrok.io/usuario?correo='+correo+'&password='+password).then(function(data){
      defered.resolve(data);
    },function(err){
      defered.reject(err);
    });
    return promise;
  };

  this.eliminarUsuario = function(usuario){
    var defered = $q.defer();
    var promise = defered.promise;
    $http.delete(ip+'/usuario/'+usuario.id).then(function(data){
   // $http.delete('https://7b1b773f.ngrok.io/abonado/'+usuario.id).then(function(data){
      defered.resolve(data);
    },function(err){
      defered.reject(err);
    });
    return promise;
  };


}

funcionServicioUsuario.inject = ['$q','$http'];
