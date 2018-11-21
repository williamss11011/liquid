'use strict';

var app = angular.module('proyectoMenu');
app.controller('NuevaCuentaCtrl', funcionNuevaCuenta);

function funcionNuevaCuenta($scope, $rootScope, ServicioSector, ServicioAbonado, ServicioCuentas) {
  $scope.ListaSectores = [];
  $scope.ListaAbonados = [];
  $scope.Cuenta = {};
  $scope.mymap = {};
  $scope.CrearMarcador ={};

  var lat = 0;
  var lng = 0;
  getLocation();

  var obtenerAbonados = function () {
    ServicioAbonado.recuperarAbonados().then(function (res) {
      $scope.ListaAbonados = res.data;
      console.log($scope.ListaAbonados)
    }, function (err) {
      console.log(err)
    })

  };
  obtenerAbonados();

  var obtenerSectores = function () {
    ServicioSector.recuperarSector().then(function (res) {
      $scope.ListaSectores = res.data;
      console.log($scope.ListaSectores)
    }, function (err) {
      console.log(err)
    })

  };
  obtenerSectores();


  $scope.CambioSector = function () {
    
    restartMap();

    // console.log($scope.Cuenta.sector);
    var poligono = JSON.parse($scope.Cuenta.sector.poligono) /// convierte el string a json 
    var myStyle = {
      weight: 1,
      color: $scope.Cuenta.sector.color,
      dashArray: '',
      fillColor: $scope.Cuenta.sector.color,
      fillOpacity: 0.2

    }
    var test = L.geoJSON(poligono, {
      style: myStyle
    }).addTo($scope.mymap);

    $scope.mymap.fitBounds(test.getBounds());


  }

  $scope.initControlMaps = function () {

    var drawControl = new L.Control.Draw({
        draw: {
          polygon: false,
          polyline: false,
          circle: false,
          rectangle: false,
          marker: true
        },          
      });   
    $scope.mymap.addControl(drawControl);


    // funcion creal el poligono en el mapa en la variable global DRAWpoligon
    $scope.mymap.on(L.Draw.Event.CREATED, function (e) {
      var layer = e.layer;

      // o whatever else you need to. (save to db; add to map etc)
      $scope.mymap.addLayer(layer);
      $scope.CrearMarcador = layer.toGeoJSON();
      // $scope.saveDraw(layer.toGeoJSON());

    });

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

    // var marker = L.marker([lat, lng]).addTo($scope.mymap);   ---obtiene posicion gps 
  }

  $scope.IngresarCuenta=function()
  {
    $scope.Cuenta.sector_id = parseInt($scope.Cuenta.sector.id);
    $scope.Cuenta.abonado_id = parseInt($scope.Cuenta.abonado_id);
    $scope.Cuenta.coordenada = JSON.stringify($scope.CrearMarcador);
    ServicioCuentas.ingresarCuentas($scope.Cuenta).then(function (res) {
        alert("ingreso Correcto");
        restartMap();
        $scope.Cuenta = {};

      }, function (err) {
        console.log(err)
        alert("ingreso fallido");
  
      })
  }

  function restartMap ()
  {
    $scope.mymap.remove();

    $scope.mymap = L.map('mapid', {
      //drawControl: true,
      center: [lat, lng],
      zoom: 13
    });

    L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      attribution: 'Tesis',
      id: 'mapbox.streets'
    }).addTo($scope.mymap);
  } 
  
      
  

}

funcionNuevaCuenta.inject = ['$scope', '$rootScope', 'ServicioSector', 'ServicioAbonado', 'ServicioCuentas'];
