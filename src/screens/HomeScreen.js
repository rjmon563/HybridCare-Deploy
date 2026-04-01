import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useHybridCare } from '../context/HybridCareContext';

const HomeScreen = () => {
    const { obdService, gpsService, sensorService } = useHybridCare();

    const [obdData, setObdData] = useState({
        batteryStatus: '--',
        engineRPM: '--',
        speed: '--',
        fuelLevel: '--',
        engineTemp: '--'
    });

    const [gpsData, setGpsData] = useState({
        latitude: '--',
        longitude: '--',
        altitude: '--',
        accuracy: '--'
    });

    const [sensorData, setSensorData] = useState({
        accelerometerX: '0.0',
        accelerometerY: '0.0',
        accelerometerZ: '0.0',
        gyroscopeAlpha: '0.0',
        gyroscopeBeta: '0.0',
        gyroscopeGamma: '0.0'
    });

    const [isConnected, setIsConnected] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        startServices();
        return () => {
            stopServices();
        };
    }, []);

    const startServices = async () => {
        setLoading(true);
        try {
            await obdService.connect();
            setIsConnected(true);
            gpsService.startTracking();
            sensorService.startMonitoring();
            const interval = setInterval(() => {
                updateOBDData();
                updateGPSData();
                updateSensorData();
            }, 2000);
            setLoading(false);
            return () => clearInterval(interval);
        } catch (error) {
            console.error('Error starting services:', error);
            setLoading(false);
        }
    };

    const stopServices = () => {
        sensorService.stopMonitoring();
    };

    const updateOBDData = () => {
        setObdData({
            batteryStatus: (Math.random() * 30 + 70).toFixed(1) + '%',
            engineRPM: Math.floor(Math.random() * 7000).toString(),
            speed: Math.floor(Math.random() * 150).toString() + ' mph',
            fuelLevel: (Math.random() * 50 + 30).toFixed(1) + '%',
            engineTemp: Math.floor(Math.random() * 40 + 80).toString() + '°C'
        });
    };

    const updateGPSData = () => {
        setGpsData({
            latitude: (Math.random() * 0.01 + 40.7128).toFixed(4),
            longitude: (Math.random() * 0.01 - 74.0060).toFixed(4),
            altitude: Math.floor(Math.random() * 100).toString() + ' m',
            accuracy: Math.floor(Math.random() * 10 + 5).toString() + ' m'
        });
    };

    const updateSensorData = () => {
        setSensorData({
            accelerometerX: (Math.random() * 2 - 1).toFixed(2),
            accelerometerY: (Math.random() * 2 - 1).toFixed(2),
            accelerometerZ: (Math.random() * 2 - 1).toFixed(2),
            gyroscopeAlpha: (Math.random() * 360).toFixed(1),
            gyroscopeBeta: (Math.random() * 360).toFixed(1),
            gyroscopeGamma: (Math.random() * 360).toFixed(1)
        });
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.title}>🚗 HybridCare Dashboard</Text>
                <View style={[styles.statusBadge, isConnected ? styles.connected : styles.disconnected]}>
                    <Text style={styles.statusText}>{isConnected ? '● Connected' : '● Disconnected'}</Text>
                </View>
            </View>
            {loading && <ActivityIndicator size="large" color="#007AFF" style={{ marginVertical: 20 }} />}
            <View style={styles.section}> 
                <Text style={styles.sectionTitle}>⚙️ Vehicle Diagnostics (OBD2)</Text>
                <View style={styles.card}> 
                    <View style={styles.dataRow}> 
                        <Text style={styles.label}>Battery Status:</Text> 
                        <Text style={styles.value}>{obdData.batteryStatus}</Text> 
                    </View>
                    <View style={styles.divider} />
                    <View style={styles.dataRow}> 
                        <Text style={styles.label}>Engine RPM:</Text> 
                        <Text style={styles.value}>{obdData.engineRPM}</Text> 
                    </View>
                    <View style={styles.divider} />
                    <View style={styles.dataRow}> 
                        <Text style={styles.label}>Speed:</Text> 
                        <Text style={styles.value}>{obdData.speed}</Text> 
                    </View>
                    <View style={styles.divider} />
                    <View style={styles.dataRow}> 
                        <Text style={styles.label}>Fuel Level:</Text> 
                        <Text style={styles.value}>{obdData.fuelLevel}</Text> 
                    </View>
                    <View style={styles.divider} />
                    <View style={styles.dataRow}> 
                        <Text style={styles.label}>Engine Temp:</Text> 
                        <Text style={styles.value}>{obdData.engineTemp}</Text> 
                    </View>
                </View>
            </View>
            <View style={styles.section}> 
                <Text style={styles.sectionTitle}>📍 GPS Location</Text>
                <View style={styles.card}> 
                    <View style={styles.dataRow}> 
                        <Text style={styles.label}>Latitude:</Text> 
                        <Text style={styles.value}>{gpsData.latitude}</Text> 
                    </View>
                    <View style={styles.divider} />
                    <View style={styles.dataRow}> 
                        <Text style={styles.label}>Longitude:</Text> 
                        <Text style={styles.value}>{gpsData.longitude}</Text> 
                    </View>
                    <View style={styles.divider} />
                    <View style={styles.dataRow}> 
                        <Text style={styles.label}>Altitude:</Text> 
                        <Text style={styles.value}>{gpsData.altitude}</Text> 
                    </View>
                    <View style={styles.divider} />
                    <View style={styles.dataRow}> 
                        <Text style={styles.label}>Accuracy:</Text> 
                        <Text style={styles.value}>{gpsData.accuracy}</Text> 
                    </View>
                </View>
            </View>
            <View style={styles.section}> 
                <Text style={styles.sectionTitle}>📡 Sensor Data</Text>
                <View style={styles.card}> 
                    <Text style={styles.subTitle}>Accelerometer (m/s²)</Text>
                    <View style={styles.dataRow}> 
                        <Text style={styles.label}>X:</Text> 
                        <Text style={styles.value}>{sensorData.accelerometerX}</Text> 
                    </View>
                    <View style={styles.dataRow}> 
                        <Text style={styles.label}>Y:</Text> 
                        <Text style={styles.value}>{sensorData.accelerometerY}</Text> 
                    </View>
                    <View style={styles.dataRow}> 
                        <Text style={styles.label}>Z:</Text> 
                        <Text style={styles.value}>{sensorData.accelerometerZ}</Text> 
                    </View>
                    <View style={[styles.divider, { marginVertical: 10 }]} />
                    <Text style={styles.subTitle}>Gyroscope (°)</Text>
                    <View style={styles.dataRow}> 
                        <Text style={styles.label}>Alpha:</Text> 
                        <Text style={styles.value}>{sensorData.gyroscopeAlpha}</Text> 
                    </View>
                    <View style={styles.dataRow}> 
                        <Text style={styles.label}>Beta:</Text> 
                        <Text style={styles.value}>{sensorData.gyroscopeBeta}</Text> 
                    </View>
                    <View style={styles.dataRow}> 
                        <Text style={styles.label}>Gamma:</Text> 
                        <Text style={styles.value}>{sensorData.gyroscopeGamma}</Text> 
                    </View>
                </View>
            </View>
            <View style={styles.buttonContainer}> 
                <TouchableOpacity style={[styles.button, styles.buttonPrimary]} onPress={startServices}> 
                    <Text style={styles.buttonText}>🔄 Refresh Data</Text> 
                </TouchableOpacity> 
                <TouchableOpacity style={[styles.button, styles.buttonSecondary]} onPress={stopServices}> 
                    <Text style={styles.buttonText}>⏹️ Stop Services</Text> 
                </TouchableOpacity> 
            </View>
            <View style={{ height: 30 }} />
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f5f5f5', padding: 15, },
    headerContainer: { marginBottom: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', },
    title: { fontSize: 28, fontWeight: 'bold', color: '#1a1a1a', },
    statusBadge: { paddingHorizontal: 12, paddingVertical: 6, borderRadius: 20, },
    connected: { backgroundColor: '#d4edda', },
    disconnected: { backgroundColor: '#f8d7da', },
    statusText: { fontSize: 12, fontWeight: '600', color: '#1a1a1a', },
    section: { marginBottom: 20, },
    sectionTitle: { fontSize: 18, fontWeight: '700', marginBottom: 10, color: '#1a1a1a', },
    card: { backgroundColor: '#ffffff', borderRadius: 12, padding: 15, elevation: 3, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, },
    dataRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 8, },
    label: { fontSize: 14, color: '#666666', fontWeight: '600', flex: 1, },
    value: { fontSize: 14, color: '#007AFF', fontWeight: 'bold', flex: 1, textAlign: 'right', },
    divider: { height: 1, backgroundColor: '#e0e0e0', marginVertical: 5, },
    subTitle: { fontSize: 12, fontWeight: '700', color: '#555555', marginTop: 10, marginBottom: 8, },
    buttonContainer: { flexDirection: 'row', gap: 10, marginBottom: 20, },
    button: { flex: 1, paddingVertical: 12, borderRadius: 10, justifyContent: 'center', alignItems: 'center', },
    buttonPrimary: { backgroundColor: '#007AFF', },
    buttonSecondary: { backgroundColor: '#FF3B30', },
    buttonText: { color: '#ffffff', fontSize: 14, fontWeight: '600', },
});

export default HomeScreen;