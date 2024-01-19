import React, { FunctionComponent, useEffect, useState } from "react";
import {APIProvider, Map, Marker, AdvancedMarker, Pin, useMap } from '@vis.gl/react-google-maps';
import { googleApiKey } from "../global"; // need to change this to be environment based

import RowRenderer from "./rowRenderer";
import Itenerary from "./itenerary";

import { TripPageOptions, IteneraryOptions } from "../interfaces/tripPage";
import { route } from "../services/google";

type TripPageProps = {
    options: TripPageOptions;
}

type MarkerColor = {
    background?: string,
    glyphColor?: string,
    borderColor?: string,
}

const Trip: FunctionComponent<any> = ({ options }) => {
    const map = useMap();

    useEffect(():void => {
        if (!map) return;

        const ds = new google.maps.DirectionsService();
        const dd = new google.maps.DirectionsRenderer();

        dd.setMap(map);

        options.setDirectionService(ds);
        options.setDirectionRenderer(dd);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[map])

    return null;
}

const TripPage: FunctionComponent<TripPageProps> = ({ options }) => {
    const [directionService, setDirectionService] = useState<any>(null);
    const [directionRenderer, setDirectionRenderer] = useState<any>(null);

    const { entertainments, restaurants, waypoints, setWaypoints, hotel } = options;

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
        route({
            waypoints,
            directionService,
            directionRenderer,
            hotel
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [waypoints])

    if (!options.hotel) return null;

    const { longitude, latitude } = options.hotel.coordinates;

    const long = longitude || 10.00678;
    const lat = latitude || 53.54992;

    const iteneraryOptions:IteneraryOptions = {
        waypoints: waypoints,
        setWaypoints: setWaypoints
    }

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
                                {/* {markerRenderer(restaurants.businesses, { background: "#ADD8E6", glyphColor: "#05445E"})}
                                {markerRenderer(entertainments.businesses, { background: "#FADCD9", glyphColor: "#F79489"})} */}
                            </Map>
                            <Trip options={{ setDirectionRenderer, setDirectionService } }></Trip>
                        </APIProvider>
                    </div>
                    <Itenerary options={iteneraryOptions}/>
                </div>
                <div className="col-6 card py-3">
                    <div className="card">
                        <h2>Restaurants</h2>
                        <RowRenderer entries={restaurants.businesses} waypoints={waypoints} setWaypoints={setWaypoints}/>
                    </div>
                    <div className="card">
                        <h2>Entertainment</h2>
                        <RowRenderer entries={entertainments.businesses} waypoints={waypoints} setWaypoints={setWaypoints}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TripPage;