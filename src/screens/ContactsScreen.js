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

    const getName = (name, type) => {
        props.navigation.setParams({name: name, type: type})
    }

    return (
            <LinearGradient style={styles.screenContainer} colors={['rgba(89,147,91,.35)', 'transparent', 'transparent', 'transparent', 'rgba(89,147,91,.35)']}>

                <ArgileBackground/>
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

    const name = navData.navigation.getParam('name')
    const type = navData.navigation.getParam('type')
    const string = type !== 'Contacts' && type !== undefined ? (type === 'dial' ? `Dialing ${name}...` : `Emailing ${name}...`) : 'Contacts'
    const fontSize = string === 'Contacts' ? 23 : 16
    const fontFamily = string === 'Contacts' ? 'helvetica-bold' : 'helvetica-regular'

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
