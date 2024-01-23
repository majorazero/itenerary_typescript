import React, { FunctionComponent } from "react";
import { Waypoint } from "../interfaces/googleMaps";
import { IteneraryOptions } from "../interfaces/tripPage";
import { route } from "../services/google";

type IteneraryProps = {
    options: IteneraryOptions
}

const Itenerary:FunctionComponent<IteneraryProps> = ({ options }) => {
    const { 
        waypoints,
        hotel,
        directionRenderer,
        directionService,
        days,
        currentDay,
        tripId,
        setWaypoints,
        setCurrentDay,
        setPreventReroute,
        handleSave,
    } = options;

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

            setPreventReroute(true);
            setWaypoints(newWp)
        }

        route({
            waypoints,
            directionRenderer,
            directionService,
            hotel,
            optimizeWaypoints: true,
            callback: handlePostRoute
        })
    }

    const next = ():void => {
        if (currentDay === days.length) return;

        setCurrentDay(currentDay+1)
    }

    const prev = ():void => {
        if (currentDay === 0) return;

        setCurrentDay(currentDay-1)
    }

    const listRenderer = waypoints.map((waypoint:Waypoint, index: number) => {
        return (
            <div className="card container entry-card py-2" key={`${waypoint.data.id}-${Math.random()}-ite`}>
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
        <div className="container">
            <h2>Itenerary</h2>
            {tripId && <small>Trip Saved! ID: {tripId}</small>}
            <div className="row my-3">
                <div className='col-4'>
                    Day {currentDay + 1} of {days.length}
                </div>
                <button className="btn btn-primary col-1" onClick={prev}>
                    {"<"}
                </button>
                <button className="btn btn-primary col-1" onClick={next}>
                    {">"}
                </button>
                <button className="btn btn-primary col-3" onClick={optimize}>Optimize</button>
                <button className="btn btn-primary col-3" onClick={handleSave}>Save Trip</button>
            </div>
            {listRenderer}
        </div>
    );
}

export default Itenerary;