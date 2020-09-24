import initialState from './initialState';


export default function userReducer(state = initialState.user, action) {
    switch (action.type) {

        case "LOGGED_IN": {
            return {
                ...state,
                isLoggedInStatus : true,
                username: action.payload.username,
                role: action.payload.role,
                id: action.payload.id,
                avatar: action.payload.avatar
            }
        }

        default: return state;
    }
}