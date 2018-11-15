'use strict';

var app = angular.module('proyectoMenu');
app.controller('ActualizarSectoresCtrl', funcionActualizarSectoresCtrl);


function funcionActualizarSectoresCtrl($scope, $rootScope, $location, ServicioSector) {
  $scope.sectorseleccionado = {};
  $scope.sectorseleccionado = $rootScope.sectorAactualizar;
  $scope.mymap = {};
  var lat = 0;
  var lng = 0;
  getLocation();

  $scope.actualizarSector = function () {

  }

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

    var poligono = JSON.parse($scope.sectorseleccionado.poligono) /// convierte el string a json 
    var myStyle = {
      weight: 1,
      color: $scope.sectorseleccionado.color,
      dashArray: '',
      fillColor: $scope.sectorseleccionado.color,
      fillOpacity: 0.2
      
    } 
    var test = L.geoJSON(poligono, {
      style: myStyle
    }).addTo($scope.mymap);

    $scope.mymap.fitBounds(test.getBounds());

  }

}

funcionActualizarSectoresCtrl.inject = ['$scope', '$rootScope', '$location', 'ServicioSector'];
