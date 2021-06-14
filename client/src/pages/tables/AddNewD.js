import React,{Component} from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {addNewDonor} from '../../actions/donorsActions'
import Modal from '../../components/Modal'
import Card from "@material-ui/core/Card";
import {withStyles} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";

import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Dialog from "@material-ui/core/Dialog";
import PeopleIcon from '@material-ui/icons/People';
import Toolbar from "@material-ui/core/Toolbar";
import Grid from "@material-ui/core/Grid";
import AppBar from "@material-ui/core/AppBar";
import TextField from "@material-ui/core/TextField";

/**For the blue button + in the site  from there you can also add donor 

 */
const styles =theme => ({
    card: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    heroContent: {
        backgroundColor: theme.palette.background.paper,
        padding: '20px',
    },

});

class AddNewD extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dnr_name:'',
            dnr_last_name:'',
            dnr_email:'',
            errors: {},
            dOpen:false
        };
        this.handleInputChange=this.handleInputChange.bind(this);
    }



    componentDidMount() {
        window.scrollTo(0, 0);
    }

    handleInputChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };


    handleDialogClose=()=>{
        this.setState({dOpen:false})
    };


    submitAddDonor=(event)=> {
        event.preventDefault();


        const newDonor = {
            dnr_name:this.state.name,
            dnr_last_name:this.state.last_name,
            dnr_email: this.state.email,
        };

        console.log(newDonor);


        this.props.addNewDonor(newDonor, this.props.history);
        this.setState({dOpen:true,dnr_name:"",dnr_last_name:"",dnr_email:""})
    };

    render() {

        const {errors}=this.state;

        const {classes,open, handleClose } = this.props;

        return (
            <Modal open={open} handleClose={handleClose} {...this.props}>
            <div>

            
            <Card className={classes.card} style={{display: 'flex', justifyContent: 'center' ,marginTop:"50px"}}>
                <CardContent >
                    <Typography style={{display: 'flex', justifyContent: 'right',textAlign:'right'}} className={classes.title} color="textSecondary" gutterBottom component={''}>
                        <br />
                        add all the details and press enter
                    </Typography>
                    <Typography component="div"  size="small"  >

                        <form style={{textAlign:'center',
                        }} >
                            <Card >

                            <TextField
                                autoComplete="name"
                                margin="normal"
                                variant="outlined"
                                placeholder="name"
                                label="name"
                                name="name"
                                type="name"
                                value={this.state.name}
                                onChange={this.handleInputChange}
                                error={errors.name}
                                style={{textAlign:'right',width:'400px', margin:"center",}}
                            />

                            <TextField
                                autoComplete="last name"
                                margin="normal"
                                variant="outlined"
                                style={{textAlign:'right',width:'400px',margin:"center"}}
                                placeholder="last name"
                                label="last name"
                                name="last_name"
                                type="last name"
                                value={this.state.last_name}
                                onChange={this.handleInputChange}
                                error={errors.last_name}

                            />

                            <TextField
                                autoComplete="email"
                                margin="normal"
                                variant="outlined"
                                placeholder="email"
                                label="email"
                                name="email"
                                type="email"
                                value={this.state.email}
                                onChange={this.handleInputChange}
                                error={errors.email}
                                style={{textAlign:'right',width:'400px',margin:"center"}}
                            />

                            <CardActions>
                            <button
                                color="primary"
                                type="button"
                                //size="small"
                                className="login-btn"
                                onClick={()=> this.submitAddEmployee}>
                                Enter
                            </button>
                            </CardActions>
                                <div  style={{  backgroundImage: 'url(http://www.bestplumbers.ca/wp-content/uploads/2014/01/3D-Plumber-Wrench-Toolbox-opt.jpg)',
                                    height:'250px',width:'350px',
                                }}/>

                            </Card>
                            <Dialog
                                open={this.state.dOpen}
                                onClose={this.handleDClose}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                            >
                                <DialogTitle id="alert-dialog-title">{"הוספת עובד למערכת"}</DialogTitle>
                                <DialogContent>
                                    <DialogContentText id="alert-dialog-description" component={''}>
                                       New donor added
                                    </DialogContentText>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={this.handleDialogClose} color="primary" href={''}>
                                        Enter
                                    </Button>

                                </DialogActions>
                            </Dialog>
                        </form>
                    </Typography>
                </CardContent>
        

            </Card>


            </div>
            </Modal>
                );

    }

}


AddNewD.propTypes = {
    addNewDonor: PropTypes.func.isRequired,
   
    errors: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    donor:state.donor,
    errors: state.errors
});





export default connect(mapStateToProps, { addNewDonor })( withStyles(styles)(withRouter(AddNewD )));
