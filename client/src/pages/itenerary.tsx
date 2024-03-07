import React, { FunctionComponent } from "react";
import { Waypoint } from "../interfaces/googleMaps";
import { IteneraryOptions } from "../interfaces/tripPage";
import { route } from "../services/google";

const Itenerary:FunctionComponent<IteneraryOptions> = ({ 
    waypoints,
    hotel,
    directionRenderer,
    directionService,
    days,
    currentDay,
    tripId,
    tripLegs,
    setTripLegs,
    setWaypoints,
    setCurrentDay,
    setPreventReroute,
    handleSave,
 }) => {
    const removeWaypoint = (index:number):void => {
        const tempWaypoint = [...waypoints];
        tempWaypoint.splice(index, 1);
        setWaypoints(tempWaypoint)
    }

    const moveWaypoint = (index:number, up:boolean):void => {
        const newIndex = up ? index-1 : index+1;
        const tempWaypoint = [...waypoints];
        tempWaypoint[newIndex] = tempWaypoint[index];
        tempWaypoint[index] = waypoints[newIndex];

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
            setTripLegs,
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

    const legRenderer = (leg: any) => {
        if(!leg) return null;
        return(
            <div className="card py-2">
                <div className="row">
                    <div className="col-2">
                        Drive:
                    </div>
                    <div className="col-5">
                        {leg.distance.text}
                    </div>
                    <div className="col-5">
                        {leg.duration.text}
                    </div>
                </div>
            </div>
        )
    }

    const listRenderer = waypoints.map((waypoint:Waypoint, index: number) => {
        return (
            <div key={`${waypoint.data.id}-${Math.random()}-ite`}>
                {legRenderer(tripLegs[index])}
                <div className="card entry-card py-2">
                    <div className="row">
                        <div className="col-2">
                            {index+1}.
                        </div>
                        <div className="col-5">
                            <div>{waypoint.data.name}</div>
                        </div>
                        <div className="col-5">
                            {index > 0 && <button className="btn btn-success mx-1" onClick={() => moveWaypoint(index, true)}>&#9650;</button>}
                            {index < waypoints.length-1 && <button className="btn btn-success mx-1" onClick={() => moveWaypoint(index, false)}>&#9660;</button>}
                            <button className="btn btn-danger mx-1" onClick={() => removeWaypoint(index)}>X</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    });
    
    const endpointCard = (tag: string) => {
        return (
            <div className="card py-2 endpoint-card" key={`${hotel.id}-${Math.random()}-${tag}-ite`}>
            <div className="row">
                <div className="col-2">
                    {tag}:
                </div>
                <div className="col-7">
                    <div>{hotel.name}</div>
                </div>
            </div>
        </div>
        )
    }

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
            {endpointCard("Start")}
            {listRenderer}
            {legRenderer(tripLegs[tripLegs.length-1])}
            {endpointCard("End")}
        </div>
    );
}

export default Itenerary;