'use strict';

var app = angular.module('proyectoMenu');
app.controller('UploadMenuCtrl', funcionUploadMenuCtrl);

function funcionUploadMenuCtrl ($scope, $rootScope, $location, ServicioMenu){
  $scope.hasMenu;
  $scope.fileLoaded = false;

  var ingresarMenu = function(menu){
    ServicioMenu.ingresarMenu(menu).then(function(res){
        alert("Exito! archivo subido.");
        console.log("Se ingreso el menu");
    },function(err){
      console.log(err);
    });
  };

  var actualizarMenu = function(menu){
    ServicioMenu.actualizarMenu(menu).then(function(res){
        alert("Exito! archivo subido.");
        console.log("Se actualizo el menu")
    },function(err){
      console.log(err);
    });
  };

  var traerMenu = function(){
    ServicioMenu.recuperarMenu().then(function(res){
        var menus = res.data.length;
        if(menus == 1){
          $scope.hasMenu =  true;
        }else if (menus == 0) {
          $scope.hasMenu = false;
        }
        console.log("longitud: ", $scope.hasMenu);
    },function(err){
      console.log(err);
      $scope.hasMenu =  false;
    });
  };

  traerMenu();

  $scope.uploadFile = function(){
    var that = this;
    var fileInput = document.getElementById('inputFileMenu');
    fileInput.addEventListener('change',e=>{
      var file = fileInput.files[0];
      var reader = new FileReader();
      reader.onload = e=>{
        var resultRead = reader.result;
        try {
          var jsonMenu = JSON.parse(resultRead);
          var menu = {}
          menu.menu = JSON.stringify(jsonMenu);
          menu.masUsados = jsonMenu.masUsados;
          menu.ultimoUsado = jsonMenu.ultimoUsado;
          $rootScope.menu = jsonMenu;
          $scope.fileLoaded = true;
          if($scope.hasMenu == true){
            menu.id = 6;
            actualizarMenu(menu);
          }else{
            ingresarMenu(menu);
          }
          document.getElementById("createMenu").style.display = "block"
        } catch (e) {
          console.error(e);
          alert("Error! el archivo no tiene formato JSON, por favor reviselo!");
          $scope.fileLoaded = false;
        }
      }
      reader.readAsText(file);
    });
  };

  $scope.createMenu = function(){
    $location.path('/menu/');
  };

  $scope.viewMenu = function(){
    ServicioMenu.recuperarMenu().then(function(res){
        var menus = res.data;
        // console.log(menus[0])
        $rootScope.menu = JSON.parse(menus[0].menu);
        $location.path('/menu/');
    },function(err){
      console.log(err);
    });

  };



}

funcionUploadMenuCtrl.inject = ['$scope', '$rootScope', '$location', 'ServicioMenu'];
