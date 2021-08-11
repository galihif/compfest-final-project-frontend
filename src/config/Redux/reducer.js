const initialState = {
    isLogged: false,
    userToken: {},
}

const rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case "LOGIN":
            return {
                ...state,
                isLogged: true,
                userToken: action.userToken
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
                userToken: {}
            }
        default:
            return state
    }
}

export default rootReducer