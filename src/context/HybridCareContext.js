import React, { createContext, useContext } from 'react';
import { OBDService } from '../services/OBDService';
import { GPSService } from '../services/GPSService';
import { SensorService } from '../services/SensorService';

const HybridCareContext = createContext();

export const HybridCareProvider = ({ children }) => {
    const obdService = new OBDService();
    const gpsService = new GPSService();
    const sensorService = new SensorService();

    return (
        <HybridCareContext.Provider value={{ obdService, gpsService, sensorService }}>
            {children}
        </HybridCareContext.Provider>
    );
};

export const useHybridCare = () => {
    return useContext(HybridCareContext);
};