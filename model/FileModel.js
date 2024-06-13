const {Schema, model} = require("mongoose");

const FileSchema = new Schema({
    fileName: {type: String},
    storeName: {type: String},
    type: {type: String},
    ext: {type: String},
    size: {type: Number}

});