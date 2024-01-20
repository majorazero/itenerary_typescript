import { Dispatch, SetStateAction } from "react";
import { Waypoint } from "./googleMaps";

type Location = {
    lat: number,
    lng: number,
}

export interface TripPageOptions {
    hotel: any,
    restaurants: any,
    entertainments: any,
    waypoints: Waypoint[],
    preventReroute: boolean,
    setPreventReroute: Dispatch<SetStateAction<boolean>>,
    setWaypoints: Dispatch<SetStateAction<Waypoint[]>>,
}

export interface IteneraryOptions {
    waypoints: Waypoint[],
    setWaypoints: Dispatch<SetStateAction<Waypoint[]>>,
    hotel: any,
    directionService: any,
    directionRenderer: any,
    setPreventReroute: Dispatch<SetStateAction<boolean>>,
}

export interface DirectionServiceRequest {
    waypoints: any[],
    travelMode: any,
    destination: Location,
    origin: Location,
    optimizeWaypoints?: boolean,
}