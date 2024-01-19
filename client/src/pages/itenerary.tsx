import React, { FunctionComponent, SetStateAction, Dispatch } from "react";
import { Waypoint } from "../interfaces/googleMaps";

type IteneraryProps = {
    options: {
        waypoints: Waypoint[],
        setWaypoints: Dispatch<SetStateAction<Waypoint[]>>,
    }
}

const Itenerary:FunctionComponent<IteneraryProps> = ({ options }) => {
    const { waypoints, setWaypoints } = options;

    const removeWaypoint = (index:number):void => {
        const tempWaypoint = [...waypoints];
        tempWaypoint.splice(index, 1);
        setWaypoints(tempWaypoint)
    }

    const listRenderer = waypoints.map((waypoint:Waypoint, index: number) => {
        return (
            <div className="card container entry-card py-2" key={`${waypoint.data.id}-ite`}>
                <div className="row">
                    <div className="col-2">
                        {index+1}.
                    </div>
                    <div className="col-7">
                        <div>{waypoint.data.name}</div>
                    </div>
                    <div className="col-3">
                        <button className="btn btn-danger" onClick={() => removeWaypoint(index)}>Remove</button>
                    </div>
                </div>
            </div>
        )
    });
    
    return (
        <div>
            <h2>Itenerary</h2>
            <button className="btn btn-primary mb-3">Optimize</button>
            {listRenderer}
        </div>
    );
}

export default Itenerary;