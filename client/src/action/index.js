export const loggedIn = (data) => {
    return{
        type: "LOGGED_IN",
        payload: data
    }
}
 
export const toggleTheme = () => {
    return {
        type: "TOGGLE_THEME",
    }
}

export const toggleLanguage = () => {
    return {
        type: "TOGGLE_LANGUAGE",
    }
}