// import { corsLink, yelpBearerKey } from "../global/global";

export const yelpStar = (rating: string): string => `src/img/small_${rating}.png`;

export const myHotel = async (location: string):Promise<void> => {
    console.log(location);
    const payload = {
        location
    }

    const options = {
        method: "POST",
        body: JSON.stringify(payload),
        // headers: {
        //     accept: 'application/json',
        //     "Authorization": `Bearer ${yelpBearerKey}`,
        // }
    };

    const response = await fetch("/api/getYelpResults", options);
    console.log("RESPONSE:", response.json());
    // const url:string = `${corsLink}https://api.yelp.com/v3/businesses/search?term=hotels&limit=4&location=${location}`
    // const response = await fetch(url, options);
}