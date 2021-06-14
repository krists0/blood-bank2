import React, {Component} from 'react';
//import {BrowserRouter} from "react-router-dom"

import { connect } from 'react-redux';
import {getDonors} from '../../actions/donorsActions'

// @material-ui/icons

import Paper from "@material-ui/core/Paper";
import Typography from '@material-ui/core/Typography';
import Grid from "@material-ui/core/Grid";
import PropTypes from 'prop-types';
import { withStyles} from '@material-ui/core/styles';
import TableRow from "@material-ui/core/TableRow";
import Card from "@material-ui/core/Card";
import TableCell from "@material-ui/core/TableCell";
import DonorsTable from '../tables/donorsTable'
import donorsTable from '../tables/donorsTable';
import TableBody from "@material-ui/core/TableBody";
import DonorCard from './DonorCard';
import jsPDF from 'jspdf'
import Button from "@material-ui/core/Button";


/**
 * Find matching donors by blood type
 */
function TabContainer(props) {
    return (
        <Typography component="div" style={{ padding: 8 * 3 }}>
            {props.children}
        </Typography>
    );
}

TabContainer.propTypes = {
    children: PropTypes.node.isRequired,
};


const styles = theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        maxWidth: 1800,

        overflow: 'hidden',

    },
    card:{
       padding:'2px 20px 2px 20px',
    },

});


class MatchDonor extends Component{

    constructor(props){
        super(props);
        //this.props.onGetDonors();
        this.state={
            donors:'',
            matchDonors: [],
            value: '0',
            dnr_id: props.dnr_id,
            dnr_name: props.dnr_name,
            dnr_last_name:props.dnr_last_name,
            dnr_email:props.dnr_email,
            dnr_phone_num:props.dnr_phone_num,
            dnr_blood_type:props.dnr_blood_type,
        }

    }


    findMatch =(value)=>{

        switch(value){
            case 'A+':
                if(this.props.donors !== null){
                    let filteredList = this.props.donors.filter(donor=> donor.dnr_blood_type==='A+'|| donor.dnr_blood_type==='A-' || donor.dnr_blood_type==='O+' || donor.dnr_blood_type==='O-');
                    this.setState({matchDonors: filteredList});
                }
                break;
            case 'O+':
                if(this.props.donors !== null){
                    let filteredList = this.props.donors.filter(donor=> donor.dnr_blood_type==='O+'|| donor.dnr_blood_type==='O-');
                    this.setState({matchDonors: filteredList});
                }
                break;
            case 'B+':
                if(this.props.donors !== null){
                    let filteredList = this.props.donors.filter(donor=> donor.dnr_blood_type==='B+'|| donor.dnr_blood_type==='B-' || donor.dnr_blood_type==='O+' || donor.dnr_blood_type==='O-');
                    this.setState({matchDonors: filteredList});
                }
                break;
            case 'AB+':
                if(this.props.donors !== null){
                    let filteredList = this.props.donors;
                    this.setState({matchDonors: filteredList});
                }
                break;
            case 'A-':
                if(this.props.donors !== null){
                    let filteredList = this.props.donors.filter(donor=>  donor.dnr_blood_type==='A-' ||  donor.dnr_blood_type==='O-');
                    this.setState({matchDonors: filteredList});
                }
                break;
            case 'O-':
                if(this.props.donors !== null){
                    let filteredList = this.props.donors.filter(donor=> donor.dnr_blood_type==='O-');
                    this.setState({matchDonors: filteredList});
                }
                break;
            case 'B-':
                if(this.props.donors !== null){
                    let filteredList = this.props.donors.filter(donor=>  donor.dnr_blood_type==='B-' || donor.dnr_blood_type==='O-');
                    this.setState({matchDonors: filteredList});
                }
                break;
            case 'AB-':
                if(this.props.donors !== null){
                    let filteredList = this.props.donors.filter(donor=> donor.dnr_blood_type==='AB-'|| donor.dnr_blood_type==='A-' || donor.dnr_blood_type==='B-' || donor.dnr_blood_type==='O-')
                    this.setState({matchDonors: filteredList});
                }
                break;
            default:
                return [];

        }
    };


    componentDidUpdate(nextProps, nextState, nextContext) {
        if(this.props.value!==this.state.value){
            console.log('oioio'+' '+this.props.value);
            this.setState({value: this.props.value})
             this.findMatch(this.props.value);
        }
    }


    handleClick = () => {
        this.setState(state => ({openMenu: !state.openMenu }));

    };



    handleDetailsChange=()=>{

        let dnrDetails={
            id: this.state.dnr_id,
            u_dnr_name:this.state.dnr_name,
            u_dnr_last_name:this.state.dnr_last_name,
            u_dnr_email:this.state.dnr_email,
        };

    };

   
    generatePDF = () => {
        var doc = new jsPDF('p', 'pt');
        
        doc.text(20, 20, 'This is the first title.')
  
        doc.setFont('helvetica')
        doc.setFontType('normal')
        doc.text(20, 60, 'This is the second title.')
        console.log("donors match ="+this.state.dnr_name)
        doc.setFont('helvetica')
        doc.setFontType('normal')
        doc.text(20, 100, 'hjgj')      
  
        
        doc.save('demo.pdf')
      } ;

    render(){

        const { classes, value, donors} = this.props;
        const {dnr_name,dnr_last_name,dnr_email, matchDonors}=this.state;
        let index=0;


        return (
            <div value={value}>
                {console.log("value passed =="+value)}

                <Grid >
                    <Card className={classes.card} >

                        {value!=='0' ? <Typography variant='h5' style={{padding:'5px'}} >For blood Type {value} found matching donor :</Typography> : <></>}
                        {console.log(value)}
                        {matchDonors!==null && matchDonors!==undefined ? matchDonors.map(donor => <DonorCard donor={donor}/> )
                            :
                            <></>
                        }
                      
                    </Card>
                    
                </Grid>
                <div>
          
            <Card className={classes.card} >

           
           
            </Card> 
         </div>

            </div>


        );

    };


}


MatchDonor.propTypes = {
    classes: PropTypes.object.isRequired,
};




export default connect(
    // state => ({donors: state.donors}),
    dispatch => ({
    onGetDonors: () => {
        dispatch(getDonors())}})
)(withStyles(styles)(MatchDonor));
