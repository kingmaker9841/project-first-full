const mongoose = require('mongoose');
const dataSchemas = mongoose.Schema({
    title:{
        type: String,
        required : true
    },
    price:{
        type: String,
        required : true
    },
    priceFix:{
        type: String,
        required : true
    },
    bedRoom:{
        type: String,
        required : true
    },
    bathRoom:{
        type: String,
        required : true
    },
    area:{
        type: String,
        required : true
    },
    address:{
        type: String,
        required : true
    },
    sittingRoom:{
        type: String,
        required : true
    },
    kitchenRoom:{
        type: String,
        required : true
    },
    storeRoom:{
        type: String,
        required : true
    },
    floors:{
        type: String,
        required : true
    },
    parking:{
        type: String,
        required : true
    },
    landArea:{
        type: String,
    },
    pujaRoom:{
        type: String,
    },
    description:{
        type: String,
        required : true
    },
    balcony:{
        type: Boolean
    },
    dining:{
        type: Boolean
    },
    modularKitchen:{
        type: Boolean
    },
    tvCable:{
        type: Boolean
    },
    wifi:{
        type: Boolean
    },
    waterSupply:{
        type: Boolean
    },
    solar:{
        type: Boolean
    },
    waterTank:{
        type: Boolean
    },
    views:{
        type: Number
    },
    latitude:{
        type: String
    },
    longitude:{
        type: String
    },
    imageMain:{
        type: String,
        required : true
    },
    images : [{
        type : String
    }]
});

const mongoData = mongoose.model('dataSchemas', dataSchemas);

module.exports = mongoData;