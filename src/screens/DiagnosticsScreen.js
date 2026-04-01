import React, { useState, useEffect } from 'react';
import { View, Text, Button, ScrollView } from 'react-native';

const DiagnosticsScreen = () => {
    const [dtcCodes, setDtcCodes] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');

    // Sample OBD-II DTC codes database
    const dtcDatabase = {
        'P0010': 'Camshaft Position Actuator Circuit (Bank 1)',
        'P0011': 'Camshaft Position Timing Over Advanced (Bank 1)',
        'P0171': 'System Too Lean (Bank 1)',
        // Add more codes as necessary
    };

    const readDTC = () => {
        // Simulated function to read DTC codes from OBD-II interface
        return ['P0010', 'P0171']; // Example codes
    };

    const clearDTC = () => {
        // Simulated function to clear DTC codes
        setDtcCodes([]);
        setErrorMessage('DTC codes cleared.');
    };

    useEffect(() => {
        const codes = readDTC(); // Read DTC codes
        setDtcCodes(codes);
    }, []);

    return (
        <ScrollView>
            <View>
                <Text style={{ fontSize: 24 }}>Diagnostics Screen</Text>
                {errorMessage ? <Text>{errorMessage}</Text> : null}
                <Text style={{ fontSize: 18 }}>DTC Codes:</Text>
                {dtcCodes.length === 0 ? (
                    <Text>No DTC Codes found.</Text>
                ) : (
                    dtcCodes.map((code) => (
                        <Text key={code}>
                            {code}: {dtcDatabase[code] || 'Unknown Code'}
                        </Text>
                    ))
                )}
                <Button title="Clear DTC Codes" onPress={clearDTC} />
            </View>
        </ScrollView>
    );
};

export default DiagnosticsScreen;
