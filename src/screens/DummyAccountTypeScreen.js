import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { useSelector } from 'react-redux'

//This screen is just a dynamic placeholder which shows which type of account you are authed into

const DummyAccountTypeScreen = () => {

    const accountType = useSelector(state => state.loginReducer.accountType)

    return (
        <View style={styles.centered}>
            <Text>{`Just a dummy ${accountType === 'client' || accountType === 'admin' || accountType === 'news profiles' ? accountType.toUpperCase() : 'PUBLIC'} screen`}</Text>
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

export default DummyAccountTypeScreen
