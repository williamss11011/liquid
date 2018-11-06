/**
 * Cuenta.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    coordenada:{
      type:"string"
    },
    marca_medidor:{
      type:"string"
    },
    direccion:{
      type:"string",
    },

    tarifa:{
      type:"string",
    },

    abonadocuenta:{
      model:"abonado",
    },
    
    cuentasector:{
      model:"sector",
    },

    lectura:{
      collection:"lectura",
      via:"cuentalectura"
    },

  },

};

