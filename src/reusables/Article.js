import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

import * as WebBrowser from 'expo-web-browser'

import config from '../config'

const Article = props => {

    return (
        <TouchableOpacity
            style={{...config.translucentCard, marginTop: props.isFirst ? 66 : null, marginBottom: props.isLast ? 16 : null}}
            activeOpacity={props.articleInfo.url === '' ? 1 : .5}
            onPress={props.articleInfo.url === '' ? null : () => WebBrowser.openBrowserAsync(props.articleInfo.url)}
            >
                <Text style={styles.date}>{props.articleInfo.date}</Text>
                <Text style={styles.title}>{props.articleInfo.title}</Text>
                { props.articleInfo.snippet !== '' ?
                    <Text style={styles.snippet}>{props.articleInfo.snippet}</Text>
                    : null
                }

        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({

    date: {
        fontSize: 16,
        color: 'rgb(234,170,0)',
        fontFamily: 'roboto-500-regular',
        marginBottom: 5
    },
    title: {
        fontSize: 16,
        color: 'rgb(0,186,255)',
        fontFamily: 'roboto-400-italic'
    },
    snippet: {
        fontSize: 16,
        color: 'rgb(255,255,255)',
        fontFamily: 'roboto-400-regular',
        marginTop: 5
    }
})

export default Article
