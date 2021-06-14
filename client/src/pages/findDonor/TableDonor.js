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
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';


import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
/**The table from task 1 */
const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });
  
  
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


class TableDonor extends Component{

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
    onItemClick=()=>{
        console.log("on item click")
    };
    
    render(){

        const { classes, value, donors} = this.props;
        const {dnr_name,dnr_last_name,dnr_email, matchDonors}=this.state;
        var numberap=0,numberbp=0,numberop=0,numberabp=0,numberam=0,numberbm=0,numberom=0,numberabm=0;
        let index=0;
        var ansap=0,x=0,ansbp=0,ansop=0,ansabp=0,ansam=0,ansbm=0,ansom=0,ansabm=0;
        const count =  donors.length;
        function createList(don){
            
            let donr= don.map((d) =>
                <li style={{listStyle: 'none'}} key={d._id}>
                   
                    <Typography>
                        <div>
                            {(() => {
                                if (d.dnr_blood_type==="A+") {
                                
                                    numberap = parseInt(numberap , 10 ) + 1;                                 
                                    x=parseInt(count,10);                                  
                                    ansap=(numberap/x)*100;
                                  
                                return (
                                    <div></div>
                                )
                                } else if (d.dnr_blood_type==="B+") {
                                    numberbp = parseInt(numberbp , 10 ) + 1;
                                    x=parseInt(count,10);                                  
                                    ansbp=(numberbp/x)*100;
                                return (
                                    <div> </div>
                                )
                            } else if (d.dnr_blood_type==="O+") {
                                numberop = parseInt(numberop , 10 ) + 1;
                                x=parseInt(count,10);                                  
                                ansop=(numberop/x)*100;
                                return (
                                    <div> </div>
                                )
                            } else if (d.dnr_blood_type==="AB+") {
                                numberabp = parseInt(numberabp , 10 ) + 1;
                                x=parseInt(count,10);                                  
                                ansabp=(numberabp/x)*100;
                                return (
                                    <div></div>
                                )
                            } else if (d.dnr_blood_type==="A-") {
                                numberam = parseInt(numberam , 10 ) + 1;
                                x=parseInt(count,10);                                  
                                ansam=(numberam/x)*100;
                                return (
                                    <div></div>
                                )
                            } else if (d.dnr_blood_type==="B-") {
                                numberbm = parseInt(numberbm , 10 ) + 1;
                                x=parseInt(count,10);                                  
                                ansbm=(numberbm/x)*100;
                                return (
                                    <div></div>
                                )
                            } else if (d.dnr_blood_type==="O-") {
                                numberom = parseInt(numberom , 10 ) + 1;
                                x=parseInt(count,10);                                  
                                ansom=(numberom/x)*100;
                                return (
                                    <div></div>
                                )
                            } else if (d.dnr_blood_type==="AB-") {
                                numberabm = parseInt(numberabm , 10 ) + 1;
                                x=parseInt(count,10);                                  
                                ansabm=(numberabm/x)*100;
                                return (
                                    <div></div>
                                )
                                } else {
                                return (
                                    <div></div>
                                )
                                }
                            
                            }
                            
                            
                            
                            
                            )()}
                            </div>
                    </Typography>
            
                </li>
            );
            return (donr);
        }
        let Content;
        
            Content = createList(donors);
        
        return (
            <div value={value}>
                {console.log("value passed =="+value)}

                <div >
                    <Card className={classes.card} >

                        
                        {console.log(value)}
                     {Content}
                    </Card>
                            <h2>ABO and Rh blood type distribution </h2>
                                <TableContainer component={Paper}>
                                    <Table className={classes.table} aria-label="simple table">
                                        <TableHead>
                                        <TableRow>
                                            <TableCell>Country</TableCell>    
                                            <TableCell  align="right">Total</TableCell>                                          
                                            <TableCell align="right">A+</TableCell>
                                            <TableCell align="right">B+</TableCell>
                                            <TableCell align="right">O+</TableCell>
                                            <TableCell align="right">AB+</TableCell>
                                            <TableCell align="right">A-</TableCell>
                                            <TableCell align="right">B-</TableCell>
                                            <TableCell align="right">O-</TableCell>
                                            <TableCell align="right">AB-</TableCell>
                                        </TableRow>
                                        </TableHead>
                                        <TableBody>
                                        
                                            <TableRow >
                                            <TableCell component="th" scope="row">
                                                Israel
                                            </TableCell>
                                            <TableCell align="right">{count}</TableCell>
                                            <TableCell align="right">{ansap}%</TableCell>
                                            <TableCell align="right">{ansbp}%</TableCell>
                                            <TableCell align="right">{ansop}%</TableCell>
                                            <TableCell align="right">{ansabp}%</TableCell>
                                            <TableCell align="right">{ansam}%</TableCell>
                                            <TableCell align="right">{ansbm}%</TableCell>
                                            <TableCell align="right">{ansom}%</TableCell>
                                            <TableCell align="right">{ansabm}%</TableCell>
                                            </TableRow>
                                    
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                              
                    
                </div>
               

            </div>


        );

    };


}


TableDonor.propTypes = {
    classes: PropTypes.object.isRequired,
};




export default connect(
    // state => ({donors: state.donors}),
    dispatch => ({
    onGetDonors: () => {
        dispatch(getDonors())}})
)(withStyles(styles)(TableDonor));
