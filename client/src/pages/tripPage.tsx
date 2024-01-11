import React, { FunctionComponent } from "react";
import {APIProvider, Map} from '@vis.gl/react-google-maps';
import { googleApiKey } from "../global";

const TripPage: FunctionComponent<any> = () => {
    return (
        <div className="container card">
            <div className="map">
                <APIProvider apiKey={googleApiKey}>
                    <Map zoom={10} center={{lat: 53.54992, lng: 10.00678}} />
                </APIProvider>
            </div>
        </div>
    )
}

export default TripPage;