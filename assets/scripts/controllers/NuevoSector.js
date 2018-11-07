'use strict';

var app = angular.module('proyectoMenu');
app.controller('NuevoSectorCtrl', funcionNuevoSectorCtrl);

function funcionNuevoSectorCtrl($scope, $rootScope, ServicioSector) {

  getLocation();
  var lat = 0;
  var lng = 0;
  $scope.mymap = {};
  $scope.drawPolygon = {};
  $scope.sector={};

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      x.innerHTML = "Geolocation is not supported by this browser.";
    }
  }

  function showPosition(position) {

    lat = position.coords.latitude;
    lng = position.coords.longitude;


    // initialize the map on the "map" div with a given center and zoom
    $scope.mymap = L.map('mapid', {
      center: [lat, lng],
      zoom: 13
    });


    L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: 'Tesis',
      id: 'mapbox.streets'
    }).addTo($scope.mymap);

    var marker = L.marker([lat, lng]).addTo($scope.mymap);

  }

  $scope.initControlMaps = function () {
    $scope.mymap.remove();

    $scope.mymap = L.map('mapid', {
      // drawControl: true,
      center: [lat, lng],
      zoom: 13
    });

    L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: 'Tesis',
      id: 'mapbox.streets'
    }).addTo($scope.mymap);

    var drawnItems = new L.FeatureGroup();
    $scope.mymap.addLayer(drawnItems);

    var drawControl = new L.Control.Draw();
    $scope.mymap.addControl(drawControl);

    $scope.mymap.on(L.Draw.Event.CREATED, function (e) {
      var layer = e.layer;
     
      // o whatever else you need to. (save to db; add to map etc)
      $scope.mymap.addLayer(layer);
      $scope.drawPolygon = layer.toGeoJSON();
      // $scope.saveDraw(layer.toGeoJSON());
        
   });

  }

  $scope.saveDraw=function()
  {
    console.log("ENTRO AL MEOTODO !!!!!!")
    console.log($scope.drawPolygon);
    $scope.sector.poligono = JSON.stringify($scope.drawPolygon);   //el nombre poligono debe ser el mismode la base 
    console.log( JSON.stringify($scope.drawPolygon));
    console.log($scope.sector);
    ServicioSector.ingresarSector($scope.sector).then(function(res){
      alert("ingreso Correcto");
    
      }, function(err){
           console.log(err)
           alert("ingreso fallido");
      
      })

    // $('#myModal').modal();
    // $('#myModal').modal('open');
  }




}

funcionNuevoSectorCtrl.inject = ['$scope', '$rootScope', 'ServicioSector'];
