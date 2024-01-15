export interface Location {
    lat: string,
    long: string,
    loc: string,
}

export interface YelpQuery {
    location?: string,
    term: string,
    longitude?: number,
    latitude?: number,
}