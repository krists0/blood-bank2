import React, { useState,useEffect } from 'react'
import { connect } from 'react-redux'
import Table from '../../components/TableReact'
import SVG from 'react-inlinesvg'
import styles from './assets/tables.module.scss'
import editIcon from '../../images/edit.svg'
import deleteIcon from '../../images/bin.svg'
import {getDonors, deleteDonor} from '../../actions/donorsActions'
import addIcon from '../../images/add.svg'

import Container from '@material-ui/core/Container';
import AddNewD from './AddNewD'
import AddEditDonorsTable from './AddEditDonorsTable';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import Button from "@material-ui/core/Button";
import Modal from '../../components/Modal'
import {renderInputs} from '../../components/renderInputs';
//import Button from '../../components/Button';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

import { addNewDonor, updateDonor } from '../../actions/donorsActions';
import Typography from "@material-ui/core/Typography";

import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import ButtonBase from '@material-ui/core/ButtonBase';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
/**
 * for add new donor and update/edit donor
 */
const useStyles = makeStyles((theme) => ({
 
   root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    maxWidth: 500,
  },
  image: {
    width: 128,
    height: 128,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
  }));
  

const PromotionSchema = Yup.object().shape({
    dnr_name: Yup.string().min(2, 'Too Short!').required('Required'),
    dnr_last_name:Yup.string().min(2, 'Too Short!').required('Required'),
    dnr_email: Yup.string().email(),
    dnr_phone_num: Yup.string(),
    dnr_blood_type: Yup.mixed(),
    dnr_address: Yup.string().min(2, 'Too Short!').max(150, 'Too Long!'),
    dnr_country: Yup.string(),
    // startDate: Yup.date(),
    // endDate: Yup.date()
});



const AddDonorTab = props => {
    const {donors, onDeleteDonor}=props;
    const [editDonor, setEditDonor] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [data, setData] = useState(donors);
    const { onAddNewDonor,  onUpdateDonor, closeForm , donorEdit, open, handleClose } = props;
    const id = donorEdit ? donorEdit._id : null;
    const initialValues = {

        dnr_name: donorEdit? donorEdit.dnr_name : '',
        dnr_last_name: donorEdit ? donorEdit.dnr_last_name : '',
        dnr_email: donorEdit ? donorEdit.dnr_email : '',
        dnr_blood_type: donorEdit ? donorEdit.dnr_blood_type : '',
        dnr_address: donorEdit ? donorEdit.dnr_address : '',
        dnr_country: donorEdit ? donorEdit.dnr_country : '',
        dnr_phone_num: donorEdit ? donorEdit.dnr_phone_num : ''
    };
    
    useEffect(()=>{

        setData(donors);

    },[donors]);


    const setEdit = (edit) =>{
        setEditDonor(edit);
        setOpenModal(true);
    };

    const setAdd = () =>{
        setEditDonor(false);
        setOpenModal(true);
    };

const columns = React.useMemo(
    () => [
        {
            Header: 'Id',
            accessor: 'dnr_id'
        },

        {
            Header: 'Name',
            accessor: 'dnr_name'
        },
        {
            Header: 'Last Name',
            accessor: 'dnr_last_name'
        },
        {
            Header: 'Blood Type',
            accessor: 'dnr_blood_type',
            //Cell: cell => statuses.find(status => status.value === cell?.cell?.value)?.label || ''
        },
        {
            Header: 'Email',
            accessor: 'dnr_email',
        },
        {
            Header: 'Phone Number',
            accessor: 'dnr_phone_num',
        },
        {
            Header: 'Address',
            accessor: 'dnr_address',
        },
        {
            Header: 'Country',
            accessor: 'dnr_country',
        },
        {
            Header: 'Donation Date',
            accessor: 'dnr_donation_date',
            //Cell: cell => (cell?.cell?.value ? moment(cell.cell.value, 'YYYY-MM-DD HH:mm:ss').format('llll') : '')
        },
        {
            Header: 'Expiration Date',
            accessor: 'dnr_expiration_date',
        },
        {
            Header: '',
            accessor: 'icons',
            collapse: true,
            Cell: cell => ( props.auth.user.role==="admin" ||  props.auth.user.role==="secretary" ?
                <div className={styles['table_controls']}>
                    <SVG src={editIcon} onClick={() => setEdit(cell.cell.row.original)}/>
                </div> :
                 <></>
            )
        },
        {
            Header: '',
            accessor: 'icons2',
            collapse: true,
            Cell: cell => ( props.auth.user.role==="admin" ?
                <div className={styles['table_controls']}>
                    <SVG src={deleteIcon} onClick={() => onDeleteDonor(cell.cell.row.original._id)} />
                </div>
                    :
                    <></>
            )
        }
    ],[]);


    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
  
    const handleExpandClick = () => {
      setExpanded(!expanded);
    };

    return (
        <div className={classes.root}>
            <h1>

            </h1>
      <Paper className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item>
            <ButtonBase className={classes.image}>
            <img 
                        src="https://www.malayalamnewsdaily.com/sites/default/files/2019/02/25/bloodbank.jpg"
                        alt="new"
                        height="130px"
                        width="130px"
                        />
            </ButtonBase>
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="subtitle1">
                  Blood Bank 
                </Typography>
                <Typography variant="body2" gutterBottom>
                <Formik
                            enableReinitialize
                            initialValues={initialValues}
                            validationSchema={PromotionSchema}
                            onSubmit={(values, { setSubmitting, resetForm }) => {
                                setTimeout(() => {
                                    Object.keys(values).map(value => {
                                        if (value.slice(-2) === 'dnr_id' && value.toLowerCase() !== 'userid')
                                            values[value] = values[value]?.selected?.value || 0;
                                        else if (values[value] === null) delete values[value];
                                        return value
                                    });
                                    donorEdit
                                        ? onUpdateDonor(values, id)
                                        : onAddNewDonor(values);
                                    setSubmitting(false)
                                }, 1000)
                            }}
                        >
                            {({ values, setFieldValue, handleSubmit, handleChange, isSubmitting, errors, touched }) => (
                                <Form onSubmit={handleSubmit} >
                                    <Typography arrowBack={closeForm} component={'p'}>
                                        {donorEdit ? 'Edit Donor' : 'Add new donor to the system'}
                                    </Typography>
                                    <div >
                                        {renderInputs({
                                            columns: columns,
                                            values: values,
                                            handleChange: handleChange,
                                            setFieldValue: setFieldValue,
                                            errors: errors,
                                            touched: touched,
                                            props: props,
                                        })}
                                    </div>
                                    <div >
                                        <Button
                                            type="submit"
                                            disabled={isSubmitting}
                                            loading={isSubmitting}
                                            //className={styles['form-button']}
                                        
                                            variant="contained" color="secondary"
                                        >
                                            {donorEdit ? 'Update Donor' : 'Add Donor'}
                                        </Button>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                </Typography>
                
              </Grid>
              
            </Grid>
            <Grid item>
              <Typography variant="subtitle1">31.07.2020</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
      <h1>
                
            </h1>
    </div>
 
    )
};





export default connect(
    state => ({
        donors: state.donors,
        auth: state.auth,
    }),
    dispatch => ({
        onGetDonors: () => {
            dispatch(getDonors())
        },
        onDeleteDonor: (id) => {
            dispatch(deleteDonor(id))
        },
        onAddNewDonor: (data) => {
            dispatch(addNewDonor(data))
        },
        onGetDonors: () => {
            dispatch(getDonors())
        },
        onUpdateDonor: (data, id) => {
            dispatch(updateDonor(data, id))
        }
    }),

)(AddDonorTab)
