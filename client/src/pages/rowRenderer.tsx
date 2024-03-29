import React, { FunctionComponent, SetStateAction, Dispatch } from "react";
import { yelpStar } from "../services/yelp";
import { Waypoint } from "../interfaces/googleMaps";
import { RowRendererOptions } from "../interfaces/tripPage";

const RowRenderer: FunctionComponent<RowRendererOptions> = ({ 
    title,
    entries,
    waypoints,
    offset,
    handleOffset,
    setWaypoints 
}) => {
    if (!entries) return null;

    const handleOnClick = (entry:any):void => {
        const { latitude, longitude } = entry.coordinates;
        const tempWaypoint:Waypoint[] = [...waypoints];
        tempWaypoint.push({
            location: { lat: latitude, lng: longitude },
            data: entry,
        })

        setWaypoints(tempWaypoint);
    }

    const hasBeenSelected = (id: string):boolean => {
        for (const waypoint of waypoints) {
            if (waypoint.data.id === id) return true;
        }
        
        return false
    };

    return (
        <div>
            <div className="container">
                <div className="row">
                    <h2 className="col-10">{title}</h2>
                </div>
                <div className="row">
                    <span className="col-10">
                        Page {offset + 1}
                    </span>
                    <button disabled={offset == 0} className="btn btn-primary col-1" onClick={() => handleOffset(false)}>{"<"}</button>
                    <button className="btn btn-primary col-1" onClick={() => handleOffset(true)}>{">"}</button>
                </div>
            </div>
            {entries.map((entry) => 
                <div 
                    className={`card container entry-card py-2 ${hasBeenSelected(entry.id) && "selected"}`}
                    key={entry.id}
                    role="button"
                    onClick={() => handleOnClick(entry)}>
                    <div className="row">
                        <div className="col-3">
                            <img className="img-fluid" src={entry.image_url} alt={entry.name}></img>
                        </div>
                        <div className="col-9 text-start">
                            <h5>{entry.name}</h5>
                            <div>Price: {entry.price}</div>
                            <div>Phone: {entry.phone}</div>
                            <img className="py-2 hotel-star" src={yelpStar(entry.rating)} alt={`${entry.rating} stars`}></img>
                            <br/>
                            {entry.location.display_address.map((line: string) => 
                                <small key={Math.random()}>{line}</small>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default RowRenderer;