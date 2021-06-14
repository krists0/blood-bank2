import {ADD_DONOR, DELETE_DONOR, GET_DONORS, UPDATE_DONOR} from "../actions/types";

const initialState = [];

export default function donors(state = initialState, action) {

    switch (action.type) {
        case GET_DONORS:
            return action.payload;
        case ADD_DONOR:
            return [...state, action.payload];
        case DELETE_DONOR:
            return state.filter(donor => donor.id !== action.payload);
        case UPDATE_DONOR:
            return  state.map(donor => { console.log(donor._id+' '+action.payload.id);
                if (parseInt(donor._id )=== parseInt(action.payload.id)) {
                    console.log('heeeeeeyyyyyyyyy');
                    return {...action.payload.data, dnr_donation_date: donor.dnr_donation_date, dnr_expiration_date: donor.dnr_expiration_date}
                }
                return donor
            });
        default:
            return state;

    }

}