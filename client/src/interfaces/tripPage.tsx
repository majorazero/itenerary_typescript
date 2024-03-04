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
    tripLegs: any[],
    setTripLegs: Dispatch<SetStateAction<any[]>>,
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
    tripLegs: any[],
    setTripLegs: Dispatch<SetStateAction<any[]>>,
    setWaypoints: Dispatch<SetStateAction<Waypoint[]>>,
    setPreventReroute: Dispatch<SetStateAction<boolean>>,
    setCurrentDay: Dispatch<SetStateAction<number>>,
    handleSave: () => void,
}

export interface RowRendererOptions {
    title: string,
    waypoints: Waypoint[],
    entries: any[],
    setWaypoints: Dispatch<SetStateAction<Waypoint[]>>,
}

export interface DirectionServiceRequest {
    waypoints: any[],
    travelMode: any,
    destination: Location,
    origin: Location,
    optimizeWaypoints?: boolean,
}