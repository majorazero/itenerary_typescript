import { corsLink, yelpBearerKey } from "../global/global";

export const yelpStar = (rating: string): string => `src/img/small_${rating}.png`;

export const myHotel = async (location: string):Promise<void> => {
    console.log(corsLink);
    const url:string = `${corsLink}https://api.yelp.com/v3/businesses/search?term=hotels&limit=4&location=${location}`
    const options = {
        method: "GET",
        headers: {
            accept: 'application/json',
            "Authorization": `Bearer ${yelpBearerKey}`,
        }
    };
    const response = await fetch(url, options);

    console.log(response);
}