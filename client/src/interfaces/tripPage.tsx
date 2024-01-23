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
    tripId: string|undefined,
    setDays: Dispatch<SetStateAction<Waypoint[][]>>,
    setCurrentDay: Dispatch<SetStateAction<number>>,
    setPreventReroute: Dispatch<SetStateAction<boolean>>,
    setWaypoints: Dispatch<SetStateAction<Waypoint[]>>,
    handleSave: () => void,
}

export interface IteneraryOptions {
    waypoints: Waypoint[],
    hotel: any,
    directionService: any,
    directionRenderer: any,
    days: Waypoint[][],
    currentDay: number,
    tripId: string|undefined,
    setWaypoints: Dispatch<SetStateAction<Waypoint[]>>,
    setPreventReroute: Dispatch<SetStateAction<boolean>>,
    setCurrentDay: Dispatch<SetStateAction<number>>,
    handleSave: () => void,
}

export interface DirectionServiceRequest {
    waypoints: any[],
    travelMode: any,
    destination: Location,
    origin: Location,
    optimizeWaypoints?: boolean,
}