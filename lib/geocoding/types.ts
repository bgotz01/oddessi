export interface GeocodingResult {
    name: string;
    displayName: string;
    latitude: number;
    longitude: number;
    country: string;
    state?: string;
    city?: string;
    timezone?: string;
}

export interface NominatimResult {
    place_id: number;
    licence: string;
    osm_type: string;
    osm_id: number;
    boundingbox: string[];
    lat: string;
    lon: string;
    display_name: string;
    class: string;
    type: string;
    importance: number;
    icon?: string;
    address: {
        city?: string;
        town?: string;
        village?: string;
        state?: string;
        country?: string;
        country_code?: string;
        postcode?: string;
    };
}

export interface GeocodingError {
    message: string;
    code: 'NETWORK_ERROR' | 'NO_RESULTS' | 'RATE_LIMITED' | 'INVALID_INPUT';
}