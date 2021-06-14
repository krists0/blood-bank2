import React, {Component} from 'react';
//import {BrowserRouter} from "react-router-dom"

import { connect } from 'react-redux';
import {getDonors} from './actions/donorsActions'
import DonorsTable from './pages/tables/donorsTable'

// @material-ui/icons

import Paper from "@material-ui/core/Paper";
import Typography from '@material-ui/core/Typography';
import Grid from "@material-ui/core/Grid";
import PropTypes from 'prop-types';
import { withStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import NotificationsIcon from '@material-ui/icons/Notifications';
import Toolbar from '@material-ui/core/Toolbar';

import Tooltip from '@material-ui/core/Tooltip';


import {withRouter} from 'react-router-dom';
//import setShowDonor from './ShowDonors';
//import AddCall from "./AddCall";

import classNames from "classnames";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SvgIcon from '@material-ui/core/SvgIcon';
import PeopleIcon from '@material-ui/icons/People';
import PublicIcon from '@material-ui/icons/Public';
import Collapse from "@material-ui/core/Collapse";
import Avatar from '@material-ui/core/Avatar';
import blueGrey from '@material-ui/core/colors/blueGrey';
import Drawer from "@material-ui/core/Drawer";
import Link from "@material-ui/core/Link";
import CardActionArea from "@material-ui/core/CardActionArea";
//import setShowDonor from './ShowDonors';
//import AddCall from "./AddCall";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Card from "@material-ui/core/Card";
import AboutUs from './AboutUs';

/**
 * my home page 
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

    appBar: {

        left: 0,
        right:255,
        width:1264
    },

    secondaryBar:{
        top: 48,
        left: 0,
        right:255,
        width:1264

    },

    thirdBar:{
        top: 48,
        left:0 ,
        right:255,
        width:1264

    },
    categoryHeader: {
        paddingTop: 16,
        paddingBottom: 16,

    },
    categoryHeaderPrimary: {
        color: theme.palette.common.white,

    },
    item: {
        paddingTop: 4,
        paddingBottom: 4,

        color: '#e1f5fe',

    },
    itemCategory: {
        backgroundColor: '#232f3e',
        boxShadow: '0 -1px 0 #404854 inset',
        paddingTop: 16,
        paddingBottom: 16,
    },

    //bigger logo
    firebase: {
        fontSize: 24,
        fontFamily: theme.typography.fontFamily,
        color: theme.palette.common.white,
    },
    itemActionable: {
        '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.08)',
        },
    },
    itemActiveItem: {
        color: '#4fc3f7',

    },
    itemPrimary: {
        color: 'inherit',
        fontSize: theme.typography.fontSize,
        '&$textDense': {
            fontSize: theme.typography.fontSize,
        },
    },
    textDense: {},
    divider: {
        marginTop: theme.spacing.unit * 2,
    },
    nested: {
        paddingLeft: theme.spacing.unit * 4,
    },
    blueAvatar: {
        margin: 10,
        color: '#fff8f9',
        backgroundColor: blueGrey[200],
    },
    toolbar: {
        borderBottom: `1px solid ${theme.palette.divider}`,
    },
    toolbarTitle: {
        flex: 1,
    },
    toolbarSecondary: {
        justifyContent: 'space-between',
        overflowX: 'auto',
    },
    toolbarLink: {
        padding:'8px',
        flexShrink: 0,
    },
    mainFeaturedPost: {
        position: 'relative',
        backgroundColor: theme.palette.grey[800],
        color: theme.palette.common.white,
        marginBottom: '64px',
        backgroundImage: 'url("/Images/Building-Maintenance-slide1.jpg")',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
    },
    overlay: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        backgroundColor: 'rgba(0,0,0,.3)',
    },
    mainFeaturedPostContent: {
        position: 'relative',
        padding: '48px',
        [theme.breakpoints.up('md')]: {
            padding: '96px',
            paddingRight: '0',
        },
    },
    mainGrid: {
        marginTop: '48px',
    },
    card: {
        display: 'flex',
    },
    cardDetails: {
        flex: 1,
    },
    cardMedia: {
        width: 160,
    },

    footer: {
        backgroundColor: theme.palette.background.paper,
        marginTop:'64px',
        padding:'64px',
    },
});

function MadeWithLove() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Built by '}
            <Link color="inherit" href="https://material-ui.com/">
                Christina 
            </Link>
            {' team'}
        </Typography>
    );
}


class MainHome extends Component{

  constructor(props){
    super(props);
        this.props.onGetDonors();
        this.state={
            donors:''
        }

  }
    

    handleClick = () => {
        this.setState(state => ({openMenu: !state.openMenu }));

    };

  

    componentDidMount() {
        
    }

    componentDidUpdate(prevState) {
      if(prevState.donors!==this.props.donors)
          this.setState({donors:this.props.donors});

    }


    render(){
       
        const { classes,...other } = this.props;
       
        var date = new Date().getDate();
        var month = new Date().getMonth() + 1; //Current Month
        var year = new Date().getFullYear(); //Current Year
        var hours = new Date().getHours(); //Current Hours
        var min = new Date().getMinutes(); //Current Minutes
        var sec = new Date().getSeconds(); //Current Seconds
    return (
        <React.Fragment>
            
             <Grid maxWidth="lg">
                    <Toolbar className={classes.toolbar}>

                        <Typography
                            component="h2"
                            variant="h5"
                            color="inherit"
                            align="center"
                            noWrap
                            className={classes.toolbarTitle}
                        >

                        </Typography>

                    </Toolbar>

                    <main>

                        <Paper className={classes.mainFeaturedPost}>

                            <div className={classes.overlay} />
                            <Grid container 
                            style={{backgroundImage:"url(" + "https://miro.medium.com/max/12000/1*J0sbPDMUn3fUlbZl-qyuvg.jpeg" + ")",
                            backgroundSize:"1000px",
                        }} 
                             >
                                <Grid item md={6}>
                                    <div className={classes.mainFeaturedPostContent}>
                                        <Typography   component="h1" variant="h3" color="inherit"  gutterBottom
                                         >
                                            B.B.S Blood Bank System
                                        </Typography>
                           
                                        <Typography variant="h5" color="inherit" paragraph>
                                            Managment system for blood bank  
                                            {  " "+date+"."+month+"."+year+"      "+hours+":"+min}
                                         
                                        </Typography>
                                       

                                    </div>
                                </Grid>
                            </Grid>
                        </Paper>

                        <Grid container spacing={4} className={classes.cardGrid}>

                                <Grid item  xs={12} md={6}>
                            <CardActionArea component="a" href="#">
                                <Card className={classes.card}>
                                    <div className={classes.cardDetails}>
                                        <CardContent>
                                            <Typography component="h2" variant="h5">
                                                Export to pdf 
                                            </Typography>
                                            <Typography variant="subtitle1" color="textSecondary">

                                            </Typography>
                                            <Typography variant="subtitle1" paragraph>
                                               You can export to pdf file list of matching donor or list of all the stock that in the system
                                            </Typography>

                                        </CardContent>
                                    </div>
                                    <Hidden xsDown>
                                        <CardMedia
                                            className={classes.cardMedia}
                                            image="https://www.smart-plumbers.co.il/files/articles/item/thumbsrc/iStock_924709504.jpg"
                                            title="Image title"
                                        />
                                    </Hidden>
                                </Card>
                            </CardActionArea>
                        </Grid>

                            <Grid item  xs={12} md={6}>
                                <CardActionArea component="a" href="#">
                                    <Card className={classes.card}>
                                        <div className={classes.cardDetails}>
                                            <CardContent>
                                                <Typography component="h2" variant="h5">
                                                    Manage list of donors
                                                </Typography>
                                                <Typography variant="subtitle1" color="textSecondary">

                                                </Typography>
                                                <Typography variant="subtitle1" paragraph>
                                                   You can delete,update and add new donor to the system
                                                </Typography>

                                            </CardContent>
                                        </div>
                                        <Hidden xsDown>
                                            <CardMedia
                                                className={classes.cardMedia}
                                                image="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRuJFQrqYak4LszAEdeakGTmIOMVNkO3RmaGA&usqp=CAU"
                                                title="Image title"
                                            />

                                        </Hidden>
                                    </Card>
                                </CardActionArea>
                            </Grid>

                            <Grid item  xs={12} md={6} >
                                <CardActionArea component="a" href="#">
                                    <Card className={classes.card}>
                                        <div className={classes.cardDetails}>
                                            <CardContent>
                                                <Typography component="h2" variant="h5">
                                                   Blood bank stock
                                                </Typography>
                                                <Typography variant="subtitle1" color="textSecondary">

                                                </Typography>
                                                <Typography variant="subtitle1" paragraph>
                                                You can see all the stock of blood that registered in the system
                                                </Typography>

                                            </CardContent>
                                        </div>
                                        <Hidden xsDown>
                                            <CardMedia
                                                className={classes.cardMedia}
                                                image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSEa1v7tHTTKudr8a2McnA9CEqxMPgS_xIJllts0Iu5BXnONku"
                                                title="Image title"
                                            />
                                        </Hidden>
                                    </Card>
                                </CardActionArea>
                            </Grid>
                            <Grid item  xs={12} md={6} >
                                <CardActionArea component="a" href="#">
                                    <Card className={classes.card}>
                                        <div className={classes.cardDetails}>
                                            <CardContent>
                                                <Typography component="h2" variant="h5">
                                                    Find donor
                                                </Typography>
                                                <Typography variant="subtitle1" color="textSecondary">

                                                </Typography>
                                                <Typography variant="subtitle1" paragraph>

                                                    You can find by type of blood list of all matching donors
                                                </Typography>

                                            </CardContent>
                                        </div>
                                        <Hidden xsDown>
                                            <CardMedia
                                                className={classes.cardMedia}
                                                image="https://fenwayhealth.org/wp-content/uploads/190613-donating-blood-cs-406p_c7ece08578922a72c9c7e853226a4fec.jpg"
                                                title="Image title"
                                            />
                                        </Hidden>
                                    </Card>
                                </CardActionArea>
                            </Grid>
                         

                        </Grid>

                    </main>
                </Grid>
           
        
    </React.Fragment>

      
  );

};


}



MainHome.propTypes = {
    classes: PropTypes.object.isRequired,
};




export default connect(
    state => ({donors: state.donors}),
    dispatch => ({
        onGetDonors: () => {dispatch(getDonors())}})
)(withStyles(styles)(MainHome));

 
//                    <DonorsTable donors={this.state.donors}/>
 //                       {/*<PaperBase />*/}

