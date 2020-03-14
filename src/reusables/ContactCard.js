import React from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity, Linking } from 'react-native'

import { Ionicons, MaterialCommunityIcons, Foundation, FontAwesome } from '@expo/vector-icons'

import utils from '../utils'
import config from '../config'

const ContactCard = props => {

    return (
        <TouchableOpacity
            style={{...styles.cardContainer, marginTop: props.isFirst ? 16 : null, marginBottom: props.isLast ? 16 : null}}
            activeOpacity={.5}
            onPress={() => Linking.openURL(props.contactInfo.profileUrl)}
            >

            <View style={styles.column1}>
                <View style={styles.imageContainer}>
                    <Image
                        style={styles.image}
                        source={{uri: props.contactInfo.picUrl}}
                    />
                </View>
                <Text style={styles.flag}>{utils.nationalFlag(props.contactInfo.country)}</Text>
            </View>

            <View style={styles.column2}>
                <Text style={styles.name}>{props.contactInfo.name}</Text>
                <Text style={styles.title}>{props.contactInfo.title}</Text>
                <View style={styles.phoneEmailViewProfileContainer}>
                    <Ionicons style={styles.iconStyle} name='md-person' color='rgb(255,255,255)' size={22}/>
                    <Text style={styles.phoneEmailViewProfileText}>View Profile</Text>
                </View>
                { props.contactInfo.phone !== '' ?
                    <TouchableOpacity style={styles.phoneEmailViewProfileContainer} hitSlop={utils.slopQuick(15)} onPress={() => utils.callNumber(props.contactInfo.phone)}>
                        <FontAwesome style={styles.iconStyle} name='phone' color='rgb(255,255,255)' size={22}/>
                        <Text style={styles.phoneEmailViewProfileText}>{props.contactInfo.phone}</Text>
                    </TouchableOpacity>
                    : null}
                { props.contactInfo.email !== '' ?
                    <TouchableOpacity style={styles.phoneEmailViewProfileContainer} hitSlop={utils.slopQuick(15)} onPress={() => utils.sendEmail(props.contactInfo.email.toLowerCase())}>
                        <Ionicons style={styles.iconStyle} name='ios-mail' color='rgb(255,255,255)' size={22}/>
                        <Text style={styles.phoneEmailViewProfileText}>{utils.breakEmailBeforeAt(props.contactInfo.email.toLowerCase())}</Text>
                    </TouchableOpacity>
                    : null}
            </View>

        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    cardContainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'rgba(255,255,255,.1)',
        marginVertical: 7,
        marginHorizontal: 14,
        borderRadius: 10,
        padding: 12
    },
    column1: {
        alignItems: 'center'
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
    },
    flag: {
        fontSize: config.screenWidth / 8,
        opacity: .8,
    },
    column2: {
        paddingLeft: 12,
        flex: 1
    },
    name: {
        color: 'rgb(255,255,255)',
        paddingVertical: 5,
        fontFamily: 'helvetica-bold',
        fontSize: 20
    },
    title: {
        color: 'rgb(255,255,255)',
        paddingBottom: 5,
        fontFamily: 'helvetica-regular',
        fontSize: 16
    },
    phoneEmailViewProfileContainer: {
        flexDirection: 'row',
        width: '80%',
        marginTop: 5
    },
    phoneEmailViewProfileText: {
        color: 'rgb(76,176,236)',
        paddingBottom: 5,
        fontFamily: 'helvetica-regular',
        fontSize: 16
    },
    iconStyle: {
        marginTop: -2,
        marginRight: 10
    }
})

export default ContactCard
