// OBDService.js

class OBDService {
    constructor() {
        this.bluetoothDevice = null;
        this.elm327 = null;
    }

    async connect() {
        try {
            // Request Bluetooth device
            this.bluetoothDevice = await navigator.bluetooth.requestDevice({
                filters: [{ services: ['232b'] }]
            });

            const server = await this.bluetoothDevice.gatt.connect();
            const service = await server.getPrimaryService('232b');
            const characteristic = await service.getCharacteristic('0000ffe1-0000-1000-8000-00805f9b34fb');

            this.elm327 = characteristic;
            console.log('Connected to ELM327 device');
        } catch (error) {
            console.error('Connection failed:', error);
        }
    }

    async readData() {
        if (!this.elm327) {
            console.warn('Please connect to the ELM327 device first.');
            return;
        }

        // Example command to read vehicle data
        const command = new Uint8Array([0x01, 0x00]); // Replace with actual command
        await this.elm327.writeValue(command);
        const response = await this.elm327.readValue();
        console.log('Vehicle data:', response);
    }
}

export default OBDService;