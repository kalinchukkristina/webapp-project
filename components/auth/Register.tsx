import Auth from '../../interfaces/auth';
import { useState } from 'react';
import AuthModel from '../../models/auth';
import AuthFields from './AuthFields';
import { Alert } from 'react-native';

export default function Register({ navigation }) {
    const [auth, setAuth] = useState<Partial<Auth>>({});

    function validatePassword(text:string) {
        const pattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!\.-]).{4,}$/
        if (!text.match(pattern)) {
            Alert.alert("Password doesn't match the pattern", "Password should have at least 4 charecters, contain lower-case and upper-case letters, at least one special character.", [
                {text: "Got it"}
            ]);
        } else {
            return true;
        }
    };

    function validateEmail(email:string) {
        const pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        if (!email.match(pattern)) {
            Alert.alert("Email doesn't match the pattern", "Email should be of type \"example@example.se\" ", [
                {text: "Got it"}
            ]);
        } else {
            return true;
        }
    }
    async function doRegister() {
        if (auth.email && auth.password) {
            if (validateEmail(auth.email) && validatePassword(auth.password)) {
                const result = await AuthModel.register(auth.email, auth.password);
                navigation.navigate("Login");
            }
        } else {
            Alert.alert("Saknas", "E-post eller lösenord saknas", [
                {text: "Got it"}
            ]);
        }
    }

    return (
        <AuthFields
            auth={auth}
            setAuth={setAuth}
            submit={doRegister}
            title="Registrera"
            navigation={navigation}
        />
    );
};

