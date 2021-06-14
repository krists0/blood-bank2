import axios from 'axios';
import {
    GET_DONATION_REC,
    ADD_DONATION_REC,
    DELETE_DONATION_REC,
    UPDATE_DONATION_REC,
    GET_ERRORS,
    CLEAR_ERRORS,
} from "./types";




export const getDonationRec=()=>dispatch=>{
    //dispatch(setEmployeeLoading());
    axios
        .get('/api/donationRec/getDonations')
        .then(res=>
            dispatch({
                type:GET_DONATION_REC,
                payload:res.data
            }))
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: null
            })
        );



};


export const addNewDonationRec = data => dispatch => {

    axios
        .post('/api/donationRec/addNewDonationRec', data)
        .then(res =>
            dispatch({
                type: ADD_DONATION_REC,
                payload: res.data
            })
        )
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};


export const updateDonationRec = data=> dispatch  => {

    axios
        .post('/api/donationRec/updateDonationRec', data)
        .then()
        .catch(err=> dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }));
};


export const deleteDonationRec = id => dispatch => {
    axios
        .delete(`/api/donationRec/deleteDonationRec/${id}`)
        .then(res =>
            dispatch({
                type: DELETE_DONATION_REC,
                payload: id
            })
        )
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        );
};