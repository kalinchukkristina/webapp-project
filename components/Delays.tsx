import { createNativeStackNavigator } from '@react-navigation/native-stack';
import StationsList from './StationsList';
import StationDetails from './StationDetails';

const Stack = createNativeStackNavigator();

export default function Delays(props) {
    return (
        <Stack.Navigator initialRouteName="Stations">
            <Stack.Screen name="Station" component={StationsList} />
            <Stack.Screen name="Details">
                {(screenProps)=> <StationDetails {...screenProps} />}
            </Stack.Screen>
        </Stack.Navigator>
    );
}