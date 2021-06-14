const mongoose=require('mongoose');
const Schema = mongoose.Schema;
const shortid = require('shortid');



const DonationReceiveSchema = new Schema({

    _id: {
        'type': String,
        'default': shortid.generate
    },
    dnr_id: {
        type: String,
        required: true
    },
    rec_id: {
        type: String,
        required: true
    },
    rec_name: {
        type: String,
        required: true
    },
    rec_lastName:{
        type: String,
        required: true
    },
    rec_blood_type: {
        type: String,
        required: true
    },
    rec_email: {
        type: String,

    },
    rec_phone_num:{
        type:String,
        required:false,
    },
    rec_address:{
        type:String,
        required:false,
    },
    rec_country:{
        type:String,
        required:false,
    },

    donation_receive_date: {
        type: Date,
        default: Date.now
    },

});


module.exports =DonationReceive= mongoose.model('donations receive', DonationReceiveSchema);