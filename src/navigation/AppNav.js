import React from 'react'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs' //https://reactnavigation.org/docs/en/bottom-tab-navigator.html

import { MaterialCommunityIcons } from 'react-native-vector-icons'

import { TasksScreen, InputScreen } from '../screens'


const defaultStackNavigatorOptions = {
    headerStyle: {
        backgroundColor: 'rgb(200,255,255)',
    },
    headerTintColor: 'rgb(0,0,0)'
}
const defaultTabNavigatorOptions = {
    tabBarOptions: {
        activeTintColor: 'rgb(0,0,255)',
        inactiveTintColor: 'rgb(128,128,128)',
        keyboardHidesTabBar: false, //The keyboard will simply go in front of it when false, which is better otherwise there will be a 'jump' glitch when keyboard appears
    }
}


const TasksSingleStackScreen = createStackNavigator({
    Tasks: TasksScreen
}, {
    defaultNavigationOptions: defaultStackNavigatorOptions
})

const InputSingleStackScreen = createStackNavigator({
    'Add Task': InputScreen
}, {
    defaultNavigationOptions: defaultStackNavigatorOptions
})

const dynamicTabs = { //This object could be created on the fly based on the data coming in from the initial fetch request after authentication. Not only would you have control over which tabs are visible in the tab nav but the order in which they should appear. 
    Tasks: TasksSingleStackScreen,
    Add: InputSingleStackScreen
}

const MainNavigator = createBottomTabNavigator({ //The commented out routes are what are supposed to be rendered, but I'm trying an experiment where I'd like to render a custom navigator based on data that comes back from a server dictating the order and number of tabs.
    ...dynamicTabs
    // Tasks: TasksSingleStackScreen,
    // Add: InputSingleStackScreen
}, {
    defaultNavigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ focused, horizontal, tintColor }) => {

            let iconName
            let paddingTop

            const { routeName } = navigation.state

            if (routeName === 'Tasks') {
                iconName = focused ? 'clipboard-text-outline' : 'clipboard-outline'
                paddingTop = focused ? 2 : 3
            } else if (routeName === 'Add') {
                iconName = focused ? 'pencil-circle' : 'pencil-circle-outline'
                paddingTop = 2
            }
        return <MaterialCommunityIcons style={{paddingTop: paddingTop}} name={iconName} size={32} color={tintColor} />
      },
    }),

    tabBarOptions: {
        activeTintColor:'rgb(255,255,255)',
        inactiveTintColor: 'rgb(192,192,192)',
        activeBackgroundColor: 'rgb(200,200,255)',
        inactiveBackgroundColor: 'rgb(255,200,200)'
    },
})

export default createAppContainer(MainNavigator)
