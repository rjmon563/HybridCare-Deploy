class GPSService {
    constructor() {
        this.currentLocation = null;
        this.route = [];
    }

    startTracking() {
        if (navigator.geolocation) {
            navigator.geolocation.watchPosition(this.updateLocation.bind(this), this.handleError.bind(this));
        } else {
            console.error('Geolocation is not supported by this browser.');
        }
    }

    updateLocation(position) {
        this.currentLocation = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            timestamp: position.timestamp
        };
        this.route.push(this.currentLocation);
        console.log('Current Location:', this.currentLocation);
    }

    handleError(error) {
        console.error('Error occurred while retrieving location:', error);
    }

    getRoute() {
        return this.route;
    }
}

// Usage example:
const gpsService = new GPSService();
gpsService.startTracking();