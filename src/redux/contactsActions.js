export const GET_CONTACTS = 'GET_CONTACTS'

export const getContacts = (contacts) => {

    return {
        type: GET_CONTACTS,
        contacts: contacts
    }
}
