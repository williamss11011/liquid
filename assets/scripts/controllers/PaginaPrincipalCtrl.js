'use strict';

var app = angular.module('proyectoMenu');
app.controller('PaginaPrincipalCtrl', funcionPaginaPrincipalCtrl);


function funcionPaginaPrincipalCtrl($scope, $rootScope, $location, ServicioUsuario) {
 
  $scope.cargarGraficos = function () { 
  
//   $scope.TESTER = document.getElementById('myDiv');
var x = ["Apples","Apples","Apples","Organges", "Bananas"];
var y = ["5","10","3","10","5"];
  
  
  data = [
    {
        histfunc: "count",
        y: y,
        x: x,
        type: "histogram",
        name: "count"
    },
    {
      histfunc: "sum",
      y: y,
      x: x,
      type: "histogram",
      name: "sum"
    }
  ]
  
  Plotly.plot('myDiv', data, {responsive:true}, {showSendToCloud: true})
};
}

funcionPaginaPrincipalCtrl.inject = ['$scope', '$rootScope', '$location', 'ServicioUsuario'];
