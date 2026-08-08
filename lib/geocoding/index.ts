// Main geocoding service exports
export * from './types';
export * from './nominatim';

// Re-export main functions for convenience
export {
    searchLocation as geocodeLocation,
    getLocationDetails as reverseGeocode,
    formatLocationDisplay
} from './nominatim';