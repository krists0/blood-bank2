import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import jsPDF from 'jspdf'
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import Button from "@material-ui/core/Button";
/**
 * details for specific donor and the export pdf
 */
const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
}));
const generatePDF = ( name,lastn,typeb,mail,addres,country) => {
    {console.log("bane="+name)}
    {console.log("משצק אטפר םכ ="+typeof(name))}
    var doc = new jsPDF('p', 'pt');
    doc.setProperties({
        title: 'Blood bank',
        subject: 'confidantional',		
        author: 'christina ',
        keywords: 'generated, javascript, web 2.0, ajax',
        creator: 'MEEE'
    });
    doc.text(20, 20, '                                 Details for blood type :'+typeb)

    doc.setFont('helvetica')
    doc.setFontType('normal')
    doc.text(20, 40, 'First name :'+name)
    doc.setFont('helvetica')
    doc.setFontType('normal')
    doc.text(20, 60, 'Last name :'+lastn)
    doc.setFont('helvetica')
    doc.setFontType('normal')
    doc.text(20, 80, 'Email :'+mail)

    doc.setFont('helvetica')
    doc.setFontType('normal')
    doc.text(20, 100, 'Address :'+addres)      
    doc.setFont('helvetica')
    doc.setFontType('normal')
    doc.text(20, 120, 'Country :'+country)      

    
    doc.save('BloodBank.pdf')
  };

const styles = StyleSheet.create({
    page: {
      flexDirection: 'row',
      backgroundColor: '#E4E4E4'
    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1
    }
  });

  
export default function DonorCard(props) {
    const classes = useStyles();
    const {donor}= props;
  
    return (
        <div>
        <div className={classes.root}>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography className={classes.heading}>Full Name: {donor.dnr_name+' '+ donor.dnr_last_name} <br/> Blood Type: {donor.dnr_blood_type}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Email: {donor.dnr_email} <br/>
                        Phone Number: {donor.dnr_phone_num} <br/>
                        Address: {donor.dnr_address} <br/>
                        Country: {donor.dnr_country} <br/>
                      
                    </Typography>
                   <Typography>
                   <button onClick={()=>generatePDF(donor.dnr_name,donor.dnr_last_name,donor.dnr_blood_type,donor.dnr_email,donor.dnr_address,donor.dnr_country)}
                    variant="outlined" color="secondary">Export PDF</button> 
                    
                   </Typography>
                </AccordionDetails>
               
            </Accordion>
            
        </div>
       
        </div>
    );

}