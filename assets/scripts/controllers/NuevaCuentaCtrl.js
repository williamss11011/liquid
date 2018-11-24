'use strict';

var app = angular.module('proyectoMenu');
app.controller('NuevaCuentaCtrl', funcionNuevaCuenta);

function funcionNuevaCuenta($scope, $rootScope, ServicioSector, ServicioAbonado, ServicioCuentas) {
  $scope.ListaSectores = [];
  $scope.ListaAbonados = [];
  $scope.Cuenta = {};
  $scope.mymap = {};
  $scope.CrearMarcador = {};

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
    getCuentasxSector($scope.Cuenta.sector);
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
        circlemarker: true,
        polygon: false,
        polyline: false,
        circle: false,
        rectangle: false,
        marker: false
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

  function getCuentasxSector(sector) {
    ServicioCuentas.buscarPorSectorId(sector.id).then(function (res) {
      var listacuentas=[]
      console.log(res.data)
      listacuentas = res.data;
      console.log(listacuentas)
      var listaMarcadores = [];
      var geojson;

      for (var i = 0; i < listacuentas.length; i++) {
        var marcador = JSON.parse(listacuentas[i].coordenada) /// convierte el string a json 
        marcador.properties = {
          'nombre': listacuentas[i].abonado_id.nombre,
          'apellido': listacuentas[i].abonado_id.apellido,
          'cedula': listacuentas[i].abonado_id.cedula,
          'marcamedidor': listacuentas[i].marca_medidor,
          'tarifa': listacuentas[i].tarifa,
        };
        listaMarcadores.push(marcador);
      }
      var myStyle = {
        weight: 3,
        color: 'black',
        dashArray: '',
        fillColor: 'black',
        fillOpacity: 0.5
      }

      // funcion de leyendas de seleccion de poligono
      var info = L.control({
        position: 'topright'
      });

      info.onAdd = function (map) {
        this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
        this.update();
        return this._div;
      };

      // method that we will use to update the control based on feature properties passed
      info.update = function (props) {
        this._div.innerHTML = '<h4>DATOS</h4>' + (props ?
          '<h6> <b>Nombre: </b>' + props.nombre + ' ' +  props.apellido + '</h6>' + 
          '<h6> <b>Cedula: </b>' + props.cedula + '<br/>' + 
          '<h6> <b>Marca de Medidor: </b>' + props.marcamedidor + '<br/>' +
          '<h6> <b>Tarifa: </b>' + props.tarifa  + '<br/>' :
          'Seleccione un Marcador para ver su información');
      };

      info.addTo($scope.mymap);
      console.log("+++++++++++++++++++++++++++++++++++++++")
      console.log(listaMarcadores)
      var geoJsonData = {
        "type": "FeatureCollection",
        "features": listaMarcadores
      };
      //    myLayer.addData(poligono);
      function highlightFeature(e) {
        var layer = e.target;
        
        // if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        //   layer.bringToFront();
        // }

        info.update(layer.feature.properties);

      }

      function resetHighlight(e) {
        // geojson.resetStyle(e.target);
        info.update();
      }

      function zoomToFeature(e) {
        $scope.mymap.fitBounds(e.target.getBounds());
      }

      function onEachFeature(feature, layer) {
        layer.on({
          mouseover: highlightFeature,
          mouseout: resetHighlight,
          click: zoomToFeature
        });
      }

      geojson = L.geoJson(geoJsonData, {
        onEachFeature: onEachFeature,
        pointToLayer: function (feature, latlng) {
          return L.circleMarker(latlng, myStyle);
        }
      }).addTo($scope.mymap);

    }, function (err) {
      console.log(err)
    })
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
      maxZoom: 24,
      attribution: 'Tesis',
      id: 'mapbox.streets'
    }).addTo($scope.mymap);

    // var marker = L.marker([lat, lng]).addTo($scope.mymap);   ---obtiene posicion gps 
  }

  $scope.IngresarCuenta = function () {
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

  function restartMap() {
    $scope.mymap.remove();

    $scope.mymap = L.map('mapid', {
      //drawControl: true,
      center: [lat, lng],
      zoom: 13
    });

    L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 24,
      attribution: 'Tesis',
      id: 'mapbox.streets'
    }).addTo($scope.mymap);
  }




}

funcionNuevaCuenta.inject = ['$scope', '$rootScope', 'ServicioSector', 'ServicioAbonado', 'ServicioCuentas'];
