import React, {Component} from 'react';
//import {BrowserRouter} from "react-router-dom"

import { connect } from 'react-redux';
import {getDonors} from './actions/donorsActions'
import DonorsTable from './pages/tables/donorsTable'
import FindDonor from './pages/findDonor'
import Try from './Try'
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
import MainHome from './MainHome';

//import SimpleSelect from './SimpleSelect';


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
        backgroundImage: 'url("/Images/blood-donor.jpg")',
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


class userMainp extends Component{

  constructor(props){
    super(props);
        this.props.onGetDonors();
        this.state={
            donors:'',
            value: 0,
            valueNav:0,
            openMenu: false
        }

  }
    // state = {
    //     value: 0,
    //     valueNav:0,
    //     openMenu: false
    // };


    handleClick = () => {
        this.setState(state => ({openMenu: !state.openMenu }));

    };

    handleNavClick=(value)=>{

        this.setState( ()=>({value: value }))
    };

    handleChange = (event, value) => {
        this.setState({ value });
    };


    componentDidMount() {
        
    }

    componentDidUpdate(prevState) {
      if(prevState.donors!==this.props.donors)
          this.setState({donors:this.props.donors});

    }


    render(){
       
        const { classes,...other } = this.props;
        const { value, donors } = this.state;
        console.log("VALUE "+this.state.value);
        var date = new Date().getDate();
        var month = new Date().getMonth() + 1; //Current Month
        var year = new Date().getFullYear(); //Current Year
        var hours = new Date().getHours(); //Current Hours
        var min = new Date().getMinutes(); //Current Minutes
        var sec = new Date().getSeconds(); //Current Seconds
    return (
        <React.Fragment>
            
            <div className={classes.root}  style={{background:'#eceff1',}} >
                <div >
                <AppBar color="primary"  position="static" elevation={0} style={{height:'180px',width:'100%',
                    backgroundImage: "url(" + "https://www.infiniteenergycenter.com/assets/img/Blood-Drive-Website-Header-1220x570-000d7282bf.jpg" + ")",
                    backgroundSize: "380px",
                    
                }}
                

                >
            <Toolbar  >
                <Grid container spacing={8} alignItems="center">
                    <Hidden smUp>
                        <Grid item>
                            <IconButton color="inherit" aria-label="Open drawer">
                                
                            </IconButton>
                        </Grid>
                    </Hidden>
                    <Grid item xs />
                    <Grid item>
                        <Tooltip title="Alerts • No alters">
                            <IconButton color="inherit">
                                <NotificationsIcon />

                            </IconButton>
                        </Tooltip>
                    </Grid>

                </Grid>
            </Toolbar>
            <Grid container alignItems="center">
                <Grid item xs>
                    <Typography variant="h5" fontWeight={600} m={1} color="inherit" style={{marginRight:'8px',marginTop:'90px',color:"#37474f"}}
                    >

                        Managment system for blood donations
                    </Typography>
                </Grid>
            </Grid>

            </AppBar>

                <AppBar position="static"  style={{ backgroundColor: '#b71c1c',top:'50'}}

                >

                    <Tabs value={value} onChange={this.handleChange}>
                        
                        <Tab variant="h6" textColor="inherit" label="Home Page" />
                        <Tab textColor="inherit" label="Search for donor" />
                        <Tab textColor="inherit" label="Manage Blood bank" />
                        <Tab textColor="inherit" label="About" />
                        
                    
                    </Tabs>
                   
               
                </AppBar>
               
                {value === 0 && <TabContainer ><MainHome /></TabContainer>}
                {value === 1 && <TabContainer style={{backgroundColor:"#ff7043"}}><FindDonor donors={donors}  /></TabContainer>}
                {value === 2 && <TabContainer><Try donors={this.state.donors}/></TabContainer>}
                {value === 3 && <TabContainer><AboutUs/></TabContainer>}


            </div>
            
    </div>
   
            <footer className={ classes.footer }>
                
                <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
                    
                    ליצירת קשר ותמיכה טכנית :
                    <p>
                        קריסטינה :christina@gmail.com
                    </p>

                </Typography>

            </footer>

            <MadeWithLove/>
        
    </React.Fragment>

  );
};
}



userMainp.propTypes = {
    classes: PropTypes.object.isRequired,
};




export default connect(
    state => ({donors: state.donors}),
        dispatch => ({
        onGetDonors: () => {
            dispatch(getDonors())}})
)(withStyles(styles)(userMainp));

 


