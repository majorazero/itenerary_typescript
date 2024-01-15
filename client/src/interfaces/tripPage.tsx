type Location = {
    lat: number,
    lng: number,
}

export interface TripPageOptions {
    hotel: any,
    restaurants: any,
    entertainments: any
}

export interface DirectionServiceRequest {
    waypoints: any[],
    travelMode: any,
    destination: Location,
    origin: Location,
}