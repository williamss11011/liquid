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

    abonado_id:{
      model:"abonado",
    },
    
    sector_id:{
      model:"sector",
    },

    lectura:{
      collection:"lectura",
      via:"cuenta_id"
    },

  },

};

