import React, { useState } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native'
import { useDispatch } from 'react-redux'

import * as loginActions from '../redux/loginActions'

const AuthScreen = () => {

    const [accountType, setAccountType] = useState('')

    const dispatch = useDispatch()

    //In a real scenario you wouldn't dispatch(loginActions.chooseAccountType(accountType)), you would dispatch some login (or signup) credentials which would, in turn, return a payload with data dictating the account type which would also be updated in redux. Then, same as we have currently, in AppNavContainer the corresponding buttom tab navigator route would be chosen and sent to AppNav to be rendered in the switch navigator.

    return (
        <KeyboardAvoidingView style={styles.centered} behavior='padding'>
                <View style={styles.contentContainer}>
                    <TextInput
                        style={styles.input}
                        value={accountType}
                        onChangeText={text => setAccountType(text)}
                        autoCapitalize='none'
                        />
                    <Text style={styles.text}>In the text input field above enter one of the following strings: "admin", "client" or "news profiles". Then hit the Choose My Navigation Structure And Enter App button. The app will load with the chosen navigation structure, demonstrating having received a payload upon login with such info. If none of those strings are entered the app will load a default "public" navigation pattern.
                    </Text>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => dispatch(loginActions.chooseAccountType(accountType))}
                        activeOpacity={.4}
                        >
                            <Text>Choose My Navigation Pattern And Enter App</Text>
                    </TouchableOpacity>
                </View>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    contentContainer: {
        marginHorizontal: 30,
        alignItems: 'center'
    },
    input: {
        width: 200,
        height: 40,
        borderColor: 'rgb(200,200,200)',
        borderWidth: StyleSheet.hairlineWidth,
        marginVertical: 20,
        padding: 5,
        textAlign: 'center',
        fontSize: 16
    },
    text: {
        textAlign: 'center',
        lineHeight: 20
    },
    button: {
        backgroundColor: 'rgb(192,192,255)',
        color: 'black',
        marginVertical: 20,
        padding: 10,
        borderRadius: 8
    }
})

export default AuthScreen
