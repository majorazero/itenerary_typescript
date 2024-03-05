import { YelpQuery } from "../interfaces/yelp";

export const yelpStar = (rating: string): string => {
    rating =( Math.round(parseFloat(rating)*2)/2).toString();
    return `/img/small_${rating}.png`
};

export const getYelpResult = async (query: YelpQuery):Promise<any> => {
    const payload = {
        location: query.location,
        term: query.term,
        latitude: query.latitude,
        longitude: query.longitude,
        limit: query.limit,
        offset: query.offset,
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

    console.log(result)

    return result.data
}