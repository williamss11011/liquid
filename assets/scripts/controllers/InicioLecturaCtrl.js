'use strict';

var app = angular.module('proyectoMenu');
app.controller('InicioLecturaCtrl', funcionInicioLecturaCtrl);

function funcionInicioLecturaCtrl($scope, $rootScope, $location, ServicioLectura, ServicioSector, ServicioCuentas) {
  $scope.usuario = {
    id: localStorage.getItem("usuario_id"),
    nombre: localStorage.getItem("usuario_nombre"),
    rol: localStorage.getItem("usuario_rol"),
    sector_id: localStorage.getItem("usuario_sector_id")

  }
  console.log($scope.usuario);
  $scope.mymap = {};
  $scope.lectura = {};
  $scope.lecturaAnterior={};
  var lat = "-0.169350";
  var lng = "-78.470962";
  var scanner = {};
  $scope.cuentaLeida = {};
  initMap();

  function obtenerSector() {
    ServicioSector.buscarPorId($scope.usuario.sector_id).then(function (res) {
      var sector = res.data;
      var poligono = JSON.parse(sector.poligono) /// convierte el string a json 
      var myStyle = {
        weight: 1,
        color: sector.color,
        dashArray: '',
        fillColor: sector.color,
        fillOpacity: 0.2
      }
      var test = L.geoJSON(poligono, {
        style: myStyle
      }).addTo($scope.mymap);

      $scope.mymap.fitBounds(test.getBounds());
      getCuentasxSector(sector);
      console.log(sector)
    }, function (error) {
      console.log(error)

    })
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
    obtenerSector();
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

  $scope.habilitarCamara = function () {
    ocultarCamara(false);
    scanner = new Instascan.Scanner({
      video: document.getElementById('preview')
    });
    scanner.addListener('scan', function (content) {
      console.log(content);
      ocultarCamara(true);
      buscarCuenta(content);
      obtenerLecturaAnterior(content);
    });
    Instascan.Camera.getCameras().then(function (cameras) {
      if (cameras.length > 0) {
        scanner.start(cameras[0]);
      } else {
        console.error('No cameras found.');
      }
    }).catch(function (e) {
      console.error(e);
    });
  }

  function ocultarCamara(condicion) {
    if (condicion == true) {
      document.getElementById('preview').style.display = "none";
      document.getElementById('formulario').style.display = "block";
      scanner.stop();
    } else {
      document.getElementById('preview').style.display = "block";
      document.getElementById('formulario').style.display = "none";
    }
  }

  function buscarCuenta(idcuenta) {
    ServicioCuentas.buscarPorId(idcuenta).then(function (res) {
      $scope.cuentaLeida = res.data;
      console.log("Cuenta: ")
      console.log($scope.cuentaLeida)
    }, function (error) {
      console.log(error);
    })
  }

  function obtenerLecturaAnterior(cuenta_id) {
    var periodo = moment(new Date(Date.now())).format("MM-YYYY");
    console.log("periodo")
    console.log(periodo)
    ServicioLectura.buscarPorPeriodoIdCuenta(periodo, cuenta_id).then(function (res) {
      $scope.lecturaAnterior = res.data;
      if( $scope.lecturaAnterior.length == 0){
        $scope.lecturaAnterior.valor_lectura = 0;
      }else{
        $scope.lecturaAnterior = $scope.lecturaAnterior[0];
        console.log("test")
        console.log($scope.lecturaAnterior)
      }
    }, function (error) {
      console.log(error);
    })
  }

}


funcionInicioLecturaCtrl.inject = ['$scope', '$rootScope', '$location', 'ServicioLectura', 'ServicioSector', 'ServicioCuentas'];
