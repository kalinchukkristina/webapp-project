import { Text, ImageBackground, View } from 'react-native';
import { Typography, Base } from './../styles';

export default function Welcome() {
    return (
        <ImageBackground style={Base.background} source={{ uri: "https://images.unsplash.com/photo-1540280558425-bc7a2dcc230a?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774"}}>
            <View style={Base.header}>
                <Text style={Typography.header1}>Tågtrafiken Sverige</Text>
                <Text style={Typography.header3}>Kolla upp tågförseningar dygnet runt</Text>
            </View>
        </ImageBackground>
    );
}