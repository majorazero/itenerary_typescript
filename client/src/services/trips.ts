import { Waypoint } from "../interfaces/googleMaps";

type SaveTripQuery = {
    name: string,
    days: Waypoint[][],
    hotel: any,
    startDate: string,
    endDate: string,
    tripId?: string,
}

type LoadTripQuery = {
    id: string,
}

export const saveTrip = async(payload: SaveTripQuery):Promise<any> => {
    const options = {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
            "Content-Type": 'application/json',
        }
    }

    const response = await fetch("/trips/saveTrip", options);
    const result = await response.json();

    return result;
};

export const getTrip = async(payload: LoadTripQuery):Promise<any> => {
    
    const options = {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
            "Content-Type": 'application/json',
        }
    }

    const response = await fetch("/trips/getTrip", options);
    console.log(response)
    const result = await response.json();

    return [response.status, result];
};