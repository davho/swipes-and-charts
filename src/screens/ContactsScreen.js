import React from 'react'
import { View, Text, FlatList, StyleSheet, StatusBar } from 'react-native'
import { useSelector } from 'react-redux'

import { LinearGradient } from 'expo-linear-gradient'

import { ArgileBackground, ContactCard } from '../reusables'

const ContactsScreen = props => {

    const contacts = useSelector(state => state.contactsReducer.contacts)

    const first = contacts[0].id
    contacts.reverse()
    const last = contacts[0].id
    contacts.reverse()

    const getName = (customHeaderString, type) => {
        props.navigation.setParams({customHeaderString: customHeaderString, type: type})
    }

    return (
            <LinearGradient style={styles.screenContainer} colors={['rgba(89,147,91,.35)', 'transparent', 'transparent', 'transparent', 'rgba(89,147,91,.35)']}>

                <ArgileBackground color={'rgba(89,147,91,.6)'}/>
                <FlatList
                    data={contacts}
                    keyExtractor={item => item.id}
                    renderItem={itemData =>
                        <ContactCard
                            contactInfo={itemData.item}
                            isFirst={itemData.item.id === first}
                            isLast={itemData.item.id === last}
                            getName={(name, type) => getName(name, type)}
                        />
                    }
                />
            </LinearGradient>
    )
}

ContactsScreen.navigationOptions = navData => {

    const customHeaderString = navData.navigation.getParam('customHeaderString')
    const type = navData.navigation.getParam('type')
    const string = type !== 'Contacts' && type !== undefined ? customHeaderString : 'Contacts'
    const fontSize = string === 'Contacts' ? 23 : 18
    const fontFamily = string === 'Contacts' ? 'roboto-900-regular' : 'roboto-100-italic'

    return (
        {
            headerTitle: string,
            headerTitleStyle: {
                fontFamily: fontFamily,
                fontSize: fontSize,
            },
        }
    )
}

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        backgroundColor: 'rgb(7,26,64)'
    }
})

export default ContactsScreen
