'use strict';

var app = angular.module('proyectoMenu');
app.controller('ActualizarSectoresCtrl', funcionActualizarSectoresCtrl);


function funcionActualizarSectoresCtrl($scope, $rootScope, $location, ServicioSector) {
  $scope.sectorseleccionado = {};
  $scope.sectorseleccionado = $rootScope.sectorAactualizar;
  $scope.mymap = {};
  var lat = 0;
  var lng = 0;
  initMap();

  $scope.actualizarSector = function () {
    ServicioSector.actualizarSector($scope.sectorseleccionado).then(function (res) {
      alert("El registro se ha actualizó correctamente");
      $location.path('/Sector/GestionSectores');
    }, function (err) {
      console.log(err)
      alert("Actualización Fallida");

    })
  };

$scope.regresar=function()
{
  $location.path('/Sector/GestionSectores');

}



  // function getLocation() {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(showPosition);
  //   } else {
  //     x.innerHTML = "Geolocation is not supported by this browser.";
  //   }
  // }

  function initMap(position) {

    lat = "-0.169350"; 
    lng = "-78.470962";

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

    //  var drawnItems = new L.FeatureGroup();
    //  $scope.mymap.addLayer(drawnItems);
    var drawControl = new L.Control.Draw({
      draw: {
        polygon: false,
        polyline: false,
        circle: false,
        rectangle: false,
        marker: false
      },

      edit: {
        featureGroup: test,
        remove: false

      }
    });
    $scope.mymap.addControl(drawControl);

    $scope.mymap.on('draw:edited', function (e) {
      var layers = e.layers;
      layers.eachLayer(function (layer) {
        $scope.sectorseleccionado.poligono = JSON.stringify(layer.toGeoJSON());

      });


    });
  }



}

funcionActualizarSectoresCtrl.inject = ['$scope', '$rootScope', '$location', 'ServicioSector'];
