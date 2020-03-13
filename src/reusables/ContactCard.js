import React from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity, Linking } from 'react-native'

import utils from '../utils'

const ContactCard = props => {
    return (
        <TouchableOpacity style={styles.cardContainer} activeOpacity={.5} onPress={() => Linking.openURL(props.props.profileUrl)}>
            <View style={styles.imageContainer}>
                <Image style={styles.image} source={{uri: props.props.picUrl}}/>
            </View>
            <Text>{utils.nationalFlag(props.props.country)}</Text>
            <Text>{props.props.title}</Text>
            <Text>{props.props.name}</Text>
            <Text>{props.props.email}</Text>
            <Text>{props.props.phone}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    cardContainer: {
        flex: 1,
        backgroundColor: 'rgba(255,255,255,.1)',
        margin: 10,
        borderRadius: 10
    },
    imageContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 84,
        height: 84,
        borderRadius: 42,
        backgroundColor: 'rgb(255,255,255)'
    },
    image: {
        width: 75,
        height: 75,
        borderRadius: 38
    }
})

export default ContactCard
