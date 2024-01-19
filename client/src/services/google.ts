import { DirectionServiceRequest } from "../interfaces/tripPage";
import { Waypoint } from "../interfaces/googleMaps";

type RouteOptions = {
    waypoints: Waypoint[],
    directionService: any,
    directionRenderer: any,
    hotel: any,
}

export const route = (options:RouteOptions):void => {
    const { waypoints, directionService, directionRenderer, hotel } = options;

    if (!hotel) return;

    const payload = waypoints.map(waypoint => {return {location: waypoint.location}});

    const request:DirectionServiceRequest = {
        origin: { lat: hotel.coordinates.latitude, lng: hotel.coordinates.longitude },
        destination: { lat: hotel.coordinates.latitude, lng: hotel.coordinates.longitude },
        waypoints: payload,
        travelMode: "DRIVING",
    }

    directionService.route(request, (response:any, status:any) => {
        if (status === "OK") {

            console.log(response)

            directionRenderer.setDirections(response);
        }
    })
}