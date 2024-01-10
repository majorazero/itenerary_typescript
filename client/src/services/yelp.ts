export const yelpStar = (rating: string): string => `src/img/small_${rating}.png`;

export const myHotel = async (location: string):Promise<any> => {
    const payload = {
        location: location,
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