const initialState = {
    isLogged: false,
    userToken: {},
    userData: {}
}

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case "LOGIN":
            return {
                ...state,
                isLogged: true,
                userToken: action.userToken,
            }
        case "SETUSERDATA":
            return {
                ...state,
                userData: action.userData,
            }
        case "REFRESH":
            return {
                ...state,
                userToken: action.userToken
            }
        case "LOGOUT":
            return {
                ...state,
                isLogged: false,
                userToken: {},
                userData: {}
            }
        default:
            return state
    }
}

export default rootReducer