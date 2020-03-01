import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import  { NavigationActions } from 'react-navigation'

import AppNav from './AppNav'

const AppNavContainer = props => {

    const navRef = useRef()

    const accountType = useSelector(state => state.loginReducer.accountType)

    useEffect(() => {
        if (accountType !== null) { //If accountType is not null (i.e. it has been set to something in redux)
            if (accountType === 'admin') { //If it's 'admin', go to the AppAdmin stack in the switch navigator
                navRef.current.dispatch(NavigationActions.navigate({routeName: 'AppAdmin'}))
            } else if (accountType === 'client') { //If it's 'client', go to the AppClient stack in the switch navigator
                navRef.current.dispatch(NavigationActions.navigate({routeName: 'AppClient'}))
            } else { //If it's anything else, go to the AppPublic stack in the switch navigator
                navRef.current.dispatch(NavigationActions.navigate({routeName: 'AppPublic'}))
            }
        }

    }, [accountType])

    return <AppNav ref={navRef}/>
}

export default AppNavContainer
