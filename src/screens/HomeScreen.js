import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const HomeScreen = () => {
  // Simulated battery status and hybrid metrics data
  const batteryStatus = '85%'; // Example battery status
  const hybridMetrics = {
    fuel: '30%',
    energy: '70%',
    range: '100 miles'
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Hybrid Care Dashboard</Text>
      <View style={styles.metricContainer}>
        <Text style={styles.metric}>Battery Status: {batteryStatus}</Text>
        <Text style={styles.metric}>Fuel Level: {hybridMetrics.fuel}</Text>
        <Text style={styles.metric}>Energy Level: {hybridMetrics.energy}</Text>
        <Text style={styles.metric}>Estimated Range: {hybridMetrics.range}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  metricContainer: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 10,
    elevation: 3,
  },
  metric: {
    fontSize: 18,
    marginVertical: 5,
  }
});

export default HomeScreen;