import { LOGIN, FIELD, ERROR, SUCCESS } from '../actions/loginActions';

const loginReducer = (state, action) => {
    switch (action.type) {
        case LOGIN:
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
                // email: '',
                // password: '',
                isLoading: false,
                errors: action.errors
            }
        
        case SUCCESS:
            return {
                ...state,
                email: '',
                password: '',
                isLoading: false,
                isLoggedIn: true,
                errors: []
            }
        
        default: return state;
    }
};

export default loginReducer;