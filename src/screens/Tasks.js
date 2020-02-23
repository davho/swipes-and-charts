import React, { useState } from 'react'
import { Text, View, SafeAreaView, StyleSheet, StatusBar, Platform, FlatList } from 'react-native'
import Task from '../reusables/Task'

import MYDUMMYTASKS from '../data/dummy-data'

const taskData = MYDUMMYTASKS //This will be pulled from redux, then eventually redux will pull from server and dummy data will be unused

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
            <SafeAreaView style={styles.screenContainer}>
                <StatusBar barStyle='dark-content'/>
                <FlatList
                    style={styles.tasksContainer}
                    data={incompleteTasks}
                    keyExtractor={item => item.someId}
                    renderItem={itemData =>
                        <Task
                            text={itemData.item.description}
                            isLast={taskData.length === +itemData.item.someId}
                            onSwipeFromRight={() => markComplete(itemData.item.someId)}
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

export default Tasks
