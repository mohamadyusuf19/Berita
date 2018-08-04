import Home from './Home';
import Detail from './Detail';
import { createStackNavigator } from 'react-navigation';

export default createStackNavigator({
    Home: {
        screen: Home,
        navigationOptions: {
            title: 'NEWS'
        }
    },
    Detail: {
        screen: Detail,
        navigationOptions: {
            header: null
        }
    }
})
