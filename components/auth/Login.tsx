
import Auth from '../../interfaces/auth';
import React, { useState } from 'react';
import AuthModel from '../../models/auth';
import AuthFields from './AuthFields';
import { Alert } from 'react-native';

export default function Login({ navigation, setIsLoggedIn }) {
    const [auth, setAuth] = useState<Partial<Auth>>({});

    async function doLogin() {
        if (auth.email && auth.password) {
            const result = await AuthModel.login(auth.email, auth.password);
            if (result.type === "success") {
                setIsLoggedIn(true);
            } else {
                Alert.alert("Fel", "E-post eller lösenord är fel", [
                    {text: "Got it"}
                ]);
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