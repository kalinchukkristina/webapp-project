import { View, Text, TextInput, Button } from "react-native";
import { Typography, Forms, Base } from '../../styles';
import {TouchableWithoutFeedback, Keyboard} from 'react-native'

export default function AuthFields({ auth, setAuth, title, submit, navigation}) {
    return (
        <TouchableWithoutFeedback onPress={()=> {
            Keyboard.dismiss();
        }}>
            <View style={Base.base2}>
                <Text style={Typography.label}>E-post</Text>
                    <TextInput
                        style={Forms.input}
                        onChangeText={(content: string) => {
                            setAuth({ ...auth, email: content })
                        }}
                        value={auth?.email}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        autoCorrect={false}
                    />
                <Text style={Typography.label}>Lösenord</Text>
                <TextInput
                    style={Forms.input}
                    onChangeText={(content: string) => {
                        setAuth({ ...auth, password: content })
                    }}
                    value={auth?.password}
                    secureTextEntry={true}
                    autoCapitalize="none"
                    autoCorrect={false}
                />
                <Button
                    title={title}
                    onPress={() => {
                        submit();
                    }}
                />
                {title === "Logga in" &&
                    <Button
                        title="Registrera istället"
                        onPress={() => {
                            navigation.navigate("Register");
                        }}
                    />
                }
            </View>
        </TouchableWithoutFeedback>
    );
};