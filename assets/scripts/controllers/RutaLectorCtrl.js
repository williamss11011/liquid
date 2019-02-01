'use strict';

var app = angular.module('proyectoMenu');
app.controller('RutaLectorCtrl', funcionRutaLectorCtrl);

function funcionRutaLectorCtrl($scope, $rootScope, $location,  ServicioUsuario, ServicioSector, ServicioLectura ) {
  $scope.usuario = {
    id: localStorage.getItem("usuario_id"),
    nombre: localStorage.getItem("usuario_nombre"),
    rol: localStorage.getItem("usuario_rol"),
    sector_id: localStorage.getItem("usuario_sector_id")

  }
  
  $scope.mymap = null;
  $scope.rutaLector={};
  $scope.listaLectores=[];
  $scope.listaCuentas=[];
  var lat = "-0.169350";
  var lng = "-78.470962";
  var latlngs = [];

  initMap();
  obtenerLectores();
 
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
   
  }

  function obtenerLectores(){
    ServicioUsuario.recuperarUsuarioporRol(1).then(function (res) {
      $scope.listaLectores=res.data;
      console.log( $scope.listaLectores);
      
    }, function (err) {
      console.log(err)
    });
  }

  $scope.obtenerSector = function () {
    console.log($scope.rutaLector.lector);

    if($scope.mymap){
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
    
    ServicioSector.buscarPorId($scope.rutaLector.lector.sector_id.id).then(function (res) {
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
      obtenerCuentasLeidas();
      // console.log(sector)
    }, function (error) {
      console.log(error)

    })
  }

  function obtenerCuentasLeidas(){
    console.log($scope.rutaLector.periodo, $scope.rutaLector.lector.id);
    var periodo =($scope.rutaLector.periodo.getMonth()+1)+ "-" + $scope.rutaLector.periodo.getFullYear();
    console.log(periodo);
    
    ServicioLectura.buscarPorPeriodoIdUsuario(periodo, $scope.rutaLector.lector.id).then(function (res) {
      $scope.listaCuentas=res.data;
      console.log( $scope.listaCuentas);
      var listaMarcadores = [];
      latlngs = [];
      var geojson;
      for(var lectura of $scope.listaCuentas){
        var marcador = JSON.parse(lectura.cuenta_id.coordenada);
        marcador.properties = {
          estado:lectura.estado , 
          fecha:lectura.fecha_lectura,
          nombre:lectura}
        listaMarcadores.push(marcador);
        latlngs.push([marcador.geometry.coordinates[1], marcador.geometry.coordinates[0]]);
      }
      // var path = L.polyline(latlngs);
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
          '<h6> <b>Fecha: </b>' + props.fecha + '<br/>'+ 
          '<h6> <b>Abonado: </b>' + props.nombre + ' ' + props.apellido + '</h6>' +
          '<h6> <b>Estado: </b>' + props.estado + '<br/>' :
          
          'Seleccione un marcador para ver su información');
      };

      info.addTo($scope.mymap);
      
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
      //buscar lecturas del periodo del usuario y cuenta y pintar sobre las anteriores 
      geojson = L.geoJson(geoJsonData, {
        onEachFeature: onEachFeature
      }).addTo($scope.mymap);
      // $scope.mymap.addLayer(path);
      // function snake() {
      //   path.snakeIn();
      // }
      // path.on('snakestart snake snakeend', function(ev){
      //   console.log(ev.type);
      // });

      // snake();


    }, function (err) {
      console.log(err)
    });
  };

  $scope.verRuta = function()
  {
    var test= L.polyline(latlngs, {
      snakingSpeed: 100,
      name: 'path',
      // "color": "black",
      // "dashArray": "10 20",
      // "weight": 2,
      // "opacity": 1
  });

  test.addTo($scope.mymap).snakeIn();
  }

}


funcionRutaLectorCtrl.inject = ['$scope', '$rootScope', '$location', 'ServicioUsuario','ServicioSector','ServicioLectura'];
