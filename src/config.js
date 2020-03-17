import { Dimensions } from 'react-native'

const config = {
    screenWidth: Dimensions.get('window').width,
    screenHeight: Dimensions.get('window').height,
    translucentCard: {
        flex: 1,
        backgroundColor: 'rgba(255,255,255,.1)',
        marginVertical: 7,
        marginHorizontal: 14,
        borderRadius: 10,
        padding: 12,
        //elevation: 5, //Elevation is specific to Android and not having the desired effect
        shadowColor: 'rgb(7,26,64)',
        shadowOpacity: .5,
        shadowOffset: {width: 0, height: 0}, //Must specify the shadowOffset as {width: 0, height: 0} because, for some reason, it defaults to {width: 0, height: -3}
        shadowRadius: 3
    },
}

export default config
