import React from 'react'
import { View, StyleSheet} from 'react-native'

import { LinearGradient } from 'expo-linear-gradient'

const ArgileBackground = () => {

    return (
        <View style={styles.backgroundContainer}>
            <LinearGradient colors={['rgba(89,147,91,.6)', 'transparent']} style={styles.backgroundDiamondTopLeft}></LinearGradient>
            <LinearGradient colors={['rgba(89,147,91,.6)', 'transparent']} style={styles.backgroundDiamondTopRight}></LinearGradient>
            <LinearGradient colors={['rgba(89,147,91,.6)', 'transparent']} style={styles.backgroundDiamondBottomLeft}></LinearGradient>
            <LinearGradient colors={['rgba(89,147,91,.6)', 'transparent']} style={styles.backgroundDiamondBottomRight}></LinearGradient>
        </View>
    )
}

const styles = StyleSheet.create({
    backgroundContainer: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        marginTop: '-17%'
    },
    backgroundDiamondTopLeft: {
        position: 'absolute',
        left: '40%',
        top: '-6.85%',
        width: '10%',
        height: '80%',
        transform: [{rotateZ: '-135deg'}]
    },
    backgroundDiamondTopRight: {
        position: 'absolute',
        left: '50%',
        top: '-6.85%',
        width: '10%',
        height: '80%',
        transform: [{rotateZ: '135deg'}]
    },
    backgroundDiamondBottomLeft: {
        position: 'absolute',
        left: '40%',
        top: '45%',
        width: '10%',
        height: '80%',
        transform: [{rotateZ: '-45deg'}]
    },
    backgroundDiamondBottomRight: {
        position: 'absolute',
        left: '50%',
        top: '45%',
        width: '10%',
        height: '80%',
        transform: [{rotateZ: '45deg'}]
    }
})

export default ArgileBackground
