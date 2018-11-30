'use strict';

var app = angular.module('proyectoMenu');
app.service('ServicioItem', funcionServicioItem);

function funcionServicioItem($q, $http){
  var ip = "192.168.1.4";
  // var ip = "localhost";
  this.ingresarUsuario = function(usuario){
    var defered = $q.defer();
    var promise = defered.promise;

    $http.post('http://'+ip+':1337/usuario',usuario).then(function(data){
      defered.resolve(data);
    },function(err){
      defered.reject(err);
    });
    return promise;
  };

  this.recuperarUsuarios = function(){
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

    $http.get('http://'+ip+':1337/usuario/'+id).then(function(data){
      defered.resolve(data);
    },function(err){
      defered.reject(err);
    });
    return promise;
  };

  this.login = function(nick, password){
    var defered = $q.defer();
    var promise = defered.promise;
    console.log(nick+' '+password);
    $http.get('http://'+ip+':1337/usuario?where={"nick":"'+nick+'","password":"'+password+'"}').then(function(data){
      defered.resolve(data);
    },function(err){
      defered.reject(err);
    });
    return promise;
  };

  this.loginXcorreo = function(correo){
    var defered = $q.defer();
    var promise = defered.promise;
    $http.get('http://'+ip+':1337/usuario?where={"email":"'+correo+'"}').then(function(data){
      defered.resolve(data);
    },function(err){
      defered.reject(err);
    });
    return promise;
  };

  this.eliminarUsuario = function(id){
    var defered = $q.defer();
    var promise = defered.promise;

    $http.delete('http://'+ip+':1337/usuario/'+id).then(function(data){
      defered.resolve(data);
    },function(err){
      defered.reject(err);
    });
    return promise;
  }

  this.actualizarUsuario = function(usuario){
    var defered = $q.defer();
    var promise = defered.promise;
    //console.log(usuario);
    //var id = usuario.id_usuario;
    //console.log(id);

    $http.put('http://'+ip+':1337/usuario/'+usuario.id_usuario, usuario).then(function(data){
      defered.resolve(data);
    },function(err){
      defered.reject(err);
    });
    return promise;
  };

}

funcionServicioItem.inject = ['$q','$http'];
