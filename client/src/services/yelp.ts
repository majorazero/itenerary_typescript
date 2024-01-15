import { YelpQuery } from "../interfaces/utility";

export const yelpStar = (rating: string): string => `/img/small_${rating}.png`;

export const getYelpResult = async (query: YelpQuery):Promise<any> => {
    const payload = {
        location: query.location,
        term: query.term,
        latitude: query.latitude,
        longitude: query.longitude,
    }

    const options = {
        method: "POST",
        query: payload,
        body: JSON.stringify(payload),
        headers: {
            "Content-Type": 'application/json',
        }
    };

    const response = await fetch("/api/getYelpResults", options);
    const result = await response.json()

    return result.data
}