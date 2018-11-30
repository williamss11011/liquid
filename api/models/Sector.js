/**
 * Sector.js
 *
 * @description :: A model definition.  Represents a database table/collection/etc.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    nombre: {
      type: "string"
    },

    poligono: {
      type: "string"
    },

    descripcion: {
      type: "string"
    },

    color: {
      type: "string"
    },

    cuenta: {
      collection: "cuenta",
      via: "sector_id"
    },

    usuario: {
      collection: "usuario",
      via: "sector_id"
    },

  },

};
