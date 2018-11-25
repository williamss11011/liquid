'use strict';

var app = angular.module('proyectoMenu');
app.service('ServicioMenu', funcionServicioMenu);

function funcionServicioMenu($q, $http){
  var ip = "192.168.1.6";
  // var ip = "localhost";
  this.ingresarMenu = function(menu){
    var defered = $q.defer();
    var promise = defered.promise;
    console.log("ENTRO AL SERVICIO DE INGRESO");
    console.log(menu);
    $http.post('http://'+ip+':1337/menu', menu).then(function(data){
      defered.resolve(data);
    },function(err){
      defered.reject(err);
    });
    return promise;
  };

  this.actualizarMenu = function(menu){
    var defered = $q.defer();
    var promise = defered.promise;
    $http.put('http://'+ip+':1337/menu/'+menu.id, menu).then(function(data){
      defered.resolve(data);
    },function(err){
      defered.reject(err);
    });
    return promise;
  };

  this.recuperarMenu = function(){
    var defered = $q.defer();
    var promise = defered.promise;
    $http.get('http://'+ip+':1337/menu').then(function(data){
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


  this.eliminarMenu = function(id){
    var defered = $q.defer();
    var promise = defered.promise;
    $http.delete('http://'+ip+':1337/menu/'+id).then(function(data){
      defered.resolve(data);
    },function(err){
      defered.reject(err);
    });
    return promise;
  };


}

funcionServicioMenu.inject = ['$q','$http'];
