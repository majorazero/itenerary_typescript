import React, { FunctionComponent } from "react";
import {APIProvider, Map, Marker, AdvancedMarker, Pin, useDirectionsService} from '@vis.gl/react-google-maps';
import { googleApiKey } from "../global"; // need to change this to be environment based

import RowRenderer from "./rowRenderer";

import { TripPageOptions } from "../interfaces/tripPage";

type TripPageProps = {
    options: TripPageOptions;
}

const TripPage: FunctionComponent<TripPageProps> = ({ options }) => {
    // const { 
    //     directionsService,
    //     directionsRenderer
    // } = useDirectionsService({
    //     // mapId: "target-map",
    //     renderOnMap: true
    // });
    if (!options.hotel) return null;

    const { entertainments, restaurants } = options;
    const { longitude, latitude } = options.hotel.coordinates;

    const long = longitude || 10.00678;
    const lat = latitude || 53.54992;

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

    return (
        <div className="container">
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