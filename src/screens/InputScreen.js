import React, { useState } from 'react'
import { View, Text, TextInput, ScrollView, KeyboardAvoidingView, StyleSheet } from 'react-native'

const InputScreen = () => {

    const [title, setTitle] = useState('')
    const [context, setContext] = useState('')
    const [notes, setNotes] = useState('')

    //This is my TextInput toggle approach for functional components
    let inputs = []

    const focusNextField = (key) => {
        inputs[key].focus()
    }

    return ( //spellCheck and autoCorrect are not working here for some reason
        <KeyboardAvoidingView style={{flex: 1}} behavior='padding' keyboardVerticalOffset={100}>
            <ScrollView>
                <View style={styles.form}>
                    <View style={styles.formControl}>
                        <Text style={styles.label}>Title</Text>
                        <TextInput
                            style={styles.input}
                            value={title}
                            autoFocus
                            onChangeText={text => setTitle(text)}
                            onSubmitEditing={() => focusNextField('two')}
                            returnKeyType='next'
                            autoCapitalize='words'
                            autoCorrect
                            spellCheck/>
                    </View>

                    <View style={styles.formControl}>
                        <Text style={styles.label}>Context</Text>
                        <TextInput
                            style={styles.input}
                            value={context}
                            onChangeText={text => setContext(text)}
                            ref={ input => {inputs['two'] = input}}
                            onSubmitEditing={() => focusNextField('three')}
                            returnKeyType='next'
                            autoCapitalize='sentences'
                            autoCorrect
                            spellCheck/>
                    </View>

                    <View style={styles.formControl}>
                        <Text style={styles.label}>Notes</Text>
                        <TextInput
                            style={styles.input}
                            value={notes}
                            onChangeText={text => setNotes(text)}
                            ref={ input => {inputs['three'] = input}}
                            onSubmitEditing={() => alert('Update tasks in redux with this')}
                            returnKeyType='done'
                            autoCapitalize='sentences'
                            autoCorrect
                            spellCheck
                            multiline
                            maxLength={140}
                            />
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    form: {
        margin: 20
    },
    formControl: {
        width: '100%'
    },
    label: {
        marginVertical: 8
    },
    input: {
        paddingHorizontal: 2,
        paddingVertical: 5,
        borderBottomColor: '#ccc',
        borderBottomWidth: 1
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default InputScreen
