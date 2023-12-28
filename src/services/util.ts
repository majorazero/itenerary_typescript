import { Location } from "../interfaces/utility";

export const dayOutputter = (startTime: string, endTime: string): null|number => {
    if (startTime !== "" && endTime !== "") {
        let startDate = new Date(startTime);
        let endDate = new Date(endTime);
        let timeDiff = endDate.getTime() - startDate.getTime();
        return Math.ceil(timeDiff / (1000 * 3600 * 24));
    }

    return null;
};

export const idNormalize = (name: string):string => name.replaceAll(/[&-]/g, "-");

export const optimizeTrip = (routes: number[], trip: Location[][], currentDay: number): void => {
    let newTrip: Location[] = routes.map((route: number) => {
        return trip[currentDay-1][route+1]
    });
    trip[currentDay-1].splice(1,newTrip.length,...newTrip);
}

export const latLongParser = (arr: Location[]): string[] => {
    return arr.map((item: Location) => {
        return `${item.lat},${item.long}`;
    });
}