const express = require('express');
const router = express.Router();
const Donor=require('../../models/Donor');



router.post('/addNewDonationRec',(req,res)=>{

    // const { errors, isValid } = validateNewDonorInput(req.body);
    //
    // // Check Validation
    // if (!isValid) {
    //     return res.status(400).json(errors);
    // }

    const newDonationRec = new Donor({
        dnr_id: req.body.dnr_id,
        rec_id: req.body.rec_id,
        rec_name:req.body.rec_name,
        rec_lastName:req.body.rec_lastName,
        rec_blood_type: req.body.rec_blood_type,
        rec_email: req.body.rec_email,
        rec_phone_num: req.body.rec_phone_num,

        donation_receive_date: req.body.donation_receive_date,

    });

    newDonationRec
        .save()
        .then(donation => res.json(donation))
        .catch(err => console.log(err));


});



//get the list of donations Receive

router.get('/getDonations',(req,res)=>{

    Donor.find()
        .sort({date: -1})
        .then(donor=>res.json(donor))
        .catch(err=>res.status(404));


});

//delete donor

router.delete('/deleteDonationRec/:id', (req, res) => {

    Donor.findById(req.params.id)
        .then(donor => {
            // Delete
            donor.remove().then(() => res.json({success: true}));
        })
        .catch(err => res.status(404).json({donorenotfound: 'No donors found'}));


});


//update donationRec details

router.post( '/updateDonationRec' , (req,res)=> {

    let dnrUpdate={

        $set:{dnr_name:req.body.u_dnr_name,
            dnr_last_name:req.body.u_dnr_last_name,
            dnr_email:req.body.u_dnr_email}
    };

    Donor.updateOne({"_id":req.body.id},dnrUpdate,(err , collection) => {
        if(err) throw err;
        else
            console.log("Record updated successfully");
        //console.log(collection);
    })
        .catch(err => res.status(404).json({donornotfound: 'No donors found'}));



});




module.exports=router;