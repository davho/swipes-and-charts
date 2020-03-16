//Note: The only way to dynamically load a different tab navigator based on the 3 account types (Admin, Client and Public) is to have 3 different AppNav files that can be chosen in AppNavContainer based on the redux state of accountType

import React from 'react'
import { Platform, Text } from 'react-native'
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs' //https://reactnavigation.org/docs/en/bottom-tab-navigator.html

import { useSelector } from 'react-redux'

import { MaterialCommunityIcons, MaterialIcons, AntDesign, FontAwesome } from 'react-native-vector-icons'

import { TasksScreen, InputScreen, AuthScreen, ChartsScreen, DummyAccountTypeScreen, NewsScreen, ContactsScreen } from '../screens'


const defaultStackNavigatorOptions = {
    headerStyle: {
        backgroundColor: Platform.OS === 'ios' ? 'rgb(255,255,255)' : 'rgb(7,26,64)',
    },
    headerTintColor: Platform.OS === 'ios' ? 'rgb(7,26,64)' : 'rgb(255,255,255)',
    headerTitleStyle: {
      fontFamily: 'helvetica-bold',
      fontSize: 23
    },
}

const defaultTabNavigatorOptions = ({ navigation }) => ({

    tabBarIcon: ({ focused, horizontal, tintColor }) => {

        let iconName
        let paddingTop
        let transform = []
        let IconLib
        let size

        const { routeName } = navigation.state

        if (routeName === 'Tasks') {
            IconLib = MaterialCommunityIcons
            iconName = focused ? 'clipboard-text-outline' : 'clipboard-outline'
            paddingTop = focused ? 2 : 3
            size = 32
        } else if (routeName === 'Add') {
            IconLib = MaterialCommunityIcons
            iconName = focused ? 'pencil-circle' : 'pencil-circle-outline'
            paddingTop = 2
            size = 32
        } else if (routeName === 'Charts') {
            IconLib = MaterialIcons
            iconName = focused ? 'pie-chart' : 'pie-chart-outlined'
            paddingTop = 1
            size = focused ? 29 : 32
        } else if (routeName === 'News') {
            IconLib = FontAwesome
            iconName = 'newspaper-o'
            paddingTop = 2
            size = 32
        } else if (routeName === 'Contacts') {
            IconLib = AntDesign
            iconName = 'contacts'
            transform = [{rotateY: '180deg'}]
            paddingTop = 2
            size = 32
        } else {
            IconLib = MaterialCommunityIcons
            iconName = focused ? 'database-check' : 'database'
            paddingTop = 2
            size = 32
        }
        return <IconLib style={{paddingTop: paddingTop, transform: transform}} name={iconName} size={size} color={tintColor} />
    },

    tabBarLabel: ({ focused, horizontal, tintColor }) => {

        const { routeName } = navigation.state

        //In the below case of returning a <Text> component with the tabBarName so that there's styling flexibility among other things, alignSelf: 'center' needs to be there only for Android's sake
        return <Text style={{alignSelf: 'center', fontWeight: focused ? 'bold' : null, fontStyle: !focused ? 'italic' : null, color: tintColor}}>{focused ? `|${routeName}|` : routeName}</Text>
    }

})




const tabBarOptions = {
    activeTintColor: Platform.OS === 'ios' ? 'rgb(7,26,64)' : 'rgb(7,26,64)',
    inactiveTintColor:  Platform.OS === 'ios' ? 'rgba(89,147,91,.8)' : 'rgb(255,255,255)',
    activeBackgroundColor: 'rgba(89,147,91,.8)',
    inactiveBackgroundColor: Platform.OS === 'ios' ? 'rgb(255,255,255)' : 'rgb(7,26,64)'
}





const TasksSingleStackNav = createStackNavigator({
    Tasks: TasksScreen
}, {
    defaultNavigationOptions: defaultStackNavigatorOptions
})

const InputSingleStackNav = createStackNavigator({
    'Add Task': InputScreen
}, {
    defaultNavigationOptions: defaultStackNavigatorOptions
})

const ChartsSingleStackNav = createStackNavigator({
    Charts: ChartsScreen
}, {
    defaultNavigationOptions: defaultStackNavigatorOptions
})

const NewsSingleStackNav = createStackNavigator({
    News: NewsScreen
}, {
    defaultNavigationOptions: defaultStackNavigatorOptions
})

const ContactsSingleStackNav = createStackNavigator({
    Contacts: ContactsScreen
}, {
    defaultNavigationOptions: defaultStackNavigatorOptions
})

const DummySingleStackNav = createStackNavigator({
    'Dummy Account Type Screen Example': DummyAccountTypeScreen
}, {
    defaultNavigationOptions: defaultStackNavigatorOptions
})

//The 3 different bottom tab navigators below correspond to the 3 account types. You will choose one account type in AuthScreen.js, which updates the account type redux is then used in AppNavContainer to choose which bottom tab navigator to render. This simulates data coming in from a server that specifies which account type you have based on your login credentials.

const BottomTabsNavAdmin = createBottomTabNavigator({
    'Admin (example)': DummySingleStackNav,
    'Another Admin (example)': DummySingleStackNav,
    'Yet another Admin (example)': DummySingleStackNav,
    Tasks: TasksSingleStackNav,
    Add: InputSingleStackNav,
    Charts: ChartsSingleStackNav

}, {
    defaultNavigationOptions: defaultTabNavigatorOptions,
    tabBarOptions: tabBarOptions
})

const BottomTabsNavClient = createBottomTabNavigator({
    'Client (example)': DummySingleStackNav,
    'Another Client (example)': DummySingleStackNav,
    Tasks: TasksSingleStackNav,
    Add: InputSingleStackNav,
    Charts: ChartsSingleStackNav

}, {
    defaultNavigationOptions: defaultTabNavigatorOptions,
    tabBarOptions: tabBarOptions
})

const BottomTabsNavNewsContacts = createBottomTabNavigator({
    Tasks: TasksSingleStackNav,
    Add: InputSingleStackNav,
    Charts: ChartsSingleStackNav,
    News: NewsSingleStackNav,
    Contacts: ContactsSingleStackNav,
}, {
    defaultNavigationOptions: defaultTabNavigatorOptions,
    tabBarOptions: tabBarOptions
})

const BottomTabsNavPublic = createBottomTabNavigator({
    'Public (example)': DummySingleStackNav,
    Tasks: TasksSingleStackNav,
    Add: InputSingleStackNav,
    Charts: ChartsSingleStackNav

}, {
    defaultNavigationOptions: defaultTabNavigatorOptions,
    tabBarOptions: tabBarOptions
})




const AppNav = createSwitchNavigator({ //After Auth, depending on what account type is chosen, the corresponding bottom tab navigator is loaded
    Auth: AuthScreen,
    AppAdmin: BottomTabsNavAdmin,
    AppClient: BottomTabsNavClient,
    AppNewsContacts: BottomTabsNavNewsContacts,
    AppPublic: BottomTabsNavPublic
})


export default createAppContainer(AppNav)
