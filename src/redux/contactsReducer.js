import MYDUMMYCONTACTS from '../data/dummy-contacts-data'
import { GET_CONTACTS } from './contactsActions'

const initialState = {
    contacts: MYDUMMYCONTACTS
}

const contactsReducer = (state = initialState, action) => {

    switch (action.type) {

        case GET_CONTACTS:

            return {
                ...state,
                contacts: state.contacts
            }
    }
    return state
}

export default contactsReducer
