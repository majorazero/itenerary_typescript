// import { corsLink, yelpBearerKey } from "../global/global";

export const yelpStar = (rating: string): string => `src/img/small_${rating}.png`;

export const myHotel = async (location: string):Promise<void> => {
    const payload = {
        location: location,
    }

    const options = {
        method: "POST",
        query: payload,
        body: JSON.stringify(payload),
        headers: {
            "Content-Type": 'application/json',
            // "Authorization": `Bearer ${yelpBearerKey}`,
        }
    };

    const response = await fetch("/api/getYelpResults", options);
    const result = await response.json()
    console.log("RESPONSE:", result);
    // const url:string = `${corsLink}https://api.yelp.com/v3/businesses/search?term=hotels&limit=4&location=${location}`
    // const response = await fetch(url, options);
}