'use strict';

var app = angular.module('proyectoMenu');
app.controller('NuevoSectorCtrl', funcionNuevoSectorCtrl);

function funcionNuevoSectorCtrl($scope, $rootScope, ServicioSector) {

  getLocation();
  getSectores();
  var lat = 0;
  var lng = 0;
  $scope.mymap = {};
  $scope.drawPolygon = {};
  $scope.sector = {};

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


    var drawnItems = new L.FeatureGroup(); // inicializa los controles de dibujo de poligonos
    $scope.mymap.addLayer(drawnItems);

    var drawControl = new L.Control.Draw(); // inicializa los controles de dibujo de poligonos
    $scope.mymap.addControl(drawControl);


    // funcion creal el poligono en el mapa en la variable global DRAWpoligon
    $scope.mymap.on(L.Draw.Event.CREATED, function (e) {
      var layer = e.layer;

      // o whatever else you need to. (save to db; add to map etc)
      $scope.mymap.addLayer(layer);
      $scope.drawPolygon = layer.toGeoJSON();
      // $scope.saveDraw(layer.toGeoJSON());

    });



  }

  function restartMap() {

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

    getSectores();


  }

  $scope.saveDraw = function () {
    console.log("ENTRO AL MEOTODO !!!!!!")
    console.log($scope.drawPolygon);
    $scope.sector.poligono = JSON.stringify($scope.drawPolygon); //el nombre poligono debe ser el mismode la base 
    console.log(JSON.stringify($scope.drawPolygon));
    console.log($scope.sector);
    ServicioSector.ingresarSector($scope.sector).then(function (res) {
      alert("ingreso Correcto");
      restartMap();
      $scope.sector = {};
      $('#myModal');
      $('#myModal').modal('hide');

    }, function (err) {
      console.log(err)
      alert("ingreso fallido");

    })

    // $('#myModal').modal();
    // $('#myModal').modal('open');
  }

  //funcion que recupera los poligonos dibujados 
  function getSectores() {

    ServicioSector.recuperarSector().then(function (res) {
      var listaSectores = res.data;
      //    var myLayer = L.geoJSON().addTo($scope.mymap);
      var listaPoligonos = [];
      var listaEstilos = [];

      var geojson;

      for (var i = 0; i < listaSectores.length; i++) {
        var poligono = JSON.parse(listaSectores[i].poligono) /// convierte el string a json 
        poligono.properties = {'color': listaSectores[i].color}
        console.log(poligono)
        var myStyle = {
          "color": listaSectores[i].color,
          "weight": 1,
          "opacity": 1
        };
        listaPoligonos.push(poligono);
        listaEstilos.push(myStyle);
      }

      function style(feature) {
        return {
          fillColor: feature.properties.color,
          weight: 2,
          opacity: 1,
          color: feature.properties.color,
          dashArray: '3',
          fillOpacity: 0.7
        };
      }

      var geoJsonData = {
        "type": "FeatureCollection",
        "features": listaPoligonos
      };
      //    myLayer.addData(poligono);
      function highlightFeature(e) {
        var layer = e.target;
        layer.setStyle({
          weight: 5,
          color: '#666',
          dashArray: '',
          fillOpacity: 0.7
        });

        if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
          layer.bringToFront();
        }


      }

      function resetHighlight(e) {
        geojson.resetStyle(e.target);
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
        style: style,
        onEachFeature: onEachFeature
      }).addTo($scope.mymap);



      // L.geoJSON([poligono], {
      //   style: myStyle
      // }).addTo($scope.mymap);

      

    }, function (err) {
      console.log(err)
    })

  }




}

funcionNuevoSectorCtrl.inject = ['$scope', '$rootScope', 'ServicioSector'];
