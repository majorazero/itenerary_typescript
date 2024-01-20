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
    days: Waypoint[][],
    currentDay: number,
    setDays: Dispatch<SetStateAction<Waypoint[][]>>,
    setCurrentDay: Dispatch<SetStateAction<number>>,
    setPreventReroute: Dispatch<SetStateAction<boolean>>,
    setWaypoints: Dispatch<SetStateAction<Waypoint[]>>,
}

export interface IteneraryOptions {
    waypoints: Waypoint[],
    hotel: any,
    directionService: any,
    directionRenderer: any,
    days: Waypoint[][],
    currentDay: number,
    setWaypoints: Dispatch<SetStateAction<Waypoint[]>>,
    setPreventReroute: Dispatch<SetStateAction<boolean>>,
    setDays: Dispatch<SetStateAction<Waypoint[][]>>,
    setCurrentDay: Dispatch<SetStateAction<number>>,
}

export interface DirectionServiceRequest {
    waypoints: any[],
    travelMode: any,
    destination: Location,
    origin: Location,
    optimizeWaypoints?: boolean,
}