import { DirectionServiceRequest } from "../interfaces/tripPage";
import { Waypoint } from "../interfaces/googleMaps";
import { Dispatch, SetStateAction } from "react";

type RouteOptions = {
    waypoints: Waypoint[],
    directionService: any,
    directionRenderer: any,
    hotel: any,
    setTripLegs: Dispatch<SetStateAction<any[]>>,
    optimizeWaypoints?: boolean,
    callback?: Function,
}

export const route = (options:RouteOptions):void => {
    const { 
        waypoints,
        directionService,
        directionRenderer,
        hotel,
        optimizeWaypoints,
        setTripLegs,
    } = options;

    if (!hotel) return;

    const payload = waypoints.map(waypoint => {return {location: waypoint.location}});

    const request:DirectionServiceRequest = {
        origin: { lat: hotel.coordinates.latitude, lng: hotel.coordinates.longitude },
        destination: { lat: hotel.coordinates.latitude, lng: hotel.coordinates.longitude },
        waypoints: payload,
        travelMode: "DRIVING",
        optimizeWaypoints: optimizeWaypoints || false,
    }

    directionService.route(request, (response:any, status:any) => {
        if (status === "OK") {
            setTripLegs(response.routes[0].legs)
            directionRenderer.setDirections(response);
            if (options.callback) {
                options.callback(response);
            }
        }
    })
}