import React from 'react'
import { View, Text, FlatList, StyleSheet } from 'react-native'
import { useSelector } from 'react-redux'

import { LinearGradient } from 'expo-linear-gradient'

import { ArgileBackground, ContactCard } from '../reusables'

const ContactsScreen = () => {

    const contacts = useSelector(state => state.contactsReducer.contacts)

    const first = contacts[0].id
    contacts.reverse()
    const last = contacts[0].id
    contacts.reverse()

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
                        />
                    }
                />
            </LinearGradient>
    )
}

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        backgroundColor: 'rgb(7,26,64)'
    }
})

export default ContactsScreen
