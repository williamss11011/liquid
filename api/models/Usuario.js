/**
 * Usuario.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    nombre:{
      type:"string"
    },
    apellido:{
      type:"string"
    },
    cedula:{
      type:"string"
    },
    telefono:{
      type:"string"
    },
    correo:{
      type:"string"
    },
    
    password:{
      type:"string"
    },
    
    descripcion:{
      type:"string"
    },
    
    rol:{
      type:"number"
    },


    lectura:{
      collection:"lectura",
      via:"usuario_id"
    },

  },

};

