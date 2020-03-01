import { CHOOSE_ACCOUNT_TYPE } from './loginActions'

const initialState = {
    accountType: null
}

const loginReducer = (state = initialState, action) => {

    switch (action.type) {

        case CHOOSE_ACCOUNT_TYPE:

            return {
                ...state,
                accountType: action.accountType
            }
    }
    return state
}

export default loginReducer
