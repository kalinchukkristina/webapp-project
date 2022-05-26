import { View, Text, TextInput, Button } from "react-native";
import { showMessage } from "react-native-flash-message";
import { Typography, Forms, Base } from '../../styles';
import {TouchableWithoutFeedback, Keyboard} from 'react-native'

export default function AuthFields({ auth, setAuth, title, submit, navigation}) {
    function validatePassword(text:string) {
        const pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!\.-]).{4,}$/
        if (!text.match(pattern)) {
            showMessage({
                message: "Password doesn't match the pattern",
                description: "Password should have at least 4 charecters, contain lower-case and upper-case letters, at least one special character.",
                type: "warning"
            });
        }
    };

    function validateEmail(email:string) {
        const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        if (!email.match(pattern)) {
            showMessage({
                message: "Email doesn'r match the pattern",
                description: "Email should be of type \"example@example.se\" ",
                type: "warning"
            });
        }
    }


    return (
        <TouchableWithoutFeedback onPress={()=> {
            Keyboard.dismiss();
        }}>
            <View style={Base.base2}>
                <Text style={Typography.label}>E-post</Text>
                    <TextInput
                        style={Forms.input}
                        onChangeText={(content: string) => {
                            validateEmail(content),
                            setAuth({ ...auth, email: content })
                        }}
                        value={auth?.email}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        autoCorrect={false}
                        testID="email-field"
                    />
                <Text style={Typography.label}>Lösenord</Text>
                <TextInput
                    style={Forms.input}
                    onChangeText={(content: string) => {
                        validatePassword(content),
                        setAuth({ ...auth, password: content })
                    }}
                    value={auth?.password}
                    secureTextEntry={true}
                    autoCapitalize="none"
                    autoCorrect={false}
                    testID="password-field"
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