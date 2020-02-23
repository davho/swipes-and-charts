import React, { useState } from 'react'
import { Text, View, SafeAreaView, StyleSheet, StatusBar, Platform, FlatList } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import TaskItem from '../reusables/TaskItem'

import * as tasksActions from '../redux/tasksActions'

const TasksScreen = () => {
    const dispatch = useDispatch() //Hooks can only be called from inside the body of a function component, including the useDispatch hook from redux

    const incompleteTasks = useSelector(state => state.tasksReducer.incompleteTasks)

    return (
            <SafeAreaView style={styles.screenContainer}>
                <StatusBar barStyle='dark-content'/>
                <FlatList
                    style={styles.tasksContainer}
                    data={incompleteTasks}
                    keyExtractor={item => item.someId}
                    renderItem={itemData =>
                        <TaskItem
                            text={itemData.item.description}
                            isLast={false}
                            onSwipeFromRight={() => dispatch(tasksActions.removeTask(itemData.item.someId))}
                            onLeftPress1={() => alert('Calendar modal here')}
                        />
                    }
                />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    tasksContainer: {
        width: '100%',
        marginVertical: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight //Height of the status bar on Android Marshmallow (API 23) and above is 24dp (Density Independent Pixels) and before Marshmallow was 25dp but StatusBar.currentHeight takes care of this automatically
    }
})

export default TasksScreen
