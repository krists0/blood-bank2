import axios from "axios";
import Toast from '../components/Toast';
import {ADD_DONOR, GET_DONORS, UPDATE_DONOR, DELETE_DONOR,GET_ERRORS} from "./types";

export const getDonors=()=>dispatch=>{
    //dispatch(setEmployeeLoading());
    axios
        .get('/api/donors/getDonors')
        .then(res=>
            dispatch({
                type:GET_DONORS,
                payload:res.data
            }))
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: null
            })
        );



};


export const addNewDonor = data => dispatch => {
    axios
        .post('/api/donors/addNewDonor', data)
        .then(res =>{
            Toast.success('Donor Has Been Added Successfully');
            dispatch({
                type: ADD_DONOR,
                payload: res.data
            })}
        )
        .catch(err =>{
            Toast.error(err.message);
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })}
        );
};


export const updateDonor = (data, id)=> dispatch  => {
    let donorData={data, id};
    axios
    .post(`/api/donors/updateDonor/${id}`, data)
    .then(res =>{
        Toast.success('Donor Has Been Updated Successfully');
        dispatch({
            type: UPDATE_DONOR,
            payload: donorData
        })})
    .catch(err=> {
        Toast.error(err.message);
        dispatch({
        type: GET_ERRORS,
        payload: err.response.data
    })});
};


export const deleteDonor = id => dispatch => {
    axios
        .delete(`/api/donors/deleteDonor/${id}`)
        .then(res =>{
            Toast.success('Donor Has Been Deleted Successfully');
            dispatch({
                type: DELETE_DONOR,
                payload: id
            })}
        )
        .catch(err =>{
            Toast.error(err.message);
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })}
        );
};
