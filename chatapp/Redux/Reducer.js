


const iState = {

}



const Reducer = (state = iState, action) => {

    switch (action.type) {

        case "message":
            return { ...state, message: action.data }

        case "users_online":
            return {
                ...state,
                usersOnline: action.data
            }

        default:
            return state;
    }


}

export default Reducer;