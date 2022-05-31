import Auth from '../../interfaces/auth';
import React, { useState } from 'react';
import AuthModel from '../../models/auth';
import AuthFields from './AuthFields';
import { Alert } from 'react-native';

export default function Login({ navigation, setIsLoggedIn }) {
    const [auth, setAuth] = useState<Partial<Auth>>({});

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

    async function doLogin() {
        if (auth.email && auth.password) {
            if (validateEmail(auth.email)) {
                const result = await AuthModel.login(auth.email, auth.password);
                if (result.type === "success") {
                    setIsLoggedIn(true);
                } else {
                    Alert.alert("Fel", "E-post eller lösenord är fel", [
                        {text: "Got it"}
                    ]);
                }
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
                submit={doLogin}
                title="Logga in"
                navigation={navigation}
            />
    )
}