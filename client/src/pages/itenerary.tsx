import React, { FunctionComponent, SetStateAction, Dispatch } from "react";
import { Waypoint } from "../interfaces/googleMaps";
import { IteneraryOptions } from "../interfaces/tripPage";
import { route } from "../services/google";

type IteneraryProps = {
    options: IteneraryOptions
}

const Itenerary:FunctionComponent<IteneraryProps> = ({ options }) => {
    const { waypoints, setWaypoints, hotel, directionRenderer, directionService } = options;

    const removeWaypoint = (index:number):void => {
        const tempWaypoint = [...waypoints];
        tempWaypoint.splice(index, 1);
        setWaypoints(tempWaypoint)
    }

    const optimize = ():void => {
        const handlePostRoute = (response: any):void => {
            const newOrder = response.routes[0].waypoint_order;
            if (!newOrder) return;

            let newWp = new Array(waypoints.length);
            for (let i = 0; i < newOrder.length; i++) {
                newWp[i] = waypoints[newOrder[i]]
            }

            setWaypoints(newWp)
        }

        const response = route({
            waypoints,
            directionRenderer,
            directionService,
            hotel,
            optimizeWaypoints: true,
            callback: handlePostRoute
        })
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
            <button className="btn btn-primary mb-3" onClick={optimize}>Optimize</button>
            {listRenderer}
        </div>
    );
}

export default Itenerary;