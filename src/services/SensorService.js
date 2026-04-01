// SensorService.js

class SensorService {
    constructor() {
        this.accelerometerData = null;
        this.gyroscopeData = null;
    }

    startMonitoring() {
        // Start monitoring accelerometer
        if ('Accelerometer' in window) {
            const accelerometer = new Accelerometer({ frequency: 60 });
            accelerometer.addEventListener('reading', this.handleAccelerometerData.bind(this));
            accelerometer.start();
        }

        // Start monitoring gyroscope
        if ('Gyroscope' in window) {
            const gyroscope = new Gyroscope({ frequency: 60 });
            gyroscope.addEventListener('reading', this.handleGyroscopeData.bind(this));
            gyroscope.start();
        }
    }

    handleAccelerometerData() {
        this.accelerometerData = {
            x: this.accelerometer.x,
            y: this.accelerometer.y,
            z: this.accelerometer.z,
        };
        console.log('Accelerometer data:', this.accelerometerData);
    }

    handleGyroscopeData() {
        this.gyroscopeData = {
            alpha: this.gyroscope.alpha,
            beta: this.gyroscope.beta,
            gamma: this.gyroscope.gamma,
        };
        console.log('Gyroscope data:', this.gyroscopeData);
    }

    stopMonitoring() {
        // Stop monitoring logic (if required)
    }
}

export default SensorService;
