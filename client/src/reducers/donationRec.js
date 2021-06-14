import {ADD_DONATION_REC, DELETE_DONATION_REC, GET_DONATION_REC} from "../actions/types";

const initialState = [];

export default function donationRec(state = initialState, action) {

    switch (action.type) {
        case GET_DONATION_REC:
            return action.payload;
        case ADD_DONATION_REC:
            return [...state, action.payload];
        case DELETE_DONATION_REC:
            return state.filter(donationRec => donationRec.id !== action.payload);
        default:
            return state;

    }
}