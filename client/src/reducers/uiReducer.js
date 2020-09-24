import initialState from './initialState';


export default function uiReducer(state = initialState.ui, action) {
    switch (action.type) {

        case "TOGGLE_LANGUAGE": {
            return {
                ...state, language: !state.language
            }
        }

        case "TOGGLE_THEME": {
            return {
                ...state, theme: !state.theme
            }
        }
        default: return state;
    }
}