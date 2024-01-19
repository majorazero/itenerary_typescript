export interface Waypoint {
    location: GLocation,
    data: any,
}

type GLocation = {
    lat: number,
    lng: number
}