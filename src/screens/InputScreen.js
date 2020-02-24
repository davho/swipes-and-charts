import React, { useState } from 'react'
import { View, Text, TextInput, StyleSheet } from 'react-native'

const InputScreen = () => {

    //useState hook here


    return (
        <View style={styles.centered}>
            <Text>Input screen here...</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default InputScreen
