import React from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'
import { useSelector } from 'react-redux'

import { LinearGradient } from 'expo-linear-gradient'

import ArgileBackground from './ArgileBackground' //Note: Can't import {ArgileBackground, Article} from './' because react-native throws warning about require cycles
import Article from './Article'

const NewsContainer = props => {

    const first = props.news[0].id
    props.news.reverse()
    const last = props.news[0].id
    props.news.reverse()

    return (
        <LinearGradient style={styles.screenContainer} colors={['rgba(151,66,133,.6)', 'transparent', 'transparent', 'transparent', 'rgba(151,66,133,.6)']}>
            <ArgileBackground color={'rgba(151,66,133,.6)'}/>
            <FlatList
                data={props.news}
                keyExtractor={item => item.id}
                renderItem={itemData =>
                    <Article
                        articleInfo={itemData.item}
                        isFirst={itemData.item.id === first}
                        isLast={itemData.item.id === last}
                    />
                }
            />
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        backgroundColor: 'rgb(7,26,64)'
    }
})

export default NewsContainer
