import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs'

import { TasksScreen } from '../screens'

const TasksSingleStackScreen = createStackNavigator({
    Tasks: TasksScreen
})


const MainNavigator = createBottomTabNavigator({
    1: TasksSingleStackScreen
})

export default createAppContainer(MainNavigator)
