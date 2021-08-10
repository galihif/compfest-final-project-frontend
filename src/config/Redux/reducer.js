const initialState = {
    isLogged: false,
    userData: {},
}

const rootReducer = (state = initialState, action) => {
    switch(action.type){
        case "LOGIN":
            return {
                ...state,
                isLogged: true,
                userData: action.userData,
            }
        default: 
            return state
    }
}

export default rootReducer