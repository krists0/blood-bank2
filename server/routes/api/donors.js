const express = require('express');
const router = express.Router();
const Donor=require('../../models/Donor');


router.post('/addNewDonor',(req,res)=>{

    // const { errors, isValid } = validateNewDonorInput(req.body);
    //
    // // Check Validation
    // if (!isValid) {
    //     return res.status(400).json(errors);
    // }

    const newDonor = new Donor({
        dnr_name: req.body.dnr_name,
        dnr_last_name:req.body.dnr_last_name,
        dnr_email: req.body.dnr_email,
        dnr_blood_type:req.body.dnr_blood_type,
        dnr_phone_num: req.body.dnr_phone_num,
        dnr_address: req.body.dnr_address,
        dnr_country: req.body.dnr_country,
        dnr_donation_date: new Date(),
        dnr_expiration_date: +new Date() + 100*24*60*60*1000
        // dnr_donation_date: new Date(req.body.dnr_donation_date),
        // dnr_expiration_date: +new Date(req.body.dnr_donation_date) + 100*24*60*60*1000
    });

    newDonor
        .save()
        .then(donor => res.json(donor))
        .catch(err => console.log(err));


});



//get the list of donors

router.get('/getDonors',(req,res)=>{

 Donor.find()
     .sort({date: -1})
     .then(donor=>res.json(donor))
     .catch(err=>res.status(404));


});

//delete donor

router.delete('/deleteDonor/:id', (req, res) => {

    Donor.findById(req.params.id)
        .then(donor => {
            // Delete
            donor.remove().then(() => res.json({success: true}));
        })
        .catch(err => res.status(404).json({donorenotfound: 'No donors found'}));


});


//update donor details

router.post( '/updateDonor/:id' , (req,res)=> {

    let dnrUpdate={

        $set:{dnr_name:req.body.dnr_name,
            dnr_last_name:req.body.dnr_last_name,
            dnr_email:req.body.dnr_email,
            dnr_blood_type:req.body.dnr_blood_type,
            dnr_phone_num: req.body.dnr_phone_num,
            dnr_address: req.body.dnr_address,
            dnr_country: req.body.dnr_country,
        }
    };

    Donor.updateOne({"_id":req.params.id},dnrUpdate,(err , collection) => {
        if(err) throw err;
        else
        console.log("Record updated successfully");
    })
        .catch(err => res.status(404).json({donornotfound: 'No donors found'}));



});




module.exports=router;