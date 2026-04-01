import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';

const LoginScreen = ({ setIsLoggedIn }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }

        setLoading(true);
        try {
            await new Promise(resolve => setTimeout(resolve, 1500)); // Simulating network request
            if (email && password.length >= 6) {
                Alert.alert('Success', 'Logged in successfully!');
                setIsLoggedIn(true);
            } else {
                Alert.alert('Error', 'Invalid credentials');
            }
        } catch (error) {
            Alert.alert('Error', 'Login failed: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>🚗 HybridCare</Text>
            <Text style={styles.subtitle}>Vehicle Care Management</Text>
            <View style={styles.formContainer}>
                <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} keyboardType="email-address" editable={!loading} />
                <TextInput style={styles.input} placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry editable={!loading} />
                <Button title={loading ? "Logging in..." : "Login"} onPress={handleLogin} disabled={loading} color="#007AFF" />
                <Text style={styles.demoText}>Demo: Use any email and password (min 6 chars)</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
        color: '#1a1a1a',
    },
    subtitle: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 30,
        color: '#666666',
    },
    formContainer: {
        backgroundColor: '#ffffff',
        borderRadius: 12,
        padding: 20,
        elevation: 3,
    },
    input: {
        height: 45,
        borderColor: '#cccccc',
        borderWidth: 1,
        marginBottom: 15,
        paddingLeft: 15,
        borderRadius: 8,
        fontSize: 16,
    },
    demoText: {
        fontSize: 12,
        color: '#999999',
        marginTop: 15,
        textAlign: 'center',
        fontStyle: 'italic',
    },
});

export default LoginScreen;