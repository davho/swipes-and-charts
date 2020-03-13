import MYDUMMYCONTACTSDATA from '../data/dummy-contacts-data'
import { GET_CONTACTS } from './contactsActions'

const initialState = {
    contacts: MYDUMMYCONTACTSDATA
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
