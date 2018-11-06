'use strict';

var app = angular.module('proyectoMenu');
app.controller('NuevoSectorCtrl', funcionNuevoSectorCtrl);

function funcionNuevoSectorCtrl($scope, $rootScope, ServicioSector) {

  getLocation();
  var lat = 0;
  var lng = 0;
  $scope.mymap = {};

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
      drawControl: true,
      center: [lat, lng],
      zoom: 13
    });

    L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: 'Tesis',
      id: 'mapbox.streets'
    }).addTo($scope.mymap);

    // var drawnItems = new L.FeatureGroup();
    // $scope.mymap.addLayer(drawnItems);

    // var drawControl = new L.Control.Draw();
    // $scope.mymap.addControl(drawControl);

    ////////////

    

    ///

    $scope.mymap.on(L.Draw.Event.CREATED, function (e) {
      var layer = e.layer;
     
      // o whatever else you need to. (save to db; add to map etc)
      $scope.mymap.addLayer(layer);
      $scope.saveDraw(layer.toGeoJSON());
      
      
      
   });

  }

  $scope.saveDraw=function(layer)
  {
    console.log(layer);
    $('#myModal').modal('toggle')
  }




}

funcionNuevoSectorCtrl.inject = ['$scope', '$rootScope', 'ServicioSector'];
