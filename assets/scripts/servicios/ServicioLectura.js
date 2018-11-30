'use strict';

var app = angular.module('proyectoMenu');
app.service('ServicioLectura', funcionServicioLectura);

function funcionServicioLectura($q, $http){
//var ip = "192.168.1.4";
  var ip = "localhost";
    this.ingresarLectura = function(lectura){
        var defered = $q.defer();
        var promise = defered.promise;
    
        $http.post('http://'+ip+':1337/lectura', lectura).then(function(data){
          defered.resolve(data);
        },function(err){
          defered.reject(err);
        });
        return promise;
      };
    
      this.actualizarLectura = function(lectura){
        var defered = $q.defer();
        var promise = defered.promise;
        $http.put('http://'+ip+':1337/lectura/'+lectura.id, lectura).then(function(data){
          defered.resolve(data);
        },function(err){
          defered.reject(err);
        });
        return promise;
      };
    
      this.recuperarLectura = function(){
        var defered = $q.defer();
        var promise = defered.promise;
        $http.get('http://'+ip+':1337/lectura').then(function(data){
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

      this.buscarPorPeriodoIdCuenta = function(periodo, cuenta_id){
        var defered = $q.defer();
        var promise = defered.promise;
        $http.get('http://'+ip+':1337/lectura?periodo='+periodo+'&cuenta_id='+cuenta_id).then(function(data){
          defered.resolve(data);
        },function(err){
          defered.reject(err);
        });
        return promise;
      };


    
    
      this.eliminarLectura = function(lectura){
        var defered = $q.defer();
        var promise = defered.promise;
        $http.delete('http://'+ip+':1337/lectura/'+lectura.id).then(function(data){
          defered.resolve(data);
        },function(err){
          defered.reject(err);
        });
        return promise;
      };

}

funcionServicioLectura.inject = ['$q','$http'];
