
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import { withStyles} from '@material-ui/core/styles';
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import CardContent from "@material-ui/core/CardContent";
import Toolbar from "@material-ui/core/Toolbar";
import Paper from "@material-ui/core/Paper";

/**
 * About tab
 */
const styles = theme => ({
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
        backgroundImage: 'url(https://projectskillssolutions.com/assets/Building-Maintenance-slide1.jpg)',
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





class AboutUs extends Component {


    render() {
        const {classes} = this.props;

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
                        <Paper className={classes.mainFeaturedPost} 
                        style={{  backgroundImage:"url(" + "https://dcndx.com/wp-content/uploads/2020/03/iStock-1128949422.jpg" + ")",
                        
                        backgroundSize:"1600px"}}
                        >
                            <div className={classes.overlay} />
                            <Grid container >
                                <Grid item md={6}>
                                    <div className={classes.mainFeaturedPostContent}>
                                        <Typography   component="h1" variant="h3" style={{color:"#eceff1",flexDirection:'row',marginLeft:'10px' ,
                                    
                                  
                                    
                                    }} gutterBottom>
                                             B.B.S Blood Bank System
                                        </Typography>

                                    </div>
                                </Grid>
                            </Grid>

                        </Paper>
                    <Typography variant="h7" color="inherit" paragraph>
                        <Card>
                           <CardContent>
                                Blood bank is a software for management blood donors , developed for BIO-MED course 
                                
                           </CardContent>
                            <CardContent>
                            <img 
                        src="https://i.pinimg.com/originals/08/f2/fc/08f2fccc45d2564f74ead4a6d5086871.png"
                        alt="new"
                        height="500px"
                        width="500px"
                        />
                         <img 
                        src="https://www.blood.ca/sites/default/files/2018-09/DonorRecipient-Chart_1.jpg"
                        alt="new"
                        height="550px"
                        width="550px"
                        />
                         <img 
                        src="https://www.uni-miskolc.hu/files/10326/post-img.jpg"
                        alt="new"
                        height="550px"
                        width="550px"
                        />
                        
                            </CardContent>
                        </Card>
                    </Typography>
                    

                </Grid>

            </React.Fragment>
        );

    }
}


AboutUs.propTypes = {
    classes: PropTypes.object.isRequired,
};



const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors,
});


export default connect(mapStateToProps)(withStyles(styles)(withRouter(AboutUs)));

