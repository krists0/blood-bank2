const mongoose=require('mongoose');
const Schema = mongoose.Schema;
const shortid = require('shortid');

const DonorSchema = new Schema({

    dnr_id: {
        'type': String,
        'default': shortid.generate
    },
    dnr_name: {
        type: String,
        required: true
    },

    dnr_last_name: {
        type: String,
        required: true
    },
    dnr_blood_type: {
        type: String,
        required: true
    },
    dnr_email: {
        type: String,

    },
    dnr_phone_num:{
      type:String,
      required:false,
    },
    dnr_address:{
        type:String,
        required:false,
    },
    dnr_country:{
        type:String,
        required:false,
    },

    dnr_donation_date: {
        type: Date,
        default: Date.now
    },
    dnr_expiration_date: {
        type: Date,
        default: (() => Date.now() + 100*24*60*60*1000)
    },
});


module.exports =Donor= mongoose.model('donors', DonorSchema);