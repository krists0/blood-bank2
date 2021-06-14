import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import MatchDonor from './MatchDonor';
import TableDonor from "./TableDonor";
//find donor tab
const useStyles = makeStyles((theme) => ({


    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
    card: {
        display: 'flex',
        padding: '2px 20px 2px 20px',
    },
}));

export default function FindDonor(props) {


    const {donors}=props;
    const classes = useStyles();
    const [bloodType, setBloodType] = React.useState('0');

    const handleChange = (event) => {
        setBloodType(event.target.value);
    };

    return (
        <div style={{color:"#ff7043"}}>
            <h3>Find matching donor by blood type ,you can export pdf file with all the details</h3>
            <Grid >
                <Card className={classes.card} >
                    <p>Enter your blood type to find a donor :</p>
                    {/**   <DonorsTable donors={this.state.donors}/>*/}
                    <FormControl variant="outlined" className={classes.formControl}>
                        <InputLabel id="demo-simple-select-outlined-label">Blood Type</InputLabel>
                        <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            value={bloodType}
                            onChange={handleChange}
                            label="BloodType"
                        >
                            <MenuItem value='0' >
                                <em>None</em>
                            </MenuItem>
                            <MenuItem value={'A+'}>A+</MenuItem>
                            <MenuItem value={'O+'}>O+</MenuItem>
                            <MenuItem value={'B+'}>B+</MenuItem>
                            <MenuItem value={'AB+'}>AB+</MenuItem>
                            <MenuItem value={'A-'}>A-</MenuItem>
                            <MenuItem value={'O-'}>O-</MenuItem>
                            <MenuItem value={'B-'}>B-</MenuItem>
                            <MenuItem value={'AB-'}>AB-</MenuItem>

                        </Select>
                     
                    </FormControl>
                </Card>
                <div>
                <MatchDonor donors={donors} value={bloodType}/>
                <TableDonor donors={donors} value={bloodType}/>
                </div>
            </Grid>


        </div>
    );
}