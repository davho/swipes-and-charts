import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { useSelector } from 'react-redux'

const NewsScreen = () => {

    const accountType = useSelector(state => state.loginReducer.accountType)

    return (
        <View style={styles.centered}>
            <Text>{`Just a dummy ${accountType === 'c' || accountType === 'a' || accountType === 'n' ? accountType.toUpperCase() : 'PUBLIC'} screen`}</Text>
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

export default NewsScreen
