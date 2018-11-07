'use strict';

var app = angular.module('proyectoMenu');
app.controller('VerSectoresCtrl', funcionVerSectoresCtrl);    // app.controller('NuevoSectorCtrl' --- mismo nombre del app.js

function funcionVerSectoresCtrl($scope, $rootScope, ServicioSector) {

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

  function getSectores()
  {

    ServicioSector.recuperarSector().then(function(res){
       var listaSectores=res.data;
    //    var myLayer = L.geoJSON().addTo($scope.mymap);
       for(var i =0;i<listaSectores.length;i++)
       {
           var poligono=JSON.parse(listaSectores[i].poligono)      /// convierte el string a json 
           console.log(poligono)
        //    myLayer.addData(poligono);

            var myStyle = {
                "color": listaSectores[i].color,
                "weight": 1,
                "opacity": 1
            };
            L.geoJSON([poligono], {
                style: myStyle
            }).addTo($scope.mymap);


       }
    
    }, function(err){
         console.log(err)
    })

  }
  getSectores();



}

funcionVerSectoresCtrl.inject = ['$scope', '$rootScope', 'ServicioSector'];
