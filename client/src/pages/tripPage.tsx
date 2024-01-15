import React, { FunctionComponent, useEffect } from "react";
import {APIProvider, Map, Marker, AdvancedMarker, Pin, useDirectionsService} from '@vis.gl/react-google-maps';
import { googleApiKey } from "../global"; // need to change this to be environment based

import RowRenderer from "./rowRenderer";

import { TripPageOptions, DirectionServiceRequest } from "../interfaces/tripPage";

type TripPageProps = {
    options: TripPageOptions;
}

const TripPage: FunctionComponent<TripPageProps> = ({ options }) => {
    const { 
        directionsService,
        directionsRenderer
    } = useDirectionsService({
        mapId: "target-map",
        renderOnMap: true
    });

    console.log(directionsService,"????")

    const { entertainments, restaurants } = options;

    type MarkerColor = {
        background?: string,
        glyphColor?: string,
        borderColor?: string,
    }

    const markerRenderer = (locations: any[] = [], color?: MarkerColor) => {
        return locations.map((location) => {
            const { longitude, latitude } = location.coordinates;
            return (
                <AdvancedMarker key={location.name} title={location.name} position={{lat: latitude, lng: longitude }}>
                    <Pin
                        background={color?.background}
                        glyphColor={color?.glyphColor}
                        borderColor={color?.borderColor}>
                    </Pin>
                </AdvancedMarker>
            )
        });
    }

    useEffect(():void => {
        const { hotel, entertainments } = options;
        if (hotel && entertainments) {
            const request:DirectionServiceRequest = {
                origin: { lat: hotel.coordinates.latitude, lng: hotel.coordinates.longitude },
                destination: { lat: hotel.coordinates.latitude, lng: hotel.coordinates.longitude },
                waypoints: [],
                travelMode: "DRIVING",
            }
            entertainments.businesses.forEach((place: any):void => {
                request.waypoints.push(
                    { 
                        lat: place.coordinates.latitude,
                        lng: place.coordinates.longitude 
                    }
                )
            })
            console.log(request, directionsService, "!!!")

            directionsService?.route(request, (response, status) => {
                console.log(response, status, "???")
                if (status === "OK") {
                    console.log(response)
                }
            })
        }
    }, [entertainments])

    if (!options.hotel) return null;

    const { longitude, latitude } = options.hotel.coordinates;

    const long = longitude || 10.00678;
    const lat = latitude || 53.54992;

    return (
        <div className="container my-5">
            <div className="row">
                <div className="col-6 card">
                    <div className="map p-3">
                        <APIProvider apiKey={googleApiKey}>
                            <Map 
                                mapId="target-map"
                                zoom={13}
                                center={{lat: lat, lng: long}}>
                                <Marker position={{lat: lat, lng: long}}></Marker>
                                {markerRenderer(restaurants.businesses, { background: "#ADD8E6", glyphColor: "#05445E"})}
                                {markerRenderer(entertainments.businesses, { background: "#FADCD9", glyphColor: "#F79489"})}
                            </Map>
                        </APIProvider>
                    </div>
                </div>
                <div className="col-6 card py-3">
                    <div className="card">
                        <h2>Restaurants</h2>
                        <RowRenderer entries={restaurants.businesses} />
                    </div>
                    <div className="card">
                        <h2>Entertainment</h2>
                        <RowRenderer entries={entertainments.businesses} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TripPage;