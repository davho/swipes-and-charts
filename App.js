//DOCS: https://software-mansion.github.io/react-native-gesture-handler/docs/getting-started.html
//DO: expo install react-native-gesture-handler
//NOTE: https://www.youtube.com/watch?v=JxN9W9PRlUQ  and   https://blog.jscrambler.com/creating-swipeable-gestures-with-react-native-gesture-handler/  but need to import { Swipeable } from 'react-native-gesture-handler' not expo

import React, { useState } from 'react'
import { StyleSheet } from 'react-native'

import Tasks from './src/screens/Tasks'

const App = () => {

    return (
            <Tasks/>
    )
}

export default App
