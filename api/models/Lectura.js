/**
 * Lectura.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    periodo:{
      type:"string"
    },
    fecha_lectura:{
      type:"string"
    },
    valor_lectura:{
      type:"number",
    },

    valor_consumo:{
      type:"number",
    },

    valor_pago:{
      type:"number",
      columnType:"float"
    },
    
    observacion:{
      type:"string",
    },
    
    
    cuenta_id:{
      model:"cuenta",
    },
    
    usuario_id:{
      model:"usuario",
    },

  },

};

