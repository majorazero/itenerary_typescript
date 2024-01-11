import React, { FunctionComponent } from "react";
import {APIProvider, Map, Marker} from '@vis.gl/react-google-maps';
import { googleApiKey } from "../global"; // need to change this to be environment based

import { TripPageOptions } from "../interfaces/tripPage";

type TripPageProps = {
    options: TripPageOptions;
}

const TripPage: FunctionComponent<TripPageProps> = ({ options }) => {
    console.log(options)
    if (!options.hotel) return null;

    const long = options.hotel.coordinates.longitude || 10.00678;
    const lat = options.hotel.coordinates.latitude || 53.54992;

    return (
        <div className="container card">
            <div className="map p-3">
                <APIProvider apiKey={googleApiKey}>
                    <Map 
                        zoom={10}
                        center={{lat: lat, lng: long}}>
                        <Marker position={{lat: lat, lng: long}}></Marker>
                    </Map>
                </APIProvider>
            </div>
        </div>
    )
}

export default TripPage;