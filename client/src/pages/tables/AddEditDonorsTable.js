import React from 'react';
import { Formik, Form } from 'formik';
import { connect } from 'react-redux';
//import ReactTooltip from 'react-tooltip';
import * as Yup from 'yup';
import Modal from '../../components/Modal'
import {renderInputs} from '../../components/renderInputs';
import Button from '../../components/Button';

import { addNewDonor, updateDonor, getDonors } from '../../actions/donorsActions';
import Typography from "@material-ui/core/Typography";
/**For the button + from there you can also add donor 

 */
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

const AddEditForm = props => {
    const { onAddNewDonor, onUpdateDonor, closeForm , donorEdit, columns, open, handleClose } = props;
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
    

    return (
        <Modal open={open} handleClose={handleClose} {...props}>
        <div>
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
                            {donorEdit ? 'Edit Donor' : 'Add Donor'}
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
                                secondary
                            >
                                {donorEdit ? 'Update Donor' : 'Add Donor'}
                            </Button>
                        </div>
                    </Form>
                )}
            </Formik>
            {/*<ReactTooltip type="error" effect="solid" place="right" />*/}
        </div>
        </Modal>
    )
};

export default
    connect(
        state => ({}),
        dispatch => ({
            onAddNewDonor: (data) => {
                dispatch(addNewDonor(data))
            },
            onGetDonors: () => {
                dispatch(getDonors())
            },
            onUpdateDonor: (data, id) => {
                dispatch(updateDonor(data, id))
            }
        })
    )(AddEditForm)
