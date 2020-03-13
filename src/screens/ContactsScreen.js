import React from 'react'
import { View, Text, FlatList, StyleSheet } from 'react-native'
import { useSelector } from 'react-redux'

import { LinearGradient } from 'expo-linear-gradient';

import config from '../config'

import ContactCard from '../reusables/ContactCard'

const ContactsScreen = () => {

    const contacts = useSelector(state => state.contactsReducer.contacts)

    return (
        <View style={styles.screenContainer}>
            <View style={styles.backgroundContainer}>
                <LinearGradient colors={['rgba(90,150,90,.75)', 'transparent']} style={styles.backgroundDiamond1}></LinearGradient>
                <LinearGradient colors={['rgba(90,150,90,.75)', 'transparent']} style={styles.backgroundDiamond2}></LinearGradient>
                <LinearGradient colors={['rgba(90,150,90,.75)', 'transparent']} style={styles.backgroundDiamond3}></LinearGradient>
                <LinearGradient colors={['rgba(90,150,90,.75)', 'transparent']} style={styles.backgroundDiamond4}></LinearGradient>
            </View>
            <View style={styles.backgroundDiamond2}></View>
            <FlatList
                data={contacts}
                keyExtractor={item => item.id}
                renderItem={itemData => <ContactCard props={itemData.item}/>}/>
        </View>
    )
}

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        backgroundColor: 'rgb(3,40,100)',
    },
    backgroundContainer: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        marginTop: '-17%'
    },
    backgroundDiamond1: {
        position: 'absolute',
        left: '40%',
        top: '-6.85%',
        width: '10%',
        height: '80%',
        transform: [{rotateZ: '-135deg'}]
    },
    backgroundDiamond2: {
        position: 'absolute',
        left: '50%',
        top: '-6.85%',
        width: '10%',
        height: '80%',
        transform: [{rotateZ: '135deg'}]
    },
    backgroundDiamond3: {
        position: 'absolute',
        left: '50%',
        top: '45%',
        width: '10%',
        height: '80%',
        transform: [{rotateZ: '45deg'}]
    },
    backgroundDiamond4: {
        position: 'absolute',
        left: '40%',
        top: '45%',
        width: '10%',
        height: '80%',
        transform: [{rotateZ: '-45deg'}]
    },
})

export default ContactsScreen
