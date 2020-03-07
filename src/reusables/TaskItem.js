import React from 'react'
import { Text, View, StyleSheet, Animated, Easing } from 'react-native'
import { Swipeable, TouchableOpacity, /* TapGestureHandler, RotationGestureHandler */ } from 'react-native-gesture-handler'
import { MaterialCommunityIcons, AntDesign } from '@expo/vector-icons'

import config from '../config'

const LeftActions = ({progress, dragX, onPress1}) => {
    //progress - is how far across the entire swipeable area the swipe action taken place
    //dragX - is independent of where the user started dragging
    const scaleIcon1 = dragX.interpolate({
        inputRange: [30, 60],
        outputRange: [0, 1], //If you don't clamp it it'll go past 1
        extrapolate: 'clamp' //Clamp means lock it to the output range, don't let it exceed those values. If you don't clamp it it'll go past 1.
    })

    const scaleIcon2 = dragX.interpolate({
        inputRange: [90, 120],
        outputRange: [0, 1], //If you don't clamp it it'll go past 1
        extrapolate: 'clamp' //Clamp means lock it to the output range, don't let it exceed those values. If you don't clamp it it'll go past 1.
    })

    const draggableDummyTranslateX = dragX.interpolate({
        inputRange: [0, config.screenWidth],
        outputRange: [0, config.screenWidth]
    })

    return (
        <View style={{flexDirection: 'row'}}>

            <TouchableOpacity style={{...styles.leftActionContainers, backgroundColor: 'rgb(0,0,255)'}} onPress={onPress1}>
                <Animated.View style={[styles.leftIconContainers, {transform: [{scale: scaleIcon1}]}]}>
                    <MaterialCommunityIcons name='calendar-clock' size={32} color='rgb(255,255,255)'/>
                </Animated.View>
            </TouchableOpacity>
            <TouchableOpacity style={{...styles.leftActionContainers, backgroundColor: 'rgb(0,128,0)'}} onPress={() => alert('I wish I could close this task: https://stackoverflow.com/questions/60358902/react-native-gesture-handler-swipeable-giving-typeerror-illegal-invocation-wi')}>
                <Animated.View style={[styles.leftIconContainers, {transform: [{scale: scaleIcon2}]}]}>
                    <AntDesign name='back' size={32} color='rgb(255,255,255)'/>
                </Animated.View>
            </TouchableOpacity>

            <Animated.View style={[styles.draggableDummyLeft, {transform: [{translateX: draggableDummyTranslateX}]}]}></Animated.View>

        </View>
    )
}

const RightActions = ({progress, dragX}) => {
    //progress - is how far across the entire swipeable area the swipe action has taken place
    //dragX - is independent of where the user started dragging
    const iconScale = dragX.interpolate({
        inputRange: [-60, -30],
        outputRange: [1, 0], //If you don't clamp it it'll go past 1
        extrapolate: 'clamp' //Clamp means lock it to the output range, don't let it exceed those values. If you don't clamp it it'll go past 1.
    })
    const dummyAnimatedViewOpacity = dragX.interpolate({
        inputRange: [-config.screenWidth, -config.screenWidth/3], //It should start animating at -config.screenWidth/3 and end at -config.screenWidth
        outputRange: [1, 0], //If you don't clamp it it'll go past 1
        //extrapolate: 'clamp' //Clamp means lock it to the output range, don't let it exceed those values. If you don't clamp it it'll go past 1.
    })

    const draggableDummyTranslateX = dragX.interpolate({
        inputRange: [-config.screenWidth, 0],
        outputRange: [-config.screenWidth, 0]
    })
    const draggableDummyOpacity = dragX.interpolate({
        inputRange: [-config.screenWidth, 0],
        outputRange: [.3, 1]
    })
    const draggableDummyBorderRadius = dragX.interpolate({
        inputRange: [-config.screenWidth / 2, 0],
        outputRange: [45, 0]
    })

    return ( //The following solution was the only way to make the color change as one swipes (because you can't animate the backgroundColor style property, and can't "animate" the hue of an hsl value unfortunately). Also, setting a different backgroundColor on a parent View and adjusting opacity of the child Animated.View of a different backgroundColor also affects the opacity of the grandchild icon which can't be locked to 1 because there's no CSS cascading in React Native. So here, the right action container is displaced by a dummy animated background of the same size and then pulled up on top of it using a negative top margin (that was the only way to get the dummy animated View behind the right action container). The right action container then has no backgroundColor, the dummy Animated View has a backgroundColor of 'rgb(255,0,0)' and its opacity animates, which reveals the backgroundColor of the parent wrapper.

        <View style={styles.parentWrapperRight}>

            <Animated.View style={{...styles.dummyAnimatedViewRight, opacity: dummyAnimatedViewOpacity}}></Animated.View>
            <View style={{...styles.rightActionContainer}}>
                <Animated.View style={[styles.rightIconContainer, {transform: [{scale: iconScale}]}]}>
                    <MaterialCommunityIcons name='clipboard-check-outline' size={32} color='rgb(255,255,255)' style={{opacity: 1}}/>
                </Animated.View>
            </View>

            <Animated.View style={[styles.draggableDummyRight, {opacity: draggableDummyOpacity, borderRadius: draggableDummyBorderRadius}, {transform: [{translateX: draggableDummyTranslateX}]}]}></Animated.View>

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
    leftIconContainers: {
        paddingHorizontal: 15
    },
    parentWrapperRight: {
        backgroundColor: 'rgb(255,0,0)',
        width: '100%'
    },
    dummyAnimatedViewRight: {
        width: '100%',
        height: 70,
        backgroundColor: 'rgb(128,0,255)'
    },
    draggableDummyRight: {
        width: '100%',
        height: 70,
        marginTop: -70,
        backgroundColor: 'rgb(255,255,255)'
    },
    draggableDummyLeft: {
        width: 120,
        marginLeft: -120,
        height: 70,
        backgroundColor: 'rgb(255,255,255)'
    },
    rightActionContainer: {
        flex: 1, //Making flex take up the full width automatically makes the swipe gesture complete at > 50% when rightThreshold is at default (which is half the panel's width). Without making it take up the full width it will never complete.
        marginTop: -70,
        justifyContent: 'center',
        alignItems: 'flex-end'
    },
    rightIconContainer: {
        paddingHorizontal: 20
    }
})

export default TaskItem
