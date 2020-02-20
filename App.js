//Something to look at for future https://software-mansion.github.io/react-native-gesture-handler/index.html

//DO: expo install react-native-gesture-handler

//READ: https://software-mansion.github.io/react-native-gesture-handler/docs/component-swipeable.html

//NOTE: https://www.youtube.com/watch?v=JxN9W9PRlUQ  but need to import { Swipeable } from 'react-native-gesture-handler' not expo

import React from 'react'
import { StyleSheet, Text, View, SafeAreaView, FlatList, Animated, Dimensions, TouchableOpacity } from 'react-native'
import { Swipeable, /* TapGestureHandler, RotationGestureHandler */ } from 'react-native-gesture-handler'

import MYDUMMYLIST from './src/data/dummy-data'
import config from './src/config'



const LeftActions = (progress, dragX) => {
    //progress - is how far across the entire swipeable area the swipe action taken place
    //dragX - is independent of where the user started dragging
    const scale = dragX.interpolate({
        inputRange: [0, config.screenWidth/4],
        outputRange: [0, 1],
        extrapolate: 'clamp'
    })

    return (
        <View style={styles.leftActionContainer}>
            <Animated.Text style={[styles.leftActionText, {transform: [{scale}]}]}>Postpone</Animated.Text>
        </View>
    )
}

const RightActions = ({progress, dragX, onPress}) => {
    //progress - is how far across the entire swipeable area the swipe action taken place
    //dragX - is independent of where the user started dragging
    const scale = dragX.interpolate({
        inputRange: [-config.screenWidth/4, 0],
        outputRange: [1, 0],
        extrapolate: 'clamp' //Clamp means lock it to our output range, don't let it exceed those values
    })

    return (
        <TouchableOpacity style={styles.rightActionContainer} onPress={onPress}>

                <Animated.Text style={[styles.rightActionText, {transform: [{scale}]}]}>Sign Off?</Animated.Text>

        </TouchableOpacity>
    )
}

const ListItem = ({text, onSwipeFromLeft, onRightPress}) => {
    return (
        <Swipeable
            renderLeftActions={LeftActions}
            onSwipeableLeftOpen={onSwipeFromLeft}
            renderRightActions={(progress, dragX) => <RightActions progress={progress} dragX={dragX} onPress={onRightPress}/>}
        >
            <View style={styles.listTextContainer}>
                <Text style={styles.listText}>{text}</Text>
            </View>
        </Swipeable>
    )
}




const App = () => {

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                style={{width: '100%'}}
                data={MYDUMMYLIST}
                keyExtractor={item => item.someId}
                renderItem={itemData =>

                    <ListItem
                        text={itemData.item.description}
                        onSwipeFromLeft={() => alert('Calendar here')}
                        onRightPress={() => alert('Signed off.')}
                    />
                }
            />
        </SafeAreaView>
    )
}





const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgb(220,220,255)'
    },
    listTextContainer: {
        backgroundColor: 'rgba(255,0,0,.3)',
        height: 50,
        marginVertical: 10,
        justifyContent: 'center',
        paddingLeft: 20
    },
    listText: {
        fontWeight: '300'
    },
    leftActionContainer: {
        backgroundColor: 'blue',
        justifyContent: 'center',
        marginVertical: 10,
        alignItems: 'flex-start',

    },
    leftActionText: {
        color: 'white',
        fontWeight: '600',
        paddingHorizontal: 20
    },
    rightActionContainer: {
        backgroundColor: 'green',
        justifyContent: 'center',
        flex: 1, //Making flex take up the full width automatically makes the swipe gesture complete at > 50%. Without making it take up the full width it will never complete.
        marginVertical: 10,
        alignItems: 'flex-end'
    },
    rightActionText: {
        color: 'black',
        fontWeight: '300',
        paddingHorizontal: 20
    }
})

export default App
