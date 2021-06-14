import { combineReducers } from 'redux';
import donationRec from './donationRec';
import donors from './donors';
import auth from './auth';

export default combineReducers({
    donationRec: donationRec,
    donors: donors,
    auth: auth
});

