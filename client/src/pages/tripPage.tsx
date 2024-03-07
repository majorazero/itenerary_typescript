import React, { FunctionComponent, useEffect, useState } from "react";
import {APIProvider, Map, Marker, useMap } from '@vis.gl/react-google-maps';

import * as Yelp from "../services/yelp";

import RowRenderer from "./rowRenderer";
import Itenerary from "./itenerary";

import { TripPageOptions, IteneraryOptions, RowRendererOptions } from "../interfaces/tripPage";
import { route } from "../services/google";

// type MarkerColor = {
//     background?: string,
//     glyphColor?: string,
//     borderColor?: string,
// }

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

const TripPage: FunctionComponent<TripPageOptions> = ({ 
    entertainments,
    restaurants, 
    waypoints, 
    hotel,
    preventReroute,
    days,
    currentDay,
    tripId,
    tripLegs,
    restaurantsOffset,
    entertainmentsOffset,
    setRestaurants,
    setEntertainments,
    setRestaurantsOffset,
    setEntertainmentsOffset,
    setTripLegs,
    setDays,
    setCurrentDay,
    setWaypoints, 
    setPreventReroute,
    handleSave,
 }) => {
    const [directionService, setDirectionService] = useState<any>(null);
    const [directionRenderer, setDirectionRenderer] = useState<any>(null);

    // const markerRenderer = (locations: any[] = [], color?: MarkerColor) => {
    //     return locations.map((location) => {
    //         const { longitude, latitude } = location.coordinates;
    //         return (
    //             <AdvancedMarker key={location.name} title={location.name} position={{lat: latitude, lng: longitude }}>
    //                 <Pin
    //                     background={color?.background}
    //                     glyphColor={color?.glyphColor}
    //                     borderColor={color?.borderColor}>
    //                 </Pin>
    //             </AdvancedMarker>
    //         )
    //     });
    // }

    useEffect(():void => {
        const newDays = [...days];
        newDays[currentDay] = waypoints;
        setDays(newDays);

        if (preventReroute) {
            setPreventReroute(false);
            return;
        }

        route({
            waypoints,
            directionService,
            directionRenderer,
            hotel,
            setTripLegs,
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [waypoints])

    if (!hotel) return null;

    const { longitude, latitude } = hotel.coordinates;

    const long = longitude || 10.00678;
    const lat = latitude || 53.54992;

    const iteneraryOptions:IteneraryOptions = {
        waypoints,
        directionService,
        directionRenderer,
        hotel,
        days,
        currentDay,
        tripId,
        tripLegs,
        setTripLegs,
        setCurrentDay,
        setWaypoints,
        setPreventReroute,
        handleSave,
    }

    const restaurantOptions:RowRendererOptions = {
        title: "Restaurant",
        entries: restaurants.businesses,
        waypoints,
        setWaypoints,
        offset: restaurantsOffset,
        handleOffset: async (next: boolean) => {
            let tempOffset = restaurantsOffset;
            if (next) {
                tempOffset++;
            } else if (tempOffset) {
                tempOffset--;
            }

            const restaurantResult = await Yelp.getYelpResult({ 
                longitude: longitude,
                latitude: latitude,
                term: "restaurant",
                limit: 4,
                offset: tempOffset*4,
              });

            setRestaurants(restaurantResult)
            setRestaurantsOffset(tempOffset)
        }
    }

    const entertainmentOptions:RowRendererOptions = {
        title: "Entertaiment",
        entries: restaurants.businesses,
        waypoints,
        setWaypoints,
        offset: entertainmentsOffset,
        handleOffset: async (next: boolean) => {
            let tempOffset = entertainmentsOffset;
            if (next) {
                tempOffset++;
            } else if (tempOffset) {
                tempOffset--;
            }

            const entertainmentResult = await Yelp.getYelpResult({ 
                longitude: longitude,
                latitude: latitude,
                term: "entertainment",
                limit: 4,
                offset: tempOffset*4,
              });
            
            setEntertainments(entertainmentResult);
            setEntertainmentsOffset(tempOffset)
        }
    }

    return (
        <div className="container my-5">
            <div className="row">
                <div className="col-6 card">
                    <div className="map p-3">
                        <APIProvider apiKey={process.env.REACT_APP_GOOGLE_API_KEY || ""}>
                            <Map 
                                mapId="target-map"
                                zoom={13}
                                center={{lat: lat, lng: long}}>
                                {/* {markerRenderer(restaurants.businesses, { background: "#ADD8E6", glyphColor: "#05445E"})}
                                {markerRenderer(entertainments.businesses, { background: "#FADCD9", glyphColor: "#F79489"})} */}
                            </Map>
                            <Trip options={{ setDirectionRenderer, setDirectionService } }></Trip>
                        </APIProvider>
                    </div>
                    <Itenerary {...iteneraryOptions}/>
                </div>
                <div className="col-6 card py-3">
                    <div className="card">
                        <RowRenderer {...restaurantOptions}/>
                    </div>
                    <div className="card">
                        <RowRenderer {...entertainmentOptions}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TripPage;