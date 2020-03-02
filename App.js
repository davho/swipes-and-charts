//DOCS: Swipes -- https://software-mansion.github.io/react-native-gesture-handler/docs/getting-started.html
//DOCS: Charts -- https://www.instamobile.io/react-native-tutorials/react-native-charts  and very importantly  https://github.com/indiespirit/react-native-chart-kit-example   ( might also want to read https://medium.com/the-react-native-log/animated-charts-in-react-native-using-d3-and-art-21cd9ccf6c58 )
//DOCS: Tables -- https://www.npmjs.com/package/react-native-table-component

//DO: expo install react-native-gesture-handler
//NOTE: https://www.youtube.com/watch?v=JxN9W9PRlUQ  and   https://blog.jscrambler.com/creating-swipeable-gestures-with-react-native-gesture-handler/  but need to import { Swipeable } from 'react-native-gesture-handler' not expo

//DO: npm install --save redux react-redux

//DO: expo install react-navigation react-navigation-drawer react-navigation-tabs react-navigation-stack react-native-reanimated react-native-screens react-native-safe-area-context @react-native-community/masked-view

//DO: npm install --save react-native-chart-kit
//NOTE: for ChartsScreenExample.js you need react-native-scrollable-tab-view but it's just a view type that allows you to render many swipe-rightable screens within the same component. I don't use it in my ChartsScreen, which is my simplified functional component refactoring of ChartsScreenExample.

//DO: expo install react-native-svg

import React from 'react'

import { StatusBar } from 'react-native'

import { createAppContainer, createSwitchNavigator } from 'react-navigation'

import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'

import { enableScreens } from 'react-native-screens' //Method to call anywhere in App.js to make navigation more performant
enableScreens()

import tasksReducer from './src/redux/tasksReducer'
import loginReducer from './src/redux/loginReducer'

//import TasksScreen from './src/screens/TasksScreen'
import AppNavContainer from './src/navigation/AppNavContainer'

/* EXPLANATION OF WHAT'S GOING ON WITH REDUX:
1) import { createStore, combineReducers } from 'redux' and { Provider } from 'react-redux'
2) import your reducers so that you can combine them
3) create a const named rootReducer which calls combineReducers (from redux) and pass an object of your reducers to it with respective keynames of your choice
4) create a const named store which calls createStore (from redux)
5) wrap your App's JSX in a Provider (from react-redux) and pass the const named store to it as the store property. Now any component in your app which imports { useSelector } from 'react-redux' has access to your redux store!
*/

const rootReducer = combineReducers({
    tasksReducer: tasksReducer,
    loginReducer: loginReducer
})

const store = createStore(rootReducer)





const App = () => {

    return (
        <Provider store={store}>
            <StatusBar barStyle='dark-content'/>
            <AppNavContainer/>
        </Provider>
    )
}

export default App
