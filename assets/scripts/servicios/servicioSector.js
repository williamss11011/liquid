'use strict';

var app = angular.module('proyectoMenu');
app.service('ServicioSector', funcionServicioSector);

function funcionServicioSector($q, $http){
//var ip = "192.168.1.4";
 var ip = "http://localhost:1337";
 //var ip="https://2cbb4248.ngrok.io";
    
    this.ingresarSector = function(sector){
        var defered = $q.defer();
        var promise = defered.promise;
    
        $http.post(ip+'/sector', sector).then(function(data){
          defered.resolve(data);
        },function(err){
          defered.reject(err);
        });
        return promise;
      };
    
      this.actualizarSector = function(sector){
        var defered = $q.defer();
        var promise = defered.promise;
        $http.put(ip+'/sector/'+sector.id, sector).then(function(data){
          defered.resolve(data);
        },function(err){
          defered.reject(err);
        });
        return promise;
      };
    
      this.recuperarSector = function(){
        var defered = $q.defer();
        var promise = defered.promise;
        $http.get(ip+'/sector').then(function(data){
          defered.resolve(data);
        },function(err){
          defered.reject(err);
        });
        return promise;
      };
    
      this.buscarPorId = function(id){
        var defered = $q.defer();
        var promise = defered.promise;
        $http.get(ip+'/sector/'+id).then(function(data){
          defered.resolve(data);
        },function(err){
          defered.reject(err);
        });
        return promise;
      };
    
    
      this.eliminarSector = function(sector){
        var defered = $q.defer();
        var promise = defered.promise;
        $http.delete(+ip+'/sector/'+sector.id).then(function(data){
          defered.resolve(data);
        },function(err){
          defered.reject(err);
        });
        return promise;
      };



}

funcionServicioSector.inject = ['$q','$http'];
