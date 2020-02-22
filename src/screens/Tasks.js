import React, { useState } from 'react'
import { Text, View, StyleSheet, StatusBar, Platform, FlatList, SafeAreaView, Animated, Easing } from 'react-native'
import { Swipeable, TouchableOpacity, /* TapGestureHandler, RotationGestureHandler */ } from 'react-native-gesture-handler'

import MYDUMMYTASKS from '../data/dummy-data'
import config from '../config'

const taskData = MYDUMMYTASKS //This will be pulled from redux, then eventually redux will pull from server and dummy data will be unused

const LeftActions = ({progress, dragX, onPress}) => {
    //progress - is how far across the entire swipeable area the swipe action taken place
    //dragX - is independent of where the user started dragging
    const scale = dragX.interpolate({
        inputRange: [0, config.screenWidth/4],
        outputRange: [0, 1], //If you don't clamp it it'll go past 1
        extrapolate: 'clamp' //Clamp means lock it to the output range, don't let it exceed those values. If you don't clamp it it'll go past 1.
    })

    return (
        <TouchableOpacity style={styles.leftActionContainer} onPress={onPress}>
            <Animated.Text style={[styles.leftActionText, {transform: [{scale}]}]}>Postpone</Animated.Text>
        </TouchableOpacity>
    )
}

const RightActions = ({progress, dragX}) => {
    //progress - is how far across the entire swipeable area the swipe action has taken place
    //dragX - is independent of where the user started dragging
    const scale = dragX.interpolate({
        inputRange: [-config.screenWidth/4, 0],
        outputRange: [1, 0], //If you don't clamp it it'll go past 1
        extrapolate: 'clamp' //Clamp means lock it to the output range, don't let it exceed those values. If you don't clamp it it'll go past 1.
    })

    return (
        <View style={styles.rightActionContainer}>
            <Animated.Text style={[styles.rightActionText, {transform: [{scale}]}]}>Sign Off?</Animated.Text>
        </View>
    )
}

const Task = ({text, isLast, onSwipeFromRight, onLeftPress}) => {

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
                renderLeftActions={(progress, dragX) => <LeftActions progress={progress} dragX={dragX} onPress={onLeftPress}/>}
                renderRightActions={(progress, dragX) => <RightActions progress={progress} dragX={dragX}/>}
                onSwipeableRightOpen={onSwipeFromRight}
                friction={.75}
                leftThreshold={0}
                rightThreshold={config.screenWidth / 3}
                overshootFriction={8}
                onSwipeableRightWillOpen={animateHeightAndOpacity}
            >
                <View style={{...styles.taskContainer, borderBottomWidth: isLast ? StyleSheet.hairlineWidth : null }}>
                    <Text style={styles.taskText}>{text}</Text>
                </View>
            </Swipeable>
        </Animated.View>

    )
}

const Tasks = () => {

    //This will eventually happen when fetching data from redux
    const [incompleteTasks, setIncompleteTasks] = useState(taskData)

    //This will eventually all happen in a redux reducer
    const markComplete = (id) => {

        let task = incompleteTasks.filter(i => i.someId === id)[0]

        task.complete = true

        let newIncompleteTasks = incompleteTasks.filter(i => i.complete === false)

        setIncompleteTasks(newIncompleteTasks)

    }

    return (
            <FlatList
                style={styles.tasksContainer}
                data={incompleteTasks}
                keyExtractor={item => item.someId}
                renderItem={itemData =>

                    <Task
                        isLast={taskData.length === +itemData.item.someId}
                        text={itemData.item.description}
                        onLeftPress={() => alert('Calendar modal here')}
                        onSwipeFromRight={() => markComplete(itemData.item.someId)}
                    />
                }
            />
    )
}

const styles = StyleSheet.create({
    tasksContainer: {
        width: '100%',
        marginVertical: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight //Height of the status bar on Android Marshmallow (API 23) and above is 24dp (Density Independent Pixels) and before Marshmallow was 25dp but StatusBar.currentHeight takes care of this automatically
    },

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
    leftActionContainer: {
        flex: 1, //Making flex take up the full width automatically makes the swipe gesture complete at > 50% when leftThreshold is at default (which is half the panel's width). Without making it take up the full width it will never complete.
        backgroundColor: 'blue',
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    leftActionText: {
        color: 'rgb(255,255,255)',
        fontWeight: '600',
        paddingHorizontal: 20
    },
    rightActionContainer: {
        flex: 1, //Making flex take up the full width automatically makes the swipe gesture complete at > 50% when rightThreshold is at default (which is half the panel's width). Without making it take up the full width it will never complete.
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'flex-end'
    },
    rightActionText: {
        color: 'rgb(0,0,0)',
        fontWeight: '300',
        paddingHorizontal: 20
    }
})

export default Tasks
