import { SIGNUP, FIELD, ERROR, SUCCESS } from '../actions/signupActions';

const defaultState = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    isLoading: false,
    errors: [],
    isLoggedIn: false
};

const signupReducer = (state = defaultState, action) => {
    switch (action.type) {
        case SIGNUP:
            return {
                ...state,
                isLoading: true
            }
        
        case FIELD:
            return {
                ...state,
                [action.field]: action.value
            }
        
        case ERROR:
            return {
                ...state,
                isLoading: false,
                errors: action.errors
            }
        
        case SUCCESS:
            return {
                ...state,
                firstName: '',
                lastName: '',
                email: '',
                password: '',
                isLoading: false,
                isLoggedIn: true,
                errors: [],
            }
        
        default: return state;
    }
};

export default signupReducer;