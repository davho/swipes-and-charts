import React from 'react'
import { Text, View, StyleSheet, Animated, Easing } from 'react-native'
import { Swipeable, TouchableOpacity, /* TapGestureHandler, RotationGestureHandler */ } from 'react-native-gesture-handler'
import { MaterialCommunityIcons, AntDesign } from '@expo/vector-icons'

import config from '../config'

const LeftActions = ({progress, dragX, onPress1}) => {
    //progress - is how far across the entire swipeable area the swipe action taken place
    //dragX - is independent of where the user started dragging
    const scale1 = dragX.interpolate({
        inputRange: [0, 60],
        outputRange: [0, 1], //If you don't clamp it it'll go past 1
        extrapolate: 'clamp' //Clamp means lock it to the output range, don't let it exceed those values. If you don't clamp it it'll go past 1.
    })

    const scale2 = dragX.interpolate({
        inputRange: [60, 120],
        outputRange: [0, 1], //If you don't clamp it it'll go past 1
        extrapolate: 'clamp' //Clamp means lock it to the output range, don't let it exceed those values. If you don't clamp it it'll go past 1.
    })

    return (
        <View style={{flexDirection: 'row'}}>
            <TouchableOpacity style={{...styles.leftActionContainers, backgroundColor: 'blue'}} onPress={onPress1}>
                <Animated.View style={[styles.leftActionIcon, {transform: [{scale: scale1}]}]}>
                    <MaterialCommunityIcons name='calendar-clock' size={32} color='white'/>
                </Animated.View>
            </TouchableOpacity>
            <TouchableOpacity style={{...styles.leftActionContainers, backgroundColor: 'green'}} onPress={() => alert('I wish I could close this task: https://stackoverflow.com/questions/60358902/react-native-gesture-handler-swipeable-giving-typeerror-illegal-invocation-wi')}>
                <Animated.View style={[styles.leftActionIcon, {transform: [{scale: scale2}]}]}>
                    <AntDesign name='back' size={32} color='white'/>
                </Animated.View>
            </TouchableOpacity>
        </View>
    )
}

const RightActions = ({progress, dragX}) => {
    //progress - is how far across the entire swipeable area the swipe action has taken place
    //dragX - is independent of where the user started dragging
    const scale = dragX.interpolate({
        inputRange: [-60, 0],
        outputRange: [1, 0], //If you don't clamp it it'll go past 1
        extrapolate: 'clamp' //Clamp means lock it to the output range, don't let it exceed those values. If you don't clamp it it'll go past 1.
    })

    return (
        <View style={styles.rightActionContainer}>
            <Animated.View style={[styles.rightActionIcon, {transform: [{scale: scale}]}]}>
                <MaterialCommunityIcons name='clipboard-check-outline' size={32} color='white'/>
            </Animated.View>
        </View>
    )
}

const TaskItem = ({text, isLast, onSwipeFromRight, onLeftPress1}) => {

    let height = new Animated.Value(70)   //Animate from 70px
    let opacity = new Animated.Value(1)   //Animate from 1

    const animateHeightAndOpacity = () => {
        Animated.timing(                  // Animate over time
            height,                       // The animated variable to drive
            { toValue: 0,                 // Animate to 0px
            duration: 350,                // The time to animate over is 350ms
            easing: Easing.bezier(0,.8,.5,1)
            }).start()
        Animated.timing(                  // Animate over time
            opacity,                      // The animated variable to drive
            { toValue: 0,                 // Animate to 0px
              duration: 350,              // The time to animate over is 350ms
              easing: Easing.bezier(0,.8,.5,1)
            }).start()
    }
    return (
        <Animated.View style={{height: height, opacity: opacity}}>
            <Swipeable
                renderLeftActions={(progress, dragX) => <LeftActions progress={progress} dragX={dragX} onPress1={onLeftPress1}/>}
                renderRightActions={(progress, dragX) => <RightActions progress={progress} dragX={dragX}/>}
                onSwipeableRightOpen={onSwipeFromRight}
                onSwipeableRightWillOpen={animateHeightAndOpacity}
                friction={.75}
                leftThreshold={0}
                rightThreshold={config.screenWidth / 2}
                overshootFriction={8}
            >
                <View style={{...styles.taskContainer, borderBottomWidth: isLast ? StyleSheet.hairlineWidth : null }}>
                    <Text style={styles.taskText}>{text}</Text>
                </View>
            </Swipeable>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    taskContainer: {
        height: 70,
        paddingLeft: 20,
        justifyContent: 'center',
        backgroundColor: 'rgb(255,255,255)',
        borderColor: 'rgb(192,192,192)',
        borderTopWidth: StyleSheet.hairlineWidth
    },
    taskText: {
        fontWeight: '300'
    },
    leftActionContainers: {
        flex: 1, //Making flex take up the full width automatically makes the swipe gesture complete at > 50% when leftThreshold is at default (which is half the panel's width). Without making it take up the full width it will never complete.
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    leftActionIcon: {
        color: 'rgb(255,255,255)',
        fontWeight: '600',
        paddingHorizontal: 15
    },
    rightActionContainer: {
        flex: 1, //Making flex take up the full width automatically makes the swipe gesture complete at > 50% when rightThreshold is at default (which is half the panel's width). Without making it take up the full width it will never complete.
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'flex-end'
    },
    rightActionIcon: {
        color: 'rgb(0,0,0)',
        fontWeight: '300',
        paddingHorizontal: 20
    }
})

export default TaskItem
