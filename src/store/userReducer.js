function userReducer(user = {}, action){
    switch (action.type) {
        case 'SET_USER':
            user = action.data;
            return user;
        case 'REMOVE_USER':
            user = {};
            return user;
        default:
            return user;
    }
}

// dispatch
export const setUser = (user) => {
    return {
        type: 'SET_USER',
        data: user
    }
}
export const removeUser = () => {
    return {
        type: 'REMOVE_USER'
    }
}

export default userReducer;