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
  $scope.lectura.tip = "leido";

  $scope.lecturaAnterior = {};
  $scope.lecturasIngresadas = [];
  var lat = "-0.169350";
  var lng = "-78.470962";
  var scanner = {};
  var listaMarcadores = [];
  var listacuentas = [];  
  var lecturasIngresadas= []; 
  var primeraVez = 0;
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
      // getCuentasLeidas();
      console.log(sector)
    }, function (error) {
      console.log(error)

    })
  }

  function getCuentasLeidas() {
    var periodo = moment(new Date(Date.now())).format("MM-YYYY");
    var usuario_id = $scope.usuario.id;
    ServicioLectura.buscarPorPeriodoIdUsuario(periodo, usuario_id).then(function (res) {
      lecturasIngresadas = res.data;
      var geojson;
      var listaEstados = [];
      var aux;

      for (var i = 0; i < listaMarcadores.length; i++) {
        aux = 0;
        for (var j = 0; j < lecturasIngresadas.length; j++) {
          console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%");
          console.log(listaMarcadores[i]);
          if (listaMarcadores[i].properties.id == lecturasIngresadas[j].cuenta_id.id) {
            if (lecturasIngresadas[j].estado == "leido") {
              console.log("ESTADO LEIDO")
              listaMarcadores[i].estado = 'leido';
              listaMarcadores[i].properties.estado = 'Leido';
              listaEstados.push(listaMarcadores[i]);
            } else {
              console.log("ESTADO NOVEDAD")
              listaMarcadores[i].estado = 'novedad';
              listaMarcadores[i].properties.estado = 'Novedad';
              listaEstados.push(listaMarcadores[i]);
            }
            aux = 1;
          }
        }

        if (aux == 0) {
          console.log("ESTADO PENDIENTE")
          listaMarcadores[i].estado = 'pendiente';
          listaMarcadores[i].properties.estado = 'Pendiente';
          listaEstados.push(listaMarcadores[i]);
        }
      }

      var myStylePendiente = {
        weight: 3,
        color: 'blue',
        dashArray: '',
        fillColor: 'blue',
        fillOpacity: 0.5
      }
      var myStyleLeido = {
        weight: 3,
        color: 'green',
        dashArray: '',
        fillColor: 'green',
        fillOpacity: 0.5
      }
      var myStyleNovedad = {
        weight: 3,
        color: 'orange',
        dashArray: '',
        fillColor: 'orange',
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
          '<h6> <b>Id: </b>' + props.id + '<br/>'+ 
          '<h6> <b>Nombre: </b>' + props.nombre + ' ' + props.apellido + '</h6>' +
          '<h6> <b>Cedula: </b>' + props.cedula + '<br/>' +
          '<h6> <b>Marca de Medidor: </b>' + props.marcamedidor + '<br/>' +
          '<h6> <b>Tarifa: </b>' + props.tarifa + '<br/>' +
          '<h6> <b>Estado: </b>' + props.estado + '<br/>' :
          
          'Seleccione un Marcador para ver su información');
      };

      info.addTo($scope.mymap);
      var geoJsonData = {
        "type": "FeatureCollection",
        "features": listaEstados
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
        onEachFeature: onEachFeature,
        pointToLayer: function (feature, latlng) {
          console.log("@@@@@@@@@@@@@@@@@@@")
          console.log(feature);
          var myStyle = {}
          if (feature.estado == "leido") {
            myStyle = myStyleLeido;
          }
          if (feature.estado == "pendiente") {
            myStyle = myStylePendiente;
          }
          if (feature.estado == "novedad") {
            myStyle = myStyleNovedad;
          }
          return L.circleMarker(latlng, myStyle);
        }
      }).addTo($scope.mymap);

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
      listacuentas = []
      console.log(res.data)
      listacuentas = res.data;
      console.log(listacuentas)
      listaMarcadores = [];


      for (var i = 0; i < listacuentas.length; i++) {
        var marcador = JSON.parse(listacuentas[i].coordenada) /// convierte el string a json 
        marcador.properties = {
          'nombre': listacuentas[i].abonado_id.nombre,
          'apellido': listacuentas[i].abonado_id.apellido,
          'cedula': listacuentas[i].abonado_id.cedula,
          'marcamedidor': listacuentas[i].marca_medidor,
          'tarifa': listacuentas[i].tarifa,
          'id': listacuentas[i].id
        };
        listaMarcadores.push(marcador);

      }


      getCuentasLeidas();

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
    //let scanner = new Instascan.Scanner({ mirror: false });
    Instascan.Camera.getCameras().then(function (cameras) {
      if (cameras.length > 0) {
        
        console.log(cameras);
        
        if (cameras.length == 2) {
          scanner.start(cameras[1])
        } else {
          scanner.start(cameras[0]);
        }
      } 
      else
      {
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

  $scope.SeleccionarTip = function () {
    if ($scope.lectura.tip == "leido") {
      document.getElementById("valorlectura").disabled = false;
    } else {
      document.getElementById("valorlectura").disabled = true;
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

  $scope.CalculoLectura = function () {

    //TARIFA==> m3 comercial =0.75, industrial= 1,25 , residencial=0.50; publico=0.25;
    //(lectura -lectura anterior) * tarifa    
    // basico 3,50

    if(primeraVez == 0){
      $scope.lectura.valor_primera_lectura = $scope.lecturaAnterior.valor_lectura;
    }

    var tarifa = $scope.cuentaLeida.tarifa;
    var lecturaAnterior = $scope.lecturaAnterior.valor_lectura;
    var lecturaActual = $scope.lectura.valor_lectura;
    var valorTarifa = 0;
    var consumo = $scope.lectura.valor_consumo;
    var costo = $scope.lectura.valor_pago;
console.log("consumo, costo");
console.log(consumo, costo);


    var respuesta = {};
    if (tarifa == "Comercial") {
      valorTarifa = 0.5
    }

    if (tarifa == "Industrial") {
      valorTarifa = 1.25
    }

    if (tarifa == "Residencial") {
      valorTarifa = 0.50
    }
    if (tarifa == "Publico") {
      valorTarifa = 0.25
    }

    if($scope.lectura.ingreso==true)
    {
      if (lecturaActual > lecturaAnterior) {
        consumo = lecturaActual - lecturaAnterior;
        costo = consumo * valorTarifa;
      } else if (lecturaActual == lecturaAnterior) {
        consumo = 0;
        costo = 3.50;
      }
    }
    else
    {
      // lecturaAnterior = $scope.lectura.valor_primera_lectura;
      consumo = lecturaActual - lecturaAnterior;
      costo = consumo * valorTarifa;
    }

    $scope.lectura.valor_consumo = consumo;
    $scope.lectura.valor_pago = costo;
    primeraVez = primeraVez+1;
  }

  function obtenerLecturaAnterior(cuenta_id) {
    var periodo = moment(new Date(Date.now())).format("MM-YYYY");
    console.log("periodo")
    console.log(periodo)
    ServicioLectura.buscarPorPeriodoIdCuenta(periodo, cuenta_id).then(function (res) {
      $scope.lecturaAnterior = res.data;
      if ($scope.lecturaAnterior.length == 0) {
        $scope.lecturaAnterior.valor_lectura = 0;
        $scope.lectura.valor_lectura = 0;
        $scope.lectura.valor_pago = 0;
        $scope.lectura.valor_consumo = 0;
        $scope.lectura.ingreso = true;
      } else {
        $scope.lecturaAnterior.valor_lectura = $scope.lecturaAnterior[0].valor_primera_lectura;
        $scope.lectura.valor_lectura = $scope.lecturaAnterior[0].valor_lectura;
        $scope.lectura.valor_pago = $scope.lecturaAnterior[0].valor_pago;
        $scope.lectura.valor_consumo = $scope.lecturaAnterior[0].valor_consumo;
        $scope.lectura.observacion = $scope.lecturaAnterior[0].observacion;
        // $scope.lectura.valor_primera_lectura = $scope.lecturaAnterior[0].valor_primera_lectura;
        $scope.lectura.ingreso = false;
        console.log("test")
        console.log($scope.lecturaAnterior)
      }
      primeraVez = 0;
    }, function (error) {
      console.log(error);
    })
  }

  $scope.guardarLectura = function () {
    $scope.lectura.periodo = moment(new Date(Date.now())).format("MM-YYYY");
    $scope.lectura.fecha_lectura = moment(new Date(Date.now()));
    $scope.lectura.usuario_id = $scope.usuario.id;
    $scope.lectura.cuenta_id = $scope.cuentaLeida.id;
    if ($scope.lectura.tip == "leido") {
      $scope.lectura.estado = "leido";
    } else {
      $scope.lectura.estado = "pendiente";
    }
    var existe=false;
    for ( var i=0; i<lecturasIngresadas.length; i++)
    {
      if($scope.lectura.cuenta_id==lecturasIngresadas[i].cuenta_id.id)
      {
        $scope.lectura.id = lecturasIngresadas[i].id;
        ServicioLectura.actualizarLectura($scope.lectura).then(function (res) {
          alert("Actualizacion Correcta");
          location.reload();
        }, function (err) {
          console.log(err)
          alert("Actualizacion fallida");
        })
        existe=true; 
        break;
      }
    }
   
    if(existe==false)
    {
      ServicioLectura.ingresarLectura($scope.lectura).then(function (res) {
        alert("ingreso Correcto");
        location.reload();
      }, function (err) {
        console.log(err)
        alert("ingreso fallido");
      })
    }
    
  };

}


funcionInicioLecturaCtrl.inject = ['$scope', '$rootScope', '$location', 'ServicioLectura', 'ServicioSector', 'ServicioCuentas'];
