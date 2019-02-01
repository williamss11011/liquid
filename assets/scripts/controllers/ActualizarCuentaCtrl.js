'use strict';

var app = angular.module('proyectoMenu');
app.controller('ActualizarCuentaCtrl', funcionActualizarCuentaCtrl);


function funcionActualizarCuentaCtrl($scope, $rootScope, $location, ServicioSector, ServicioAbonado, ServicioCuentas) {
  $scope.ListaSectores = [];
  $scope.ListaAbonados = [];
  $scope.marcadorSeleccionado = {};
  $scope.cuentaseleccionada = {};
  $scope.cuentaseleccionada = $rootScope.cuentaAactualizar;
  console.log("______________________________________--")
  console.log($scope.cuentaseleccionada)
  $scope.mymap = {};
  var lat = "-0.169350";
  var lng = "-78.470962";
  
  initMap();

  


  $scope.actualizarCuenta = function () {
    console.log(JSON.stringify($scope.cuentaseleccionada));
    var sector_id = $scope.cuentaseleccionada.sector_id.id;
    var abonado_id = $scope.cuentaseleccionada.abonado_id.id;
    $scope.cuentaseleccionada.sector_id = parseInt(sector_id);
    $scope.cuentaseleccionada.abonado_id = parseInt(abonado_id);
    ServicioCuentas.actualizarCuentas($scope.cuentaseleccionada).then(function (res) {
      alert("El registro se ha actualizó correctamente");
      $location.path('/Cuentas/GestionCuentas');
    }, function (err) {
      console.log(err)
      alert("Actualización Fallida");

    })
  };

  $scope.regresar = function () {
    $location.path('/Cuentas/GestionCuentas');

  }


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

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      x.innerHTML = "Geolocation is not supported by this browser.";
    }
  }

  function initMap(position) {

    lat = "-0.169350"; 
    lng = "-78.470962";

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

    var poligono = JSON.parse($scope.cuentaseleccionada.sector_id.poligono) /// convierte el string a json 
    var myStyle = {
      weight: 1,
      color: $scope.cuentaseleccionada.sector_id.color,
      dashArray: '',
      fillColor: $scope.cuentaseleccionada.sector_id.color,
      fillOpacity: 0.2

    }
    var test = L.geoJSON(poligono, {
      style: myStyle
    }).addTo($scope.mymap);

    $scope.mymap.fitBounds(test.getBounds());
    var geojson;
    var marcador = JSON.parse($scope.cuentaseleccionada.coordenada);

    var myStyle = {
      weight: 3,
      color: 'blue',
      dashArray: '',
      fillColor: 'blue',
      fillOpacity: 0.5
    }
    var test = L.geoJSON(marcador, {
        //Se asigna los estilos creados a cada marcador
        pointToLayer: function (feature, latlng) {
          return L.circleMarker(latlng, myStyle);
        }
    }).addTo($scope.mymap);
    // var test = new L.FeatureGroup(marcador).addTo($scope.mymap);
    getCuentasxSector($scope.cuentaseleccionada.sector_id);

    var drawControl = new L.Control.Draw({
      draw: {
        polygon: false,
        polyline: false,
        circle: false,
        rectangle: false,
        marker: false,
        circlemarker: false
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
        console.log(JSON.stringify(layer.toGeoJSON()));
        $scope.cuentaseleccionada.coordenada = JSON.stringify(layer.toGeoJSON());

      });


    });
    // var marker = L.marker([lat, lng]).addTo($scope.mymap);   ---obtiene posicion gps 
  }


  function getCuentasxSector(sector) {
    ServicioCuentas.buscarPorSectorId(sector.id).then(function (res) {
      var listacuentas = []
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
        if($scope.cuentaseleccionada.id != listacuentas[i].id){
          listaMarcadores.push(marcador);
        }
        
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
          '<h6> <b>Nombre: </b>' + props.nombre + ' ' + props.apellido + '</h6>' +
          '<h6> <b>Cedula: </b>' + props.cedula + '<br/>' +
          '<h6> <b>Marca de Medidor: </b>' + props.marcamedidor + '<br/>' +
          '<h6> <b>Tarifa: </b>' + props.tarifa + '<br/>' :
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



}

funcionActualizarCuentaCtrl.inject = ['$scope', '$rootScope', '$location', 'ServicioSector', 'ServicioAbonado', 'ServicioCuentas'];
