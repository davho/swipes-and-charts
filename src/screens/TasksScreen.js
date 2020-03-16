import React, { useState } from 'react'
import { Text, View, SafeAreaView, StyleSheet, StatusBar, Platform, FlatList } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'

import { TaskItem } from '../reusables'

import * as tasksActions from '../redux/tasksActions'

const TasksScreen = () => {
    const dispatch = useDispatch() //Hooks can only be called from inside the body of a function component, including the useDispatch hook from redux

    const incompleteTasks = useSelector(state => state.tasksReducer.incompleteTasks)

    const tempArray = incompleteTasks.slice(0) //Calling slice(0) on a temporary array is the best way to make a copy without mutating the original array

    const lastItem = tempArray.sort((a, b) => a.someId - b.someId)[tempArray.length -1] //This sort function sorts the elements in the array according to the value of the someId key (even though those values are strings :) sort is a powerful method) then we select the last item by its index in the array by subtracting 1 from the array's length.

    return (
            <SafeAreaView style={styles.screenContainer}>

                <FlatList
                    style={styles.tasksContainer}
                    data={incompleteTasks}
                    keyExtractor={item => item.someId}
                    renderItem={itemData =>
                        <TaskItem
                            text={itemData.item.description}
                            isLast={+lastItem.someId === +itemData.item.someId}
                            onSwipeFromRight={() => dispatch(tasksActions.removeTask(itemData.item.someId))}
                            onLeftPress1={() => alert('Calendar modal here')}
                        />
                    }
                />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        backgroundColor: 'rgb(255,255,255)'
    },
    tasksContainer: {
        width: '100%',
        marginTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight //Height of the status bar on Android Marshmallow (API 23) and above is 24dp (Density Independent Pixels) and before Marshmallow was 25dp but StatusBar.currentHeight takes care of this automatically
    }
})

export default TasksScreen
